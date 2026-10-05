import { requiredString, slugString, z } from "@/core/validation";
import { CONTENT_STATUSES } from "@/shared/domain/content";
import { PAGE_TEMPLATES, SECTION_TYPES } from "./types";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Tối đa ${max} ký tự`)
    .optional()
    .transform((v) => v || undefined);

const optionalUrl = () =>
  z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .refine((v) => v === undefined || /^(https?:\/\/|\/|#)/.test(v), "Đường dẫn không hợp lệ");

export const pageSectionSchema = z.object({
  type: z.enum(SECTION_TYPES),
  heading: requiredString("Nhập tiêu đề khối").max(160, "Tối đa 160 ký tự"),
  body: optionalText(3000),
  buttonLabel: optionalText(60),
  buttonUrl: optionalUrl(),
  imageUrl: optionalUrl(),
  items: z.array(z.string().trim().min(1)).max(20, "Tối đa 20 mục").default([]),
});

export const cmsPageSchema = z
  .object({
    title: requiredString("Vui lòng nhập tiêu đề").max(160, "Tối đa 160 ký tự"),
    slug: slugString(),
    template: z.enum(PAGE_TEMPLATES),
    status: z.enum(CONTENT_STATUSES),
    summary: optionalText(300),
    content: optionalText(20000),
    sections: z.array(pageSectionSchema).max(30, "Tối đa 30 khối").default([]),
    metaTitle: optionalText(70),
    metaDescription: optionalText(170),
    canonicalUrl: optionalUrl(),
    noindex: z.boolean(),
  })
  .superRefine((v, ctx) => {
    if (v.template === "static" && !v.content) {
      ctx.addIssue({ code: "custom", path: ["content"], message: "Trang tĩnh cần có nội dung" });
    }
    if (v.template === "landing" && v.sections.length === 0) {
      ctx.addIssue({ code: "custom", path: ["sections"], message: "Landing page cần ít nhất 1 khối" });
    }
  });
export type CmsPageInput = z.infer<typeof cmsPageSchema>;
export type CmsPageFormValues = z.input<typeof cmsPageSchema>;
