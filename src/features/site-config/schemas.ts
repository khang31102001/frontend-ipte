import { emailString, phoneString, requiredString, z } from "@/core/validation";

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

/** Ảnh/tệp: URL đầy đủ hoặc đường dẫn nội bộ bắt đầu bằng /. */
const optionalAssetUrl = () =>
  z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .refine((v) => v === undefined || v.startsWith("/") || v.startsWith("http://") || v.startsWith("https://"), "Đường dẫn không hợp lệ (http(s):// hoặc /)");

const optionalPhone = () =>
  z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .refine((v) => v === undefined || /^\+?[0-9][0-9\s.-]{6,18}[0-9]$/.test(v), "Số điện thoại không hợp lệ");

export const policySchema = z
  .object({
    key: requiredString("Nhập định danh")
      .max(40, "Tối đa 40 ký tự")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Chỉ gồm chữ thường, số, gạch ngang"),
    title: requiredString("Nhập tiêu đề chính sách").max(120, "Tối đa 120 ký tự"),
    url: z
      .string()
      .trim()
      .optional()
      .transform((v) => v || undefined)
      .refine((v) => v === undefined || /^(https?:\/\/|\/)/.test(v), "Đường dẫn không hợp lệ"),
    content: optionalText(20000),
  })
  .refine((p) => Boolean(p.url) || Boolean(p.content), { path: ["url"], message: "Nhập liên kết hoặc nội dung" });

export const siteConfigSchema = z.object({
  general: z.object({
    siteName: requiredString("Vui lòng nhập tên website").max(80, "Tối đa 80 ký tự"),
    tagline: optionalText(160),
    logoUrl: optionalAssetUrl(),
    faviconUrl: optionalAssetUrl(),
    defaultMetaTitle: optionalText(70),
    defaultMetaDescription: optionalText(170),
    ogImageUrl: optionalAssetUrl(),
  }),
  contact: z.object({
    hotlineVN: phoneString("Hotline Việt Nam không hợp lệ"),
    hotlineAU: optionalPhone(),
    email: emailString(),
    zalo: optionalText(40),
    address: optionalText(300),
    workingHours: optionalText(120),
  }),
  social: z.object({
    facebook: optionalUrl(),
    youtube: optionalUrl(),
    tiktok: optionalUrl(),
    instagram: optionalUrl(),
    linkedin: optionalUrl(),
    zaloOa: optionalUrl(),
    communityUrl: optionalUrl(),
  }),
  policies: z.array(policySchema).max(12, "Tối đa 12 chính sách").default([]),
  chat: z
    .object({
      zalo: z.object({ enabled: z.boolean(), oaId: optionalText(60) }),
      messenger: z.object({ enabled: z.boolean(), pageId: optionalText(60), greeting: optionalText(200) }),
      thirdParty: z.object({ enabled: z.boolean(), name: optionalText(60), scriptUrl: optionalUrl("Script phải bắt đầu bằng https://") }),
    })
    .superRefine((v, ctx) => {
      if (v.zalo.enabled && !v.zalo.oaId) ctx.addIssue({ code: "custom", path: ["zalo", "oaId"], message: "Nhập Zalo OA ID khi bật" });
      if (v.messenger.enabled && !v.messenger.pageId) ctx.addIssue({ code: "custom", path: ["messenger", "pageId"], message: "Nhập Page ID khi bật" });
      if (v.thirdParty.enabled && !v.thirdParty.scriptUrl) ctx.addIssue({ code: "custom", path: ["thirdParty", "scriptUrl"], message: "Nhập URL script khi bật" });
    }),
  tracking: z.object({
    ga4Id: z
      .string()
      .trim()
      .optional()
      .transform((v) => v || undefined)
      .refine((v) => v === undefined || /^G-[A-Z0-9]{6,}$/.test(v), "GA4 ID dạng G-XXXXXXXXXX"),
    gtmId: z
      .string()
      .trim()
      .optional()
      .transform((v) => v || undefined)
      .refine((v) => v === undefined || /^GTM-[A-Z0-9]{4,}$/.test(v), "GTM ID dạng GTM-XXXXXXX"),
    metaPixelId: z
      .string()
      .trim()
      .optional()
      .transform((v) => v || undefined)
      .refine((v) => v === undefined || /^\d{8,20}$/.test(v), "Pixel ID gồm 8–20 chữ số"),
  }),
});
export type SiteConfigInput = z.infer<typeof siteConfigSchema>;
export type SiteConfigFormValues = z.input<typeof siteConfigSchema>;
