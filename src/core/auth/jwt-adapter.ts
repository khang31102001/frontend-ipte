import { authApi } from "./auth-api";
import { getAccessToken } from "./token-store";
import type { AuthAdapter, Session } from "./types";

export interface JwtAuthAdapterOptions {
  /** Gọi khi phiên hết hạn không cứu được (ví dụ chuyển tới trang đăng nhập). */
  onUnauthorized?: () => void;
}

/**
 * Adapter đăng nhập thật: access token JWT trong bộ nhớ + refresh token xoay vòng trong cookie httpOnly.
 * Phiên lấy từ GET /auth/me; hết hạn thì tự refresh một lần (apiClient gọi `refreshSession` khi gặp 401).
 */
export function createJwtAuthAdapter(options: JwtAuthAdapterOptions = {}): AuthAdapter {
  return {
    name: "jwt",
    getAccessToken,
    async getSession(): Promise<Session | null> {
      const token = getAccessToken();
      if (token) {
        try {
          return await authApi.me(token);
        } catch {
          /* token hết hạn/không hợp lệ → thử refresh bên dưới */
        }
      }
      return authApi.refresh();
    },
    async refreshSession(): Promise<boolean> {
      return (await authApi.refresh()) !== null;
    },
    signOut: () => authApi.logout(),
    onUnauthorized: options.onUnauthorized,
  };
}
