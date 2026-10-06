"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/core/config/routes";
import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { PTE_TARGET_SCORES, STUDY_MODE_LABELS, toOptions } from "@/shared/domain/pte";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatNumber, formatVnd } from "@/shared/lib/format";
import { useLookup } from "@/shared/lookups/use-lookup";
import { useCourses, useDeleteCourse } from "../hooks/use-courses";
import { COURSE_STATUS_LABELS, COURSE_TYPE_LABELS, type Course, type CourseQuery } from "../types";
import { CourseStatusBadge } from "./course-badges";

type FilterKey = "status" | "type" | "categoryId" | "mode" | "targetScore";

function useCoursesList(query: ListParams<FilterKey>) {
  return useCourses(query as CourseQuery);
}

const columns: Column<Course>[] = [
  {
    key: "name",
    header: "Khóa học",
    sortKey: "name",
    className: "min-w-[240px]",
    cell: (c) => (
      <Link href={ROUTES.courses.detail(c.id)} className="block hover:text-brand-500">
        <span className="flex items-center gap-1.5 font-medium text-gray-800 dark:text-white/90">
          {c.name}
          {c.isFeatured && <Star className="size-3.5 fill-warning-500 text-warning-500" aria-label="Nổi bật" />}
        </span>
        <span className="block text-theme-xs text-gray-500">
          {c.code} · {c.categoryName ?? "—"}
        </span>
      </Link>
    ),
  },
  { key: "type", header: "Loại", hideBelow: "lg", cell: (c) => COURSE_TYPE_LABELS[c.type] },
  {
    key: "target",
    header: "Mục tiêu",
    sortKey: "targetScore",
    hideBelow: "sm",
    cell: (c) => (c.targetScore ? `PTE ${c.targetScore}` : "—"),
  },
  {
    key: "duration",
    header: "Thời lượng",
    sortKey: "durationWeeks",
    hideBelow: "md",
    cell: (c) => (
      <span>
        {c.durationWeeks} tuần
        <span className="block text-theme-xs text-gray-500">
          {c.sessionsCount} buổi · {STUDY_MODE_LABELS[c.mode]}
        </span>
      </span>
    ),
  },
  { key: "tuition", header: "Học phí", sortKey: "tuition", align: "right", cell: (c) => (c.tuition > 0 ? formatVnd(c.tuition) : <span className="text-gray-400">Liên hệ</span>) },
  { key: "lessons", header: "Bài học", sortKey: "lessonCount", align: "center", hideBelow: "lg", cell: (c) => formatNumber(c.lessonCount) },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (c) => <CourseStatusBadge status={c.status} /> },
];

export function CoursesListPage() {
  const categories = useLookup("course-categories");
  const filters: FilterDef<FilterKey>[] = [
    { key: "status", label: "Trạng thái", options: toOptions(COURSE_STATUS_LABELS) },
    { key: "type", label: "Loại", options: toOptions(COURSE_TYPE_LABELS) },
    { key: "categoryId", label: "Danh mục", options: categories.options },
    { key: "mode", label: "Hình thức", options: toOptions(STUDY_MODE_LABELS) },
    { key: "targetScore", label: "Mục tiêu", options: PTE_TARGET_SCORES.map((s) => ({ value: String(s), label: `PTE ${s}` })) },
  ];
  return (
    <CrudListPage<Course, FilterKey>
      title="Khóa học"
      description="Danh mục khóa học: Preparation, PTE 30–79, Core, kèm 1-1, cấp tốc…"
      resource="course"
      noun="khóa học"
      useList={useCoursesList}
      useRemove={useDeleteCourse}
      columns={columns}
      filters={filters}
      defaultSort={{ sortBy: "createdAt", sortOrder: "desc" }}
      searchPlaceholder="Tìm theo tên, mã khóa học…"
      getRowLabel={(c) => `${c.code} – ${c.name}`}
      createHref={ROUTES.courses.create}
      viewHref={(c) => ROUTES.courses.detail(c.id)}
      editHref={(c) => ROUTES.courses.detail(c.id)}
    />
  );
}
