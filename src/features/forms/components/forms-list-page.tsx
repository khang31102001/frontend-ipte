"use client";

import Link from "next/link";
import { ROUTES } from "@/core/config/routes";
import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { toOptions } from "@/shared/domain/pte";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDate } from "@/shared/lib/format";
import { Badge } from "@/shared/ui";
import { useDeleteForm, useForms } from "../hooks/use-forms";
import { FORM_STATUS_LABELS, FORM_TYPE_LABELS, type FormDefinition, type FormQuery } from "../types";

type FilterKey = "type" | "status";

function useFormsList(query: ListParams<FilterKey>) {
  return useForms(query as FormQuery);
}

const columns: Column<FormDefinition>[] = [
  {
    key: "name",
    header: "Biểu mẫu",
    sortKey: "name",
    className: "min-w-[240px]",
    cell: (f) => (
      <Link href={ROUTES.forms.detail(f.id)} className="block hover:text-brand-500">
        <span className="block font-medium text-gray-800 dark:text-white/90">{f.name}</span>
        <span className="block font-mono text-theme-xs text-gray-500">POST /public/forms/{f.slug}/submit</span>
      </Link>
    ),
  },
  { key: "type", header: "Loại", sortKey: "type", hideBelow: "md", cell: (f) => <Badge color="primary">{FORM_TYPE_LABELS[f.type]}</Badge> },
  { key: "fields", header: "Số trường", align: "center", hideBelow: "lg", cell: (f) => f.fields.length },
  { key: "submissions", header: "Lượt gửi", sortKey: "submissionCount", align: "center", cell: (f) => f.submissionCount },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (f) => <Badge color={f.status === "active" ? "success" : "gray"}>{FORM_STATUS_LABELS[f.status]}</Badge> },
  { key: "createdAt", header: "Ngày tạo", sortKey: "createdAt", hideBelow: "lg", cell: (f) => formatDate(f.createdAt) },
];

export function FormsListPage() {
  const filters: FilterDef<FilterKey>[] = [
    { key: "type", label: "Loại", options: toOptions(FORM_TYPE_LABELS) },
    { key: "status", label: "Trạng thái", options: toOptions(FORM_STATUS_LABELS) },
  ];
  return (
    <CrudListPage<FormDefinition, FilterKey>
      title="Biểu mẫu"
      description="Đăng ký học thử, tư vấn, đặt lịch test đầu vào, liên hệ… hiển thị trên website"
      resource="form"
      noun="biểu mẫu"
      useList={useFormsList}
      useRemove={useDeleteForm}
      columns={columns}
      filters={filters}
      defaultSort={{ sortBy: "createdAt", sortOrder: "desc" }}
      getRowLabel={(f) => f.name}
      createHref={ROUTES.forms.create}
      viewHref={(f) => ROUTES.forms.detail(f.id)}
      editHref={(f) => ROUTES.forms.detail(f.id)}
    />
  );
}
