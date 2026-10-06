"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import type { ReactNode } from "react";
import type { ApiMeta, SortOrder } from "@/core/api";
import { getErrorMessage } from "@/core/api";
import { cn } from "@/shared/lib/cn";
import { EmptyState, ErrorState, Skeleton } from "@/shared/ui";
import { Pagination } from "./pagination";

export interface Column<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  /** Có giá trị ⇒ cột sắp xếp được, gửi lên API dưới dạng `sortBy`. */
  sortKey?: string;
  align?: "left" | "center" | "right";
  className?: string;
  /** Ẩn cột dưới breakpoint này (responsive). */
  hideBelow?: "sm" | "md" | "lg" | "xl";
}

export interface DataTableProps<T> {
  columns: readonly Column<T>[];
  rows: readonly T[] | undefined;
  getRowKey: (row: T) => string;
  caption?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  error?: unknown;
  onRetry?: () => void;
  sort?: { sortBy?: string; sortOrder?: SortOrder };
  onSortChange?: (sortBy: string, sortOrder: SortOrder) => void;
  meta?: ApiMeta;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onRowClick?: (row: T) => void;
  /** Cột thao tác cuối dòng. */
  rowActions?: (row: T) => ReactNode;
  emptyTitle?: string;
  emptyDescription?: ReactNode;
  emptyAction?: ReactNode;
}

const hideClass = { sm: "hidden sm:table-cell", md: "hidden md:table-cell", lg: "hidden lg:table-cell", xl: "hidden xl:table-cell" } as const;
const alignClass = { left: "text-left", center: "text-center", right: "text-right" } as const;

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  caption,
  isLoading,
  isFetching,
  error,
  onRetry,
  sort,
  onSortChange,
  meta,
  onPageChange,
  onPageSizeChange,
  onRowClick,
  rowActions,
  emptyTitle,
  emptyDescription,
  emptyAction,
}: DataTableProps<T>) {
  const colCount = columns.length + (rowActions ? 1 : 0);

  function toggleSort(sortKey: string) {
    if (!onSortChange) return;
    const next: SortOrder = sort?.sortBy === sortKey && sort.sortOrder === "asc" ? "desc" : "asc";
    onSortChange(sortKey, next);
  }

  let body: ReactNode;
  if (isLoading) {
    body = Array.from({ length: 6 }).map((_, i) => (
      <tr key={i} aria-hidden>
        {Array.from({ length: colCount }).map((__, j) => (
          <td key={j} className="px-4 py-3.5">
            <Skeleton className="h-4 w-full max-w-[160px]" />
          </td>
        ))}
      </tr>
    ));
  } else if (error) {
    body = (
      <tr>
        <td colSpan={colCount}>
          <ErrorState description={getErrorMessage(error)} onRetry={onRetry} />
        </td>
      </tr>
    );
  } else if (!rows || rows.length === 0) {
    body = (
      <tr>
        <td colSpan={colCount}>
          <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
        </td>
      </tr>
    );
  } else {
    body = rows.map((row) => (
      <tr
        key={getRowKey(row)}
        onClick={onRowClick ? () => onRowClick(row) : undefined}
        className={cn(
          "border-t border-gray-100 transition-colors dark:border-gray-800",
          onRowClick && "cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.03]",
        )}
      >
        {columns.map((col) => (
          <td
            key={col.key}
            className={cn(
              "px-4 py-3.5 align-middle text-sm text-gray-700 dark:text-gray-300",
              alignClass[col.align ?? "left"],
              col.hideBelow && hideClass[col.hideBelow],
              col.className,
            )}
          >
            {col.cell(row)}
          </td>
        ))}
        {rowActions && (
          <td className="px-4 py-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
            {rowActions(row)}
          </td>
        )}
      </tr>
    ));
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className={cn("overflow-x-auto transition-opacity", isFetching && !isLoading && "opacity-70")}>
        <table className="min-w-full">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="bg-gray-50 dark:bg-white/[0.02]">
            <tr>
              {columns.map((col) => {
                const sorted = col.sortKey && sort?.sortBy === col.sortKey ? sort.sortOrder : undefined;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined}
                    className={cn(
                      "px-4 py-3 text-theme-xs font-medium tracking-wide text-gray-500 uppercase",
                      alignClass[col.align ?? "left"],
                      col.hideBelow && hideClass[col.hideBelow],
                    )}
                  >
                    {col.sortKey && onSortChange ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col.sortKey as string)}
                        className="inline-flex items-center gap-1 uppercase hover:text-gray-800 dark:hover:text-gray-200"
                      >
                        {col.header}
                        {sorted === "asc" ? (
                          <ArrowUp className="size-3.5" />
                        ) : sorted === "desc" ? (
                          <ArrowDown className="size-3.5" />
                        ) : (
                          <ChevronsUpDown className="size-3.5 opacity-50" />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
              {rowActions && <th scope="col" className="px-4 py-3 text-right text-theme-xs font-medium text-gray-500 uppercase">Thao tác</th>}
            </tr>
          </thead>
          <tbody>{body}</tbody>
        </table>
      </div>
      {meta && onPageChange && !error && !isLoading && meta.total > 0 && (
        <Pagination meta={meta} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} />
      )}
    </div>
  );
}
