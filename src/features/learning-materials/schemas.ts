import { requiredString, z } from "@/core/validation";
import { PTE_SKILLS, QUESTION_TYPES } from "@/shared/domain/pte";
import { MATERIAL_STATUSES, MATERIAL_TYPES, MATERIAL_VISIBILITIES } from "./types";

const optionalId = () =>
  z
    .string()
    .optional()
    .transform((v) => v || undefined);

export const materialSchema = z.object({
  title: requiredString("Vui lòng nhập tiêu đề").max(160, "Tối đa 160 ký tự"),
  type: z.enum(MATERIAL_TYPES),
  url: z
    .string({ error: "Vui lòng nhập đường dẫn" })
    .trim()
    .min(1, "Vui lòng nhập đường dẫn")
    .refine((v) => /^(https?:\/\/|\/)/.test(v), "Đường dẫn phải bắt đầu bằng http(s):// hoặc /"),
  description: z
    .string()
    .trim()
    .max(500, "Tối đa 500 ký tự")
    .optional()
    .transform((v) => v || undefined),
  skill: z.enum(PTE_SKILLS).optional(),
  questionType: z.enum(QUESTION_TYPES).optional(),
  courseId: optionalId(),
  lessonId: optionalId(),
  fileSizeKb: z.number({ error: "Phải là số" }).int().min(1, "Tối thiểu 1 KB").max(2_000_000, "Tệp quá lớn").optional(),
  durationSeconds: z.number({ error: "Phải là số" }).int().min(1, "Tối thiểu 1 giây").max(36_000, "Tối đa 10 giờ").optional(),
  tags: z.array(z.string().trim().min(1)).max(15, "Tối đa 15 tag").default([]),
  visibility: z.enum(MATERIAL_VISIBILITIES),
  status: z.enum(MATERIAL_STATUSES),
});
export type MaterialInput = z.infer<typeof materialSchema>;
export type MaterialFormValues = z.input<typeof materialSchema>;
