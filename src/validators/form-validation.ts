import { isEmpty } from "@/lib/helper";
import { IConsultation } from "@/types/contact";

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isPhone(value: string): boolean {
  return /^[+]?[0-9\s-]{7,20}$/.test(value.trim());
}

export type ConsultaionValidationErrors = Partial<Record<keyof IConsultation, string>>;

const ALLOWED_TARGET_SCORES = ["30+", "42+", "50+", "58+", "65+", "79+", "90+"] as const;

export function validateConsultation(form: IConsultation): ConsultaionValidationErrors {
  const errors: ConsultaionValidationErrors = {};

  // name (required)
  if (isEmpty(form.name)) {
    errors.name = "Vui lòng nhập họ và tên.";
  }

  // phone (optional, but if provided must be valid)
  const phone = form.phone?.trim();
  if (phone && !isPhone(phone)) {
    errors.phone =
      "Số điện thoại không hợp lệ (ví dụ: +61..., 09..., chỉ gồm số, khoảng trắng, dấu -).";
  }

  // email (optional, but if provided must be valid)
  const email = form.email?.trim();
  if (email && !isEmail(email)) {
    errors.email = "Email không hợp lệ (ví dụ: example@gmail.com).";
  }

  // targetScore (optional, but if provided must be in allowed list)
  // const target = form.targetScore?.trim();
  // if (target && !ALLOWED_TARGET_SCORES.includes(target as any)) {
  //   errors.targetScore = "Vui lòng chọn điểm PTE mục tiêu hợp lệ.";
  // }

  // message (optional, but if provided must be length 10..1000)
  const msg = form.message?.trim();
  if (msg) {
    if (msg.length < 10 || msg.length > 1000) {
      errors.message = "Nội dung cần tối thiểu 10 ký tự và tối đa 1000 ký tự.";
    }
  }

  return errors;
}

export function isConsultaionValid(errors: ConsultaionValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}
