import { apiClient } from "@/core/api";
import type { SiteConfigInput } from "../schemas";
import type { SiteConfig } from "../types";

export const siteConfigService = {
  async get(signal?: AbortSignal): Promise<SiteConfig> {
    return (await apiClient.get<SiteConfig>("/site-config", { signal })).data;
  },
  async save(input: SiteConfigInput): Promise<SiteConfig> {
    return (await apiClient.put<SiteConfig>("/site-config", input)).data;
  },
};
