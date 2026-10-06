type EventParams = Record<string, string | number | boolean | undefined>;

interface AnalyticsWindow {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
}

/**
 * Gửi sự kiện tới GTM (dataLayer), GA4 (gtag) và Meta Pixel (fbq) nếu có.
 * An toàn khi script bị chặn hoặc chưa tải (không ném lỗi).
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as AnalyticsWindow;
  try {
    w.dataLayer?.push({ event: name, ...params });
    w.gtag?.("event", name, params);
    if (name === "generate_lead") w.fbq?.("track", "Lead", params);
  } catch {
    /* bỏ qua lỗi tracking để không ảnh hưởng người dùng */
  }
}

/** Sự kiện chuẩn dùng trên website, gom một chỗ để đặt tên nhất quán. */
export const analytics = {
  leadSubmitted: (formSlug: string) => trackEvent("generate_lead", { form_slug: formSlug }),
  leadFailed: (formSlug: string) => trackEvent("lead_error", { form_slug: formSlug }),
  ctaClick: (type: string, location?: string) => trackEvent("cta_click", { cta_type: type, location }),
  courseView: (slug: string) => trackEvent("view_course", { course_slug: slug }),
  search: (term: string) => trackEvent("search", { search_term: term }),
};
