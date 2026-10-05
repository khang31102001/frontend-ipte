// @vitest-environment node
import { beforeAll, describe, expect, it } from "vitest";
import type { ApiFieldError, ApiMeta } from "@/core/api";
import { resetDb } from "./db";

import type { handleMockRequest as HandleMockRequest } from "./dispatch";

let handleMockRequest: typeof HandleMockRequest;

/** Hình dạng phản hồi nới lỏng để assert cả nhánh thành công lẫn lỗi. */
interface Body {
  success: boolean;
  data: unknown;
  message: string;
  meta?: ApiMeta;
  errors: ApiFieldError[];
  code?: string;
}

beforeAll(async () => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:3000/api";
  process.env.MOCK_API_ENABLED = "true";
  process.env.MOCK_API_DELAY_MS = "0";
  ({ handleMockRequest } = await import("./dispatch"));
});

async function call(
  method: string,
  path: string,
  opts: { role?: string | null; body?: unknown; scenario?: string; query?: string } = {},
) {
  const role = opts.role === undefined ? "role-admin" : opts.role;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (role) headers["x-mock-role"] = role;
  if (opts.scenario) headers["x-mock-scenario"] = opts.scenario;
  const req = new Request(`http://localhost:3000/api${path}${opts.query ?? ""}`, {
    method,
    headers,
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
  });
  const res = await handleMockRequest(req, path.split("/").filter(Boolean));
  return { status: res.status, body: (await res.json()) as Body };
}

describe("Mock API – hợp đồng chung", () => {
  it("401 khi không có vai trò, /auth/me trả phiên + quyền theo vai trò", async () => {
    expect((await call("GET", "/users", { role: null })).status).toBe(401);
    const me = await call("GET", "/auth/me", { role: "role-sales" });
    expect(me.status).toBe(200);
    const data = me.body.data as { role: { id: string }; permissions: string[] };
    expect(data.role.id).toBe("role-sales");
    expect(data.permissions).toContain("student.view");
    expect(data.permissions).not.toContain("user.view");
  });

  it("backend kiểm tra quyền độc lập: 403 khi thiếu quyền", async () => {
    const res = await call("POST", "/roles", { role: "role-teacher", body: { name: "X", permissions: [] } });
    expect(res.status).toBe(403);
    expect(res.body.code).toBe("FORBIDDEN");
  });

  it("phân trang + meta chuẩn", async () => {
    const res = await call("GET", "/users", { query: "?page=2&pageSize=5" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.meta).toMatchObject({ page: 2, pageSize: 5 });
    expect((res.body.data as unknown[]).length).toBe(5);
    expect(res.body.meta?.totalPages).toBe(Math.ceil((res.body.meta?.total ?? 0) / 5));
  });

  it("tìm kiếm không phân biệt dấu tiếng Việt", async () => {
    const res = await call("GET", "/users", { query: "?q=quan%20tri" });
    const names = (res.body.data as { fullName: string }[]).map((u) => u.fullName);
    expect(names).toContain("Nguyễn Quản Trị");
  });

  it("lọc và sắp xếp", async () => {
    const res = await call("GET", "/users", { query: "?roleId=role-teacher&sortBy=fullName&sortOrder=desc" });
    const items = res.body.data as { id: string; roleId: string; fullName: string }[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((u) => u.roleId === "role-teacher")).toBe(true);
    const sorted = [...items].sort((a, b) => b.fullName.localeCompare(a.fullName, "vi", { numeric: true, sensitivity: "base" }));
    expect(items.map((u) => u.id)).toEqual(sorted.map((u) => u.id));
  });

  it("422: trả errors[] theo field khi dữ liệu sai (dùng chung schema zod với FE)", async () => {
    const res = await call("POST", "/users", { body: { fullName: "", email: "abc", roleId: "", status: "x" } });
    expect(res.status).toBe(422);
    expect(res.body.code).toBe("VALIDATION_ERROR");
    const fields = res.body.errors.map((e) => e.field);
    expect(fields).toEqual(expect.arrayContaining(["fullName", "email", "roleId", "status"]));
  });

  it("CRUD đầy đủ + ghi audit log trước/sau", async () => {
    const input = { fullName: "Người Dùng Thử", email: "thu.nd@pteipass.vn", roleId: "role-sales", status: "active" };
    const created = await call("POST", "/users", { body: input });
    expect(created.status).toBe(201);
    const id = (created.body.data as { id: string }).id;

    const dup = await call("POST", "/users", { body: input });
    expect(dup.status).toBe(422);
    expect(dup.body.errors[0]?.field).toBe("email");

    const updated = await call("PUT", `/users/${id}`, { body: { ...input, fullName: "Tên Mới" } });
    expect(updated.status).toBe(200);
    expect((updated.body.data as { fullName: string }).fullName).toBe("Tên Mới");

    const logs = await call("GET", "/audit-logs", { query: `?q=${id}&pageSize=10` });
    const entries = logs.body.data as { action: string; before: unknown; after: { fullName?: string } | null }[];
    const update = entries.find((e) => e.action === "update");
    expect(update?.after?.fullName).toBe("Tên Mới");
    expect(update?.before).not.toBeNull();

    expect((await call("DELETE", `/users/${id}`)).status).toBe(200);
    expect((await call("GET", `/users/${id}`)).status).toBe(404);
  });

  it("không cho xóa vai trò hệ thống (409)", async () => {
    const res = await call("DELETE", "/roles/role-admin");
    expect(res.status).toBe(409);
    expect(res.body.code).toBe("CONFLICT");
  });

  it("kịch bản empty / error giả lập trạng thái UI", async () => {
    const empty = await call("GET", "/users", { scenario: "empty" });
    expect(empty.body.data).toEqual([]);
    expect(empty.body.meta?.total).toBe(0);
    const error = await call("GET", "/users", { scenario: "error" });
    expect(error.status).toBe(500);
    // /auth/me vẫn sống để shell không sập
    expect((await call("GET", "/auth/me", { scenario: "error" })).status).toBe(200);
  });

  it("404 endpoint không tồn tại, 405 sai method", async () => {
    expect((await call("GET", "/khong-ton-tai")).status).toBe(404);
    expect((await call("PATCH", "/audit-logs")).status).toBe(405);
  });

  it("resetDb đưa dữ liệu về seed", async () => {
    const before = (await call("GET", "/users")).body.meta?.total;
    await call("POST", "/users", { body: { fullName: "Tạm", email: "tam@pteipass.vn", roleId: "role-sales", status: "active" } });
    resetDb();
    expect((await call("GET", "/users")).body.meta?.total).toBe(before);
  });
});
