import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Can, PermissionProvider, usePermissions } from "./permission-context";

function Probe() {
  const { can, canAny, canAll } = usePermissions();
  return (
    <ul>
      <li>view:{String(can("student.view"))}</li>
      <li>delete:{String(can("student.delete"))}</li>
      <li>any:{String(canAny(["student.delete", "student.view"]))}</li>
      <li>all:{String(canAll(["student.delete", "student.view"]))}</li>
    </ul>
  );
}

describe("RBAC UI guard", () => {
  it("can / canAny / canAll dựa trên danh sách quyền", () => {
    render(
      <PermissionProvider permissions={["student.view"]}>
        <Probe />
      </PermissionProvider>,
    );
    expect(screen.getByText("view:true")).toBeInTheDocument();
    expect(screen.getByText("delete:false")).toBeInTheDocument();
    expect(screen.getByText("any:true")).toBeInTheDocument();
    expect(screen.getByText("all:false")).toBeInTheDocument();
  });

  it("<Can> chỉ hiển thị khi đủ quyền, có thể có fallback", () => {
    render(
      <PermissionProvider permissions={["student.view"]}>
        <Can permission="student.view">
          <span>Xem được</span>
        </Can>
        <Can permission="student.delete" fallback={<span>Không có quyền xóa</span>}>
          <span>Nút xóa</span>
        </Can>
        <Can anyOf={["course.view", "student.view"]}>
          <span>Một trong các quyền</span>
        </Can>
      </PermissionProvider>,
    );
    expect(screen.getByText("Xem được")).toBeInTheDocument();
    expect(screen.queryByText("Nút xóa")).not.toBeInTheDocument();
    expect(screen.getByText("Không có quyền xóa")).toBeInTheDocument();
    expect(screen.getByText("Một trong các quyền")).toBeInTheDocument();
  });

  it("usePermissions ngoài provider ném lỗi rõ ràng", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<Probe />)).toThrow(/PermissionProvider/);
    spy.mockRestore();
  });
});
