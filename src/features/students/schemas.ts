import { emailString, optionalDateString, phoneString, requiredString, z } from "@/core/validation";
import {
  JOURNEY_STAGES,
  LEARNING_PURPOSES,
  PTE_LEVELS,
  STUDY_MODES,
  TARGET_COUNTRIES,
} from "@/shared/domain/pte";
import { GENDERS, LEAD_SOURCES, STUDENT_STATUSES } from "./types";

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

const scoreField = (label: string) =>
  z.number({ error: `${label} phải là số` }).int(`${label} phải là số nguyên`).min(10, `${label} tối thiểu 10`).max(90, `${label} tối đa 90`);

export const studentSchema = z.object({
  fullName: requiredString("Vui lòng nhập họ tên").max(100, "Tối đa 100 ký tự"),
  gender: z.enum(GENDERS),
  dateOfBirth: optionalDateString("Ngày sinh không hợp lệ"),
  email: emailString(),
  phone: phoneString(),
  zalo: optionalText(20),
  city: optionalText(60),
  address: optionalText(200),
  source: z.enum(LEAD_SOURCES),
  branchId: optionalId(),
  assignedTo: optionalId(),
  status: z.enum(STUDENT_STATUSES),
  tags: z.array(z.string().trim().min(1)).max(10, "Tối đa 10 tag").default([]),
  notes: optionalText(1000),
});
export type StudentInput = z.infer<typeof studentSchema>;
export type StudentFormValues = z.input<typeof studentSchema>;

export const studentProfileSchema = z.object({
  currentLevel: z.enum(PTE_LEVELS),
  currentScore: scoreField("Điểm hiện tại").optional(),
  skillScores: z
    .object({
      speaking: scoreField("Speaking").optional(),
      writing: scoreField("Writing").optional(),
      reading: scoreField("Reading").optional(),
      listening: scoreField("Listening").optional(),
    })
    .optional(),
  targetScore: scoreField("Điểm mục tiêu"),
  purpose: z.enum(LEARNING_PURPOSES),
  purposeDetail: optionalText(300),
  targetCountry: z.enum(TARGET_COUNTRIES).optional(),
  examDeadline: optionalDateString("Hạn chứng chỉ không hợp lệ"),
  studyHoursPerWeek: z.number({ error: "Phải là số" }).int().min(1, "Tối thiểu 1 giờ").max(80, "Tối đa 80 giờ").optional(),
  preferredMode: z.enum(STUDY_MODES),
  preferredSchedule: optionalText(200),
  notes: optionalText(1000),
});
export type StudentProfileInput = z.infer<typeof studentProfileSchema>;
export type StudentProfileFormValues = z.input<typeof studentProfileSchema>;

export const advanceJourneySchema = z
  .object({
    stage: z.enum(JOURNEY_STAGES),
    note: optionalText(500),
    score: scoreField("Điểm").optional(),
    examDate: optionalDateString("Ngày thi không hợp lệ"),
    passed: z.boolean().optional(),
  })
  .refine((v) => v.stage !== "exam" || Boolean(v.examDate), { path: ["examDate"], message: "Vui lòng nhập ngày thi" })
  .refine((v) => v.stage !== "result" || v.score !== undefined, { path: ["score"], message: "Vui lòng nhập điểm kết quả" });
export type AdvanceJourneyInput = z.infer<typeof advanceJourneySchema>;
export type AdvanceJourneyFormValues = z.input<typeof advanceJourneySchema>;

export const journeyNoteSchema = z.object({
  note: requiredString("Vui lòng nhập ghi chú").max(500, "Tối đa 500 ký tự"),
});
export type JourneyNoteInput = z.infer<typeof journeyNoteSchema>;
export type JourneyNoteFormValues = z.input<typeof journeyNoteSchema>;
