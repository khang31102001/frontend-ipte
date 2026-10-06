"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "@/core/config/routes";
import { EntityDetailPage } from "@/shared/crud";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { PageHeader, Tabs } from "@/shared/ui";
import { useBranch, useDeleteBranch } from "../hooks/use-branches";
import type { Branch } from "../types";
import { BranchForm } from "./branch-form";
import { RoomsPanel } from "./rooms-panel";

export function BranchCreatePage() {
  const router = useRouter();
  return (
    <RequirePermission permission="branch.create">
      <PageHeader title="Thêm cơ sở" breadcrumbs={[{ label: "Cơ sở & phòng học", href: ROUTES.branches.list }, { label: "Thêm mới" }]} />
      <BranchForm onSaved={(b) => router.replace(ROUTES.branches.detail(b.id))} onCancel={() => router.push(ROUTES.branches.list)} />
    </RequirePermission>
  );
}

type TabKey = "info" | "rooms";

function BranchDetail({ branch }: { branch: Branch }) {
  const [tab, setTab] = useState<TabKey>("info");
  return (
    <>
      <Tabs
        className="mb-5"
        items={[
          { key: "info", label: "Thông tin" },
          { key: "rooms", label: `Phòng học (${branch.roomCount})` },
        ]}
        value={tab}
        onChange={setTab}
      />
      {tab === "info" ? <BranchForm branch={branch} /> : <RoomsPanel branchId={branch.id} />}
    </>
  );
}

export function BranchDetailPage({ branchId }: { branchId: string }) {
  return (
    <EntityDetailPage<Branch>
      id={branchId}
      resource="branch"
      noun="cơ sở"
      listHref={ROUTES.branches.list}
      listLabel="Cơ sở & phòng học"
      useEntity={useBranch}
      useRemove={useDeleteBranch}
      title={(b) => b?.name ?? "Cơ sở"}
      crumb={(b) => b?.code ?? "…"}
    >
      {(branch) => <BranchDetail branch={branch} />}
    </EntityDetailPage>
  );
}
