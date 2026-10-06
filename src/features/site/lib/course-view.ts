import type { PublicCourse } from "@/features/public-api";
import { STUDY_MODE_LABELS } from "@/shared/domain/pte";
import { courseHref } from "../config/routes";

const TYPE_LABELS: Record<PublicCourse["type"], string> = {
  preparation: "Nền tảng",
  target_score: "Theo mục tiêu điểm",
  intensive: "Cấp tốc",
  core: "PTE Core",
  one_on_one: "Kèm 1-1",
  pronunciation: "Phát âm",
};

/** Nhãn cấp độ ngắn gọn của khóa học, ví dụ "PTE 65+" hoặc "Kèm 1-1". */
export function courseLevelLabel(course: Pick<PublicCourse, "targetScore" | "type">): string {
  if (course.targetScore) return `PTE ${course.targetScore}+`;
  return TYPE_LABELS[course.type];
}

export const courseModeLabel = (mode: PublicCourse["mode"]) => STUDY_MODE_LABELS[mode];

/** Props cho `CourseCard` từ DTO khóa học. */
export function courseCardProps(course: PublicCourse) {
  return {
    href: courseHref(course),
    image: course.thumbnailUrl?.trim() ? course.thumbnailUrl : "/images/img-courses-deault.jpg",
    title: course.name,
    description: course.summary,
    level: courseLevelLabel(course),
    duration: `${course.durationWeeks} tuần`,
  };
}
