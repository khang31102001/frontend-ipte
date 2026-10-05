"use client";

import Link from "next/link";
import { Suspense, useState, type ReactNode } from "react";
import { AuthProvider, createDevAuthAdapter } from "@/core/auth";
import { ROUTES } from "@/core/config/routes";
import { adminNav } from "@/config/admin-nav";
import { DevToolbar } from "@/shared/dev/dev-toolbar";
import { AdminShell, UserMenu } from "@/shared/layout";
import { AuthGate } from "@/shared/layout/auth-gate";
import { PageLoading } from "@/shared/ui";

function Brand() {
  return (
    <Link href={ROUTES.dashboard} className="text-xl font-bold text-brand-500">
      PTE <span className="text-gray-800 dark:text-white">iPASS</span>
    </Link>
  );
}

/**
 * Điểm cắm xác thực: hiện dùng adapter dev (chọn vai trò).
 * Khi có identity thật, chỉ thay `createDevAuthAdapter` bằng adapter thật.
 */
export function AdminProviders({ children }: { children: ReactNode }) {
  const [adapter] = useState(createDevAuthAdapter);
  return (
    <AuthProvider adapter={adapter}>
      <AuthGate>
        <AdminShell nav={adminNav} brand={<Brand />} headerRight={<UserMenu />}>
          <Suspense fallback={<PageLoading />}>{children}</Suspense>
        </AdminShell>
      </AuthGate>
      <DevToolbar />
    </AuthProvider>
  );
}
