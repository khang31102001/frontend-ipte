import { apiClient, createCrudService } from "@/core/api";
import type { UserInput } from "../schemas";
import type { User, UserQuery } from "../types";

const crud = createCrudService<User, UserInput, UserInput, UserQuery>("/users");

export const userService = {
  ...crud,
  async exportAll(query: Omit<UserQuery, "page" | "pageSize"> = {}): Promise<User[]> {
    return (await apiClient.get<User[]>("/users/export", { params: query as Record<string, string> })).data;
  },
};
