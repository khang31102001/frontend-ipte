import { getServerEnv } from "@/core/config/env";
import { ALL_PERMISSIONS } from "@/core/rbac/permissions";
import type { Role } from "@/features/roles/types";
import type { User } from "@/features/users/types";
import { collection } from "./db";
import { clearRoutes, matchRoute, routeCount } from "./router";
import { fail, forbidden, notFound, serverError, unauthorized } from "./responses";
import type { MockActor, MockMethod, MockRequest, MockResult, MockScenarioName } from "./types";
import { registerAllModules } from "../modules";

const METHODS: readonly MockMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const SCENARIOS: readonly MockScenarioName[] = ["none", "slow", "error", "empty"];

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function resolveActor(headers: Headers): MockActor | null {
  const roleId = headers.get("x-mock-role");
  if (!roleId) return null;
  const role = collection<Role>("roles").find((r) => r.id === roleId);
  if (!role) return null;
  const user = collection<User>("users").find((u) => u.roleId === role.id && u.status === "active");
  return {
    userId: user?.id ?? "usr-unknown",
    userName: user?.fullName ?? role.name,
    roleId: role.id,
    roleName: role.name,
    permissions: new Set(role.permissions.filter((p) => (ALL_PERMISSIONS as readonly string[]).includes(p))),
  };
}

function toResponse(result: MockResult): Response {
  return Response.json(result.body, { status: result.status, headers: { "Cache-Control": "no-store" } });
}

/**
 * Điểm vào duy nhất của Mock API. Mô phỏng backend thật:
 * độ trễ, xác định người gọi, kiểm tra quyền ĐỘC LẬP với FE, validate, lỗi/rỗng theo kịch bản.
 */
export async function handleMockRequest(request: Request, segments: string[]): Promise<Response> {
  const env = getServerEnv();
  if (!env.MOCK_API_ENABLED) {
    return toResponse(fail(404, "Mock API đang tắt (MOCK_API_ENABLED=false)", "NOT_FOUND"));
  }

  // Dev: dựng lại bảng route mỗi request để chỉnh sửa file mock có hiệu lực ngay (dữ liệu vẫn giữ).
  if (process.env.NODE_ENV !== "production" || routeCount() === 0) {
    clearRoutes();
    registerAllModules();
  }

  const method = request.method.toUpperCase() as MockMethod;
  if (!METHODS.includes(method)) return toResponse(fail(405, "Phương thức không được hỗ trợ", "VALIDATION_ERROR"));

  const url = new URL(request.url);
  const path = `/${segments.map(decodeURIComponent).join("/")}`;

  const scenarioHeader = request.headers.get("x-mock-scenario") as MockScenarioName | null;
  const scenario: MockScenarioName = scenarioHeader && SCENARIOS.includes(scenarioHeader) ? scenarioHeader : "none";
  const delayHeader = Number(request.headers.get("x-mock-delay"));
  const delay = scenario === "slow" ? 3000 : Number.isFinite(delayHeader) && delayHeader > 0 ? delayHeader : env.MOCK_API_DELAY_MS;
  if (delay > 0) await sleep(Math.min(delay, 10_000));

  // Kịch bản lỗi: mọi API trừ /auth/me trả 500 để thử trạng thái lỗi của UI mà không làm hỏng shell.
  if (scenario === "error" && path !== "/auth/me") return toResponse(serverError("Mock: lỗi máy chủ giả lập"));

  const matched = matchRoute(method, path);
  if (matched.kind === "not-found") return toResponse(notFound(`Không tìm thấy endpoint ${method} ${path}`));
  if (matched.kind === "method-not-allowed") return toResponse(fail(405, `Endpoint không hỗ trợ ${method}`, "VALIDATION_ERROR"));

  const { route, params } = matched;
  const actor = resolveActor(request.headers);

  if (!route.anonymous && !actor) return toResponse(unauthorized());
  if (route.permission !== "public" && !actor?.permissions.has(route.permission)) {
    return toResponse(forbidden());
  }

  let body: unknown;
  if (method !== "GET") {
    const text = await request.text();
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        return toResponse(fail(400, "Body không phải JSON hợp lệ", "VALIDATION_ERROR"));
      }
    }
  }

  const req: MockRequest = { method, path, params, query: url.searchParams, body, headers: request.headers, actor, scenario };
  try {
    return toResponse(await route.handler(req));
  } catch (error) {
    console.error("[mock-api]", method, path, error);
    return toResponse(serverError("Lỗi không mong muốn trong Mock API"));
  }
}
