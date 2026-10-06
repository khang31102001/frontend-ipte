/**
 * Cấu hình môi trường tập trung. Mọi nơi trong app đọc env qua file này, không dùng `process.env` trực tiếp (trừ next.config).
 * `NEXT_PUBLIC_API_BASE_URL` là điểm duy nhất quyết định FE nói chuyện với backend nào.
 */
export function getApiBaseUrl(): string {
  // Next chỉ inline biến NEXT_PUBLIC_* khi viết tường minh `process.env.NEXT_PUBLIC_X`.
  const value = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!value) throw new Error("Thiếu NEXT_PUBLIC_API_BASE_URL (xem .env.example)");
  return value.replace(/\/+$/, "");
}

/** Địa chỉ gốc của website (dùng cho canonical, sitemap, Open Graph). */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
}
