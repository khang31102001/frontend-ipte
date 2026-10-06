import "server-only";
import { getApiBaseUrl } from "@/core/config/env";
import { ApiError, codeFromStatus } from "./errors";
import { joinUrl, toQueryString } from "./query-string";
import type { ApiFailure, ApiMeta, ApiSuccess, QueryParams } from "./types";

export interface ServerFetchOptions {
  params?: QueryParams;
  /** Tag để `revalidateTag` (webhook từ CMS/backend). */
  tags?: string[];
  /** Giây. Mặc định 300. */
  revalidate?: number;
}

export interface ServerResult<T> {
  data: T;
  meta?: ApiMeta;
}

const DEFAULT_REVALIDATE = 300;
const TIMEOUT_MS = 15_000;

/**
 * Fetch dành cho Server Component (SSR/ISR): cache theo tag + thời gian (làm mới bằng webhook /api/revalidate khi nội dung đổi).
 */
export async function serverGet<T>(path: string, options: ServerFetchOptions = {}): Promise<ServerResult<T>> {
  const url = joinUrl(getApiBaseUrl(), path) + toQueryString(options.params);
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: options.revalidate ?? DEFAULT_REVALIDATE, tags: options.tags },
    });
  } catch {
    throw new ApiError({ message: "Không kết nối được máy chủ", status: 0, code: "NETWORK_ERROR" });
  }
  let json: ApiSuccess<T> | ApiFailure | null = null;
  try {
    json = (await res.json()) as ApiSuccess<T> | ApiFailure;
  } catch {
    json = null;
  }
  if (!res.ok || !json || json.success !== true) {
    throw new ApiError({
      message: json && json.success === false ? json.message : "Máy chủ đang gặp sự cố",
      status: res.status,
      code: json && json.success === false && json.code ? json.code : codeFromStatus(res.status),
      errors: json && json.success === false ? json.errors : [],
    });
  }
  return { data: json.data, meta: json.meta };
}

/** Như `serverGet` nhưng trả `null` khi 404 (để page gọi `notFound()`). */
export async function serverGetOrNull<T>(path: string, options?: ServerFetchOptions): Promise<T | null> {
  try {
    return (await serverGet<T>(path, options)).data;
  } catch (error) {
    if (error instanceof ApiError && error.isNotFound) return null;
    throw error;
  }
}
