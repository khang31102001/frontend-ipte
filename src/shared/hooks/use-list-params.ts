"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { DEFAULT_PAGE_SIZE, type ListQuery, type SortOrder } from "@/core/api";

export interface UseListParamsOptions<TFilterKey extends string> {
  /** Các key filter riêng của màn hình, được đồng bộ lên URL. */
  filterKeys?: readonly TFilterKey[];
  defaultPageSize?: number;
  defaultSort?: { sortBy: string; sortOrder: SortOrder };
}

export type ListParams<TFilterKey extends string> = ListQuery & Partial<Record<TFilterKey, string>>;

/**
 * Trạng thái danh sách (trang, cỡ trang, tìm kiếm, sắp xếp, filter) lưu trên URL:
 * chia sẻ được link, nút Back/Forward hoạt động, F5 không mất bộ lọc.
 */
export function useListParams<TFilterKey extends string = never>(
  options: UseListParamsOptions<TFilterKey> = {},
) {
  const { filterKeys = [] as unknown as readonly TFilterKey[], defaultPageSize = DEFAULT_PAGE_SIZE, defaultSort } = options;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const raw = searchParams.toString();

  const query = useMemo(() => {
    const sp = new URLSearchParams(raw);
    const page = Math.max(1, Number(sp.get("page")) || 1);
    const pageSize = Math.min(200, Math.max(1, Number(sp.get("pageSize")) || defaultPageSize));
    const sortBy = sp.get("sortBy") ?? defaultSort?.sortBy;
    const sortOrderRaw = sp.get("sortOrder");
    const sortOrder: SortOrder | undefined =
      sortOrderRaw === "asc" || sortOrderRaw === "desc" ? sortOrderRaw : defaultSort?.sortOrder;
    const result: Record<string, unknown> = { page, pageSize };
    const q = sp.get("q");
    if (q) result.q = q;
    if (sortBy) {
      result.sortBy = sortBy;
      if (sortOrder) result.sortOrder = sortOrder;
    }
    for (const key of filterKeys) {
      const v = sp.get(key);
      if (v) result[key] = v;
    }
    return result as ListParams<TFilterKey>;
    // filterKeys/defaultSort là hằng của màn hình
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw, defaultPageSize]);

  const update = useCallback(
    (patch: Record<string, string | number | undefined>, resetPage: boolean) => {
      const sp = new URLSearchParams(raw);
      for (const [k, v] of Object.entries(patch)) {
        if (v === undefined || v === "") sp.delete(k);
        else sp.set(k, String(v));
      }
      if (resetPage) sp.delete("page");
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [raw, router, pathname],
  );

  return {
    query,
    setPage: (page: number) => update({ page: page <= 1 ? undefined : page }, false),
    setPageSize: (pageSize: number) => update({ pageSize, page: undefined }, false),
    setSearch: (q: string) => update({ q: q.trim() || undefined }, true),
    setSort: (sortBy: string, sortOrder: SortOrder) => update({ sortBy, sortOrder }, true),
    setFilter: (key: TFilterKey, value: string | undefined) => update({ [key]: value }, true),
    reset: () => router.replace(pathname, { scroll: false }),
  };
}
