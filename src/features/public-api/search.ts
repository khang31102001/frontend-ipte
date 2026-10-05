"use client";
import { apiClient } from "@/core/api";
import type { PublicCourse } from "./types";

export interface CourseSearchResult {
  items: PublicCourse[];
  total: number;
}

/** Tìm khóa học (client) cho ô tìm kiếm trên header: GET /public/courses?q= */
export async function searchCourses(q: string, options: { pageSize?: number; signal?: AbortSignal } = {}): Promise<CourseSearchResult> {
  const res = await apiClient.get<PublicCourse[]>("/public/courses", {
    params: { q, page: 1, pageSize: options.pageSize ?? 6 },
    signal: options.signal,
  });
  return { items: res.data, total: res.meta?.total ?? res.data.length };
}
