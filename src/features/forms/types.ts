import type { BaseEntity, ListQuery } from "@/core/api";

export const FORM_TYPES = ["trial_registration", "consultation", "placement_booking", "contact", "other"] as const;
export type FormType = (typeof FORM_TYPES)[number];
export const FORM_TYPE_LABELS: Record<FormType, string> = {
  trial_registration: "Đăng ký học thử",
  consultation: "Đăng ký tư vấn",
  placement_booking: "Đặt lịch test đầu vào",
  contact: "Liên hệ",
  other: "Khác",
};

export const FIELD_TYPES = ["text", "email", "phone", "textarea", "select", "checkbox", "date"] as const;
export type FieldType = (typeof FIELD_TYPES)[number];
export const FIELD_TYPE_LABELS: Record<FieldType, string> = {
  text: "Văn bản ngắn",
  email: "Email",
  phone: "Số điện thoại",
  textarea: "Văn bản dài",
  select: "Danh sách chọn",
  checkbox: "Đồng ý (checkbox)",
  date: "Ngày",
};

export interface FormFieldDef {
  /** Khóa dữ liệu, ví dụ "fullName". */
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  /** Lựa chọn khi type = select. */
  options: string[];
}

export type FormStatus = "active" | "inactive";
export const FORM_STATUS_LABELS: Record<FormStatus, string> = { active: "Đang nhận", inactive: "Tạm đóng" };

export interface FormDefinition extends BaseEntity {
  name: string;
  /** Định danh dùng ở website: POST /public/forms/:slug/submit */
  slug: string;
  type: FormType;
  description?: string;
  fields: FormFieldDef[];
  submitLabel: string;
  successMessage: string;
  notifyEmails: string[];
  status: FormStatus;
  /** Số lượt gửi (API tính). */
  submissionCount: number;
}

export interface FormQuery extends ListQuery {
  type?: FormType;
  status?: FormStatus;
}

// ── Dữ liệu gửi từ website (lead) ─────────────────────────────────────────
export const SUBMISSION_STATUSES = ["new", "contacted", "qualified", "converted", "spam"] as const;
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];
export const SUBMISSION_STATUS_LABELS: Record<SubmissionStatus, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  qualified: "Tiềm năng",
  converted: "Đã đăng ký",
  spam: "Spam",
};

export interface SubmissionSource {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  landingPage?: string;
}

export interface FormSubmission extends BaseEntity {
  formId: string;
  formName: string;
  formType: FormType;
  /** Giá trị người dùng nhập theo `key` của field. */
  data: Record<string, string>;
  fullName?: string;
  email?: string;
  phone?: string;
  status: SubmissionStatus;
  assignedTo?: string;
  assignedToName?: string;
  notes?: string;
  source?: SubmissionSource;
}

export interface SubmissionQuery extends ListQuery {
  formId?: string;
  formType?: FormType;
  status?: SubmissionStatus;
  assignedTo?: string;
  from?: string;
  to?: string;
}
