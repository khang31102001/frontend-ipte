import { ApiError, codeFromStatus, joinUrl, type ApiResponse } from "@/core/api";
import { getApiBaseUrl } from "@/core/config/env";
import { clearAccessToken, setAccessToken } from "./token-store";
import type { Session } from "./types";

/**
 * Gọi các endpoint /auth/* bằng fetch trực tiếp (không đi qua apiClient) để tránh vòng lặp refresh-khi-401.
 * Refresh token nằm trong cookie httpOnly (`credentials: "include"`), JS không đọc được; access token chỉ giữ trong bộ nhớ.
 */
async function call<T>(path: string, init: { method?: string; body?: unknown; token?: string | null } = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(joinUrl(getApiBaseUrl(), path), {
      method: init.method ?? "POST",
      credentials: "include",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(init.body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(init.token ? { Authorization: `Bearer ${init.token}` } : {}),
      },
      ...(init.body !== undefined ? { body: JSON.stringify(init.body) } : {}),
    });
  } catch {
    throw new ApiError({ message: "Không kết nối được máy chủ", status: 0, code: "NETWORK_ERROR" });
  }
  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;
  if (!res.ok || !json || json.success !== true) {
    throw new ApiError({
      message: json && json.success === false ? json.message : "Yêu cầu không thành công",
      status: res.status,
      code: json && json.success === false && json.code ? json.code : codeFromStatus(res.status),
      errors: json && json.success === false ? json.errors : [],
    });
  }
  return json.data;
}

interface TokenPayload extends Session {
  accessToken: string;
  expiresIn: number;
}

export const authApi = {
  async login(email: string, password: string): Promise<Session> {
    const { accessToken, ...session } = await call<TokenPayload>("/auth/login", { body: { email, password } });
    setAccessToken(accessToken);
    return session;
  },

  /** Làm mới phiên bằng cookie refresh. Trả null nếu không còn phiên hợp lệ. */
  async refresh(): Promise<Session | null> {
    try {
      const { accessToken, ...session } = await call<TokenPayload>("/auth/refresh");
      setAccessToken(accessToken);
      return session;
    } catch (error) {
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        clearAccessToken();
        return null;
      }
      throw error;
    }
  },

  async me(token: string): Promise<Session> {
    return call<Session>("/auth/me", { method: "GET", token });
  },

  async logout(): Promise<void> {
    try {
      await call<null>("/auth/logout");
    } finally {
      clearAccessToken();
    }
  },

  async changePassword(token: string, currentPassword: string, newPassword: string): Promise<void> {
    await call<null>("/auth/change-password", { body: { currentPassword, newPassword }, token });
    clearAccessToken();
  },
};
