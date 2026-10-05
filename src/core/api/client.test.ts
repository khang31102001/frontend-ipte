// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { ApiError } from "./errors";
import { createApiClient } from "./client";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const okBody = (data: unknown, meta?: unknown) => ({ success: true, data, message: "Success", ...(meta ? { meta } : {}) });

function setup(fetchImpl: typeof fetch) {
  return createApiClient({ baseUrl: "http://api.test/api/", fetchImpl });
}

describe("apiClient", () => {
  it("nối base URL + query string và trả envelope thành công", async () => {
    const fetchMock = vi.fn(async () => json(okBody([{ id: "1" }], { page: 1, pageSize: 20, total: 1, totalPages: 1 })));
    const client = setup(fetchMock as unknown as typeof fetch);

    const res = await client.get<{ id: string }[]>("/students", { params: { page: 2, q: "an", empty: "", nil: undefined, ids: [1, 2] } });

    expect(res.data).toEqual([{ id: "1" }]);
    expect(res.meta?.total).toBe(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("http://api.test/api/students?page=2&q=an&ids=1&ids=2");
    expect(init.method).toBe("GET");
  });

  it("gửi JSON body, header provider và bearer token", async () => {
    const fetchMock = vi.fn(async () => json(okBody({ id: "1" }), 201));
    const client = setup(fetchMock as unknown as typeof fetch);
    client.configure({ getAccessToken: () => "tok-123" });
    client.addHeaderProvider(() => ({ "x-mock-role": "role-admin" }));

    await client.post("/students", { fullName: "A" });

    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    const headers = init.headers as Headers;
    expect(headers.get("Authorization")).toBe("Bearer tok-123");
    expect(headers.get("x-mock-role")).toBe("role-admin");
    expect(headers.get("Content-Type")).toBe("application/json");
    expect(init.body).toBe(JSON.stringify({ fullName: "A" }));
  });

  it("không đặt Content-Type khi gửi FormData", async () => {
    const fetchMock = vi.fn(async () => json(okBody(null)));
    const client = setup(fetchMock as unknown as typeof fetch);
    await client.post("/media", new FormData());
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect((init.headers as Headers).has("Content-Type")).toBe(false);
  });

  it("chuẩn hóa lỗi validation 422 thành ApiError có errors[]", async () => {
    const fetchMock = vi.fn(async () =>
      json({ success: false, data: null, message: "Dữ liệu không hợp lệ", errors: [{ field: "email", message: "Sai" }], code: "VALIDATION_ERROR" }, 422),
    );
    const client = setup(fetchMock as unknown as typeof fetch);

    const err = await client.post("/students", {}).catch((e: unknown) => e);

    expect(err).toBeInstanceOf(ApiError);
    const apiErr = err as ApiError;
    expect(apiErr.isValidation).toBe(true);
    expect(apiErr.status).toBe(422);
    expect(apiErr.errors).toEqual([{ field: "email", message: "Sai" }]);
  });

  it("map mã trạng thái khi body không phải envelope (ví dụ proxy trả HTML)", async () => {
    const fetchMock = vi.fn(async () => new Response("<html>Bad gateway</html>", { status: 502 }));
    const client = setup(fetchMock as unknown as typeof fetch);
    const err = (await client.get("/x").catch((e: unknown) => e)) as ApiError;
    expect(err.code).toBe("SERVER_ERROR");
    expect(err.isRetryable).toBe(true);
  });

  it("lỗi mạng → NETWORK_ERROR", async () => {
    const fetchMock = vi.fn(async () => {
      throw new TypeError("fetch failed");
    });
    const client = setup(fetchMock as unknown as typeof fetch);
    const err = (await client.get("/x").catch((e: unknown) => e)) as ApiError;
    expect(err.code).toBe("NETWORK_ERROR");
    expect(err.status).toBe(0);
  });

  it("401: làm mới phiên rồi thử lại đúng một lần", async () => {
    let calls = 0;
    const fetchMock = vi.fn(async () => {
      calls += 1;
      return calls === 1
        ? json({ success: false, data: null, message: "hết hạn", errors: [], code: "UNAUTHORIZED" }, 401)
        : json(okBody({ ok: true }));
    });
    const client = setup(fetchMock as unknown as typeof fetch);
    const refreshSession = vi.fn(async () => true);
    client.configure({ refreshSession });

    const res = await client.get<{ ok: boolean }>("/students");

    expect(res.data.ok).toBe(true);
    expect(refreshSession).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("401 không cứu được: gọi onUnauthorized và ném lỗi", async () => {
    const fetchMock = vi.fn(async () => json({ success: false, data: null, message: "x", errors: [], code: "UNAUTHORIZED" }, 401));
    const client = setup(fetchMock as unknown as typeof fetch);
    const onUnauthorized = vi.fn();
    client.configure({ refreshSession: async () => false, onUnauthorized });

    const err = (await client.get("/students").catch((e: unknown) => e)) as ApiError;

    expect(err.isUnauthorized).toBe(true);
    expect(onUnauthorized).toHaveBeenCalledTimes(1);
  });

  it("timeout → TIMEOUT", async () => {
    const fetchMock = vi.fn(
      (_url: string, init: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
        }),
    );
    const client = createApiClient({ baseUrl: "http://api.test", fetchImpl: fetchMock as unknown as typeof fetch, timeoutMs: 20 });
    const err = (await client.get("/slow").catch((e: unknown) => e)) as ApiError;
    expect(err.code).toBe("TIMEOUT");
  });
});
