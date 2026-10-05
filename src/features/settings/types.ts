import type { BaseEntity, ListQuery } from "@/core/api";

export type SettingsGroup = "global" | "integration";

export const TIMEZONES = ["Asia/Ho_Chi_Minh", "Australia/Brisbane", "Australia/Melbourne", "Australia/Sydney"] as const;
export type Timezone = (typeof TIMEZONES)[number];
export const TIMEZONE_LABELS: Record<Timezone, string> = {
  "Asia/Ho_Chi_Minh": "Việt Nam (UTC+7)",
  "Australia/Brisbane": "Brisbane (UTC+10)",
  "Australia/Melbourne": "Melbourne (UTC+10/+11)",
  "Australia/Sydney": "Sydney (UTC+10/+11)",
};

export interface GlobalSettings {
  timezone: Timezone;
  language: "vi" | "en";
  dateFormat: "dd/MM/yyyy" | "yyyy-MM-dd";
  currency: "VND" | "AUD";
  defaultPageSize: number;
  maintenanceMode: boolean;
  /** Số ngày chưa liên hệ lead mới sẽ được nhắc (SLA). */
  leadFollowUpDays: number;
}

export interface IntegrationSettings {
  smtp: {
    enabled: boolean;
    host?: string;
    port?: number;
    username?: string;
    fromName?: string;
    fromEmail?: string;
    secure: boolean;
    /** Có mật khẩu đã lưu hay chưa. Mật khẩu KHÔNG BAO GIỜ được trả về. */
    hasPassword: boolean;
  };
  recaptcha: { enabled: boolean; siteKey?: string; hasSecret: boolean };
  crm: { enabled: boolean; provider?: "none" | "hubspot" | "zoho" | "custom"; webhookUrl?: string };
  storage: { provider: "local" | "s3" | "cloudinary"; bucket?: string; publicBaseUrl?: string };
}

export interface SettingsUpdateMeta {
  updatedAt: string;
  updatedByName?: string;
}

export type GlobalSettingsDto = GlobalSettings & SettingsUpdateMeta;
export type IntegrationSettingsDto = IntegrationSettings & SettingsUpdateMeta;

// ── Mẫu thông báo ────────────────────────────────────────────────────────
export const NOTIFICATION_CHANNELS = ["email", "sms", "zalo"] as const;
export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number];
export const NOTIFICATION_CHANNEL_LABELS: Record<NotificationChannel, string> = {
  email: "Email",
  sms: "SMS",
  zalo: "Zalo (ZNS)",
};

export interface NotificationTemplate extends BaseEntity {
  /** Định danh dùng trong mã nguồn/backend, ví dụ "lead_new". */
  key: string;
  name: string;
  channel: NotificationChannel;
  subject?: string;
  body: string;
  /** Biến có thể dùng trong nội dung, ví dụ {{fullName}}. */
  variables: string[];
  isActive: boolean;
}

export interface NotificationTemplateQuery extends ListQuery {
  channel?: NotificationChannel;
  isActive?: "true" | "false";
}
