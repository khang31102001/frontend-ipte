"use client";

import Link from "next/link";
import { Suspense, useState, type ReactNode } from "react";
import { AuthProvider, createJwtAuthAdapter } from "@/core/auth";
import { ROUTES } from "@/core/config/routes";
import { adminNav } from "@/config/admin-nav";
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

/** Điểm cắm xác thực của khu quản trị: JWT + refresh cookie (xem core/auth). */
export function AdminProviders({ children }: { children: ReactNode }) {
  const [adapter] = useState(() => createJwtAuthAdapter());
  return (
    <AuthProvider adapter={adapter}>
      <AuthGate>
        <AdminShell nav={adminNav} brand={<Brand />} headerRight={<UserMenu />}>
          <Suspense fallback={<PageLoading />}>{children}</Suspense>
        </AdminShell>
      </AuthGate>
    </AuthProvider>
  );
}
