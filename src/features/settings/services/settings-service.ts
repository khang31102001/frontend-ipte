import { apiClient, createCrudService } from "@/core/api";
import type { GlobalSettingsInput, IntegrationSettingsInput, NotificationTemplateInput } from "../schemas";
import type {
  GlobalSettingsDto,
  IntegrationSettingsDto,
  NotificationTemplate,
  NotificationTemplateQuery,
} from "../types";

export const settingsService = {
  async getGlobal(signal?: AbortSignal): Promise<GlobalSettingsDto> {
    return (await apiClient.get<GlobalSettingsDto>("/settings/global", { signal })).data;
  },
  async saveGlobal(input: GlobalSettingsInput): Promise<GlobalSettingsDto> {
    return (await apiClient.put<GlobalSettingsDto>("/settings/global", input)).data;
  },
  async getIntegration(signal?: AbortSignal): Promise<IntegrationSettingsDto> {
    return (await apiClient.get<IntegrationSettingsDto>("/settings/integration", { signal })).data;
  },
  async saveIntegration(input: IntegrationSettingsInput): Promise<IntegrationSettingsDto> {
    return (await apiClient.put<IntegrationSettingsDto>("/settings/integration", input)).data;
  },
};

export const notificationTemplateService = createCrudService<
  NotificationTemplate,
  NotificationTemplateInput,
  NotificationTemplateInput,
  NotificationTemplateQuery
>("/notification-templates");
