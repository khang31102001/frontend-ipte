"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notifyApiError } from "@/shared/lib/notify";
import type { SiteConfigInput } from "../schemas";
import { siteConfigService } from "../services/site-config-service";

const KEY = ["site-config"] as const;

export function useSiteConfig() {
  return useQuery({ queryKey: KEY, queryFn: ({ signal }) => siteConfigService.get(signal) });
}

export function useSaveSiteConfig() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: SiteConfigInput) => siteConfigService.save(input),
    onSuccess: (data) => {
      qc.setQueryData(KEY, data);
      toast.success("Đã lưu cấu hình website");
    },
    onError: notifyApiError,
  });
}
