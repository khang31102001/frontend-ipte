"use client";

import { useQuery } from "@tanstack/react-query";
import { lookupService, type LookupName } from "./lookup-service";

/** Danh sách lựa chọn cho select từ API lookup (cache 5 phút). */
export function useLookup(name: LookupName, params?: { q?: string; parentId?: string }) {
  const query = useQuery({
    queryKey: ["lookups", name, params ?? {}],
    queryFn: ({ signal }) => lookupService.options(name, params, signal),
    staleTime: 5 * 60_000,
  });
  return { options: query.data ?? [], isLoading: query.isLoading, error: query.error };
}
