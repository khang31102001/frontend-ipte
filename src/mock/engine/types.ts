import type { ApiResponse } from "@/core/api";
import type { Permission } from "@/core/rbac";

export type MockMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type MockScenarioName = "none" | "slow" | "error" | "empty";

export interface MockActor {
  userId: string;
  userName: string;
  roleId: string;
  roleName: string;
  permissions: ReadonlySet<string>;
}

export interface MockRequest {
  method: MockMethod;
  /** Đường dẫn tương đối, ví dụ "/students/stu-001". */
  path: string;
  params: Record<string, string>;
  query: URLSearchParams;
  body: unknown;
  headers: Headers;
  /** Người gọi (suy ra từ vai trò). null nếu không xác định. */
  actor: MockActor | null;
  scenario: MockScenarioName;
}

export interface MockResult {
  status: number;
  body: ApiResponse<unknown>;
}

export type MockHandler = (req: MockRequest) => Promise<MockResult> | MockResult;

export interface MockRoute {
  method: MockMethod;
  /** Ví dụ "/students/:id". */
  pattern: string;
  /**
   * Quyền backend yêu cầu (kiểm tra độc lập với FE).
   * "public": không cần quyền (nhưng vẫn cần xác định người gọi trừ khi `anonymous`).
   */
  permission: Permission | "public";
  /** Cho phép gọi khi chưa có vai trò (ví dụ API công khai cho website). */
  anonymous?: boolean;
  handler: MockHandler;
}
