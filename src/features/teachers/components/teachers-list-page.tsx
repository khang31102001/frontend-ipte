"use client";

import Link from "next/link";
import { ROUTES } from "@/core/config/routes";
import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { PTE_SKILLS, PTE_SKILL_LABELS, toOptions } from "@/shared/domain/pte";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { useLookup } from "@/shared/lookups/use-lookup";
import { Avatar, Badge, type BadgeColor } from "@/shared/ui";
import { useDeleteTeacher, useTeachers } from "../hooks/use-teachers";
import { TEACHER_STATUS_LABELS, type Teacher, type TeacherQuery, type TeacherStatus } from "../types";

type FilterKey = "status" | "branchId" | "specialty";

function useTeachersList(query: ListParams<FilterKey>) {
  return useTeachers(query as TeacherQuery);
}

const STATUS_COLOR: Record<TeacherStatus, BadgeColor> = { active: "success", on_leave: "warning", inactive: "gray" };

export function TeacherStatusBadge({ status }: { status: TeacherStatus }) {
  return <Badge color={STATUS_COLOR[status]}>{TEACHER_STATUS_LABELS[status]}</Badge>;
}

const columns: Column<Teacher>[] = [
  {
    key: "fullName",
    header: "Giáo viên",
    sortKey: "fullName",
    className: "min-w-[220px]",
    cell: (t) => (
      <Link href={ROUTES.teachers.detail(t.id)} className="flex items-center gap-3 hover:text-brand-500">
        <Avatar name={t.fullName} src={t.avatarUrl} />
        <span>
          <span className="block font-medium text-gray-800 dark:text-white/90">{t.fullName}</span>
          <span className="block text-theme-xs text-gray-500">
            {t.code} · {t.headline ?? t.email}
          </span>
        </span>
      </Link>
    ),
  },
  { key: "pte", header: "PTE", sortKey: "pteScore", align: "center", hideBelow: "sm", cell: (t) => t.pteScore ?? "—" },
  { key: "exp", header: "Kinh nghiệm", sortKey: "yearsExperience", hideBelow: "md", cell: (t) => `${t.yearsExperience} năm` },
  {
    key: "specialties",
    header: "Chuyên môn",
    hideBelow: "lg",
    cell: (t) => (
      <span className="flex flex-wrap gap-1">
        {t.specialties.length ? t.specialties.map((s) => <Badge key={s} color="primary">{PTE_SKILL_LABELS[s]}</Badge>) : "—"}
      </span>
    ),
  },
  { key: "branch", header: "Cơ sở", hideBelow: "lg", cell: (t) => t.branchName ?? "—" },
  { key: "courses", header: "Khóa phụ trách", align: "center", hideBelow: "md", cell: (t) => t.courses.length },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (t) => <TeacherStatusBadge status={t.status} /> },
];

export function TeachersListPage() {
  const branches = useLookup("branches");
  const filters: FilterDef<FilterKey>[] = [
    { key: "status", label: "Trạng thái", options: toOptions(TEACHER_STATUS_LABELS) },
    { key: "specialty", label: "Chuyên môn", options: PTE_SKILLS.map((s) => ({ value: s, label: PTE_SKILL_LABELS[s] })) },
    { key: "branchId", label: "Cơ sở", options: branches.options },
  ];
  return (
    <CrudListPage<Teacher, FilterKey>
      title="Giáo viên"
      description="Hồ sơ giáo viên, chuyên môn, lịch rảnh và khóa học đang phụ trách"
      resource="teacher"
      noun="giáo viên"
      useList={useTeachersList}
      useRemove={useDeleteTeacher}
      columns={columns}
      filters={filters}
      defaultSort={{ sortBy: "fullName", sortOrder: "asc" }}
      searchPlaceholder="Tìm theo tên, email, mã GV…"
      getRowLabel={(t) => `${t.code} – ${t.fullName}`}
      createHref={ROUTES.teachers.create}
      viewHref={(t) => ROUTES.teachers.detail(t.id)}
      editHref={(t) => ROUTES.teachers.detail(t.id)}
    />
  );
}
