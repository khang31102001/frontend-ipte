"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/core/config/routes";
import { EntityDetailPage } from "@/shared/crud";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { PageHeader } from "@/shared/ui";
import { useDeletePage, usePage } from "../hooks/use-pages";
import type { CmsPage } from "../types";
import { PageForm } from "./page-form";

export function PageCreatePage() {
  const router = useRouter();
  return (
    <RequirePermission permission="page.create">
      <PageHeader title="Thêm trang" breadcrumbs={[{ label: "Trang website", href: ROUTES.pages.list }, { label: "Thêm mới" }]} />
      <PageForm onSaved={(p) => router.replace(ROUTES.pages.detail(p.id))} onCancel={() => router.push(ROUTES.pages.list)} />
    </RequirePermission>
  );
}

export function PageDetailPage({ pageId }: { pageId: string }) {
  return (
    <EntityDetailPage<CmsPage>
      id={pageId}
      resource="page"
      noun="trang"
      listHref={ROUTES.pages.list}
      listLabel="Trang website"
      useEntity={usePage}
      useRemove={useDeletePage}
      title={(p) => p?.title ?? "Trang"}
      crumb={(p) => p?.slug ?? "…"}
    >
      {(page) => <PageForm page={page} />}
    </EntityDetailPage>
  );
}
