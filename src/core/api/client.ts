import { getApiBaseUrl } from "@/core/config/env";
import { ApiError, codeFromStatus } from "./errors";
import { joinUrl, toQueryString } from "./query-string";
import type { ApiErrorCode, ApiFailure, ApiSuccess, QueryParams } from "./types";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
  params?: QueryParams;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeoutMs?: number;
}

export type HeaderProvider = () => Record<string, string | undefined> | undefined;

export interface ApiClientHooks {
  /** Token gắn vào `Authorization: Bearer`. */
  getAccessToken?: () => string | null | undefined;
  /** Gọi khi gặp 401. Trả true nếu đã làm mới được phiên → request được thử lại đúng 1 lần. */
  refreshSession?: () => Promise<boolean>;
  /** Gọi khi 401 không cứu được (hết phiên). */
  onUnauthorized?: () => void;
}

export interface ApiClientOptions {
  /** Có thể là chuỗi hoặc hàm (đọc env lười, phù hợp test). */
  baseUrl: string | (() => string);
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export interface ApiClient {
  request<T>(method: HttpMethod, path: string, options?: RequestOptions): Promise<ApiSuccess<T>>;
  get<T>(path: string, options?: RequestOptions): Promise<ApiSuccess<T>>;
  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiSuccess<T>>;
  put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiSuccess<T>>;
  patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiSuccess<T>>;
  delete<T>(path: string, options?: RequestOptions): Promise<ApiSuccess<T>>;
  /** Cấu hình hook (auth). Gọi lại sẽ ghi đè. */
  configure(hooks: ApiClientHooks): void;
  /** Đăng ký nơi cung cấp header bổ sung. Trả hàm hủy đăng ký. */
  addHeaderProvider(provider: HeaderProvider): () => void;
}

const KNOWN_CODES: ReadonlySet<string> = new Set<ApiErrorCode>([
  "VALIDATION_ERROR",
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "CONFLICT",
  "SERVER_ERROR",
  "NETWORK_ERROR",
  "TIMEOUT",
]);

function isEnvelope(value: unknown): value is ApiSuccess<unknown> | ApiFailure {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    typeof (value as { success: unknown }).success === "boolean"
  );
}

function toApiError(status: number, body: unknown): ApiError {
  if (isEnvelope(body) && body.success === false) {
    const code =
      body.code && KNOWN_CODES.has(body.code) ? body.code : codeFromStatus(status);
    return new ApiError({
      message: body.message || "Yêu cầu không thành công",
      status,
      code,
      errors: Array.isArray(body.errors) ? body.errors : [],
    });
  }
  return new ApiError({
    message: status >= 500 ? "Máy chủ đang gặp sự cố" : "Phản hồi từ máy chủ không hợp lệ",
    status,
    code: codeFromStatus(status),
  });
}

export function createApiClient(options: ApiClientOptions): ApiClient {
  const fetchImpl = options.fetchImpl ?? ((...args: Parameters<typeof fetch>) => fetch(...args));
  const defaultTimeout = options.timeoutMs ?? 20_000;
  let hooks: ApiClientHooks = {};
  const headerProviders = new Set<HeaderProvider>();
  let refreshing: Promise<boolean> | null = null;

  const resolveBase = () =>
    typeof options.baseUrl === "function" ? options.baseUrl() : options.baseUrl;

  function buildHeaders(opts: RequestOptions, hasJsonBody: boolean): Headers {
    const headers = new Headers({ Accept: "application/json" });
    if (hasJsonBody) headers.set("Content-Type", "application/json");
    for (const provider of headerProviders) {
      const extra = provider();
      if (!extra) continue;
      for (const [k, v] of Object.entries(extra)) if (v !== undefined) headers.set(k, v);
    }
    const token = hooks.getAccessToken?.();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    for (const [k, v] of Object.entries(opts.headers ?? {})) headers.set(k, v);
    return headers;
  }

  async function execute(method: HttpMethod, path: string, opts: RequestOptions) {
    const url = joinUrl(resolveBase(), path) + toQueryString(opts.params);
    const isForm = typeof FormData !== "undefined" && opts.body instanceof FormData;
    const hasJsonBody = opts.body !== undefined && !isForm;

    const controller = new AbortController();
    const timeoutMs = opts.timeoutMs ?? defaultTimeout;
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, timeoutMs);
    const onAbort = () => controller.abort();
    opts.signal?.addEventListener("abort", onAbort);

    try {
      const res = await fetchImpl(url, {
        method,
        headers: buildHeaders(opts, hasJsonBody),
        body:
          opts.body === undefined
            ? undefined
            : isForm
              ? (opts.body as FormData)
              : JSON.stringify(opts.body),
        signal: controller.signal,
        cache: "no-store",
        // Gửi cookie refresh (httpOnly) khi API khác origin; backend chỉ cho phép origin trong CORS_ALLOWED_ORIGINS.
        credentials: "include",
      });
      let json: unknown = null;
      try {
        json = await res.json();
      } catch {
        json = null;
      }
      return { res, json };
    } catch (err) {
      if (opts.signal?.aborted) throw err; // hủy chủ động (react-query) → không bọc thành lỗi
      throw new ApiError({
        message: timedOut ? "Máy chủ phản hồi quá lâu" : "Không thể kết nối tới máy chủ",
        status: 0,
        code: timedOut ? "TIMEOUT" : "NETWORK_ERROR",
      });
    } finally {
      clearTimeout(timer);
      opts.signal?.removeEventListener("abort", onAbort);
    }
  }

  async function refreshOnce(): Promise<boolean> {
    if (!hooks.refreshSession) return false;
    refreshing ??= hooks.refreshSession().finally(() => {
      refreshing = null;
    });
    return refreshing;
  }

  async function request<T>(method: HttpMethod, path: string, opts: RequestOptions = {}) {
    let { res, json } = await execute(method, path, opts);

    if (res.status === 401 && !path.startsWith("/auth/")) {
      if (await refreshOnce()) {
        ({ res, json } = await execute(method, path, opts));
      }
      if (res.status === 401) hooks.onUnauthorized?.();
    }

    if (!res.ok || !isEnvelope(json) || json.success === false) {
      throw toApiError(res.status, json);
    }
    return json as ApiSuccess<T>;
  }

  return {
    request,
    get: (path, o) => request("GET", path, o),
    post: (path, body, o) => request("POST", path, { ...o, body }),
    put: (path, body, o) => request("PUT", path, { ...o, body }),
    patch: (path, body, o) => request("PATCH", path, { ...o, body }),
    delete: (path, o) => request("DELETE", path, o),
    configure(next) {
      hooks = next;
    },
    addHeaderProvider(provider) {
      headerProviders.add(provider);
      return () => headerProviders.delete(provider);
    },
  };
}

/** Client dùng chung của toàn app. Base URL lấy từ NEXT_PUBLIC_API_BASE_URL. */
export const apiClient: ApiClient = createApiClient({ baseUrl: getApiBaseUrl });
