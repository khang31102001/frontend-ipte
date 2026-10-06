import type { BaseEntity, ListQuery } from "@/core/api";

export const BANNER_PLACEMENTS = ["home_hero", "home_secondary", "courses", "news", "popup"] as const;
export type BannerPlacement = (typeof BANNER_PLACEMENTS)[number];
export const BANNER_PLACEMENT_LABELS: Record<BannerPlacement, string> = {
  home_hero: "Trang chủ – banner chính",
  home_secondary: "Trang chủ – banner phụ",
  courses: "Trang khóa học",
  news: "Trang tin tức",
  popup: "Popup khuyến mãi",
};

export const BANNER_STATUSES = ["draft", "active", "inactive"] as const;
export type BannerStatus = (typeof BANNER_STATUSES)[number];
export const BANNER_STATUS_LABELS: Record<BannerStatus, string> = { draft: "Nháp", active: "Đang hiển thị", inactive: "Tạm ẩn" };

export interface Banner extends BaseEntity {
  title: string;
  placement: BannerPlacement;
  imageUrl: string;
  mobileImageUrl?: string;
  linkUrl?: string;
  altText?: string;
  /** ISO – bắt đầu hiển thị */
  startAt?: string;
  /** ISO – kết thúc hiển thị */
  endAt?: string;
  status: BannerStatus;
  sortOrder: number;
}

export interface BannerQuery extends ListQuery {
  placement?: BannerPlacement;
  status?: BannerStatus;
}
