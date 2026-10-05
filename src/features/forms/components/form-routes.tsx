"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/core/config/routes";
import { EntityDetailPage } from "@/shared/crud";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { PageHeader } from "@/shared/ui";
import { useDeleteForm, useFormDefinition } from "../hooks/use-forms";
import type { FormDefinition } from "../types";
import { FormBuilder } from "./form-builder";

export function FormCreatePage() {
  const router = useRouter();
  return (
    <RequirePermission permission="form.create">
      <PageHeader title="Tạo biểu mẫu" breadcrumbs={[{ label: "Biểu mẫu", href: ROUTES.forms.list }, { label: "Thêm mới" }]} />
      <FormBuilder onSaved={(f) => router.replace(ROUTES.forms.detail(f.id))} onCancel={() => router.push(ROUTES.forms.list)} />
    </RequirePermission>
  );
}

export function FormDetailPage({ formId }: { formId: string }) {
  return (
    <EntityDetailPage<FormDefinition>
      id={formId}
      resource="form"
      noun="biểu mẫu"
      listHref={ROUTES.forms.list}
      listLabel="Biểu mẫu"
      useEntity={useFormDefinition}
      useRemove={useDeleteForm}
      title={(f) => f?.name ?? "Biểu mẫu"}
      crumb={(f) => f?.slug ?? "…"}
      description={(f) => (f ? `${f.submissionCount} lượt gửi` : undefined)}
    >
      {(definition) => <FormBuilder definition={definition} />}
    </EntityDetailPage>
  );
}
