import { z } from "zod";

// Thông báo lỗi mặc định bằng tiếng Việt cho toàn bộ schema (FE + Mock API dùng chung).
z.config(z.locales.vi());

export { z };
export type { ZodType } from "zod";

/** Chuỗi bắt buộc, có thông báo rõ ràng. */
export const requiredString = (message = "Không được để trống") =>
  z.string({ error: message }).trim().min(1, message);

/** Chuỗi tùy chọn: "" được coi như không nhập (undefined). */
export const optionalString = () =>
  z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined));

export const emailString = (message = "Email không hợp lệ") => z.string().trim().min(1, "Không được để trống").pipe(z.email(message));

/** Số điện thoại VN/quốc tế đơn giản: 8–15 chữ số, cho phép +, khoảng trắng, dấu chấm, gạch nối. */
export const phoneString = (message = "Số điện thoại không hợp lệ") =>
  z
    .string()
    .trim()
    .min(1, "Không được để trống")
    .refine((v) => /^\+?[0-9][0-9\s.-]{6,18}[0-9]$/.test(v), message);

/** Ngày dạng yyyy-MM-dd, tùy chọn ("" ⇒ undefined). */
export const optionalDateString = (message = "Ngày không hợp lệ") =>
  z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .refine((v) => v === undefined || !Number.isNaN(Date.parse(v)), message);

export const slugString = () =>
  z
    .string()
    .trim()
    .min(1, "Không được để trống")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang");
