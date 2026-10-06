"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { notifyApiError } from "@/shared/lib/notify";
import type { GlobalSettingsInput, IntegrationSettingsInput } from "../schemas";
import { notificationTemplateService, settingsService } from "../services/settings-service";

const GLOBAL_KEY = ["settings", "global"] as const;
const INTEGRATION_KEY = ["settings", "integration"] as const;

export function useGlobalSettings() {
  return useQuery({ queryKey: GLOBAL_KEY, queryFn: ({ signal }) => settingsService.getGlobal(signal) });
}

export function useSaveGlobalSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: GlobalSettingsInput) => settingsService.saveGlobal(input),
    onSuccess: (data) => {
      qc.setQueryData(GLOBAL_KEY, data);
      toast.success("Đã lưu cài đặt chung");
    },
    onError: notifyApiError,
  });
}

export function useIntegrationSettings() {
  return useQuery({ queryKey: INTEGRATION_KEY, queryFn: ({ signal }) => settingsService.getIntegration(signal) });
}

export function useSaveIntegrationSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: IntegrationSettingsInput) => settingsService.saveIntegration(input),
    onSuccess: (data) => {
      qc.setQueryData(INTEGRATION_KEY, data);
      toast.success("Đã lưu cài đặt tích hợp");
    },
    onError: notifyApiError,
  });
}

const templateHooks = createCrudHooks({ name: "notification-templates", service: notificationTemplateService, label: "mẫu thông báo" });
export const useNotificationTemplates = templateHooks.useList;
export const useCreateNotificationTemplate = templateHooks.useCreate;
export const useUpdateNotificationTemplate = templateHooks.useUpdate;
export const useDeleteNotificationTemplate = templateHooks.useRemove;
