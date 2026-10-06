"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Permission } from "./permissions";

/**
 * Chỉ phục vụ HIỂN THỊ / THAO TÁC trên UI. Đây không phải lớp bảo mật:
 * backend/API luôn phải kiểm tra quyền độc lập.
 */
interface PermissionContextValue {
  permissions: ReadonlySet<string>;
  can: (permission: Permission) => boolean;
  canAny: (permissions: readonly Permission[]) => boolean;
  canAll: (permissions: readonly Permission[]) => boolean;
}

const PermissionContext = createContext<PermissionContextValue | null>(null);

export function PermissionProvider({
  permissions,
  children,
}: {
  permissions: readonly string[];
  children: ReactNode;
}) {
  const value = useMemo<PermissionContextValue>(() => {
    const set = new Set(permissions);
    return {
      permissions: set,
      can: (p) => set.has(p),
      canAny: (ps) => ps.some((p) => set.has(p)),
      canAll: (ps) => ps.every((p) => set.has(p)),
    };
  }, [permissions]);
  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}

export function usePermissions(): PermissionContextValue {
  const ctx = useContext(PermissionContext);
  if (!ctx) throw new Error("usePermissions phải nằm trong <PermissionProvider>");
  return ctx;
}

export function usePermission(permission: Permission): boolean {
  return usePermissions().can(permission);
}

interface CanProps {
  /** Cần đủ quyền này. */
  permission?: Permission;
  /** Hoặc chỉ cần một trong các quyền. */
  anyOf?: readonly Permission[];
  fallback?: ReactNode;
  children: ReactNode;
}

/** Ẩn/hiện phần giao diện theo quyền. */
export function Can({ permission, anyOf, fallback = null, children }: CanProps) {
  const { can, canAny } = usePermissions();
  const allowed = permission ? can(permission) : anyOf ? canAny(anyOf) : true;
  return <>{allowed ? children : fallback}</>;
}
