import { apiClient } from "@/core/api";
import type { AuthAdapter, Session } from "./types";

/**
 * Adapter DÙNG CHO PHÁT TRIỂN: không có đăng nhập thật, chỉ chọn một vai trò để thử RBAC.
 * Vai trò được gửi qua header `x-mock-role`; Mock API trả phiên + quyền tương ứng ở `/auth/me`.
 * Khi có hệ thống identity thật, thay adapter này bằng adapter thật.
 */
export const DEV_ROLES = [
  { id: "role-admin", name: "Admin" },
  { id: "role-sales", name: "Sales" },
  { id: "role-academic", name: "Academic" },
  { id: "role-teacher", name: "Teacher" },
  { id: "role-marketing", name: "Marketing" },
  { id: "role-finance", name: "Finance" },
] as const;

const STORAGE_KEY = "pte.dev.role";
const DEFAULT_ROLE = DEV_ROLES[0].id;

function readRole(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_ROLE;
  } catch {
    return DEFAULT_ROLE;
  }
}

export interface DevAuthAdapter extends AuthAdapter {
  getRole(): string;
  setRole(roleId: string): void;
}

export function createDevAuthAdapter(): DevAuthAdapter {
  return {
    name: "dev",
    getRole: readRole,
    setRole(roleId) {
      try {
        window.localStorage.setItem(STORAGE_KEY, roleId);
      } catch {
        /* localStorage không khả dụng: bỏ qua, dùng vai trò mặc định */
      }
    },
    getRequestHeaders: () => ({ "x-mock-role": readRole() }),
    async getSession(signal) {
      const res = await apiClient.get<Session>("/auth/me", { signal });
      return res.data;
    },
  };
}
