"use client";

import Link from "next/link";
import { ROUTES } from "@/core/config/routes";
import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { PTE_LEVEL_LABELS, toOptions } from "@/shared/domain/pte";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { cn } from "@/shared/lib/cn";
import { formatDate } from "@/shared/lib/format";
import { Badge, type BadgeColor } from "@/shared/ui";
import { useDeleteLearningPath, useLearningPaths } from "../hooks/use-learning-paths";
import { PATH_STATUS_LABELS, type LearningPath, type LearningPathQuery, type PathStatus } from "../types";

type FilterKey = "status";

function usePathsList(query: ListParams<FilterKey>) {
  return useLearningPaths(query as LearningPathQuery);
}

const STATUS_COLOR: Record<PathStatus, BadgeColor> = { draft: "gray", active: "primary", paused: "warning", completed: "success" };

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${value}%` }} />
      </div>
      <span className="text-theme-xs text-gray-600">{value}%</span>
    </div>
  );
}

const columns: Column<LearningPath>[] = [
  {
    key: "title",
    header: "Lộ trình",
    sortKey: "title",
    className: "min-w-[260px]",
    cell: (p) => (
      <Link href={ROUTES.learningPaths.detail(p.id)} className="block hover:text-brand-500">
        <span className="block font-medium text-gray-800 dark:text-white/90">{p.title}</span>
        <span className="block text-theme-xs text-gray-500">
          {p.studentCode} · {p.studentName}
        </span>
      </Link>
    ),
  },
  {
    key: "levels",
    header: "Từ → Đến",
    hideBelow: "md",
    cell: (p) => (
      <span>
        {PTE_LEVEL_LABELS[p.currentLevel]} → <strong>PTE {p.targetScore}</strong>
      </span>
    ),
  },
  { key: "steps", header: "Số bước", align: "center", hideBelow: "lg", cell: (p) => p.steps.length },
  { key: "deadline", header: "Hạn chứng chỉ", sortKey: "deadline", hideBelow: "lg", cell: (p) => formatDate(p.deadline) },
  { key: "progress", header: "Tiến độ", sortKey: "progress", hideBelow: "sm", cell: (p) => <ProgressBar value={p.progress} /> },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (p) => <Badge color={STATUS_COLOR[p.status]}>{PATH_STATUS_LABELS[p.status]}</Badge> },
];

export function LearningPathsListPage() {
  const filters: FilterDef<FilterKey>[] = [{ key: "status", label: "Trạng thái", options: toOptions(PATH_STATUS_LABELS) }];
  return (
    <CrudListPage<LearningPath, FilterKey>
      title="Lộ trình học"
      description="Lộ trình cá nhân hóa theo trình độ hiện tại, điểm mục tiêu và hạn chứng chỉ"
      resource="learning_path"
      noun="lộ trình"
      useList={usePathsList}
      useRemove={useDeleteLearningPath}
      columns={columns}
      filters={filters}
      defaultSort={{ sortBy: "createdAt", sortOrder: "desc" }}
      searchPlaceholder="Tìm theo tên lộ trình, học viên…"
      getRowLabel={(p) => p.title}
      createHref={ROUTES.learningPaths.create}
      viewHref={(p) => ROUTES.learningPaths.detail(p.id)}
      editHref={(p) => ROUTES.learningPaths.detail(p.id)}
    />
  );
}
