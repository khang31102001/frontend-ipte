"use client";

import { useId, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ApiError } from "@/core/api";
import { submitLead, type PublicForm } from "@/features/public-api";
import { analytics } from "../../lib/analytics";
import { getRecaptchaToken } from "../../lib/recaptcha";

type FieldDef = PublicForm["fields"][number];
type Values = Record<string, string>;
type Errors = Record<string, string | undefined>;

interface LeadFormProps {
  form: PublicForm;
  title?: string;
  subtitle?: string;
  className?: string;
  onSuccess?: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9][0-9\s.-]{6,18}[0-9]$/;

function validate(fields: FieldDef[], values: Values): Errors {
  const errors: Errors = {};
  for (const f of fields) {
    const value = (values[f.key] ?? "").trim();
    if (f.required && (!value || (f.type === "checkbox" && value !== "true"))) {
      errors[f.key] = f.type === "checkbox" ? "Vui lòng đồng ý để tiếp tục." : `Vui lòng nhập ${f.label.toLowerCase()}.`;
      continue;
    }
    if (!value) continue;
    if (f.type === "email" && !EMAIL_RE.test(value)) errors[f.key] = "Email không hợp lệ (VD: example@gmail.com).";
    if (f.type === "phone" && !PHONE_RE.test(value)) errors[f.key] = "Số điện thoại không hợp lệ (VD: 0912345678).";
  }
  return errors;
}

const AUTOCOMPLETE: Record<string, string> = { fullName: "name", phone: "tel", email: "email" };

/**
 * Biểu mẫu thu lead dựng động từ định nghĩa `/public/forms/:slug`.
 * Thêm/bớt trường ở trang quản trị là website tự cập nhật, không sửa code.
 */
export default function LeadForm({ form, title, subtitle, className = "", onSuccess }: LeadFormProps) {
  const uid = useId();
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const setValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const found = validate(form.fields, values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const recaptchaToken = await getRecaptchaToken(`lead_${form.slug}`);
      const receipt = await submitLead(form.slug, values, { recaptchaToken });
      analytics.leadSubmitted(form.slug);
      toast.success("Gửi thông tin thành công", { description: receipt.message || form.successMessage });
      setValues({});
      setErrors({});
      onSuccess?.();
    } catch (error) {
      analytics.leadFailed(form.slug);
      if (error instanceof ApiError && error.isValidation) {
        const next: Errors = {};
        for (const item of error.errors) next[item.field.replace(/^data\./, "")] = item.message;
        setErrors(next);
      } else {
        toast.error("Gửi thông tin thất bại", { description: "Hệ thống đang bận. Vui lòng thử lại sau hoặc liên hệ trực tiếp." });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`form form--card ${className}`}>
      <div className="form__header">
        <h2 id="popup-title" className="form__title">
          {title ?? form.name}
        </h2>
        {(subtitle ?? form.description) && <p className="form__subtitle">{subtitle ?? form.description}</p>}
      </div>

      <form onSubmit={handleSubmit} className="form__body" noValidate>
        {form.fields.map((f) => {
          const id = `${uid}-${f.key}`;
          const error = errors[f.key];
          const required = f.required && <span className="text-red-500">*</span>;

          if (f.type === "checkbox") {
            return (
              <div className="field" key={f.key}>
                <label className="flex items-start gap-2 text-sm text-gray-700" htmlFor={id}>
                  <input
                    id={id}
                    type="checkbox"
                    className="mt-1"
                    checked={values[f.key] === "true"}
                    onChange={(e) => setValue(f.key, e.target.checked ? "true" : "")}
                  />
                  <span>
                    {f.label} {required}
                  </span>
                </label>
                {error && <p className="field__error">{error}</p>}
              </div>
            );
          }

          return (
            <div className={`field ${f.type === "select" ? "select" : ""}`} key={f.key}>
              <label htmlFor={id} className="field__label">
                {f.label} {required}
              </label>
              {f.type === "select" ? (
                <div className="select-wrap">
                  <select id={id} className="select-native" value={values[f.key] ?? ""} onChange={(e) => setValue(f.key, e.target.value)}>
                    <option value="" disabled>
                      {f.placeholder ?? "Chọn một mục"}
                    </option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              ) : f.type === "textarea" ? (
                <textarea
                  id={id}
                  className="field__control field__control--textarea"
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValue(f.key, e.target.value)}
                  placeholder={f.placeholder}
                />
              ) : (
                <input
                  id={id}
                  type={f.type === "phone" ? "tel" : f.type === "email" ? "email" : f.type === "date" ? "date" : "text"}
                  inputMode={f.type === "phone" ? "tel" : undefined}
                  autoComplete={AUTOCOMPLETE[f.key]}
                  className="field__control"
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValue(f.key, e.target.value)}
                  placeholder={f.placeholder}
                />
              )}
              {error && <p className="field__error">{error}</p>}
            </div>
          );
        })}

        <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
          {submitting ? "Đang gửi…" : form.submitLabel}
        </button>
      </form>
    </div>
  );
}
