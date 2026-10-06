import type { ApiErrorCode, ApiFieldError } from "./types";

/** Lỗi chuẩn hóa duy nhất mà UI/hook/service phải xử lý, bất kể Mock hay backend thật. */
export class ApiError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;
  readonly errors: ApiFieldError[];

  constructor(init: {
    message: string;
    status: number;
    code: ApiErrorCode;
    errors?: ApiFieldError[];
  }) {
    super(init.message);
    this.name = "ApiError";
    this.status = init.status;
    this.code = init.code;
    this.errors = init.errors ?? [];
  }

  get isValidation() {
    return this.code === "VALIDATION_ERROR";
  }
  get isNotFound() {
    return this.code === "NOT_FOUND";
  }
  get isUnauthorized() {
    return this.code === "UNAUTHORIZED";
  }
  get isForbidden() {
    return this.code === "FORBIDDEN";
  }
  /** Lỗi do phía server/mạng, có ý nghĩa thử lại. */
  get isRetryable() {
    return this.code === "SERVER_ERROR" || this.code === "NETWORK_ERROR" || this.code === "TIMEOUT";
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function getErrorMessage(error: unknown, fallback = "Đã có lỗi xảy ra. Vui lòng thử lại."): string {
  if (isApiError(error)) return error.message || fallback;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export function codeFromStatus(status: number): ApiErrorCode {
  if (status === 400 || status === 422) return "VALIDATION_ERROR";
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status === 409) return "CONFLICT";
  return "SERVER_ERROR";
}
