import type { BaseEntity, ListQuery } from "@/core/api";

export type AuditAction = "create" | "update" | "delete" | "login" | "approve" | "export";

/** Nhật ký thay đổi dữ liệu: ai làm gì, trên bản ghi nào, trước/sau và thời điểm. */
export interface AuditLog extends BaseEntity {
  actorId: string;
  actorName: string;
  actorRole: string;
  action: AuditAction;
  /** Tên resource RBAC, ví dụ "student". */
  resource: string;
  entityId: string;
  /** Tên dễ đọc của bản ghi (ví dụ họ tên học viên). */
  entityLabel: string;
  before: unknown;
  after: unknown;
  ip: string;
}

export interface AuditLogQuery extends ListQuery {
  action?: AuditAction;
  resource?: string;
  actorId?: string;
  /** yyyy-MM-dd */
  from?: string;
  to?: string;
}

export const AUDIT_ACTION_LABELS: Record<AuditAction, string> = {
  create: "Tạo mới",
  update: "Cập nhật",
  delete: "Xóa",
  login: "Đăng nhập",
  approve: "Duyệt",
  export: "Xuất dữ liệu",
};
