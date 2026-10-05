import type { BaseEntity, ListQuery } from "@/core/api";
import type { PteLevel, PteSkill, PteTargetScore, StudyMode } from "@/shared/domain/pte";

// ── Danh mục khóa học (theo level / điểm mục tiêu) ─────────────────────────
export interface CourseCategory extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  /** Danh mục cha (tối đa 2 cấp). */
  parentId?: string | null;
  parentName?: string;
  sortOrder: number;
  isActive: boolean;
  /** Số khóa học thuộc danh mục (API tính). */
  courseCount: number;
}

export interface CourseCategoryQuery extends ListQuery {
  isActive?: "true" | "false";
  parentId?: string;
}

// ── Khóa học ──────────────────────────────────────────────────────────────
export const COURSE_TYPES = ["preparation", "target_score", "intensive", "core", "one_on_one", "pronunciation"] as const;
export type CourseType = (typeof COURSE_TYPES)[number];
export const COURSE_TYPE_LABELS: Record<CourseType, string> = {
  preparation: "Nền tảng (Preparation)",
  target_score: "Luyện thi theo mục tiêu điểm",
  intensive: "Cấp tốc",
  core: "PTE Core",
  one_on_one: "Kèm 1-1",
  pronunciation: "Chuyên sâu phát âm",
};

export const COURSE_STATUSES = ["draft", "published", "archived"] as const;
export type CourseStatus = (typeof COURSE_STATUSES)[number];
export const COURSE_STATUS_LABELS: Record<CourseStatus, string> = {
  draft: "Nháp",
  published: "Đang mở",
  archived: "Lưu trữ",
};

export interface Course extends BaseEntity {
  code: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName?: string;
  type: CourseType;
  /** Điểm PTE mục tiêu của khóa (nếu theo điểm). */
  targetScore?: PteTargetScore;
  /** Trình độ đầu vào khuyến nghị. */
  entryLevel: PteLevel;
  mode: StudyMode;
  durationWeeks: number;
  sessionsCount: number;
  /** Học phí (VND). 0 = liên hệ tư vấn. */
  tuition: number;
  teacherIds: string[];
  teacherNames?: string[];
  summary: string;
  description?: string;
  outcomes: string[];
  audience: string[];
  status: CourseStatus;
  isFeatured: boolean;
  thumbnailUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  /** Số bài học (API tính). */
  lessonCount: number;
  /** Số học viên đang theo học (số liệu tham khảo). */
  enrolledCount: number;
}

export interface CourseQuery extends ListQuery {
  status?: CourseStatus;
  type?: CourseType;
  categoryId?: string;
  mode?: StudyMode;
  targetScore?: string;
  isFeatured?: "true" | "false";
}

// ── Bài học ───────────────────────────────────────────────────────────────
export const LESSON_TYPES = ["video", "live", "practice", "mock_test", "webinar"] as const;
export type LessonType = (typeof LESSON_TYPES)[number];
export const LESSON_TYPE_LABELS: Record<LessonType, string> = {
  video: "Video",
  live: "Buổi học live",
  practice: "Luyện tập",
  mock_test: "Thi thử",
  webinar: "Webinar",
};

export const LESSON_STATUSES = ["draft", "published"] as const;
export type LessonStatus = (typeof LESSON_STATUSES)[number];
export const LESSON_STATUS_LABELS: Record<LessonStatus, string> = { draft: "Nháp", published: "Đã đăng" };

export interface Lesson extends BaseEntity {
  courseId: string;
  title: string;
  /** Thứ tự trong khóa (1-based). */
  order: number;
  type: LessonType;
  /** Kỹ năng trọng tâm; để trống nếu tổng hợp. */
  skill?: PteSkill;
  durationMinutes: number;
  objectives?: string;
  status: LessonStatus;
  /** Số học liệu gắn với bài học (API tính). */
  materialCount: number;
}

export interface LessonQuery extends ListQuery {
  courseId?: string;
  type?: LessonType;
  status?: LessonStatus;
}
