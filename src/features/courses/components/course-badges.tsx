import { Badge, type BadgeColor } from "@/shared/ui";
import { COURSE_STATUS_LABELS, LESSON_STATUS_LABELS, type CourseStatus, type LessonStatus } from "../types";

const COURSE_COLOR: Record<CourseStatus, BadgeColor> = { draft: "warning", published: "success", archived: "gray" };
export function CourseStatusBadge({ status }: { status: CourseStatus }) {
  return <Badge color={COURSE_COLOR[status]}>{COURSE_STATUS_LABELS[status]}</Badge>;
}

const LESSON_COLOR: Record<LessonStatus, BadgeColor> = { draft: "warning", published: "success" };
export function LessonStatusBadge({ status }: { status: LessonStatus }) {
  return <Badge color={LESSON_COLOR[status]}>{LESSON_STATUS_LABELS[status]}</Badge>;
}
