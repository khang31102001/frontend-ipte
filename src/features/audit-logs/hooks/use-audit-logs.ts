"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createQueryKeys } from "@/core/query";
import { auditLogService } from "../services/audit-log-service";
import type { AuditLogQuery } from "../types";

export const auditLogKeys = createQueryKeys("audit-logs");

export function useAuditLogs(query: AuditLogQuery) {
  return useQuery({
    queryKey: auditLogKeys.list(query),
    queryFn: ({ signal }) => auditLogService.list(query, { signal }),
    placeholderData: keepPreviousData,
  });
}
