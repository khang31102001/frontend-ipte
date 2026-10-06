"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { isApiError } from "@/core/api";
import { Can, type Permission, type Resource } from "@/core/rbac";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { Button, ConfirmDialog, ErrorState, PageHeader, Skeleton } from "@/shared/ui";

interface EntityQuery<T> {
  data?: T;
  isLoading: boolean;
  error: unknown;
  refetch: () => unknown;
}

export interface EntityDetailPageProps<T extends { id: string }> {
  id: string;
  resource: Resource;
  /** Danh từ trong thông báo, ví dụ "học viên". */
  noun: string;
  listHref: string;
  listLabel: string;
  useEntity: (id: string) => EntityQuery<T>;
  useRemove: () => { mutate: (id: string, options?: { onSuccess?: () => void }) => void; isPending: boolean };
  title: (entity?: T) => string;
  /** Mục cuối của breadcrumb. */
  crumb: (entity?: T) => string;
  description?: (entity?: T) => ReactNode;
  /** Nút phụ cạnh nút Xóa. */
  headerActions?: (entity?: T) => ReactNode;
  deleteDescription?: (entity: T) => string;
  children: (entity: T) => ReactNode;
}

/**
 * Khung trang chi tiết chuẩn: kiểm tra quyền xem, tải bản ghi (loading/lỗi/không tìm thấy),
 * nút Xóa theo quyền có xác nhận rồi quay về danh sách. Nội dung riêng của feature đặt trong `children`.
 */
export function EntityDetailPage<T extends { id: string }>({
  id,
  resource,
  noun,
  listHref,
  listLabel,
  useEntity,
  useRemove,
  title,
  crumb,
  description,
  headerActions,
  deleteDescription,
  children,
}: EntityDetailPageProps<T>) {
  const router = useRouter();
  const { data: entity, isLoading, error, refetch } = useEntity(id);
  const remove = useRemove();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <RequirePermission permission={`${resource}.view` as Permission}>
      <PageHeader
        title={title(entity)}
        description={description?.(entity)}
        breadcrumbs={[{ label: listLabel, href: listHref }, { label: crumb(entity) }]}
        actions={
          <>
            {headerActions?.(entity)}
            <Can permission={`${resource}.delete` as Permission}>
              <Button variant="outline" size="sm" startIcon={<Trash2 className="size-4" />} onClick={() => setConfirmOpen(true)}>
                Xóa
              </Button>
            </Can>
          </>
        }
      />

      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : error || !entity ? (
        <ErrorState title={isApiError(error) && error.isNotFound ? `Không tìm thấy ${noun}` : undefined} onRetry={() => void refetch()} />
      ) : (
        children(entity)
      )}

      <ConfirmDialog
        open={confirmOpen}
        destructive
        title={`Xóa ${noun}?`}
        description={entity ? (deleteDescription?.(entity) ?? `Bạn sắp xóa "${title(entity)}". Thao tác này không thể hoàn tác.`) : undefined}
        confirmLabel="Xóa"
        loading={remove.isPending}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => remove.mutate(id, { onSuccess: () => router.replace(listHref) })}
      />
    </RequirePermission>
  );
}
