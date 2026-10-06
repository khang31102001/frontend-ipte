import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { apiClient } from "@/core/api";
import { Can } from "@/core/rbac";
import { AuthProvider, useAuth } from "./auth-provider";
import type { AuthAdapter, Session } from "./types";

const session: Session = {
  user: { id: "u1", name: "Nguyễn Quản Trị", email: "a@b.vn" },
  role: { id: "role-sales", name: "Sales" },
  permissions: ["student.view"],
};

function Probe() {
  const { status, session: s, refresh } = useAuth();
  return (
    <div>
      <p>status:{status}</p>
      <p>user:{s?.user.name ?? "-"}</p>
      <Can permission="student.view">
        <p>có quyền xem học viên</p>
      </Can>
      <Can permission="user.view">
        <p>có quyền xem người dùng</p>
      </Can>
      <button onClick={() => void refresh(true)}>refresh</button>
    </div>
  );
}

describe("<AuthProvider />", () => {
  it("nạp phiên từ adapter và cấp quyền cho toàn bộ cây giao diện", async () => {
    const adapter: AuthAdapter = { name: "test", getSession: vi.fn(async () => session) };
    render(
      <AuthProvider adapter={adapter}>
        <Probe />
      </AuthProvider>,
    );
    expect(screen.getByText("status:loading")).toBeInTheDocument();
    expect(await screen.findByText("status:authenticated")).toBeInTheDocument();
    expect(screen.getByText("user:Nguyễn Quản Trị")).toBeInTheDocument();
    expect(screen.getByText("có quyền xem học viên")).toBeInTheDocument();
    expect(screen.queryByText("có quyền xem người dùng")).not.toBeInTheDocument();
  });

  it("phiên null ⇒ unauthenticated; lỗi mạng ⇒ error", async () => {
    const none: AuthAdapter = { name: "none", getSession: async () => null };
    const first = render(
      <AuthProvider adapter={none}>
        <Probe />
      </AuthProvider>,
    );
    expect(await screen.findByText("status:unauthenticated")).toBeInTheDocument();
    first.unmount();

    const broken: AuthAdapter = {
      name: "broken",
      getSession: async () => {
        throw new Error("network");
      },
    };
    render(
      <AuthProvider adapter={broken}>
        <Probe />
      </AuthProvider>,
    );
    expect(await screen.findByText("status:error")).toBeInTheDocument();
  });

  it("nối adapter vào API client: gắn token và header, 401 không cứu được ⇒ unauthenticated", async () => {
    const onUnauthorized = vi.fn();
    const adapter: AuthAdapter = {
      name: "wired",
      getSession: async () => session,
      getAccessToken: () => "tok-1",
      getRequestHeaders: () => ({ "x-tenant": "pte" }),
      onUnauthorized,
    };
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async () =>
      new Response(JSON.stringify({ success: false, data: null, message: "hết hạn", errors: [], code: "UNAUTHORIZED" }), { status: 401 }),
    );
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://api.test/api";
    render(
      <AuthProvider adapter={adapter}>
        <Probe />
      </AuthProvider>,
    );
    await screen.findByText("status:authenticated");

    await apiClient.get("/students").catch(() => undefined);
    const [, init] = fetchSpy.mock.calls.at(-1) as unknown as [string, RequestInit];
    expect((init.headers as Headers).get("Authorization")).toBe("Bearer tok-1");
    expect((init.headers as Headers).get("x-tenant")).toBe("pte");
    await waitFor(() => expect(screen.getByText("status:unauthenticated")).toBeInTheDocument());
    expect(onUnauthorized).toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("refresh(silent) không chuyển sang loading và cập nhật quyền mới", async () => {
    let current: Session = session;
    const adapter: AuthAdapter = { name: "dyn", getSession: async () => current };
    render(
      <AuthProvider adapter={adapter}>
        <Probe />
      </AuthProvider>,
    );
    await screen.findByText("status:authenticated");
    current = { ...session, permissions: ["student.view", "user.view"] };
    await userEvent.click(screen.getByText("refresh"));
    expect(screen.queryByText("status:loading")).not.toBeInTheDocument();
    expect(await screen.findByText("có quyền xem người dùng")).toBeInTheDocument();
  });
});
