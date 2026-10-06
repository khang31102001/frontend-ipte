"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createQueryKeys } from "@/core/query";
import { dashboardService, type ReportRange } from "../services/dashboard-service";
import type { EnrollmentGroupBy } from "../types";

const keys = createQueryKeys("reports");

export function useDashboardSummary(days: number) {
  return useQuery({
    queryKey: keys.custom("dashboard", days),
    queryFn: ({ signal }) => dashboardService.summary(days, signal),
    placeholderData: keepPreviousData,
  });
}

export function useFunnelReport(range: ReportRange) {
  return useQuery({
    queryKey: keys.custom("funnel", range),
    queryFn: ({ signal }) => dashboardService.funnel(range, signal),
    placeholderData: keepPreviousData,
  });
}

export function useLeadSourcesReport(range: ReportRange) {
  return useQuery({
    queryKey: keys.custom("lead-sources", range),
    queryFn: ({ signal }) => dashboardService.leadSources(range, signal),
    placeholderData: keepPreviousData,
  });
}

export function useEnrollmentsReport(range: ReportRange, groupBy: EnrollmentGroupBy) {
  return useQuery({
    queryKey: keys.custom("enrollments", range, groupBy),
    queryFn: ({ signal }) => dashboardService.enrollments(range, groupBy, signal),
    placeholderData: keepPreviousData,
  });
}
