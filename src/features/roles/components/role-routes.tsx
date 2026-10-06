"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/core/config/routes";
import { EntityDetailPage } from "@/shared/crud";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { PageHeader } from "@/shared/ui";
import { useDeleteRole, useRole } from "../hooks/use-roles";
import type { Role } from "../types";
import { RoleForm } from "./role-form";

export function RoleCreatePage() {
  const router = useRouter();
  return (
    <RequirePermission permission="role.create">
      <PageHeader title="Thêm vai trò" breadcrumbs={[{ label: "Vai trò & quyền", href: ROUTES.roles.list }, { label: "Thêm mới" }]} />
      <RoleForm onSaved={(r) => router.replace(ROUTES.roles.detail(r.id))} onCancel={() => router.push(ROUTES.roles.list)} />
    </RequirePermission>
  );
}

export function RoleDetailPage({ roleId }: { roleId: string }) {
  return (
    <EntityDetailPage<Role>
      id={roleId}
      resource="role"
      noun="vai trò"
      listHref={ROUTES.roles.list}
      listLabel="Vai trò & quyền"
      useEntity={useRole}
      useRemove={useDeleteRole}
      title={(r) => r?.name ?? "Vai trò"}
      description={(r) => (r ? `${r.userCount} người dùng · ${r.permissions.length} quyền` : undefined)}
      crumb={(r) => r?.name ?? "…"}
    >
      {(role) => <RoleForm role={role} />}
    </EntityDetailPage>
  );
}
