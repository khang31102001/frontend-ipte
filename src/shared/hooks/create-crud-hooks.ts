"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type { CrudService, ListQuery, PageResult } from "@/core/api";
import { createQueryKeys } from "@/core/query";
import { notifyApiError } from "@/shared/lib/notify";

interface MutationBehavior<TData> {
  /** Tắt toast mặc định (khi form tự hiển thị lỗi). */
  silent?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
}

export interface CrudHooksConfig<TEntity, TCreate, TUpdate, TQuery extends ListQuery> {
  /** Tên module, dùng làm query key gốc. */
  name: string;
  service: CrudService<TEntity, TCreate, TUpdate, TQuery>;
  /** Nhãn hiển thị trong toast, ví dụ "học viên". */
  label: string;
}

/**
 * Sinh bộ hook react-query chuẩn từ một CrudService:
 * list / detail / create / update / remove, tự invalidate và toast.
 * Feature chỉ cần gọi hàm này thay vì viết lại từng hook.
 */
export function createCrudHooks<
  TEntity,
  TCreate = Partial<TEntity>,
  TUpdate = Partial<TEntity>,
  TQuery extends ListQuery = ListQuery,
>({ name, service, label }: CrudHooksConfig<TEntity, TCreate, TUpdate, TQuery>) {
  const keys = createQueryKeys(name);

  function useList(
    query?: TQuery,
    options?: Omit<UseQueryOptions<PageResult<TEntity>>, "queryKey" | "queryFn">,
  ) {
    return useQuery({
      queryKey: keys.list(query),
      queryFn: ({ signal }) => service.list(query, { signal }),
      placeholderData: keepPreviousData,
      ...options,
    });
  }

  function useDetail(id: string | undefined, options?: Omit<UseQueryOptions<TEntity>, "queryKey" | "queryFn">) {
    return useQuery({
      queryKey: keys.detail(id ?? ""),
      queryFn: ({ signal }) => service.get(id as string, { signal }),
      enabled: Boolean(id),
      ...options,
    });
  }

  function notifyError(error: unknown, silent?: boolean) {
    if (!silent) notifyApiError(error);
  }

  function useCreate(behavior: MutationBehavior<TEntity> = {}) {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (input: TCreate) => service.create(input),
      onSuccess: (data) => {
        void qc.invalidateQueries({ queryKey: keys.lists() });
        if (!behavior.silent) toast.success(`Đã tạo ${label}`);
        behavior.onSuccess?.(data);
      },
      onError: (error) => {
        notifyError(error, behavior.silent);
        behavior.onError?.(error);
      },
    });
  }

  function useUpdate(behavior: MutationBehavior<TEntity> = {}) {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: ({ id, input }: { id: string; input: TUpdate }) => service.update(id, input),
      onSuccess: (data, vars) => {
        void qc.invalidateQueries({ queryKey: keys.lists() });
        qc.setQueryData(keys.detail(vars.id), data);
        if (!behavior.silent) toast.success(`Đã cập nhật ${label}`);
        behavior.onSuccess?.(data);
      },
      onError: (error) => {
        notifyError(error, behavior.silent);
        behavior.onError?.(error);
      },
    });
  }

  function useRemove(behavior: MutationBehavior<void> = {}) {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => service.remove(id),
      onSuccess: (_data, id) => {
        void qc.invalidateQueries({ queryKey: keys.lists() });
        qc.removeQueries({ queryKey: keys.detail(id) });
        if (!behavior.silent) toast.success(`Đã xóa ${label}`);
        behavior.onSuccess?.();
      },
      onError: (error) => {
        notifyError(error, behavior.silent);
        behavior.onError?.(error);
      },
    });
  }

  return { keys, useList, useDetail, useCreate, useUpdate, useRemove };
}
