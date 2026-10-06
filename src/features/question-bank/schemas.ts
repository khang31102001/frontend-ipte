import { requiredString, z } from "@/core/validation";
import { PTE_SKILLS, PTE_TARGET_SCORES, QUESTION_TYPES, QUESTION_TYPE_META } from "@/shared/domain/pte";
import { DIFFICULTIES, QUESTION_STATUSES, isOptionQuestion } from "./types";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Tối đa ${max} ký tự`)
    .optional()
    .transform((v) => v || undefined);

export const questionOptionSchema = z.object({
  text: requiredString("Nhập nội dung lựa chọn").max(500, "Tối đa 500 ký tự"),
  isCorrect: z.boolean(),
});

export const questionSchema = z
  .object({
    skill: z.enum(PTE_SKILLS),
    type: z.enum(QUESTION_TYPES),
    prompt: requiredString("Vui lòng nhập đề bài").max(1000, "Tối đa 1000 ký tự"),
    content: optionalText(5000),
    mediaUrl: z
      .string()
      .trim()
      .optional()
      .transform((v) => v || undefined)
      .refine((v) => v === undefined || /^(https?:\/\/|\/)/.test(v), "Đường dẫn phải bắt đầu bằng http(s):// hoặc /"),
    options: z.array(questionOptionSchema).max(8, "Tối đa 8 lựa chọn").default([]),
    answerKey: optionalText(2000),
    difficulty: z.enum(DIFFICULTIES),
    targetBand: z
      .number({ error: "Phải là số" })
      .refine((v): v is (typeof PTE_TARGET_SCORES)[number] => (PTE_TARGET_SCORES as readonly number[]).includes(v), "Chọn mức điểm hợp lệ")
      .optional(),
    tags: z.array(z.string().trim().min(1)).max(15, "Tối đa 15 tag").default([]),
    status: z.enum(QUESTION_STATUSES),
  })
  .superRefine((v, ctx) => {
    if (QUESTION_TYPE_META[v.type].skill !== v.skill) {
      ctx.addIssue({ code: "custom", path: ["type"], message: "Dạng câu hỏi không thuộc kỹ năng đã chọn" });
    }
    if (isOptionQuestion(v.type)) {
      if (v.options.length < 2) {
        ctx.addIssue({ code: "custom", path: ["options"], message: "Cần ít nhất 2 lựa chọn" });
      }
      const correct = v.options.filter((o) => o.isCorrect).length;
      if (correct === 0) {
        ctx.addIssue({ code: "custom", path: ["options"], message: "Chọn ít nhất 1 đáp án đúng" });
      }
      const single = ["reading_mc_single", "listening_mc_single", "highlight_correct_summary", "select_missing_word"].includes(v.type);
      if (single && correct > 1) {
        ctx.addIssue({ code: "custom", path: ["options"], message: "Dạng này chỉ có 1 đáp án đúng" });
      }
    }
  });
export type QuestionInput = z.infer<typeof questionSchema>;
export type QuestionFormValues = z.input<typeof questionSchema>;
