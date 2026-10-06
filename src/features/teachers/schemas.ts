import { emailString, requiredString, z } from "@/core/validation";
import { PTE_SKILLS } from "@/shared/domain/pte";
import { AVAILABILITY_MODES, TEACHER_STATUSES, WEEKDAYS } from "./types";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Tối đa ${max} ký tự`)
    .optional()
    .transform((v) => v || undefined);

const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Giờ không hợp lệ (HH:mm)");

export const availabilitySlotSchema = z
  .object({
    day: z.number().int().refine((d): d is (typeof WEEKDAYS)[number] => (WEEKDAYS as readonly number[]).includes(d), "Ngày không hợp lệ"),
    from: hhmm,
    to: hhmm,
    mode: z.enum(AVAILABILITY_MODES),
  })
  .refine((s) => s.from < s.to, { path: ["to"], message: "Giờ kết thúc phải sau giờ bắt đầu" });

export const teacherSchema = z.object({
  fullName: requiredString("Vui lòng nhập họ tên").max(100, "Tối đa 100 ký tự"),
  email: emailString(),
  phone: optionalText(20),
  headline: optionalText(120),
  bio: optionalText(1500),
  pteScore: z
    .number({ error: "Điểm phải là số" })
    .int()
    .min(10, "Tối thiểu 10")
    .max(90, "Tối đa 90")
    .optional(),
  yearsExperience: z.number({ error: "Số năm phải là số" }).int().min(0, "Không âm").max(50, "Tối đa 50"),
  specialties: z.array(z.enum(PTE_SKILLS)).default([]),
  qualifications: z.array(z.string().trim().min(1)).max(10, "Tối đa 10 chứng chỉ").default([]),
  branchId: z
    .string()
    .optional()
    .transform((v) => v || undefined),
  status: z.enum(TEACHER_STATUSES),
  availability: z.array(availabilitySlotSchema).max(28, "Tối đa 28 khung giờ").default([]),
});
export type TeacherInput = z.infer<typeof teacherSchema>;
export type TeacherFormValues = z.input<typeof teacherSchema>;
