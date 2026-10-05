"use client";

import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { usePermissions } from "@/core/rbac";
import { Form, FormActions, applyServerErrors, createFormFields, useZodForm } from "@/shared/form";
import { formatDateTime } from "@/shared/lib/format";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { Button, Card, CardBody, CardHeader, ErrorState, PageHeader, Skeleton, Tabs } from "@/shared/ui";
import { useSaveSiteConfig, useSiteConfig } from "../hooks/use-site-config";
import { siteConfigSchema, type SiteConfigFormValues, type SiteConfigInput } from "../schemas";
import type { SiteConfig } from "../types";

const F = createFormFields<SiteConfigFormValues>();

type TabKey = "general" | "contact" | "social" | "policies" | "chat" | "tracking";
const TABS = [
  { key: "general", label: "Chung" },
  { key: "contact", label: "Liên hệ" },
  { key: "social", label: "Mạng xã hội" },
  { key: "policies", label: "Chính sách" },
  { key: "chat", label: "Chat & widget" },
  { key: "tracking", label: "Theo dõi (Analytics)" },
] as const;

function toValues(c: SiteConfig): SiteConfigFormValues {
  const s = (v?: string) => v ?? "";
  return {
    general: {
      siteName: c.general.siteName,
      tagline: s(c.general.tagline),
      logoUrl: s(c.general.logoUrl),
      faviconUrl: s(c.general.faviconUrl),
      defaultMetaTitle: s(c.general.defaultMetaTitle),
      defaultMetaDescription: s(c.general.defaultMetaDescription),
      ogImageUrl: s(c.general.ogImageUrl),
    },
    contact: {
      hotlineVN: c.contact.hotlineVN,
      hotlineAU: s(c.contact.hotlineAU),
      email: c.contact.email,
      zalo: s(c.contact.zalo),
      address: s(c.contact.address),
      workingHours: s(c.contact.workingHours),
    },
    social: {
      facebook: s(c.social.facebook),
      youtube: s(c.social.youtube),
      tiktok: s(c.social.tiktok),
      instagram: s(c.social.instagram),
      linkedin: s(c.social.linkedin),
      zaloOa: s(c.social.zaloOa),
      communityUrl: s(c.social.communityUrl),
    },
    policies: c.policies.map((p) => ({ key: p.key, title: p.title, url: s(p.url), content: s(p.content) })),
    chat: {
      zalo: { enabled: c.chat.zalo.enabled, oaId: s(c.chat.zalo.oaId) },
      messenger: { enabled: c.chat.messenger.enabled, pageId: s(c.chat.messenger.pageId), greeting: s(c.chat.messenger.greeting) },
      thirdParty: { enabled: c.chat.thirdParty.enabled, name: s(c.chat.thirdParty.name), scriptUrl: s(c.chat.thirdParty.scriptUrl) },
    },
    tracking: { ga4Id: s(c.tracking.ga4Id), gtmId: s(c.tracking.gtmId), metaPixelId: s(c.tracking.metaPixelId) },
  };
}

function SiteConfigForm({ config }: { config: SiteConfig }) {
  const save = useSaveSiteConfig();
  const { can } = usePermissions();
  const [tab, setTab] = useState<TabKey>("general");
  const form = useZodForm(siteConfigSchema, { defaultValues: toValues(config) });
  const policies = useFieldArray({ control: form.control, name: "policies" });
  const canWrite = can("site_config.edit");

  // Đồng bộ form khi bản cấu hình trên server thay đổi (sau khi lưu).
  useEffect(() => {
    form.reset(toValues(config));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.updatedAt]);

  async function onSubmit(values: SiteConfigInput) {
    try {
      await save.mutateAsync(values);
    } catch (error) {
      if (applyServerErrors(form as never, error)) {
        // chuyển tới tab có lỗi đầu tiên để người dùng thấy ngay
        const firstError = Object.keys(form.formState.errors)[0] as TabKey | undefined;
        if (firstError && TABS.some((t) => t.key === firstError)) setTab(firstError);
      }
    }
  }

  // Khi validate phía client thất bại, mở tab chứa lỗi đầu tiên.
  const errorKeys = Object.keys(form.formState.errors);
  useEffect(() => {
    const first = errorKeys.find((k) => TABS.some((t) => t.key === k)) as TabKey | undefined;
    if (first) setTab(first);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.submitCount]);

  const chat = form.watch("chat");

  return (
    <Form form={form} onSubmit={onSubmit} id="site-config-form">
      <Tabs items={TABS} value={tab} onChange={setTab} />
      <fieldset disabled={!canWrite || form.formState.isSubmitting} className="space-y-5">
        <div hidden={tab !== "general"}>
          <Card>
            <CardHeader title="Thông tin chung" />
            <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <F.Input name="general.siteName" label="Tên website" required />
              <F.Input name="general.tagline" label="Khẩu hiệu" />
              <F.Input name="general.logoUrl" label="Logo (URL)" />
              <F.Input name="general.faviconUrl" label="Favicon (URL)" />
              <F.Input name="general.ogImageUrl" label="Ảnh chia sẻ mạng xã hội (OG image)" className="md:col-span-2" />
              <F.Input name="general.defaultMetaTitle" label="Meta title mặc định" hint="Tối đa 70 ký tự" />
              <F.Textarea name="general.defaultMetaDescription" label="Meta description mặc định" rows={3} hint="Tối đa 170 ký tự" />
            </CardBody>
          </Card>
        </div>

        <div hidden={tab !== "contact"}>
          <Card>
            <CardHeader title="Thông tin liên hệ" description="Hiển thị ở header, footer và trang liên hệ" />
            <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <F.Input name="contact.hotlineVN" label="Hotline Việt Nam" required />
              <F.Input name="contact.hotlineAU" label="Hotline Úc" />
              <F.Input name="contact.email" label="Email" type="email" required />
              <F.Input name="contact.zalo" label="Zalo" />
              <F.Input name="contact.workingHours" label="Giờ làm việc" className="md:col-span-2" />
              <F.Textarea name="contact.address" label="Địa chỉ" rows={2} className="md:col-span-2" />
            </CardBody>
          </Card>
        </div>

        <div hidden={tab !== "social"}>
          <Card>
            <CardHeader title="Mạng xã hội & cộng đồng" />
            <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <F.Input name="social.facebook" label="Facebook" placeholder="https://facebook.com/…" />
              <F.Input name="social.youtube" label="YouTube" />
              <F.Input name="social.tiktok" label="TikTok" />
              <F.Input name="social.instagram" label="Instagram" />
              <F.Input name="social.linkedin" label="LinkedIn" />
              <F.Input name="social.zaloOa" label="Zalo OA" />
              <F.Input name="social.communityUrl" label="Nhóm cộng đồng" className="md:col-span-2" />
            </CardBody>
          </Card>
        </div>

        <div hidden={tab !== "policies"}>
          <Card>
            <CardHeader
              title="Chính sách"
              description="Thanh toán, bảo mật, điều khoản, quy định học viên… Nhập liên kết hoặc nội dung trực tiếp."
              actions={
                canWrite && (
                  <Button variant="outline" size="sm" startIcon={<Plus className="size-4" />} onClick={() => policies.append({ key: "", title: "", url: "", content: "" })}>
                    Thêm chính sách
                  </Button>
                )
              }
            />
            <CardBody className="space-y-4">
              {policies.fields.length === 0 && <p className="py-4 text-center text-sm text-gray-500">Chưa có chính sách nào.</p>}
              {policies.fields.map((field, index) => (
                <div key={field.id} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-brand-500">Chính sách {index + 1}</p>
                    {canWrite && (
                      <Button variant="ghost" size="icon" aria-label="Xóa chính sách" onClick={() => policies.remove(index)}>
                        <Trash2 className="size-4 text-error-500" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <F.Input name={`policies.${index}.title`} label="Tiêu đề" required />
                    <F.Input name={`policies.${index}.key`} label="Định danh" required placeholder="privacy" />
                    <F.Input name={`policies.${index}.url`} label="Liên kết" className="md:col-span-2" placeholder="/chinh-sach-bao-mat hoặc https://…" />
                    <F.Textarea name={`policies.${index}.content`} label="Hoặc nội dung trực tiếp" rows={3} className="md:col-span-2" />
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        <div hidden={tab !== "chat"}>
          <Card>
            <CardHeader title="Chat / Zalo / Messenger" description="Chỉ tích hợp widget của bên thứ ba. Hệ thống không tự xây chatbot." />
            <CardBody className="space-y-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <F.Switch name="chat.zalo.enabled" label="Bật widget Zalo" className="md:col-span-2" />
                <F.Input name="chat.zalo.oaId" label="Zalo OA ID" required={chat?.zalo?.enabled} />
              </div>
              <div className="grid grid-cols-1 gap-5 border-t border-gray-100 pt-5 md:grid-cols-2 dark:border-gray-800">
                <F.Switch name="chat.messenger.enabled" label="Bật widget Messenger" className="md:col-span-2" />
                <F.Input name="chat.messenger.pageId" label="Facebook Page ID" required={chat?.messenger?.enabled} />
                <F.Input name="chat.messenger.greeting" label="Lời chào" />
              </div>
              <div className="grid grid-cols-1 gap-5 border-t border-gray-100 pt-5 md:grid-cols-2 dark:border-gray-800">
                <F.Switch name="chat.thirdParty.enabled" label="Bật widget chat bên thứ ba" className="md:col-span-2" />
                <F.Input name="chat.thirdParty.name" label="Tên dịch vụ" />
                <F.Input name="chat.thirdParty.scriptUrl" label="URL script nhúng" required={chat?.thirdParty?.enabled} placeholder="https://…" />
              </div>
            </CardBody>
          </Card>
        </div>

        <div hidden={tab !== "tracking"}>
          <Card>
            <CardHeader title="Theo dõi & phân tích" description="ID công cụ phân tích Google/Meta để website nhúng đúng mã" />
            <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <F.Input name="tracking.ga4Id" label="Google Analytics 4" placeholder="G-XXXXXXXXXX" />
              <F.Input name="tracking.gtmId" label="Google Tag Manager" placeholder="GTM-XXXXXXX" />
              <F.Input name="tracking.metaPixelId" label="Meta Pixel ID" />
            </CardBody>
          </Card>
        </div>
      </fieldset>
      {canWrite && <FormActions submitting={form.formState.isSubmitting} submitLabel="Lưu cấu hình" />}
    </Form>
  );
}

export function SiteConfigPage() {
  const { data, isLoading, error, refetch } = useSiteConfig();
  return (
    <RequirePermission permission="site_config.view">
      <PageHeader
        title="Cấu hình website"
        description={data ? `Cập nhật lần cuối ${formatDateTime(data.updatedAt)}${data.updatedByName ? ` bởi ${data.updatedByName}` : ""}` : "Hotline, địa chỉ, mạng xã hội, chính sách và các cấu hình dùng chung"}
      />
      {isLoading ? <Skeleton className="h-96 w-full" /> : error || !data ? <ErrorState onRetry={() => void refetch()} /> : <SiteConfigForm config={data} />}
    </RequirePermission>
  );
}
