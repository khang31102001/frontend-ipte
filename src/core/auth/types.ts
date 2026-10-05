/**
 * Hợp đồng tích hợp xác thực. Hệ thống identity thật của dự án chỉ cần viết một
 * `AuthAdapter` mới (xem `dev-adapter.ts` làm mẫu) rồi truyền vào <AuthProvider>.
 * Không có code nào khác phải đổi.
 */

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export interface Session {
  user: SessionUser;
  role: { id: string; name: string };
  /** Danh sách quyền dạng "resource.action". */
  permissions: string[];
}

export interface AuthAdapter {
  readonly name: string;
  /** Lấy phiên hiện tại; trả null nếu chưa đăng nhập. */
  getSession(signal?: AbortSignal): Promise<Session | null>;
  /** Token gắn vào header Authorization (nếu backend dùng bearer). */
  getAccessToken?(): string | null;
  /** Header bổ sung gắn vào mọi request. */
  getRequestHeaders?(): Record<string, string | undefined>;
  /** Làm mới phiên khi gặp 401. Trả true nếu thành công. */
  refreshSession?(): Promise<boolean>;
  signOut?(): Promise<void>;
  /** Gọi khi API trả 401 mà không cứu được (ví dụ chuyển hướng tới trang đăng nhập). */
  onUnauthorized?(): void;
}

export type AuthStatus = "loading" | "authenticated" | "unauthenticated" | "error";
