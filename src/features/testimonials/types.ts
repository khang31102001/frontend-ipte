import type { BaseEntity, ListQuery } from "@/core/api";
import type { ContentStatus } from "@/shared/domain/content";

/** Câu chuyện thành công / cảm nhận học viên hiển thị trên website. */
export interface Testimonial extends BaseEntity {
  studentName: string;
  /** Ví dụ: "Du học Úc – từ PTE 36 lên 65". */
  headline: string;
  quote: string;
  avatarUrl?: string;
  scoreBefore?: number;
  scoreAfter: number;
  /** 1–5 */
  rating: number;
  courseId?: string;
  courseName?: string;
  videoUrl?: string;
  isFeatured: boolean;
  status: ContentStatus;
  sortOrder: number;
}

export interface TestimonialQuery extends ListQuery {
  status?: ContentStatus;
  courseId?: string;
  isFeatured?: "true" | "false";
}
