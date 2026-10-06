"use client";

import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/core/config/routes";
import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { toOptions } from "@/shared/domain/pte";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { Badge } from "@/shared/ui";
import { useBranches, useDeleteBranch } from "../hooks/use-branches";
import { BRANCH_COUNTRY_LABELS, BRANCH_STATUS_LABELS, type Branch, type BranchQuery } from "../types";

type FilterKey = "country" | "status";

function useBranchesList(query: ListParams<FilterKey>) {
  return useBranches(query as BranchQuery);
}

const columns: Column<Branch>[] = [
  {
    key: "name",
    header: "Cơ sở",
    sortKey: "name",
    className: "min-w-[260px]",
    cell: (b) => (
      <Link href={ROUTES.branches.detail(b.id)} className="block hover:text-brand-500">
        <span className="block font-medium text-gray-800 dark:text-white/90">{b.name}</span>
        <span className="block text-theme-xs text-gray-500">{b.code}</span>
      </Link>
    ),
  },
  {
    key: "address",
    header: "Địa chỉ",
    hideBelow: "md",
    cell: (b) => (
      <span className="inline-flex items-start gap-1.5">
        <MapPin className="mt-0.5 size-3.5 shrink-0 text-gray-400" aria-hidden />
        <span>
          {b.address}
          <span className="block text-theme-xs text-gray-500">
            {b.city} · {BRANCH_COUNTRY_LABELS[b.country]}
          </span>
        </span>
      </span>
    ),
  },
  {
    key: "phone",
    header: "Liên hệ",
    hideBelow: "lg",
    cell: (b) => (
      <span className="inline-flex items-center gap-1.5">
        <Phone className="size-3.5 text-gray-400" aria-hidden />
        {b.phone}
      </span>
    ),
  },
  { key: "rooms", header: "Số phòng", align: "center", hideBelow: "sm", cell: (b) => b.roomCount },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (b) => <Badge color={b.status === "active" ? "success" : "gray"}>{BRANCH_STATUS_LABELS[b.status]}</Badge> },
];

export function BranchesListPage() {
  const filters: FilterDef<FilterKey>[] = [
    { key: "country", label: "Quốc gia", options: toOptions(BRANCH_COUNTRY_LABELS) },
    { key: "status", label: "Trạng thái", options: toOptions(BRANCH_STATUS_LABELS) },
  ];
  return (
    <CrudListPage<Branch, FilterKey>
      title="Cơ sở & phòng học"
      description="Các cơ sở tại Việt Nam và Úc, thông tin liên hệ và phòng học"
      resource="branch"
      noun="cơ sở"
      useList={useBranchesList}
      useRemove={useDeleteBranch}
      columns={columns}
      filters={filters}
      defaultSort={{ sortBy: "name", sortOrder: "asc" }}
      searchPlaceholder="Tìm theo tên, mã, địa chỉ…"
      getRowLabel={(b) => b.name}
      createHref={ROUTES.branches.create}
      viewHref={(b) => ROUTES.branches.detail(b.id)}
      editHref={(b) => ROUTES.branches.detail(b.id)}
    />
  );
}
