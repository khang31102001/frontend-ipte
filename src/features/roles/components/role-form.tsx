"use client";

import { Controller } from "react-hook-form";
import { useAuth } from "@/core/auth";
import { usePermissions } from "@/core/rbac";
import { Form, FormActions, createFormFields, useEntityForm } from "@/shared/form";
import { Card, CardBody, CardHeader } from "@/shared/ui";
import { useCreateRole, useUpdateRole } from "../hooks/use-roles";
import { roleSchema, type RoleFormValues } from "../schemas";
import type { Role } from "../types";
import { PermissionMatrix } from "./permission-matrix";

const F = createFormFields<RoleFormValues>();

export function RoleForm({ role, onSaved, onCancel }: { role?: Role; onSaved?: (role: Role) => void; onCancel?: () => void }) {
  const create = useCreateRole();
  const update = useUpdateRole();
  const { can } = usePermissions();
  const { refresh } = useAuth();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: roleSchema,
    entity: role,
    defaults: { name: "", description: "", permissions: [] },
    toValues: (r) => ({ name: r.name, description: r.description ?? "", permissions: r.permissions }),
    create: (v) => create.mutateAsync(v),
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved: (saved) => {
      // Quyền của vai trò đang dùng có thể vừa đổi ⇒ nạp lại phiên (không làm nháy giao diện).
      void refresh(true);
      onSaved?.(saved);
    },
  });
  const isAdminRole = role?.id === "role-admin";
  const canWrite = can(isEdit ? "role.edit" : "role.create") && !isAdminRole;
  const permissionsError = form.formState.errors.permissions;
  const permissionsMessage = (permissionsError?.root?.message ?? (typeof permissionsError?.message === "string" ? permissionsError.message : undefined)) as string | undefined;

  return (
    <Form form={form} onSubmit={onSubmit} id="role-form">
      <fieldset disabled={!canWrite || isSubmitting} className="space-y-5">
        <Card>
          <CardHeader title="Thông tin vai trò" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Input name="name" label="Tên vai trò" required />
            <F.Input name="description" label="Mô tả" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            title="Ma trận phân quyền"
            description={
              isAdminRole
                ? "Vai trò Admin luôn có toàn quyền và không thể chỉnh sửa."
                : "Quyền chỉ ẩn/hiện chức năng trên giao diện. Backend/API vẫn kiểm tra quyền độc lập."
            }
          />
          <CardBody>
            <Controller
              control={form.control}
              name="permissions"
              render={({ field }) => <PermissionMatrix value={field.value ?? []} onChange={field.onChange} disabled={!canWrite || isSubmitting} />}
            />
            {permissionsMessage && <p role="alert" className="mt-2 text-sm text-error-500">{permissionsMessage}</p>}
          </CardBody>
        </Card>
      </fieldset>
      {canWrite && <FormActions submitting={isSubmitting} submitLabel={isEdit ? "Lưu thay đổi" : "Tạo vai trò"} onCancel={onCancel} />}
    </Form>
  );
}
