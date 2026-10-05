"use client";
/** Khớp `publicSubmitSchema.source` (features/forms/schemas). */
export interface LeadSource {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  landingPage?: string;
}

const STORAGE_KEY = "pte:attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

function read(): LeadSource | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LeadSource) : null;
  } catch {
    return null;
  }
}

/**
 * Ghi nhận nguồn truy cập lần đầu trong phiên (UTM + referrer + trang đích) để gắn vào lead.
 * Gọi một lần khi website tải (client).
 */
export function captureAttribution(): void {
  if (typeof window === "undefined" || read()) return;
  const params = new URLSearchParams(window.location.search);
  const hasUtm = UTM_KEYS.some((k) => params.has(k));
  const referrer = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : undefined;
  const source: LeadSource = {
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    referrer: hasUtm ? undefined : referrer,
    landingPage: window.location.pathname,
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(source));
  } catch {
    /* bỏ qua: private mode */
  }
}

export function getAttribution(): LeadSource {
  return read() ?? { landingPage: typeof window === "undefined" ? undefined : window.location.pathname };
}
