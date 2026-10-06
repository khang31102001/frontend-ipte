import { emailString, requiredString, z } from "@/core/validation";
import { NOTIFICATION_CHANNELS, TIMEZONES } from "./types";

const optionalText = (max = 200) =>
  z
    .string()
    .trim()
    .max(max, `Tối đa ${max} ký tự`)
    .optional()
    .transform((v) => v || undefined);

const optionalUrl = (message = "Liên kết phải bắt đầu bằng http(s)://") =>
  z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .refine((v) => v === undefined || /^https?:\/\//.test(v), message);

export const globalSettingsSchema = z.object({
  timezone: z.enum(TIMEZONES),
  language: z.enum(["vi", "en"]),
  dateFormat: z.enum(["dd/MM/yyyy", "yyyy-MM-dd"]),
  currency: z.enum(["VND", "AUD"]),
  defaultPageSize: z.number({ error: "Phải là số" }).int().min(5, "Tối thiểu 5").max(100, "Tối đa 100"),
  maintenanceMode: z.boolean(),
  leadFollowUpDays: z.number({ error: "Phải là số" }).int().min(1, "Tối thiểu 1 ngày").max(30, "Tối đa 30 ngày"),
});
export type GlobalSettingsInput = z.infer<typeof globalSettingsSchema>;
export type GlobalSettingsFormValues = z.input<typeof globalSettingsSchema>;

export const integrationSettingsSchema = z
  .object({
    smtp: z.object({
      enabled: z.boolean(),
      host: optionalText(120),
      port: z.number({ error: "Cổng phải là số" }).int().min(1, "1–65535").max(65535, "1–65535").optional(),
      username: optionalText(120),
      /** Chỉ ghi: để trống = giữ nguyên mật khẩu đang lưu. */
      password: z
        .string()
        .max(200, "Tối đa 200 ký tự")
        .optional()
        .transform((v) => v || undefined),
      fromName: optionalText(80),
      fromEmail: z
        .string()
        .trim()
        .optional()
        .transform((v) => v || undefined)
        .pipe(emailString().optional()),
      secure: z.boolean(),
    }),
    recaptcha: z.object({
      enabled: z.boolean(),
      siteKey: optionalText(120),
      secret: z
        .string()
        .max(200, "Tối đa 200 ký tự")
        .optional()
        .transform((v) => v || undefined),
    }),
    crm: z.object({
      enabled: z.boolean(),
      provider: z.enum(["none", "hubspot", "zoho", "custom"]).optional(),
      webhookUrl: optionalUrl(),
    }),
    storage: z.object({
      provider: z.enum(["local", "s3", "cloudinary"]),
      bucket: optionalText(120),
      publicBaseUrl: optionalUrl(),
    }),
  })
  .superRefine((v, ctx) => {
    if (v.smtp.enabled) {
      if (!v.smtp.host) ctx.addIssue({ code: "custom", path: ["smtp", "host"], message: "Nhập máy chủ SMTP khi bật" });
      if (!v.smtp.port) ctx.addIssue({ code: "custom", path: ["smtp", "port"], message: "Nhập cổng SMTP khi bật" });
      if (!v.smtp.fromEmail) ctx.addIssue({ code: "custom", path: ["smtp", "fromEmail"], message: "Nhập email gửi khi bật" });
    }
    if (v.recaptcha.enabled && !v.recaptcha.siteKey) {
      ctx.addIssue({ code: "custom", path: ["recaptcha", "siteKey"], message: "Nhập Site key khi bật" });
    }
    if (v.crm.enabled && !v.crm.webhookUrl) {
      ctx.addIssue({ code: "custom", path: ["crm", "webhookUrl"], message: "Nhập Webhook URL khi bật" });
    }
  });
export type IntegrationSettingsInput = z.infer<typeof integrationSettingsSchema>;
export type IntegrationSettingsFormValues = z.input<typeof integrationSettingsSchema>;

export const notificationTemplateSchema = z
  .object({
    key: requiredString("Nhập định danh")
      .max(50, "Tối đa 50 ký tự")
      .regex(/^[a-z][a-z0-9_]*$/, "Chữ thường, số, gạch dưới; bắt đầu bằng chữ"),
    name: requiredString("Nhập tên mẫu").max(120, "Tối đa 120 ký tự"),
    channel: z.enum(NOTIFICATION_CHANNELS),
    subject: optionalText(160),
    body: requiredString("Nhập nội dung").max(5000, "Tối đa 5000 ký tự"),
    variables: z.array(z.string().trim().regex(/^[a-zA-Z][a-zA-Z0-9]*$/, "Tên biến chỉ gồm chữ và số")).max(20, "Tối đa 20 biến").default([]),
    isActive: z.boolean(),
  })
  .superRefine((v, ctx) => {
    if (v.channel === "email" && !v.subject) ctx.addIssue({ code: "custom", path: ["subject"], message: "Email cần có tiêu đề" });
    const used = [...v.body.matchAll(/\{\{\s*([a-zA-Z][a-zA-Z0-9]*)\s*\}\}/g)].map((m) => m[1] as string);
    const unknown = used.filter((u) => !v.variables.includes(u));
    if (unknown.length) {
      ctx.addIssue({ code: "custom", path: ["body"], message: `Biến chưa khai báo: ${[...new Set(unknown)].join(", ")}` });
    }
  });
export type NotificationTemplateInput = z.infer<typeof notificationTemplateSchema>;
export type NotificationTemplateFormValues = z.input<typeof notificationTemplateSchema>;
