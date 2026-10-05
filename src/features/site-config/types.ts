/**
 * Cấu hình website dùng chung (singleton): GET /site-config, PUT /site-config.
 * Website công khai đọc cấu hình này để hiển thị hotline, mạng xã hội, chính sách, widget chat.
 */
export interface PolicyLink {
  /** Định danh, ví dụ "payment", "privacy", "terms", "student-rules". */
  key: string;
  title: string;
  /** Liên kết ngoài hoặc đường dẫn nội bộ. */
  url?: string;
  /** Hoặc nội dung trực tiếp. */
  content?: string;
}

export interface SiteConfig {
  updatedAt: string;
  updatedByName?: string;
  general: {
    siteName: string;
    tagline?: string;
    logoUrl?: string;
    faviconUrl?: string;
    defaultMetaTitle?: string;
    defaultMetaDescription?: string;
    ogImageUrl?: string;
  };
  contact: {
    hotlineVN: string;
    hotlineAU?: string;
    email: string;
    zalo?: string;
    address?: string;
    workingHours?: string;
  };
  social: {
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    instagram?: string;
    linkedin?: string;
    zaloOa?: string;
    communityUrl?: string;
  };
  policies: PolicyLink[];
  /** Chỉ tích hợp widget bên thứ ba, KHÔNG tự xây chatbot. */
  chat: {
    zalo: { enabled: boolean; oaId?: string };
    messenger: { enabled: boolean; pageId?: string; greeting?: string };
    thirdParty: { enabled: boolean; name?: string; scriptUrl?: string };
  };
  tracking: {
    ga4Id?: string;
    gtmId?: string;
    metaPixelId?: string;
  };
}
