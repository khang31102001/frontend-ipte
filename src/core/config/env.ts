import { z } from "zod";

/**
 * Cấu hình môi trường tập trung. Mọi nơi trong app đọc env qua file này,
 * không dùng `process.env` trực tiếp (trừ next.config).
 *
 * `NEXT_PUBLIC_API_BASE_URL` là điểm duy nhất quyết định FE nói chuyện với Mock API
 * hay backend thật.
 */
const schema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z
    .string()
    .min(1, "NEXT_PUBLIC_API_BASE_URL là bắt buộc")
    .transform((v) => v.replace(/\/+$/, "")),
  MOCK_API_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
  MOCK_API_DELAY_MS: z.coerce.number().int().min(0).max(10_000).default(300),
});

export type Env = z.infer<typeof schema>;

function parseEnv(): Env {
  const parsed = schema.safeParse({
    // Next chỉ inline biến NEXT_PUBLIC_* khi viết tường minh `process.env.NEXT_PUBLIC_X`.
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    MOCK_API_ENABLED: process.env.MOCK_API_ENABLED,
    MOCK_API_DELAY_MS: process.env.MOCK_API_DELAY_MS,
  });
  if (!parsed.success) {
    const detail = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw new Error(`Cấu hình môi trường không hợp lệ → ${detail}`);
  }
  return parsed.data;
}

/** Biến an toàn cho cả client + server. */
export function getApiBaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!value) throw new Error("Thiếu NEXT_PUBLIC_API_BASE_URL (xem .env.example)");
  return value.replace(/\/+$/, "");
}

/** Bật thanh công cụ dev (đổi vai trò, giả lập chậm/lỗi/rỗng). Nên tắt ở production. */
export function isDevToolsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_DEV_TOOLS === "true";
}

let cached: Env | undefined;
/** Chỉ gọi ở server (route handler, server component). */
export function getServerEnv(): Env {
  cached ??= parseEnv();
  return cached;
}

/** Địa chỉ gốc của website (dùng cho canonical, sitemap, Open Graph). */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
}
