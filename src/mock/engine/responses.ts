import type { ApiErrorCode, ApiFieldError, ApiMeta } from "@/core/api";
import type { MockResult } from "./types";

export function ok<T>(data: T, init: { message?: string; meta?: ApiMeta; status?: number } = {}): MockResult {
  return {
    status: init.status ?? 200,
    body: { success: true, data, message: init.message ?? "Success", ...(init.meta ? { meta: init.meta } : {}) },
  };
}

export function created<T>(data: T, message = "Created"): MockResult {
  return ok(data, { status: 201, message });
}

export function fail(
  status: number,
  message: string,
  code: ApiErrorCode,
  errors: ApiFieldError[] = [],
): MockResult {
  return { status, body: { success: false, data: null, message, errors, code } };
}

export const notFound = (message = "Không tìm thấy dữ liệu") => fail(404, message, "NOT_FOUND");
export const forbidden = (message = "Bạn không có quyền thực hiện thao tác này") => fail(403, message, "FORBIDDEN");
export const unauthorized = (message = "Chưa đăng nhập hoặc phiên đã hết hạn") => fail(401, message, "UNAUTHORIZED");
export const conflict = (message: string, errors: ApiFieldError[] = []) => fail(409, message, "CONFLICT", errors);
export const validation = (errors: ApiFieldError[], message = "Dữ liệu không hợp lệ") =>
  fail(422, message, "VALIDATION_ERROR", errors);
export const serverError = (message = "Lỗi máy chủ (mock)") => fail(500, message, "SERVER_ERROR");

export function buildMeta(page: number, pageSize: number, total: number): ApiMeta {
  return { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}
