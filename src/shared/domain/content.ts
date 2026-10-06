/** Vòng đời nội dung CMS dùng chung (trang, bài viết, cảm nhận…): Nháp → Chờ duyệt → Đã đăng → Lưu trữ. */
export const CONTENT_STATUSES = ["draft", "review", "published", "archived"] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];
export const CONTENT_STATUS_LABELS: Record<ContentStatus, string> = {
  draft: "Nháp",
  review: "Chờ duyệt",
  published: "Đã đăng",
  archived: "Lưu trữ",
};
