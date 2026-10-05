interface GrecaptchaWindow {
  grecaptcha?: {
    ready: (cb: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
}

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/**
 * Lấy token reCAPTCHA v3 cho một hành động. Trả `undefined` khi chưa cấu hình/chưa tải script:
 * backend thật quyết định có bắt buộc token hay không.
 */
export async function getRecaptchaToken(action: string): Promise<string | undefined> {
  if (!RECAPTCHA_SITE_KEY || typeof window === "undefined") return undefined;
  const grecaptcha = (window as unknown as GrecaptchaWindow).grecaptcha;
  if (!grecaptcha) return undefined;
  await new Promise<void>((resolve) => grecaptcha.ready(resolve));
  return grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
}
