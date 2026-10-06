import type { BaseEntity, ListQuery } from "@/core/api";
import type { PteSkill, QuestionType } from "@/shared/domain/pte";

export const MATERIAL_TYPES = ["video", "pdf", "document", "link", "worksheet"] as const;
export type MaterialType = (typeof MATERIAL_TYPES)[number];
export const MATERIAL_TYPE_LABELS: Record<MaterialType, string> = {
  video: "Video",
  pdf: "PDF",
  document: "Tài liệu",
  link: "Liên kết",
  worksheet: "Worksheet",
};

export const MATERIAL_VISIBILITIES = ["public", "enrolled", "staff"] as const;
export type MaterialVisibility = (typeof MATERIAL_VISIBILITIES)[number];
export const MATERIAL_VISIBILITY_LABELS: Record<MaterialVisibility, string> = {
  public: "Công khai (lead magnet)",
  enrolled: "Học viên đã ghi danh",
  staff: "Nội bộ",
};

export const MATERIAL_STATUSES = ["draft", "published"] as const;
export type MaterialStatus = (typeof MATERIAL_STATUSES)[number];
export const MATERIAL_STATUS_LABELS: Record<MaterialStatus, string> = { draft: "Nháp", published: "Đã đăng" };

export interface LearningMaterial extends BaseEntity {
  title: string;
  type: MaterialType;
  url: string;
  description?: string;
  skill?: PteSkill;
  questionType?: QuestionType;
  courseId?: string;
  courseName?: string;
  lessonId?: string;
  lessonTitle?: string;
  /** Dung lượng (KB) với tệp. */
  fileSizeKb?: number;
  /** Thời lượng (giây) với video. */
  durationSeconds?: number;
  tags: string[];
  visibility: MaterialVisibility;
  status: MaterialStatus;
}

export interface MaterialQuery extends ListQuery {
  type?: MaterialType;
  skill?: PteSkill;
  courseId?: string;
  lessonId?: string;
  visibility?: MaterialVisibility;
  status?: MaterialStatus;
}
