import type { BaseEntity, ListQuery } from "@/core/api";

export const USER_STATUSES = ["active", "inactive", "locked"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  active: "Hoạt động",
  inactive: "Ngưng hoạt động",
  locked: "Bị khóa",
};

export interface User extends BaseEntity {
  fullName: string;
  email: string;
  phone?: string;
  roleId: string;
  /** Tên vai trò (API trả kèm để hiển thị). */
  roleName: string;
  branchId?: string;
  status: UserStatus;
  avatarUrl?: string | null;
  lastLoginAt?: string | null;
}

export interface UserQuery extends ListQuery {
  roleId?: string;
  status?: UserStatus;
  branchId?: string;
}
