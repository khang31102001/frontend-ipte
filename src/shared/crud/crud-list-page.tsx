"use client";

import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import type { ApiMeta, ListQuery, SortOrder } from "@/core/api";
import { usePermissions, type Permission, type Resource } from "@/core/rbac";
import type { Option } from "@/shared/domain/pte";
import { DataTable, FilterDate, FilterSelect, ListToolbar, type Column } from "@/shared/data-table";
import { useListParams, type ListParams } from "@/shared/hooks/use-list-params";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { Button, ConfirmDialog, PageHeader, type Crumb } from "@/shared/ui";

export type FilterDef<K extends string> =
  | { key: K; label: string; type?: "select"; options: readonly Option[] }
  | { key: K; label: string; type: "date" };

interface ListResult<T> {
  data?: { items: T[]; meta: ApiMeta };
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  refetch: () => unknown;
}

export interface CrudListPageProps<T extends { id: string }, K extends string> {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  /** Resource RBAC: view/create/edit/delete được kiểm tra tự động. */
  resource: Resource;
  /** Danh từ dùng trong thông báo, ví dụ "học viên". */
  noun: string;
  useList: (query: ListParams<K>) => ListResult<T>;
  /** Bỏ qua với danh sách chỉ đọc (không có nút Xóa). */
  useRemove?: () => { mutate: (id: string, options?: { onSuccess?: () => void }) => void; isPending: boolean };
  columns: readonly Column<T>[];
  filters?: readonly FilterDef<K>[];
  defaultSort?: { sortBy: string; sortOrder: SortOrder };
  searchPlaceholder?: string;
  /** Tắt ô tìm kiếm cho danh sách không hỗ trợ `q`. */
  hideSearch?: boolean;
  getRowLabel: (row: T) => string;
  createHref?: string;
  onCreate?: () => void;
  createLabel?: string;
  viewHref?: (row: T) => string;
  /** Mở xem nhanh (dialog) thay vì chuyển trang. */
  onView?: (row: T) => void;
  editHref?: (row: T) => string;
  onEdit?: (row: T) => void;
  canDelete?: (row: T) => boolean;
  /** Nhúng trong trang khác (tab): tiêu đề nhỏ thay cho PageHeader. */
  embedded?: boolean;
  /** Tham số cố định luôn gửi kèm (ví dụ { courseId }) và không hiện trên URL. */
  fixedQuery?: Record<string, string | number | undefined>;
  headerActions?: ReactNode;
  /** Nút phụ cạnh thanh tìm kiếm (ví dụ xuất file); nhận bộ lọc hiện tại. */
  toolbarActions?: (query: ListParams<K>) => ReactNode;
  emptyDescription?: ReactNode;
}

/** Hook thay thế khi danh sách chỉ đọc. */
const useNoopRemove = () => ({ mutate: (_id: string, _options?: { onSuccess?: () => void }) => undefined, isPending: false });

const perm = (resource: Resource, action: string) => `${resource}.${action}` as Permission;

function IconAction({ label, onClick, href, danger, children }: { label: string; onClick?: () => void; href?: string; danger?: boolean; children: ReactNode }) {
  const cls = `inline-flex size-8 items-center justify-center rounded-lg transition ${
    danger ? "text-gray-500 hover:bg-error-50 hover:text-error-600" : "text-gray-500 hover:bg-gray-100 hover:text-brand-500"
  }`;
  if (href) {
    return (
      <Link href={href} aria-label={label} title={label} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/**
 * Trang danh sách CRUD chuẩn: tìm kiếm, lọc, sắp xếp, phân trang (đồng bộ URL),
 * thao tác xem/sửa/xóa theo quyền, xác nhận xóa, các trạng thái tải/lỗi/rỗng.
 */
export function CrudListPage<T extends { id: string }, K extends string = never>(props: CrudListPageProps<T, K>) {
  const {
    title,
    description,
    breadcrumbs,
    resource,
    noun,
    useList,
    useRemove,
    columns,
    filters,
    defaultSort,
    searchPlaceholder,
    hideSearch,
    getRowLabel,
    createHref,
    onCreate,
    createLabel,
    viewHref,
    onView,
    editHref,
    onEdit,
    canDelete,
    embedded,
    fixedQuery,
    headerActions,
    toolbarActions,
    emptyDescription,
  } = props;

  const { can } = usePermissions();
  const params = useListParams<K>({ filterKeys: filters?.map((f) => f.key), defaultSort });
  const query = useMemo(() => ({ ...params.query, ...fixedQuery }) as ListParams<K>, [params.query, fixedQuery]);
  const list = useList(query);
  const remove = (useRemove ?? useNoopRemove)();
  const [pendingDelete, setPendingDelete] = useState<T | null>(null);

  const canView = can(perm(resource, "view"));
  const canCreate = can(perm(resource, "create"));
  const canEdit = can(perm(resource, "edit"));
  const canRemove = Boolean(useRemove) && can(perm(resource, "delete"));

  const hasRowActions = Boolean(viewHref) || Boolean(onView) || (Boolean(editHref || onEdit) && canEdit) || canRemove;

  const headerActionsNode = (
    <>
      {headerActions}
      {canCreate && (createHref || onCreate) && (
        createHref ? (
          <Link href={createHref}>
            <Button size={embedded ? "sm" : "md"} startIcon={<Plus className="size-4" />}>
              {createLabel ?? `Thêm ${noun}`}
            </Button>
          </Link>
        ) : (
          <Button size={embedded ? "sm" : "md"} startIcon={<Plus className="size-4" />} onClick={onCreate}>
            {createLabel ?? `Thêm ${noun}`}
          </Button>
        )
      )}
    </>
  );

  return (
    <RequirePermission permission={perm(resource, "view")}>
      {embedded ? (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">{title}</h3>
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </div>
          <div className="flex items-center gap-2">{headerActionsNode}</div>
        </div>
      ) : (
        <PageHeader title={title} description={description} breadcrumbs={breadcrumbs} actions={headerActionsNode} />
      )}

      <ListToolbar
        search={(query as ListQuery).q}
        onSearchChange={hideSearch ? undefined : params.setSearch}
        searchPlaceholder={searchPlaceholder}
        actions={toolbarActions?.(query)}
        filters={filters?.map((f) =>
          f.type === "date" ? (
            <FilterDate
              key={f.key}
              label={f.label}
              value={(query as Record<string, string | undefined>)[f.key]}
              onChange={(v) => params.setFilter(f.key, v)}
            />
          ) : (
            <FilterSelect
              key={f.key}
              label={f.label}
              value={(query as Record<string, string | undefined>)[f.key]}
              onChange={(v) => params.setFilter(f.key, v)}
              options={f.options}
            />
          ),
        )}
      />

      <DataTable
        caption={title}
        columns={columns}
        rows={list.data?.items}
        getRowKey={(r) => r.id}
        isLoading={list.isLoading}
        isFetching={list.isFetching}
        error={list.error}
        onRetry={() => void list.refetch()}
        sort={{ sortBy: query.sortBy, sortOrder: query.sortOrder }}
        onSortChange={params.setSort}
        meta={list.data?.meta}
        onPageChange={params.setPage}
        onPageSizeChange={params.setPageSize}
        emptyTitle={query.q ? "Không tìm thấy kết quả phù hợp" : `Chưa có ${noun}`}
        emptyDescription={query.q ? "Thử đổi từ khóa hoặc bỏ bớt bộ lọc." : emptyDescription}
        emptyAction={
          canCreate && !query.q && (createHref || onCreate) ? (
            createHref ? (
              <Link href={createHref}>
                <Button size="sm" startIcon={<Plus className="size-4" />}>{createLabel ?? `Thêm ${noun}`}</Button>
              </Link>
            ) : (
              <Button size="sm" startIcon={<Plus className="size-4" />} onClick={onCreate}>
                {createLabel ?? `Thêm ${noun}`}
              </Button>
            )
          ) : undefined
        }
        rowActions={
          hasRowActions && canView
            ? (row) => (
                <div className="inline-flex items-center gap-0.5">
                  {onView && (
                    <IconAction label={`Xem ${noun}`} onClick={() => onView(row)}>
                      <Eye className="size-4" />
                    </IconAction>
                  )}
                  {viewHref && (
                    <IconAction label={`Xem ${noun}`} href={viewHref(row)}>
                      <Eye className="size-4" />
                    </IconAction>
                  )}
                  {canEdit && (editHref || onEdit) && (
                    <IconAction label={`Sửa ${noun}`} href={editHref?.(row)} onClick={onEdit ? () => onEdit(row) : undefined}>
                      <Pencil className="size-4" />
                    </IconAction>
                  )}
                  {canRemove && (canDelete ? canDelete(row) : true) && (
                    <IconAction label={`Xóa ${noun}`} danger onClick={() => setPendingDelete(row)}>
                      <Trash2 className="size-4" />
                    </IconAction>
                  )}
                </div>
              )
            : undefined
        }
      />

      <ConfirmDialog
        open={pendingDelete !== null}
        destructive
        title={`Xóa ${noun}?`}
        description={pendingDelete ? `Bạn sắp xóa "${getRowLabel(pendingDelete)}". Thao tác này không thể hoàn tác.` : undefined}
        confirmLabel="Xóa"
        loading={remove.isPending}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) remove.mutate(pendingDelete.id, { onSuccess: () => setPendingDelete(null) });
        }}
      />
    </RequirePermission>
  );
}
