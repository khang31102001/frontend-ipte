import { post } from "@/api/http";

export type LoginReq = { username: string; password: string };
export type LoginRes = { access_token: string; token_type: "Bearer"; expires_in: number };

export class AuthService {
  async login(body: LoginReq): Promise<LoginRes> {
    const response = await post<LoginRes>("/auth/login", body);
    return response;
  }
  async logout(): Promise<void> {
    try {
      await post("/auth/logout");
    } catch {}
  }
}

export const authService = new AuthService();
