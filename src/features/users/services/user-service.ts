import { apiClient, createCrudService } from "@/core/api";
import type { UserInput } from "../schemas";
import type { User, UserQuery } from "../types";

const crud = createCrudService<User, UserInput, UserInput, UserQuery>("/users");

/** Kết quả tạo user: backend sinh mật khẩu tạm và chỉ trả MỘT lần. */
export type UserWithTemporaryPassword = User & { temporaryPassword?: string };

export const userService = {
  ...crud,
  async exportAll(query: Omit<UserQuery, "page" | "pageSize"> = {}): Promise<User[]> {
    return (await apiClient.get<User[]>("/users/export", { params: query as Record<string, string> })).data;
  },
  /** Cấp lại mật khẩu tạm (thu hồi mọi phiên của người dùng). */
  async resetPassword(id: string): Promise<{ temporaryPassword: string }> {
    return (await apiClient.post<{ temporaryPassword: string }>(`/users/${encodeURIComponent(id)}/reset-password`)).data;
  },
};
