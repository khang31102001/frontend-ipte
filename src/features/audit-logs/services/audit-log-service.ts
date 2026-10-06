import { apiClient, createCrudService } from "@/core/api";
import type { AuditLog, AuditLogQuery } from "../types";

const crud = createCrudService<AuditLog, never, never, AuditLogQuery>("/audit-logs");

/** Nhật ký hoạt động: chỉ đọc (bản ghi do backend tự ghi mỗi khi dữ liệu thay đổi). */
export const auditLogService = {
  list: crud.list,
  get: crud.get,
  async exportAll(query: Omit<AuditLogQuery, "page" | "pageSize"> = {}): Promise<AuditLog[]> {
    return (await apiClient.get<AuditLog[]>("/audit-logs/export", { params: query as Record<string, string> })).data;
  },
};
