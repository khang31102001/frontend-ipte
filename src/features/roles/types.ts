import type { BaseEntity, ListQuery } from "@/core/api";

export interface Role extends BaseEntity {
  name: string;
  description?: string;
  /** Danh sách quyền "resource.action". */
  permissions: string[];
  /** Vai trò hệ thống: không được xóa. */
  isSystem: boolean;
  /** Số người dùng đang giữ vai trò (do API tính). */
  userCount: number;
}

export type RoleQuery = ListQuery;
