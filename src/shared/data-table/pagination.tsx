"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { ReactNode } from "react";
import { PAGE_SIZE_OPTIONS, type ApiMeta } from "@/core/api";
import { cn } from "@/shared/lib/cn";

function PageButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex size-8 items-center justify-center rounded-lg border transition focus-visible:ring-2 focus-visible:ring-brand-500/30 focus-visible:outline-hidden",
        disabled
          ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300 dark:border-gray-800 dark:bg-gray-900"
          : "border-gray-200 bg-white text-gray-600 hover:border-brand-300 hover:bg-brand-25 hover:text-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
      )}
    >
      {children}
    </button>
  );
}

export interface PaginationProps {
  meta: ApiMeta;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: readonly number[];
}

export function Pagination({ meta, onPageChange, onPageSizeChange, pageSizeOptions = PAGE_SIZE_OPTIONS }: PaginationProps) {
  const { page, pageSize, total } = meta;
  const totalPages = Math.max(1, meta.totalPages || Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:text-gray-400">
      <div className="flex flex-wrap items-center gap-3">
        {onPageSizeChange && (
          <label className="flex items-center gap-2">
            <span className="text-theme-xs sm:text-sm">Số dòng</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-8 rounded-lg border border-gray-200 bg-white px-2 text-sm focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900"
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        )}
        <span className="text-theme-xs sm:text-sm">
          {start}–{end} / {total}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <PageButton label="Trang đầu" disabled={!canPrev} onClick={() => onPageChange(1)}>
          <ChevronsLeft className="size-4" />
        </PageButton>
        <PageButton label="Trang trước" disabled={!canPrev} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft className="size-4" />
        </PageButton>
        <span className="px-2 text-theme-xs sm:text-sm">
          Trang <strong>{page}</strong> / {totalPages}
        </span>
        <PageButton label="Trang sau" disabled={!canNext} onClick={() => onPageChange(page + 1)}>
          <ChevronRight className="size-4" />
        </PageButton>
        <PageButton label="Trang cuối" disabled={!canNext} onClick={() => onPageChange(totalPages)}>
          <ChevronsRight className="size-4" />
        </PageButton>
      </div>
    </div>
  );
}
