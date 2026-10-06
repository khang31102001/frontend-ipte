import { apiClient } from "@/core/api";
import type { Option } from "@/shared/domain/pte";

/**
 * Lookup: danh sách {value,label} nhẹ để đổ vào ô chọn (select) giữa các module,
 * tránh việc feature này phải import hook/service của feature khác.
 * Endpoint: GET /lookups/:name
 */
export const LOOKUP_NAMES = [
  "branches",
  "staff",
  "roles",
  "teachers",
  "courses",
  "course-categories",
  "article-categories",
  "tags",
  "lessons",
  "students",
] as const;
export type LookupName = (typeof LOOKUP_NAMES)[number];

export const lookupService = {
  async options(name: LookupName, params?: { q?: string; parentId?: string }, signal?: AbortSignal): Promise<Option[]> {
    const res = await apiClient.get<Option[]>(`/lookups/${name}`, { params, signal });
    return res.data;
  },
};
