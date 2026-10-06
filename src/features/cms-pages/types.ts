import type { BaseEntity, ListQuery } from "@/core/api";
import type { ContentStatus } from "@/shared/domain/content";

export const PAGE_TEMPLATES = ["landing", "static"] as const;
export type PageTemplate = (typeof PAGE_TEMPLATES)[number];
export const PAGE_TEMPLATE_LABELS: Record<PageTemplate, string> = {
  landing: "Landing page (dạng khối)",
  static: "Trang tĩnh (nội dung)",
};

export const SECTION_TYPES = [
  "hero",
  "text",
  "features",
  "cta",
  "faq",
  "testimonials",
  "courses",
  "stats",
  "steps",
  "programs",
  "teachers",
  "articles",
  "community",
  "lead_form",
  "gallery",
] as const;
export type SectionType = (typeof SECTION_TYPES)[number];
export const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  hero: "Hero (banner đầu trang)",
  text: "Đoạn nội dung",
  features: "Danh sách điểm nổi bật",
  cta: "Kêu gọi hành động (CTA)",
  faq: "Câu hỏi thường gặp",
  testimonials: "Cảm nhận học viên",
  courses: "Khóa học nổi bật",
  stats: "Số liệu nổi bật",
  steps: "Lộ trình từng bước",
  programs: "Chương trình đào tạo",
  teachers: "Đội ngũ giáo viên",
  articles: "Tin tức mới nhất",
  community: "Cộng đồng học viên",
  lead_form: "Biểu mẫu đăng ký tư vấn",
  gallery: "Thư viện ảnh",
};

export interface PageSection {
  type: SectionType;
  heading: string;
  body?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  imageUrl?: string;
  /** Mục con: điểm nổi bật, hoặc "Câu hỏi | Trả lời" cho FAQ. */
  items: string[];
}

export interface CmsPage extends BaseEntity {
  title: string;
  slug: string;
  template: PageTemplate;
  status: ContentStatus;
  summary?: string;
  /** Nội dung cho trang tĩnh. */
  content?: string;
  /** Các khối cho landing page. */
  sections: PageSection[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noindex: boolean;
  publishedAt?: string | null;
  updatedByName?: string;
}

export interface CmsPageQuery extends ListQuery {
  status?: ContentStatus;
  template?: PageTemplate;
}
