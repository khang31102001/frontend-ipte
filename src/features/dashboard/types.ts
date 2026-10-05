import type { JourneyStage } from "@/shared/domain/pte";

export const RANGE_DAYS = [7, 30, 90, 365] as const;
export type RangeDays = (typeof RANGE_DAYS)[number];
export const RANGE_LABELS: Record<RangeDays, string> = { 7: "7 ngày", 30: "30 ngày", 90: "90 ngày", 365: "12 tháng" };

export interface DashboardKpis {
  /** Lead mới từ website trong kỳ (không tính spam). */
  newLeads: number;
  /** % thay đổi so với kỳ liền trước. */
  newLeadsDeltaPct: number;
  /** % lead được chuyển đổi thành học viên đăng ký. */
  leadConversionRate: number;
  /** Số lượt ghi danh trong kỳ. */
  enrollments: number;
  /** Số học viên đang học / thi thử. */
  activeLearners: number;
  /** Số kết quả thi ghi nhận trong kỳ. */
  examResults: number;
  /** % kết quả đạt mục tiêu. */
  passRate: number;
  /** Điểm tăng trung bình từ test đầu vào tới kết quả cuối. */
  avgScoreGain: number;
}

export interface FunnelStep {
  stage: JourneyStage;
  count: number;
  /** % so với bước liền trước (null với bước đầu). */
  conversionFromPrevious: number | null;
  /** % so với đầu phễu. */
  conversionFromTop: number;
}

export interface CountByKey {
  key: string;
  label: string;
  count: number;
}

export interface DailyPoint {
  /** yyyy-MM-dd */
  date: string;
  count: number;
}

export interface RecentLead {
  id: string;
  fullName: string;
  phone?: string;
  formName: string;
  createdAt: string;
  status: string;
}

export interface UpcomingExam {
  studentId: string;
  studentName: string;
  studentCode: string;
  targetScore?: number;
  examDate?: string;
  stage: JourneyStage;
}

export interface DashboardSummary {
  range: { from: string; to: string; days: number };
  kpis: DashboardKpis;
  funnel: FunnelStep[];
  leadsByDay: DailyPoint[];
  leadsBySource: CountByKey[];
  recentLeads: RecentLead[];
  upcomingExams: UpcomingExam[];
}

export interface FunnelReport {
  range: { from: string; to: string };
  branchId?: string;
  totalStudents: number;
  steps: FunnelStep[];
}

export type EnrollmentGroupBy = "month" | "branch" | "course";
export const ENROLLMENT_GROUP_LABELS: Record<EnrollmentGroupBy, string> = {
  month: "Theo tháng",
  branch: "Theo cơ sở",
  course: "Theo khóa học",
};

export interface EnrollmentReport {
  range: { from: string; to: string };
  groupBy: EnrollmentGroupBy;
  total: number;
  rows: CountByKey[];
}

export interface LeadSourceReport {
  range: { from: string; to: string };
  total: number;
  bySource: CountByKey[];
  byFormType: CountByKey[];
  byDay: DailyPoint[];
}
