import { requiredString, slugString, z } from "@/core/validation";
import { FIELD_TYPES, FORM_TYPES, SUBMISSION_STATUSES } from "./types";

export const formFieldSchema = z
  .object({
    key: requiredString("Nhập khóa dữ liệu")
      .max(40, "Tối đa 40 ký tự")
      .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, "Bắt đầu bằng chữ; chỉ gồm chữ, số, gạch dưới"),
    label: requiredString("Nhập nhãn hiển thị").max(80, "Tối đa 80 ký tự"),
    type: z.enum(FIELD_TYPES),
    required: z.boolean(),
    placeholder: z
      .string()
      .trim()
      .max(120, "Tối đa 120 ký tự")
      .optional()
      .transform((v) => v || undefined),
    options: z.array(z.string().trim().min(1)).max(30, "Tối đa 30 lựa chọn").default([]),
  })
  .refine((f) => f.type !== "select" || f.options.length >= 2, { path: ["options"], message: "Danh sách chọn cần ít nhất 2 lựa chọn" });

export const formDefinitionSchema = z
  .object({
    name: requiredString("Vui lòng nhập tên biểu mẫu").max(120, "Tối đa 120 ký tự"),
    slug: slugString(),
    type: z.enum(FORM_TYPES),
    description: z
      .string()
      .trim()
      .max(300, "Tối đa 300 ký tự")
      .optional()
      .transform((v) => v || undefined),
    fields: z.array(formFieldSchema).min(1, "Biểu mẫu cần ít nhất 1 trường").max(30, "Tối đa 30 trường"),
    submitLabel: requiredString("Nhập nhãn nút gửi").max(40, "Tối đa 40 ký tự"),
    successMessage: requiredString("Nhập thông báo sau khi gửi").max(300, "Tối đa 300 ký tự"),
    notifyEmails: z.array(z.string().trim().pipe(z.email("Email không hợp lệ"))).max(10, "Tối đa 10 email").default([]),
    status: z.enum(["active", "inactive"]),
  })
  .superRefine((v, ctx) => {
    const seen = new Set<string>();
    v.fields.forEach((f, i) => {
      if (seen.has(f.key)) ctx.addIssue({ code: "custom", path: ["fields", i, "key"], message: "Khóa dữ liệu bị trùng" });
      seen.add(f.key);
    });
  });
export type FormDefinitionInput = z.infer<typeof formDefinitionSchema>;
export type FormDefinitionFormValues = z.input<typeof formDefinitionSchema>;

/** Admin chỉ xử lý lead: đổi trạng thái, phân công, ghi chú (dữ liệu gốc không được sửa). */
export const submissionUpdateSchema = z.object({
  status: z.enum(SUBMISSION_STATUSES),
  assignedTo: z
    .string()
    .optional()
    .transform((v) => v || undefined),
  notes: z
    .string()
    .trim()
    .max(1000, "Tối đa 1000 ký tự")
    .optional()
    .transform((v) => v || undefined),
});
export type SubmissionUpdateInput = z.infer<typeof submissionUpdateSchema>;
export type SubmissionUpdateFormValues = z.input<typeof submissionUpdateSchema>;

/** Hợp đồng API công khai cho website: POST /public/forms/:slug/submit */
export const publicSubmitSchema = z.object({
  data: z.record(z.string(), z.string()),
  recaptchaToken: z.string().optional(),
  source: z
    .object({
      utmSource: z.string().optional(),
      utmMedium: z.string().optional(),
      utmCampaign: z.string().optional(),
      referrer: z.string().optional(),
      landingPage: z.string().optional(),
    })
    .optional(),
});
export type PublicSubmitInput = z.infer<typeof publicSubmitSchema>;
