"use client";

import Link from "next/link";
import { ROUTES } from "@/core/config/routes";
import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { CONTENT_STATUS_LABELS } from "@/shared/domain/content";
import { toOptions } from "@/shared/domain/pte";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDate } from "@/shared/lib/format";
import { Badge, ContentStatusBadge } from "@/shared/ui";
import { useDeletePage, usePages } from "../hooks/use-pages";
import { PAGE_TEMPLATE_LABELS, type CmsPage, type CmsPageQuery } from "../types";

type FilterKey = "status" | "template";

function usePagesList(query: ListParams<FilterKey>) {
  return usePages(query as CmsPageQuery);
}

const columns: Column<CmsPage>[] = [
  {
    key: "title",
    header: "Trang",
    sortKey: "title",
    className: "min-w-[240px]",
    cell: (p) => (
      <Link href={ROUTES.pages.detail(p.id)} className="block hover:text-brand-500">
        <span className="block font-medium text-gray-800 dark:text-white/90">{p.title}</span>
        <span className="block text-theme-xs text-gray-500">/{p.slug}</span>
      </Link>
    ),
  },
  { key: "template", header: "Loại", sortKey: "template", hideBelow: "md", cell: (p) => <Badge color="primary">{PAGE_TEMPLATE_LABELS[p.template]}</Badge> },
  { key: "sections", header: "Khối", align: "center", hideBelow: "lg", cell: (p) => (p.template === "landing" ? p.sections.length : "—") },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (p) => <ContentStatusBadge status={p.status} /> },
  { key: "publishedAt", header: "Ngày đăng", sortKey: "publishedAt", hideBelow: "lg", cell: (p) => formatDate(p.publishedAt) },
  { key: "updatedAt", header: "Cập nhật", sortKey: "updatedAt", hideBelow: "md", cell: (p) => formatDate(p.updatedAt) },
];

export function PagesListPage() {
  const filters: FilterDef<FilterKey>[] = [
    { key: "status", label: "Trạng thái", options: toOptions(CONTENT_STATUS_LABELS) },
    { key: "template", label: "Loại", options: toOptions(PAGE_TEMPLATE_LABELS) },
  ];
  return (
    <CrudListPage<CmsPage, FilterKey>
      title="Trang website"
      description="Landing page và trang tĩnh (giới thiệu, chính sách…)"
      resource="page"
      noun="trang"
      useList={usePagesList}
      useRemove={useDeletePage}
      columns={columns}
      filters={filters}
      defaultSort={{ sortBy: "updatedAt", sortOrder: "desc" }}
      searchPlaceholder="Tìm theo tiêu đề, slug…"
      getRowLabel={(p) => p.title}
      createHref={ROUTES.pages.create}
      viewHref={(p) => ROUTES.pages.detail(p.id)}
      editHref={(p) => ROUTES.pages.detail(p.id)}
    />
  );
}
