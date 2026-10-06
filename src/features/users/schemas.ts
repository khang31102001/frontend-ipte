import { emailString, requiredString, z } from "@/core/validation";
import { USER_STATUSES } from "./types";

export const userSchema = z.object({
  fullName: requiredString("Vui lòng nhập họ tên").pipe(z.string().max(100, "Tối đa 100 ký tự")),
  email: emailString(),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .refine((v) => v === undefined || /^\+?[0-9][0-9\s.-]{6,18}[0-9]$/.test(v), "Số điện thoại không hợp lệ"),
  roleId: requiredString("Vui lòng chọn vai trò"),
  branchId: z
    .string()
    .optional()
    .transform((v) => v || undefined),
  status: z.enum(USER_STATUSES),
});

export type UserInput = z.infer<typeof userSchema>;
export type UserFormValues = z.input<typeof userSchema>;
