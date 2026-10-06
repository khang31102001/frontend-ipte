import { optionalDateString, requiredString, z } from "@/core/validation";
import { PTE_LEVELS } from "@/shared/domain/pte";
import { PATH_STATUSES, STEP_STATUSES } from "./types";

const dateRequired = (message: string) =>
  z
    .string({ error: message })
    .trim()
    .min(1, message)
    .refine((v) => !Number.isNaN(Date.parse(v)), "Ngày không hợp lệ");

export const pathStepSchema = z
  .object({
    title: requiredString("Nhập tên bước").max(160, "Tối đa 160 ký tự"),
    courseId: z
      .string()
      .optional()
      .transform((v) => v || undefined),
    targetScore: z.number({ error: "Phải là số" }).int().min(10, "Tối thiểu 10").max(90, "Tối đa 90").optional(),
    startDate: dateRequired("Chọn ngày bắt đầu"),
    endDate: dateRequired("Chọn ngày kết thúc"),
    status: z.enum(STEP_STATUSES),
    note: z
      .string()
      .trim()
      .max(300, "Tối đa 300 ký tự")
      .optional()
      .transform((v) => v || undefined),
  })
  .refine((s) => s.startDate <= s.endDate, { path: ["endDate"], message: "Ngày kết thúc phải sau ngày bắt đầu" });

export const learningPathSchema = z.object({
  studentId: requiredString("Vui lòng chọn học viên"),
  title: requiredString("Vui lòng nhập tên lộ trình").max(160, "Tối đa 160 ký tự"),
  currentLevel: z.enum(PTE_LEVELS),
  targetScore: z.number({ error: "Điểm mục tiêu phải là số" }).int().min(10, "Tối thiểu 10").max(90, "Tối đa 90"),
  deadline: optionalDateString("Hạn không hợp lệ"),
  startDate: dateRequired("Chọn ngày bắt đầu"),
  weeklyHours: z.number({ error: "Giờ học phải là số" }).int().min(1, "Tối thiểu 1 giờ").max(80, "Tối đa 80 giờ"),
  status: z.enum(PATH_STATUSES),
  steps: z.array(pathStepSchema).min(1, "Lộ trình cần ít nhất 1 bước").max(20, "Tối đa 20 bước"),
});
export type LearningPathInput = z.infer<typeof learningPathSchema>;
export type LearningPathFormValues = z.input<typeof learningPathSchema>;

export const generatePathSchema = z.object({
  currentLevel: z.enum(PTE_LEVELS),
  targetScore: z.number({ error: "Điểm mục tiêu phải là số" }).int().min(10, "Tối thiểu 10").max(90, "Tối đa 90"),
  deadline: optionalDateString("Hạn không hợp lệ"),
  startDate: dateRequired("Chọn ngày bắt đầu"),
  weeklyHours: z.number({ error: "Giờ học phải là số" }).int().min(1, "Tối thiểu 1 giờ").max(80, "Tối đa 80 giờ"),
});
export type GeneratePathInput = z.infer<typeof generatePathSchema>;
