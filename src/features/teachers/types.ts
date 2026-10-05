import type { BaseEntity, ListQuery } from "@/core/api";
import type { PteSkill } from "@/shared/domain/pte";

export const TEACHER_STATUSES = ["active", "on_leave", "inactive"] as const;
export type TeacherStatus = (typeof TEACHER_STATUSES)[number];
export const TEACHER_STATUS_LABELS: Record<TeacherStatus, string> = {
  active: "Đang giảng dạy",
  on_leave: "Tạm nghỉ",
  inactive: "Ngưng hợp tác",
};

/** 0 = Thứ 2 … 6 = Chủ nhật */
export const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6] as const;
export type Weekday = (typeof WEEKDAYS)[number];
export const WEEKDAY_LABELS: Record<Weekday, string> = {
  0: "Thứ 2",
  1: "Thứ 3",
  2: "Thứ 4",
  3: "Thứ 5",
  4: "Thứ 6",
  5: "Thứ 7",
  6: "Chủ nhật",
};

export const AVAILABILITY_MODES = ["online", "offline", "both"] as const;
export type AvailabilityMode = (typeof AVAILABILITY_MODES)[number];
export const AVAILABILITY_MODE_LABELS: Record<AvailabilityMode, string> = {
  online: "Online",
  offline: "Tại trung tâm",
  both: "Cả hai",
};

export interface AvailabilitySlot {
  day: Weekday;
  /** HH:mm */
  from: string;
  /** HH:mm */
  to: string;
  mode: AvailabilityMode;
}

export interface Teacher extends BaseEntity {
  code: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string | null;
  headline?: string;
  bio?: string;
  /** Điểm PTE của giáo viên (credential) */
  pteScore?: number;
  yearsExperience: number;
  specialties: PteSkill[];
  qualifications: string[];
  branchId?: string;
  branchName?: string;
  status: TeacherStatus;
  availability: AvailabilitySlot[];
  /** Khóa học đang phụ trách (API tính từ course.teacherIds). */
  courses: { id: string; name: string }[];
}

export interface TeacherQuery extends ListQuery {
  status?: TeacherStatus;
  branchId?: string;
  specialty?: PteSkill;
}
