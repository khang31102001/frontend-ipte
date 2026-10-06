"use client";

import { CrudListPage, ExportCsvButton, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { toOptions } from "@/shared/domain/pte";
import { Form, FormModal, createFormFields, useEntityForm } from "@/shared/form";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDateTime } from "@/shared/lib/format";
import { useLookup } from "@/shared/lookups/use-lookup";
import { Badge, DescriptionList, type BadgeColor } from "@/shared/ui";
import { useDeleteSubmission, useForms, useSubmissions, useUpdateSubmission } from "../hooks/use-forms";
import { submissionUpdateSchema, type SubmissionUpdateFormValues } from "../schemas";
import { submissionService } from "../services/form-service";
import {
  FORM_TYPE_LABELS,
  SUBMISSION_STATUS_LABELS,
  type FormSubmission,
  type SubmissionQuery,
  type SubmissionStatus,
} from "../types";

const F = createFormFields<SubmissionUpdateFormValues>();

type FilterKey = "formId" | "formType" | "status" | "assignedTo" | "from" | "to";

function useSubmissionsList(query: ListParams<FilterKey>) {
  return useSubmissions(query as SubmissionQuery);
}

const STATUS_COLOR: Record<SubmissionStatus, BadgeColor> = {
  new: "primary",
  contacted: "info",
  qualified: "warning",
  converted: "success",
  spam: "gray",
};

const columns: Column<FormSubmission>[] = [
  {
    key: "contact",
    header: "Người gửi",
    sortKey: "fullName",
    className: "min-w-[200px]",
    cell: (s) => (
      <span>
        <span className="block font-medium text-gray-800 dark:text-white/90">{s.fullName ?? "(không tên)"}</span>
        <span className="block text-theme-xs text-gray-500">
          {s.phone}
          {s.email ? ` · ${s.email}` : ""}
        </span>
      </span>
    ),
  },
  { key: "form", header: "Biểu mẫu", sortKey: "formName", hideBelow: "md", cell: (s) => s.formName },
  { key: "source", header: "Nguồn", hideBelow: "lg", cell: (s) => s.source?.utmSource ?? (s.source?.referrer ? "Referral" : "Trực tiếp") },
  { key: "assigned", header: "Phụ trách", hideBelow: "lg", cell: (s) => s.assignedToName ?? <span className="text-gray-400">Chưa phân công</span> },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (s) => <Badge color={STATUS_COLOR[s.status]}>{SUBMISSION_STATUS_LABELS[s.status]}</Badge> },
  { key: "createdAt", header: "Thời gian", sortKey: "createdAt", hideBelow: "sm", cell: (s) => formatDateTime(s.createdAt) },
];

const CSV_COLUMNS = [
  { header: "Thời gian", value: (s: FormSubmission) => formatDateTime(s.createdAt) },
  { header: "Biểu mẫu", value: (s: FormSubmission) => s.formName },
  { header: "Họ tên", value: (s: FormSubmission) => s.fullName },
  { header: "Điện thoại", value: (s: FormSubmission) => s.phone },
  { header: "Email", value: (s: FormSubmission) => s.email },
  { header: "Trạng thái", value: (s: FormSubmission) => SUBMISSION_STATUS_LABELS[s.status] },
  { header: "Phụ trách", value: (s: FormSubmission) => s.assignedToName },
  { header: "Nguồn", value: (s: FormSubmission) => s.source?.utmSource },
  { header: "Chiến dịch", value: (s: FormSubmission) => s.source?.utmCampaign },
  { header: "Dữ liệu", value: (s: FormSubmission) => Object.entries(s.data).map(([k, v]) => `${k}: ${v}`).join(" | ") },
];

function SubmissionDialog({ submission, open, onClose }: { submission: FormSubmission | null; open: boolean; onClose: () => void }) {
  const update = useUpdateSubmission();
  const staff = useLookup("staff");
  const { form, onSubmit, isSubmitting } = useEntityForm({
    schema: submissionUpdateSchema,
    entity: submission,
    defaults: { status: "new", assignedTo: "", notes: "" },
    toValues: (s) => ({ status: s.status, assignedTo: s.assignedTo ?? "", notes: s.notes ?? "" }),
    resetKey: open,
    create: (v) => update.mutateAsync({ id: submission?.id ?? "", input: v }),
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved: onClose,
  });

  return (
    <FormModal open={open && submission !== null} onClose={onClose} title="Chi tiết dữ liệu gửi" description={submission ? `${submission.formName} · ${formatDateTime(submission.createdAt)}` : undefined} size="lg" formId="submission-form" submitting={isSubmitting} submitLabel="Cập nhật">
      {submission && (
        <div className="space-y-6">
          <DescriptionList
            columns={2}
            items={[
              { label: "Loại biểu mẫu", value: FORM_TYPE_LABELS[submission.formType] },
              { label: "Nguồn", value: submission.source?.utmSource ?? "—" },
              { label: "Chiến dịch (UTM)", value: submission.source?.utmCampaign ?? "—" },
              { label: "Trang đích", value: submission.source?.landingPage ?? "—" },
              ...Object.entries(submission.data).map(([k, v]) => ({ label: k, value: v })),
            ]}
          />
          <Form form={form} onSubmit={onSubmit} id="submission-form">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <F.Select name="status" label="Trạng thái xử lý" options={toOptions(SUBMISSION_STATUS_LABELS)} />
              <F.Select name="assignedTo" label="Phân công" options={staff.options} placeholder="— Chưa phân công —" />
              <F.Textarea name="notes" label="Ghi chú" rows={3} className="md:col-span-2" />
            </div>
          </Form>
        </div>
      )}
    </FormModal>
  );
}

export function SubmissionsPage() {
  const dialog = useDialogState<FormSubmission>();
  const staff = useLookup("staff");
  const forms = useForms({ pageSize: 100 });
  const filters: FilterDef<FilterKey>[] = [
    { key: "formId", label: "Biểu mẫu", options: (forms.data?.items ?? []).map((f) => ({ value: f.id, label: f.name })) },
    { key: "status", label: "Trạng thái", options: toOptions(SUBMISSION_STATUS_LABELS) },
    { key: "assignedTo", label: "Phụ trách", options: staff.options },
    { key: "from", label: "Từ ngày", type: "date" },
    { key: "to", label: "Đến ngày", type: "date" },
  ];

  return (
    <>
      <CrudListPage<FormSubmission, FilterKey>
        title="Dữ liệu biểu mẫu"
        description="Lead đăng ký từ website: xử lý trạng thái, phân công tư vấn, xuất danh sách"
        resource="form_submission"
        noun="dữ liệu"
        useList={useSubmissionsList}
        useRemove={useDeleteSubmission}
        columns={columns}
        filters={filters}
        defaultSort={{ sortBy: "createdAt", sortOrder: "desc" }}
        searchPlaceholder="Tìm theo tên, SĐT, email…"
        getRowLabel={(s) => `${s.formName} – ${s.fullName ?? s.phone ?? ""}`}
        onEdit={dialog.openEdit}
        toolbarActions={(query) => (
          <ExportCsvButton<FormSubmission>
            permission="form_submission.export"
            noun="lead"
            filename="du-lieu-bieu-mau.csv"
            columns={CSV_COLUMNS}
            fetchRows={() => {
              const q: SubmissionQuery = { ...(query as SubmissionQuery) };
              delete q.page;
              delete q.pageSize;
              return submissionService.exportAll(q);
            }}
          />
        )}
      />
      <SubmissionDialog submission={dialog.editing} open={dialog.open} onClose={dialog.close} />
    </>
  );
}
