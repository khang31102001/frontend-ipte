import type { QueryParams } from "./types";

/**
 * Chuyển object tham số thành query string. Bỏ qua undefined/null/chuỗi rỗng,
 * mảng được lặp key (`ids=1&ids=2`).
 */
export function toQueryString(params?: QueryParams): string {
  if (!params) return "";
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    const values = Array.isArray(value) ? value : [value];
    for (const v of values) {
      if (v === undefined || v === null || v === "") continue;
      usp.append(key, String(v));
    }
  }
  const s = usp.toString();
  return s ? `?${s}` : "";
}

export function joinUrl(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
