import type { BaseEntity, ListQuery } from "@/core/api";
import type { JourneyStage, LearningPurpose, PteLevel, PteSkill, StudyMode, TargetCountry } from "@/shared/domain/pte";

export const GENDERS = ["female", "male", "other"] as const;
export type Gender = (typeof GENDERS)[number];
export const GENDER_LABELS: Record<Gender, string> = { female: "Nữ", male: "Nam", other: "Khác" };

export const STUDENT_STATUSES = ["active", "paused", "closed"] as const;
export type StudentStatus = (typeof STUDENT_STATUSES)[number];
export const STUDENT_STATUS_LABELS: Record<StudentStatus, string> = {
  active: "Đang hoạt động",
  paused: "Tạm dừng",
  closed: "Đã đóng",
};

export const LEAD_SOURCES = ["facebook", "google", "tiktok", "zalo", "referral", "website", "offline", "other"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];
export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  facebook: "Facebook",
  google: "Google",
  tiktok: "TikTok",
  zalo: "Zalo",
  referral: "Giới thiệu",
  website: "Website",
  offline: "Trực tiếp / Sự kiện",
  other: "Khác",
};

/** Hồ sơ master của học viên. */
export interface Student extends BaseEntity {
  /** Mã học viên, ví dụ HV-00012 (do API sinh). */
  code: string;
  fullName: string;
  gender: Gender;
  /** yyyy-MM-dd */
  dateOfBirth?: string;
  email: string;
  phone: string;
  zalo?: string;
  city?: string;
  address?: string;
  source: LeadSource;
  branchId?: string;
  branchName?: string;
  /** Nhân viên tư vấn phụ trách. */
  assignedTo?: string;
  assignedToName?: string;
  status: StudentStatus;
  /** Giai đoạn hiện tại trong hành trình (chỉ đổi qua API journey). */
  stage: JourneyStage;
  tags: string[];
  notes?: string;
  /** Tóm tắt từ hồ sơ PTE (API tính). */
  targetScore?: number;
  examDeadline?: string;
}

export interface StudentQuery extends ListQuery {
  stage?: JourneyStage;
  status?: StudentStatus;
  source?: LeadSource;
  branchId?: string;
  assignedTo?: string;
  purpose?: LearningPurpose;
}

/** Hồ sơ PTE: mục tiêu, trình độ, mục đích. `id` = id học viên. */
export interface StudentProfile extends BaseEntity {
  studentId: string;
  currentLevel: PteLevel;
  currentScore?: number;
  skillScores?: Partial<Record<PteSkill, number>>;
  targetScore: number;
  purpose: LearningPurpose;
  purposeDetail?: string;
  targetCountry?: TargetCountry;
  /** Hạn cần có chứng chỉ, yyyy-MM-dd */
  examDeadline?: string;
  studyHoursPerWeek?: number;
  preferredMode: StudyMode;
  preferredSchedule?: string;
  notes?: string;
}

export type JourneyEventKind = "stage" | "note";

export interface JourneyEvent extends BaseEntity {
  studentId: string;
  kind: JourneyEventKind;
  stage: JourneyStage;
  title: string;
  note?: string;
  /** Dữ liệu gắn theo giai đoạn: điểm test/thi thử/kết quả, ngày thi. */
  data?: { score?: number; examDate?: string; passed?: boolean };
  createdByName: string;
  occurredAt: string;
}

export interface StudentJourney {
  studentId: string;
  currentStage: JourneyStage;
  events: JourneyEvent[];
}
