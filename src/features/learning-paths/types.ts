import type { BaseEntity, ListQuery } from "@/core/api";
import type { PteLevel } from "@/shared/domain/pte";

export const PATH_STATUSES = ["draft", "active", "paused", "completed"] as const;
export type PathStatus = (typeof PATH_STATUSES)[number];
export const PATH_STATUS_LABELS: Record<PathStatus, string> = {
  draft: "Nháp",
  active: "Đang thực hiện",
  paused: "Tạm dừng",
  completed: "Hoàn thành",
};

export const STEP_STATUSES = ["pending", "in_progress", "done"] as const;
export type StepStatus = (typeof STEP_STATUSES)[number];
export const STEP_STATUS_LABELS: Record<StepStatus, string> = {
  pending: "Chưa bắt đầu",
  in_progress: "Đang học",
  done: "Hoàn thành",
};

export interface PathStep {
  title: string;
  courseId?: string;
  courseName?: string;
  /** Mốc điểm đạt được khi hoàn thành bước này. */
  targetScore?: number;
  /** yyyy-MM-dd */
  startDate: string;
  endDate: string;
  status: StepStatus;
  note?: string;
}

/** Lộ trình học cá nhân: từ trình độ hiện tại tới điểm mục tiêu trước hạn chứng chỉ. */
export interface LearningPath extends BaseEntity {
  studentId: string;
  studentName?: string;
  studentCode?: string;
  title: string;
  currentLevel: PteLevel;
  targetScore: number;
  deadline?: string;
  startDate: string;
  weeklyHours: number;
  status: PathStatus;
  steps: PathStep[];
  /** % bước hoàn thành (API tính). */
  progress: number;
}

export interface LearningPathQuery extends ListQuery {
  status?: PathStatus;
  studentId?: string;
}

export interface GeneratePathRequest {
  currentLevel: PteLevel;
  targetScore: number;
  deadline?: string;
  startDate: string;
  weeklyHours: number;
}

/** Kết quả gợi ý lộ trình (chưa lưu). */
export interface GeneratedPath {
  steps: PathStep[];
  estimatedWeeks: number;
  endDate: string;
  feasible: boolean;
  warnings: string[];
}
