"use client";

import { CrudListPage, ExportCsvButton, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { toOptions } from "@/shared/domain/pte";
import { Form, FormModal, createFormFields, useEntityForm } from "@/shared/form";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDateTime } from "@/shared/lib/format";
import { useLookup } from "@/shared/lookups/use-lookup";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { Avatar, Badge, Button, type BadgeColor } from "@/shared/ui";
import { useCreateUser, useDeleteUser, useResetUserPassword, useUpdateUser, useUsers } from "../hooks/use-users";
import { userSchema, type UserFormValues } from "../schemas";
import { userService, type UserWithTemporaryPassword } from "../services/user-service";
import { TempPasswordDialog } from "./temp-password-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { USER_STATUS_LABELS, type User, type UserQuery, type UserStatus } from "../types";

const F = createFormFields<UserFormValues>();

type FilterKey = "roleId" | "status" | "branchId";

function useUsersList(query: ListParams<FilterKey>) {
  return useUsers(query as UserQuery);
}

const STATUS_COLOR: Record<UserStatus, BadgeColor> = { active: "success", inactive: "gray", locked: "error" };

const columns: Column<User>[] = [
  {
    key: "fullName",
    header: "Người dùng",
    sortKey: "fullName",
    className: "min-w-[240px]",
    cell: (u) => (
      <span className="flex items-center gap-3">
        <Avatar name={u.fullName} src={u.avatarUrl} />
        <span>
          <span className="block font-medium text-gray-800 dark:text-white/90">{u.fullName}</span>
          <span className="block text-theme-xs text-gray-500">{u.email}</span>
        </span>
      </span>
    ),
  },
  { key: "role", header: "Vai trò", hideBelow: "sm", cell: (u) => <Badge color="primary">{u.roleName}</Badge> },
  { key: "phone", header: "Điện thoại", hideBelow: "lg", cell: (u) => u.phone ?? "—" },
  { key: "lastLoginAt", header: "Đăng nhập gần nhất", sortKey: "lastLoginAt", hideBelow: "lg", cell: (u) => formatDateTime(u.lastLoginAt) },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (u) => <Badge color={STATUS_COLOR[u.status]}>{USER_STATUS_LABELS[u.status]}</Badge> },
];

const CSV_COLUMNS = [
  { header: "Họ tên", value: (u: User) => u.fullName },
  { header: "Email", value: (u: User) => u.email },
  { header: "Điện thoại", value: (u: User) => u.phone },
  { header: "Vai trò", value: (u: User) => u.roleName },
  { header: "Trạng thái", value: (u: User) => USER_STATUS_LABELS[u.status] },
  { header: "Đăng nhập gần nhất", value: (u: User) => formatDateTime(u.lastLoginAt) },
];

function UserDialog({ user, open, onClose, onTempPassword }: { user: User | null; open: boolean; onClose: () => void; onTempPassword: (password: string, name: string) => void }) {
  const create = useCreateUser();
  const reset = useResetUserPassword();
  const update = useUpdateUser();
  const roles = useLookup("roles");
  const branches = useLookup("branches");
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: userSchema,
    entity: user,
    defaults: { fullName: "", email: "", phone: "", roleId: "", branchId: "", status: "active" },
    toValues: (u) => ({ fullName: u.fullName, email: u.email, phone: u.phone ?? "", roleId: u.roleId, branchId: u.branchId ?? "", status: u.status }),
    resetKey: open,
    create: async (v) => {
      const created = (await create.mutateAsync(v)) as UserWithTemporaryPassword;
      if (created.temporaryPassword) onTempPassword(created.temporaryPassword, created.fullName);
      return created;
    },
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved: onClose,
  });
  return (
    <FormModal open={open} onClose={onClose} title={isEdit ? "Sửa người dùng" : "Thêm người dùng"} description={isEdit ? "Đổi vai trò hoặc trạng thái có hiệu lực ngay (người dùng phải đăng nhập lại)." : "Hệ thống cấp mật khẩu tạm một lần; người dùng phải đổi ở lần đăng nhập đầu."} formId="user-form" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="user-form">
        <F.Input name="fullName" label="Họ và tên" required />
        <F.Input name="email" label="Email" type="email" required />
        <F.Input name="phone" label="Điện thoại" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <F.Select name="roleId" label="Vai trò" required options={roles.options} placeholder="— Chọn vai trò —" />
          <F.Select name="branchId" label="Cơ sở" options={branches.options} placeholder="— Tất cả —" />
        </div>
        <F.Select name="status" label="Trạng thái" options={toOptions(USER_STATUS_LABELS)} />
        {isEdit && user && (
          <RequirePermission permission="user.edit">
            <Button
              type="button"
              variant="outline"
              loading={reset.isPending}
              onClick={async () => {
                try {
                  const r = await reset.mutateAsync(user.id);
                  onTempPassword(r.temporaryPassword, user.fullName);
                } catch {
                  toast.error("Không cấp lại được mật khẩu");
                }
              }}
            >
              Cấp lại mật khẩu tạm
            </Button>
          </RequirePermission>
        )}
      </Form>
    </FormModal>
  );
}

export function UsersPage() {
  const dialog = useDialogState<User>();
  const [temp, setTemp] = useState<{ password: string; name: string } | null>(null);
  const roles = useLookup("roles");
  const filters: FilterDef<FilterKey>[] = [
    { key: "roleId", label: "Vai trò", options: roles.options },
    { key: "status", label: "Trạng thái", options: toOptions(USER_STATUS_LABELS) },
  ];
  return (
    <>
      <CrudListPage<User, FilterKey>
        title="Người dùng"
        description="Tài khoản nhân sự và vai trò truy cập hệ thống quản trị"
        resource="user"
        noun="người dùng"
        useList={useUsersList}
        useRemove={useDeleteUser}
        columns={columns}
        filters={filters}
        defaultSort={{ sortBy: "createdAt", sortOrder: "desc" }}
        searchPlaceholder="Tìm theo tên, email, SĐT…"
        getRowLabel={(u) => u.fullName}
        onCreate={dialog.openCreate}
        onEdit={dialog.openEdit}
        toolbarActions={(query) => (
          <ExportCsvButton<User>
            permission="user.export"
            noun="người dùng"
            filename="nguoi-dung.csv"
            columns={CSV_COLUMNS}
            fetchRows={() => {
              const q: UserQuery = { ...(query as UserQuery) };
              delete q.page;
              delete q.pageSize;
              return userService.exportAll(q);
            }}
          />
        )}
      />
      <UserDialog user={dialog.editing} open={dialog.open} onClose={dialog.close} onTempPassword={(password, name) => setTemp({ password, name })} />
      <TempPasswordDialog password={temp?.password ?? null} userName={temp?.name} onClose={() => setTemp(null)} />
    </>
  );
}
