"use client";

import Link from "next/link";
import { ROUTES } from "@/core/config/routes";
import { CrudListPage } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDate } from "@/shared/lib/format";
import { Badge } from "@/shared/ui";
import { useDeleteRole, useRoles } from "../hooks/use-roles";
import type { Role, RoleQuery } from "../types";

function useRolesList(query: ListParams<never>) {
  return useRoles(query as RoleQuery);
}

const columns: Column<Role>[] = [
  {
    key: "name",
    header: "Vai trò",
    sortKey: "name",
    className: "min-w-[220px]",
    cell: (r) => (
      <Link href={ROUTES.roles.detail(r.id)} className="block hover:text-brand-500">
        <span className="flex items-center gap-2 font-medium text-gray-800 dark:text-white/90">
          {r.name}
          {r.isSystem && <Badge color="info">Hệ thống</Badge>}
        </span>
        <span className="block text-theme-xs text-gray-500">{r.description ?? "—"}</span>
      </Link>
    ),
  },
  { key: "permissions", header: "Số quyền", align: "center", hideBelow: "sm", cell: (r) => r.permissions.length },
  { key: "userCount", header: "Người dùng", sortKey: "userCount", align: "center", cell: (r) => r.userCount },
  { key: "createdAt", header: "Ngày tạo", sortKey: "createdAt", hideBelow: "lg", cell: (r) => formatDate(r.createdAt) },
];

export function RolesListPage() {
  return (
    <CrudListPage<Role>
      title="Vai trò & quyền"
      description="RBAC theo Resource + Action: View / Create / Edit / Delete / Approve / Export"
      resource="role"
      noun="vai trò"
      useList={useRolesList}
      useRemove={useDeleteRole}
      columns={columns}
      defaultSort={{ sortBy: "name", sortOrder: "asc" }}
      searchPlaceholder="Tìm theo tên vai trò…"
      getRowLabel={(r) => r.name}
      canDelete={(r) => !r.isSystem}
      createHref={ROUTES.roles.create}
      viewHref={(r) => ROUTES.roles.detail(r.id)}
      editHref={(r) => ROUTES.roles.detail(r.id)}
    />
  );
}
