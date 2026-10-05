import { apiClient } from "@/core/api";
import type { DashboardSummary, EnrollmentGroupBy, EnrollmentReport, FunnelReport, FunnelStep, LeadSourceReport } from "../types";

export interface ReportRange {
  from?: string;
  to?: string;
  branchId?: string;
}

export const dashboardService = {
  async summary(days: number, signal?: AbortSignal): Promise<DashboardSummary> {
    return (await apiClient.get<DashboardSummary>("/dashboard/summary", { params: { days }, signal })).data;
  },
  async funnel(range: ReportRange, signal?: AbortSignal): Promise<FunnelReport> {
    return (await apiClient.get<FunnelReport>("/reports/funnel", { params: { ...range }, signal })).data;
  },
  /** Số liệu phễu để xuất file (backend ghi audit lượt xuất). */
  async exportFunnel(range: ReportRange): Promise<FunnelStep[]> {
    return (await apiClient.get<FunnelStep[]>("/reports/funnel/export", { params: { ...range } })).data;
  },
  async leadSources(range: ReportRange, signal?: AbortSignal): Promise<LeadSourceReport> {
    return (await apiClient.get<LeadSourceReport>("/reports/lead-sources", { params: { ...range }, signal })).data;
  },
  async enrollments(range: ReportRange, groupBy: EnrollmentGroupBy, signal?: AbortSignal): Promise<EnrollmentReport> {
    return (await apiClient.get<EnrollmentReport>("/reports/enrollments", { params: { ...range, groupBy }, signal })).data;
  },
};
