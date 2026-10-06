"use client";

import { useEffect, useState } from "react";
import { usePermissions } from "@/core/rbac";
import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { toOptions } from "@/shared/domain/pte";
import { Form, FormActions, FormModal, applyServerErrors, createFormFields, useEntityForm, useZodForm } from "@/shared/form";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDateTime } from "@/shared/lib/format";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { Badge, Card, CardBody, CardHeader, ErrorState, PageHeader, Skeleton, Tabs } from "@/shared/ui";
import {
  useCreateNotificationTemplate,
  useDeleteNotificationTemplate,
  useGlobalSettings,
  useIntegrationSettings,
  useNotificationTemplates,
  useSaveGlobalSettings,
  useSaveIntegrationSettings,
  useUpdateNotificationTemplate,
} from "../hooks/use-settings";
import {
  globalSettingsSchema,
  integrationSettingsSchema,
  notificationTemplateSchema,
  type GlobalSettingsFormValues,
  type GlobalSettingsInput,
  type IntegrationSettingsFormValues,
  type IntegrationSettingsInput,
  type NotificationTemplateFormValues,
} from "../schemas";
import {
  NOTIFICATION_CHANNEL_LABELS,
  TIMEZONE_LABELS,
  type GlobalSettingsDto,
  type IntegrationSettingsDto,
  type NotificationTemplate,
  type NotificationTemplateQuery,
} from "../types";

const GF = createFormFields<GlobalSettingsFormValues>();
const IF = createFormFields<IntegrationSettingsFormValues>();
const TF = createFormFields<NotificationTemplateFormValues>();

// ── Cài đặt chung ──────────────────────────────────────────────────────────
function GlobalForm({ data }: { data: GlobalSettingsDto }) {
  const save = useSaveGlobalSettings();
  const { can } = usePermissions();
  const canWrite = can("setting.edit");
  const toValues = (d: GlobalSettingsDto): GlobalSettingsFormValues => ({
    timezone: d.timezone,
    language: d.language,
    dateFormat: d.dateFormat,
    currency: d.currency,
    defaultPageSize: d.defaultPageSize,
    maintenanceMode: d.maintenanceMode,
    leadFollowUpDays: d.leadFollowUpDays,
  });
  const form = useZodForm(globalSettingsSchema, { defaultValues: toValues(data) });
  useEffect(() => {
    form.reset(toValues(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.updatedAt]);

  async function onSubmit(values: GlobalSettingsInput) {
    try {
      await save.mutateAsync(values);
    } catch (error) {
      applyServerErrors(form as never, error);
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit} id="global-settings-form">
      <fieldset disabled={!canWrite || form.formState.isSubmitting} className="space-y-5">
        <Card>
          <CardHeader title="Cài đặt chung" description={`Cập nhật ${formatDateTime(data.updatedAt)}${data.updatedByName ? ` bởi ${data.updatedByName}` : ""}`} />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <GF.Select name="timezone" label="Múi giờ" options={toOptions(TIMEZONE_LABELS)} />
            <GF.Select name="language" label="Ngôn ngữ giao diện" options={[{ value: "vi", label: "Tiếng Việt" }, { value: "en", label: "English" }]} />
            <GF.Select name="dateFormat" label="Định dạng ngày" options={[{ value: "dd/MM/yyyy", label: "31/12/2026" }, { value: "yyyy-MM-dd", label: "2026-12-31" }]} />
            <GF.Select name="currency" label="Tiền tệ" options={[{ value: "VND", label: "VND (₫)" }, { value: "AUD", label: "AUD (A$)" }]} />
            <GF.Input name="defaultPageSize" label="Số dòng mỗi trang" type="number" numeric required min={5} max={100} />
            <GF.Input name="leadFollowUpDays" label="SLA liên hệ lead mới (ngày)" type="number" numeric required min={1} max={30} hint="Lead chưa được liên hệ sau số ngày này sẽ được nhắc" />
            <GF.Switch name="maintenanceMode" label="Chế độ bảo trì (website hiển thị trang thông báo)" className="md:col-span-2" />
          </CardBody>
        </Card>
      </fieldset>
      {canWrite && <FormActions submitting={form.formState.isSubmitting} submitLabel="Lưu cài đặt" />}
    </Form>
  );
}

// ── Tích hợp ───────────────────────────────────────────────────────────────
function IntegrationForm({ data }: { data: IntegrationSettingsDto }) {
  const save = useSaveIntegrationSettings();
  const { can } = usePermissions();
  const canWrite = can("setting.edit");
  const s = (v?: string) => v ?? "";
  const toValues = (d: IntegrationSettingsDto): IntegrationSettingsFormValues => ({
    smtp: { enabled: d.smtp.enabled, host: s(d.smtp.host), port: d.smtp.port, username: s(d.smtp.username), password: "", fromName: s(d.smtp.fromName), fromEmail: s(d.smtp.fromEmail), secure: d.smtp.secure },
    recaptcha: { enabled: d.recaptcha.enabled, siteKey: s(d.recaptcha.siteKey), secret: "" },
    crm: { enabled: d.crm.enabled, provider: d.crm.provider ?? "none", webhookUrl: s(d.crm.webhookUrl) },
    storage: { provider: d.storage.provider, bucket: s(d.storage.bucket), publicBaseUrl: s(d.storage.publicBaseUrl) },
  });
  const form = useZodForm(integrationSettingsSchema, { defaultValues: toValues(data) });
  useEffect(() => {
    form.reset(toValues(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.updatedAt]);

  async function onSubmit(values: IntegrationSettingsInput) {
    try {
      await save.mutateAsync(values);
    } catch (error) {
      applyServerErrors(form as never, error);
    }
  }

  const smtpOn = form.watch("smtp.enabled");
  const recaptchaOn = form.watch("recaptcha.enabled");
  const crmOn = form.watch("crm.enabled");

  return (
    <Form form={form} onSubmit={onSubmit} id="integration-settings-form">
      <fieldset disabled={!canWrite || form.formState.isSubmitting} className="space-y-5">
        <Card>
          <CardHeader title="Email (SMTP)" description="Gửi email thông báo lead, xác nhận học thử, nhắc lịch thi" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <IF.Switch name="smtp.enabled" label="Bật gửi email" className="md:col-span-2" />
            <IF.Input name="smtp.host" label="Máy chủ SMTP" required={smtpOn} />
            <IF.Input name="smtp.port" label="Cổng" type="number" numeric required={smtpOn} />
            <IF.Input name="smtp.username" label="Tên đăng nhập" autoComplete="off" />
            <IF.Input
              name="smtp.password"
              label="Mật khẩu"
              type="password"
              autoComplete="new-password"
              placeholder={data.smtp.hasPassword ? "•••••••• (đã lưu, để trống để giữ nguyên)" : "Chưa thiết lập"}
              hint="Chỉ ghi: hệ thống không bao giờ hiển thị lại mật khẩu đã lưu"
            />
            <IF.Input name="smtp.fromName" label="Tên người gửi" />
            <IF.Input name="smtp.fromEmail" label="Email người gửi" type="email" required={smtpOn} />
            <IF.Switch name="smtp.secure" label="Dùng TLS/SSL" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="reCAPTCHA" description="Chống spam cho biểu mẫu trên website" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <IF.Switch name="recaptcha.enabled" label="Bật reCAPTCHA" className="md:col-span-2" />
            <IF.Input name="recaptcha.siteKey" label="Site key" required={recaptchaOn} />
            <IF.Input name="recaptcha.secret" label="Secret key" type="password" autoComplete="new-password" placeholder={data.recaptcha.hasSecret ? "•••••••• (đã lưu)" : "Chưa thiết lập"} hint="Chỉ ghi" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="CRM & webhook" description="Đẩy lead sang hệ thống CRM bên ngoài" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <IF.Switch name="crm.enabled" label="Bật đồng bộ CRM" className="md:col-span-2" />
            <IF.Select name="crm.provider" label="Nhà cung cấp" options={[{ value: "none", label: "Không" }, { value: "hubspot", label: "HubSpot" }, { value: "zoho", label: "Zoho" }, { value: "custom", label: "Tùy chỉnh (webhook)" }]} />
            <IF.Input name="crm.webhookUrl" label="Webhook URL" required={crmOn} placeholder="https://…" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Lưu trữ tệp" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <IF.Select name="storage.provider" label="Nhà cung cấp" options={[{ value: "local", label: "Máy chủ nội bộ" }, { value: "s3", label: "Amazon S3" }, { value: "cloudinary", label: "Cloudinary" }]} />
            <IF.Input name="storage.bucket" label="Bucket / Cloud name" />
            <IF.Input name="storage.publicBaseUrl" label="Đường dẫn công khai (base URL)" className="md:col-span-2" placeholder="https://…" />
          </CardBody>
        </Card>
      </fieldset>
      {canWrite && <FormActions submitting={form.formState.isSubmitting} submitLabel="Lưu tích hợp" />}
    </Form>
  );
}

// ── Mẫu thông báo ──────────────────────────────────────────────────────────
type FilterKey = "channel" | "isActive";

function useTemplatesList(query: ListParams<FilterKey>) {
  return useNotificationTemplates(query as NotificationTemplateQuery);
}

const templateColumns: Column<NotificationTemplate>[] = [
  {
    key: "name",
    header: "Mẫu thông báo",
    sortKey: "name",
    className: "min-w-[260px]",
    cell: (t) => (
      <span>
        <span className="block font-medium text-gray-800 dark:text-white/90">{t.name}</span>
        <span className="block font-mono text-theme-xs text-gray-500">{t.key}</span>
      </span>
    ),
  },
  { key: "channel", header: "Kênh", sortKey: "channel", cell: (t) => <Badge color="primary">{NOTIFICATION_CHANNEL_LABELS[t.channel]}</Badge> },
  { key: "variables", header: "Biến", hideBelow: "lg", cell: (t) => <span className="font-mono text-theme-xs">{t.variables.map((v) => `{{${v}}}`).join(" ")}</span> },
  { key: "isActive", header: "Trạng thái", cell: (t) => <Badge color={t.isActive ? "success" : "gray"}>{t.isActive ? "Đang dùng" : "Tắt"}</Badge> },
  { key: "updatedAt", header: "Cập nhật", sortKey: "updatedAt", hideBelow: "md", cell: (t) => formatDateTime(t.updatedAt) },
];

function TemplateDialog({ template, open, onClose }: { template: NotificationTemplate | null; open: boolean; onClose: () => void }) {
  const create = useCreateNotificationTemplate();
  const update = useUpdateNotificationTemplate();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: notificationTemplateSchema,
    entity: template,
    defaults: { key: "", name: "", channel: "email", subject: "", body: "", variables: [], isActive: true },
    toValues: (t) => ({ key: t.key, name: t.name, channel: t.channel, subject: t.subject ?? "", body: t.body, variables: t.variables, isActive: t.isActive }),
    resetKey: open,
    create: (v) => create.mutateAsync(v),
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved: onClose,
  });
  const channel = form.watch("channel");
  return (
    <FormModal open={open} onClose={onClose} title={isEdit ? "Sửa mẫu thông báo" : "Thêm mẫu thông báo"} size="lg" formId="template-form" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="template-form">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <TF.Input name="name" label="Tên mẫu" required />
          <TF.Input name="key" label="Định danh" required placeholder="lead_new" />
          <TF.Select name="channel" label="Kênh" options={toOptions(NOTIFICATION_CHANNEL_LABELS)} />
          <TF.Switch name="isActive" label="Đang sử dụng" className="self-end pb-2" />
          {channel === "email" && <TF.Input name="subject" label="Tiêu đề email" required className="md:col-span-2" />}
          <TF.Tags name="variables" label="Biến" hint="Khai báo biến dùng trong nội dung, ví dụ fullName, phone" className="md:col-span-2" />
          <TF.Textarea name="body" label="Nội dung" required rows={8} className="md:col-span-2" hint="Dùng {{tenBien}} để chèn dữ liệu" />
        </div>
      </Form>
    </FormModal>
  );
}

function TemplatesTab() {
  const dialog = useDialogState<NotificationTemplate>();
  const filters: FilterDef<FilterKey>[] = [
    { key: "channel", label: "Kênh", options: toOptions(NOTIFICATION_CHANNEL_LABELS) },
    { key: "isActive", label: "Trạng thái", options: [{ value: "true", label: "Đang dùng" }, { value: "false", label: "Tắt" }] },
  ];
  return (
    <>
      <CrudListPage<NotificationTemplate, FilterKey>
        embedded
        title="Mẫu thông báo"
        description="Email / SMS / Zalo gửi tự động theo sự kiện"
        resource="notification_template"
        noun="mẫu thông báo"
        useList={useTemplatesList}
        useRemove={useDeleteNotificationTemplate}
        columns={templateColumns}
        filters={filters}
        defaultSort={{ sortBy: "name", sortOrder: "asc" }}
        getRowLabel={(t) => t.name}
        onCreate={dialog.openCreate}
        onEdit={dialog.openEdit}
      />
      <TemplateDialog template={dialog.editing} open={dialog.open} onClose={dialog.close} />
    </>
  );
}

type TabKey = "global" | "integration" | "templates";
const TABS = [
  { key: "global", label: "Chung" },
  { key: "integration", label: "Tích hợp" },
  { key: "templates", label: "Mẫu thông báo" },
] as const;

export function SettingsPage() {
  const [tab, setTab] = useState<TabKey>("global");
  const globalQuery = useGlobalSettings();
  const integrationQuery = useIntegrationSettings();

  return (
    <RequirePermission permission="setting.view">
      <PageHeader title="Cài đặt hệ thống" description="Cấu hình chung, tích hợp dịch vụ và mẫu thông báo" />
      <Tabs items={TABS} value={tab} onChange={setTab} className="mb-5" />
      {tab === "global" &&
        (globalQuery.isLoading ? <Skeleton className="h-80 w-full" /> : globalQuery.error || !globalQuery.data ? <ErrorState onRetry={() => void globalQuery.refetch()} /> : <GlobalForm data={globalQuery.data} />)}
      {tab === "integration" &&
        (integrationQuery.isLoading ? (
          <Skeleton className="h-96 w-full" />
        ) : integrationQuery.error || !integrationQuery.data ? (
          <ErrorState onRetry={() => void integrationQuery.refetch()} />
        ) : (
          <IntegrationForm data={integrationQuery.data} />
        ))}
      {tab === "templates" && <TemplatesTab />}
    </RequirePermission>
  );
}
