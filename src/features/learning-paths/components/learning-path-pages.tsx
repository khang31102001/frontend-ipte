"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/core/config/routes";
import { EntityDetailPage } from "@/shared/crud";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { PageHeader } from "@/shared/ui";
import { useDeleteLearningPath, useLearningPath } from "../hooks/use-learning-paths";
import type { LearningPath } from "../types";
import { LearningPathForm } from "./learning-path-form";
import { ProgressBar } from "./learning-paths-list-page";

export function LearningPathCreatePage() {
  const router = useRouter();
  return (
    <RequirePermission permission="learning_path.create">
      <PageHeader title="Tạo lộ trình học" breadcrumbs={[{ label: "Lộ trình học", href: ROUTES.learningPaths.list }, { label: "Thêm mới" }]} />
      <LearningPathForm onSaved={(p) => router.replace(ROUTES.learningPaths.detail(p.id))} onCancel={() => router.push(ROUTES.learningPaths.list)} />
    </RequirePermission>
  );
}

export function LearningPathDetailPage({ pathId }: { pathId: string }) {
  return (
    <EntityDetailPage<LearningPath>
      id={pathId}
      resource="learning_path"
      noun="lộ trình"
      listHref={ROUTES.learningPaths.list}
      listLabel="Lộ trình học"
      useEntity={useLearningPath}
      useRemove={useDeleteLearningPath}
      title={(p) => p?.title ?? "Lộ trình học"}
      description={(p) => (p ? `${p.studentCode} · ${p.studentName}` : undefined)}
      crumb={(p) => p?.studentName ?? "…"}
      headerActions={(p) => (p ? <ProgressBar value={p.progress} /> : null)}
    >
      {(path) => <LearningPathForm path={path} />}
    </EntityDetailPage>
  );
}
