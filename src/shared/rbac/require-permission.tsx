"use client";

import type { ReactNode } from "react";
import { usePermissions, type Permission } from "@/core/rbac";
import { ForbiddenState } from "@/shared/ui";

/**
 * Chặn hiển thị trang khi thiếu quyền (UX). Không thay thế việc backend kiểm tra quyền.
 */
export function RequirePermission({
  permission,
  anyOf,
  children,
}: {
  permission?: Permission;
  anyOf?: readonly Permission[];
  children: ReactNode;
}) {
  const { can, canAny } = usePermissions();
  const allowed = permission ? can(permission) : anyOf ? canAny(anyOf) : true;
  return allowed ? <>{children}</> : <ForbiddenState />;
}
