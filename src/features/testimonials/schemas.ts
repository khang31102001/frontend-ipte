import { requiredString, z } from "@/core/validation";
import { CONTENT_STATUSES } from "@/shared/domain/content";

const optionalUrl = (message = "Đường dẫn không hợp lệ") =>
  z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .refine((v) => v === undefined || /^(https?:\/\/|\/)/.test(v), message);

const score = (label: string) => z.number({ error: `${label} phải là số` }).int().min(10, `${label} tối thiểu 10`).max(90, `${label} tối đa 90`);

export const testimonialSchema = z
  .object({
    studentName: requiredString("Vui lòng nhập tên học viên").max(100, "Tối đa 100 ký tự"),
    headline: requiredString("Vui lòng nhập tiêu đề ngắn").max(160, "Tối đa 160 ký tự"),
    quote: requiredString("Vui lòng nhập nội dung cảm nhận").max(1500, "Tối đa 1500 ký tự"),
    avatarUrl: optionalUrl("Đường dẫn ảnh không hợp lệ"),
    scoreBefore: score("Điểm trước").optional(),
    scoreAfter: score("Điểm sau"),
    rating: z.number({ error: "Đánh giá phải là số" }).int().min(1, "Tối thiểu 1 sao").max(5, "Tối đa 5 sao"),
    courseId: z
      .string()
      .optional()
      .transform((v) => v || undefined),
    videoUrl: optionalUrl("Đường dẫn video không hợp lệ"),
    isFeatured: z.boolean(),
    status: z.enum(CONTENT_STATUSES),
    sortOrder: z.number({ error: "Thứ tự phải là số" }).int().min(0, "Không âm").max(999, "Tối đa 999"),
  })
  .refine((v) => v.scoreBefore === undefined || v.scoreAfter >= v.scoreBefore, {
    path: ["scoreAfter"],
    message: "Điểm sau phải lớn hơn hoặc bằng điểm trước",
  });
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type TestimonialFormValues = z.input<typeof testimonialSchema>;
