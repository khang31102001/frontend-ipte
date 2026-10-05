import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError, type CrudService, type ListQuery } from "@/core/api";

const toast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }));
vi.mock("sonner", () => ({ toast }));

import { createCrudHooks } from "./create-crud-hooks";

interface Item {
  id: string;
  name: string;
}

function makeService(overrides: Partial<CrudService<Item, { name: string }, { name: string }, ListQuery>> = {}) {
  const service: CrudService<Item, { name: string }, { name: string }, ListQuery> = {
    path: "/items",
    list: vi.fn(async () => ({ items: [{ id: "1", name: "A" }], meta: { page: 1, pageSize: 20, total: 1, totalPages: 1 } })),
    get: vi.fn(async (id: string) => ({ id, name: "A" })),
    create: vi.fn(async (input) => ({ id: "2", ...input })),
    update: vi.fn(async (id, input) => ({ id, ...input })),
    remove: vi.fn(async () => undefined),
    ...overrides,
  };
  return service;
}

function setup(service = makeService()) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  const hooks = createCrudHooks({ name: "items", service, label: "mục" });
  return { client, wrapper, hooks, service };
}

beforeEach(() => {
  toast.success.mockClear();
  toast.error.mockClear();
});

describe("createCrudHooks", () => {
  it("useList gọi service.list với query và trả dữ liệu", async () => {
    const { wrapper, hooks, service } = setup();
    const { result } = renderHook(() => hooks.useList({ page: 2, q: "a" }), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.items).toHaveLength(1);
    expect(service.list).toHaveBeenCalledWith({ page: 2, q: "a" }, expect.objectContaining({ signal: expect.anything() }));
  });

  it("useDetail không chạy khi chưa có id", () => {
    const { wrapper, hooks, service } = setup();
    renderHook(() => hooks.useDetail(undefined), { wrapper });
    expect(service.get).not.toHaveBeenCalled();
  });

  it("useCreate: invalidate danh sách, toast thành công và gọi onSuccess", async () => {
    const { wrapper, hooks, client } = setup();
    const invalidate = vi.spyOn(client, "invalidateQueries");
    const onSuccess = vi.fn();
    const { result } = renderHook(() => hooks.useCreate({ onSuccess }), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ name: "B" });
    });
    expect(toast.success).toHaveBeenCalledWith("Đã tạo mục");
    expect(invalidate).toHaveBeenCalledWith({ queryKey: hooks.keys.lists() });
    expect(onSuccess).toHaveBeenCalledWith({ id: "2", name: "B" });
  });

  it("useUpdate cập nhật cache chi tiết; useRemove xóa cache chi tiết", async () => {
    const { wrapper, hooks, client } = setup();
    const update = renderHook(() => hooks.useUpdate(), { wrapper });
    await act(async () => {
      await update.result.current.mutateAsync({ id: "1", input: { name: "Mới" } });
    });
    expect(client.getQueryData(hooks.keys.detail("1"))).toEqual({ id: "1", name: "Mới" });

    const remove = renderHook(() => hooks.useRemove(), { wrapper });
    await act(async () => {
      await remove.result.current.mutateAsync("1");
    });
    expect(client.getQueryData(hooks.keys.detail("1"))).toBeUndefined();
    expect(toast.success).toHaveBeenCalledWith("Đã xóa mục");
  });

  it("lỗi validation không toast (form tự hiển thị); lỗi khác toast thông báo của server", async () => {
    const validation = new ApiError({ message: "Dữ liệu không hợp lệ", status: 422, code: "VALIDATION_ERROR", errors: [{ field: "name", message: "x" }] });
    const { wrapper, hooks } = setup(makeService({ create: vi.fn(async () => { throw validation; }) }));
    const a = renderHook(() => hooks.useCreate(), { wrapper });
    await act(async () => {
      await a.result.current.mutateAsync({ name: "" }).catch(() => undefined);
    });
    expect(toast.error).not.toHaveBeenCalled();

    const conflict = new ApiError({ message: "Đã tồn tại", status: 409, code: "CONFLICT" });
    const b = setup(makeService({ create: vi.fn(async () => { throw conflict; }) }));
    const rb = renderHook(() => b.hooks.useCreate(), { wrapper: b.wrapper });
    await act(async () => {
      await rb.result.current.mutateAsync({ name: "x" }).catch(() => undefined);
    });
    expect(toast.error).toHaveBeenCalledWith("Đã tồn tại");
  });
});
