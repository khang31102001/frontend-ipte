"use client";

import Link from "next/link";
import { ROUTES } from "@/core/config/routes";
import { CrudListPage, ExportCsvButton, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { JOURNEY_STAGE_LABELS, toOptions } from "@/shared/domain/pte";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDate } from "@/shared/lib/format";
import { useLookup } from "@/shared/lookups/use-lookup";
import { Avatar } from "@/shared/ui";
import { useDeleteStudent, useStudents } from "../hooks/use-students";
import { studentService } from "../services/student-service";
import { LEAD_SOURCE_LABELS, STUDENT_STATUS_LABELS, type Student, type StudentQuery } from "../types";
import { StageBadge, StudentStatusBadge } from "./stage-badge";

type FilterKey = "stage" | "status" | "source" | "assignedTo";

function useStudentsList(query: ListParams<FilterKey>) {
  return useStudents(query as StudentQuery);
}

const columns: Column<Student>[] = [
  {
    key: "fullName",
    header: "Học viên",
    sortKey: "fullName",
    className: "min-w-[200px]",
    cell: (s) => (
      <Link href={ROUTES.students.detail(s.id)} className="flex items-center gap-3 hover:text-brand-500">
        <Avatar name={s.fullName} />
        <span>
          <span className="block font-medium text-gray-800 dark:text-white/90">{s.fullName}</span>
          <span className="block text-theme-xs text-gray-500">{s.code}</span>
        </span>
      </Link>
    ),
  },
  {
    key: "contact",
    header: "Liên hệ",
    hideBelow: "md",
    cell: (s) => (
      <span>
        <span className="block">{s.phone}</span>
        <span className="block text-theme-xs text-gray-500">{s.email}</span>
      </span>
    ),
  },
  { key: "stage", header: "Giai đoạn", sortKey: "stage", cell: (s) => <StageBadge stage={s.stage} /> },
  {
    key: "target",
    header: "Mục tiêu",
    sortKey: "targetScore",
    hideBelow: "sm",
    cell: (s) =>
      s.targetScore ? (
        <span>
          <span className="block font-medium">PTE {s.targetScore}</span>
          <span className="block text-theme-xs text-gray-500">Hạn: {formatDate(s.examDeadline)}</span>
        </span>
      ) : (
        <span className="text-gray-400">Chưa có hồ sơ</span>
      ),
  },
  { key: "assignedTo", header: "Phụ trách", hideBelow: "lg", cell: (s) => s.assignedToName ?? "—" },
  { key: "source", header: "Nguồn", hideBelow: "lg", cell: (s) => LEAD_SOURCE_LABELS[s.source] },
  { key: "status", header: "Trạng thái", sortKey: "status", hideBelow: "md", cell: (s) => <StudentStatusBadge status={s.status} /> },
  { key: "createdAt", header: "Ngày tạo", sortKey: "createdAt", hideBelow: "lg", cell: (s) => formatDate(s.createdAt) },
];

const CSV_COLUMNS = [
  { header: "Mã HV", value: (s: Student) => s.code },
  { header: "Họ tên", value: (s: Student) => s.fullName },
  { header: "Email", value: (s: Student) => s.email },
  { header: "Điện thoại", value: (s: Student) => s.phone },
  { header: "Giai đoạn", value: (s: Student) => JOURNEY_STAGE_LABELS[s.stage] },
  { header: "Trạng thái", value: (s: Student) => STUDENT_STATUS_LABELS[s.status] },
  { header: "Nguồn", value: (s: Student) => LEAD_SOURCE_LABELS[s.source] },
  { header: "Điểm mục tiêu", value: (s: Student) => s.targetScore },
  { header: "Hạn chứng chỉ", value: (s: Student) => s.examDeadline },
  { header: "Phụ trách", value: (s: Student) => s.assignedToName },
  { header: "Ngày tạo", value: (s: Student) => formatDate(s.createdAt) },
];

export function StudentsListPage() {
  const staff = useLookup("staff");
  const filters: FilterDef<FilterKey>[] = [
    { key: "stage", label: "Giai đoạn", options: toOptions(JOURNEY_STAGE_LABELS) },
    { key: "status", label: "Trạng thái", options: toOptions(STUDENT_STATUS_LABELS) },
    { key: "source", label: "Nguồn", options: toOptions(LEAD_SOURCE_LABELS) },
    { key: "assignedTo", label: "Phụ trách", options: staff.options },
  ];

  return (
    <CrudListPage<Student, FilterKey>
      title="Học viên"
      description="Hồ sơ học viên, mục tiêu PTE và hành trình từ Lead đến Kết quả"
      resource="student"
      noun="học viên"
      useList={useStudentsList}
      useRemove={useDeleteStudent}
      columns={columns}
      filters={filters}
      defaultSort={{ sortBy: "createdAt", sortOrder: "desc" }}
      searchPlaceholder="Tìm theo tên, email, SĐT, mã HV…"
      getRowLabel={(s) => `${s.code} – ${s.fullName}`}
      createHref={ROUTES.students.create}
      viewHref={(s) => ROUTES.students.detail(s.id)}
      editHref={(s) => ROUTES.students.detail(s.id)}
      toolbarActions={(query) => (
        <ExportCsvButton<Student>
          permission="student.export"
          noun="học viên"
          filename="hoc-vien.csv"
          columns={CSV_COLUMNS}
          fetchRows={() => {
            const filters: StudentQuery = { ...(query as StudentQuery) };
            delete filters.page;
            delete filters.pageSize;
            return studentService.exportAll(filters);
          }}
        />
      )}
    />
  );
}
