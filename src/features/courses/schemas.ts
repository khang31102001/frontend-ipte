import { requiredString, slugString, z } from "@/core/validation";
import { PTE_LEVELS, PTE_SKILLS, PTE_TARGET_SCORES, STUDY_MODES } from "@/shared/domain/pte";
import { COURSE_STATUSES, COURSE_TYPES, LESSON_STATUSES, LESSON_TYPES } from "./types";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Tối đa ${max} ký tự`)
    .optional()
    .transform((v) => v || undefined);

const optionalId = () =>
  z
    .string()
    .optional()
    .transform((v) => v || undefined);

export const courseCategorySchema = z.object({
  name: requiredString("Vui lòng nhập tên danh mục").max(80, "Tối đa 80 ký tự"),
  slug: slugString(),
  description: optionalText(300),
  parentId: optionalId(),
  sortOrder: z.number({ error: "Thứ tự phải là số" }).int().min(0, "Không âm").max(999, "Tối đa 999"),
  isActive: z.boolean(),
});
export type CourseCategoryInput = z.infer<typeof courseCategorySchema>;
export type CourseCategoryFormValues = z.input<typeof courseCategorySchema>;

const targetScoreSchema = z
  .number({ error: "Điểm mục tiêu phải là số" })
  .refine((v): v is (typeof PTE_TARGET_SCORES)[number] => (PTE_TARGET_SCORES as readonly number[]).includes(v), "Chọn một mức điểm hợp lệ")
  .optional();

export const courseSchema = z.object({
  code: requiredString("Vui lòng nhập mã khóa học")
    .max(30, "Tối đa 30 ký tự")
    .regex(/^[A-Za-z0-9-]+$/, "Chỉ gồm chữ, số và dấu gạch ngang"),
  name: requiredString("Vui lòng nhập tên khóa học").max(160, "Tối đa 160 ký tự"),
  slug: slugString(),
  categoryId: requiredString("Vui lòng chọn danh mục"),
  type: z.enum(COURSE_TYPES),
  targetScore: targetScoreSchema,
  entryLevel: z.enum(PTE_LEVELS),
  mode: z.enum(STUDY_MODES),
  durationWeeks: z.number({ error: "Thời lượng phải là số" }).int().min(1, "Tối thiểu 1 tuần").max(104, "Tối đa 104 tuần"),
  sessionsCount: z.number({ error: "Số buổi phải là số" }).int().min(1, "Tối thiểu 1 buổi").max(500, "Tối đa 500 buổi"),
  tuition: z.number({ error: "Học phí phải là số" }).int().min(0, "Không âm").max(500_000_000, "Học phí quá lớn"),
  teacherIds: z.array(z.string()).default([]),
  summary: requiredString("Vui lòng nhập mô tả ngắn").max(300, "Tối đa 300 ký tự"),
  description: optionalText(5000),
  outcomes: z.array(z.string().trim().min(1)).max(12, "Tối đa 12 mục").default([]),
  audience: z.array(z.string().trim().min(1)).max(12, "Tối đa 12 mục").default([]),
  status: z.enum(COURSE_STATUSES),
  isFeatured: z.boolean(),
  thumbnailUrl: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .refine((v) => v === undefined || /^(https?:\/\/|\/)/.test(v), "Đường dẫn ảnh không hợp lệ"),
  metaTitle: optionalText(70),
  metaDescription: optionalText(170),
});
export type CourseInput = z.infer<typeof courseSchema>;
export type CourseFormValues = z.input<typeof courseSchema>;

export const lessonSchema = z.object({
  courseId: requiredString("Thiếu khóa học"),
  title: requiredString("Vui lòng nhập tiêu đề bài học").max(160, "Tối đa 160 ký tự"),
  order: z.number({ error: "Thứ tự phải là số" }).int().min(1, "Tối thiểu 1").max(999, "Tối đa 999"),
  type: z.enum(LESSON_TYPES),
  skill: z.enum(PTE_SKILLS).optional(),
  durationMinutes: z.number({ error: "Thời lượng phải là số" }).int().min(5, "Tối thiểu 5 phút").max(600, "Tối đa 600 phút"),
  objectives: optionalText(1000),
  status: z.enum(LESSON_STATUSES),
});
export type LessonInput = z.infer<typeof lessonSchema>;
export type LessonFormValues = z.input<typeof lessonSchema>;
