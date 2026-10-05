/**
 * API Contract chung cho toàn hệ thống. Mock API và backend thật PHẢI trả đúng các hình dạng này.
 */

export interface ApiMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiFieldError {
  /** Tên field theo dạng đường dẫn, ví dụ "email" hoặc "profile.targetScore". */
  field: string;
  message: string;
}

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "SERVER_ERROR"
  | "NETWORK_ERROR"
  | "TIMEOUT";

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message: string;
  meta?: ApiMeta;
}

export interface ApiFailure {
  success: false;
  data: null;
  message: string;
  errors: ApiFieldError[];
  code?: ApiErrorCode;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

/** Thuộc tính chung của mọi thực thể trả về từ API. */
export interface BaseEntity {
  id: string;
  /** ISO 8601 */
  createdAt: string;
  /** ISO 8601 */
  updatedAt: string;
}

export type SortOrder = "asc" | "desc";

/** Tham số danh sách chuẩn: phân trang + tìm kiếm + sắp xếp. Filter riêng của từng module mở rộng interface này. */
export interface ListQuery {
  page?: number;
  pageSize?: number;
  q?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface PageResult<T> {
  items: T[];
  meta: ApiMeta;
}

export type QueryParamValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryParamValue | readonly QueryParamValue[]>;

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
