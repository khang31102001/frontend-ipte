import { requiredString, slugString, z } from "@/core/validation";
import { CONTENT_STATUSES } from "@/shared/domain/content";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Tối đa ${max} ký tự`)
    .optional()
    .transform((v) => v || undefined);

export const articleCategorySchema = z.object({
  name: requiredString("Vui lòng nhập tên danh mục").max(80, "Tối đa 80 ký tự"),
  slug: slugString(),
  description: optionalText(300),
  sortOrder: z.number({ error: "Thứ tự phải là số" }).int().min(0, "Không âm").max(999, "Tối đa 999"),
  isActive: z.boolean(),
});
export type ArticleCategoryInput = z.infer<typeof articleCategorySchema>;
export type ArticleCategoryFormValues = z.input<typeof articleCategorySchema>;

export const tagSchema = z.object({
  name: requiredString("Vui lòng nhập tên tag").max(40, "Tối đa 40 ký tự"),
  slug: slugString(),
});
export type TagInput = z.infer<typeof tagSchema>;
export type TagFormValues = z.input<typeof tagSchema>;

export const articleSchema = z.object({
  title: requiredString("Vui lòng nhập tiêu đề").max(200, "Tối đa 200 ký tự"),
  slug: slugString(),
  excerpt: requiredString("Vui lòng nhập mô tả ngắn").max(320, "Tối đa 320 ký tự"),
  content: requiredString("Vui lòng nhập nội dung bài viết").max(100_000, "Nội dung quá dài"),
  coverUrl: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .refine((v) => v === undefined || /^(https?:\/\/|\/)/.test(v), "Đường dẫn ảnh không hợp lệ"),
  categoryId: requiredString("Vui lòng chọn danh mục"),
  tagIds: z.array(z.string()).max(15, "Tối đa 15 tag").default([]),
  authorId: z
    .string()
    .optional()
    .transform((v) => v || undefined),
  isFeatured: z.boolean(),
  status: z.enum(CONTENT_STATUSES),
  metaTitle: optionalText(70),
  metaDescription: optionalText(170),
});
export type ArticleInput = z.infer<typeof articleSchema>;
export type ArticleFormValues = z.input<typeof articleSchema>;
