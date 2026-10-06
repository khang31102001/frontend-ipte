import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PermissionProvider } from "@/core/rbac";
import { RequirePermission } from "./require-permission";

describe("<RequirePermission />", () => {
  it("chặn nội dung và hiển thị trạng thái không có quyền khi thiếu quyền", () => {
    render(
      <PermissionProvider permissions={["student.view"]}>
        <RequirePermission permission="user.view">
          <span>Danh sách người dùng</span>
        </RequirePermission>
      </PermissionProvider>,
    );
    expect(screen.queryByText("Danh sách người dùng")).not.toBeInTheDocument();
    expect(screen.getByText("Bạn không có quyền truy cập")).toBeInTheDocument();
  });

  it("hiển thị nội dung khi đủ quyền hoặc có một trong các quyền (anyOf)", () => {
    render(
      <PermissionProvider permissions={["student.view", "course.view"]}>
        <RequirePermission permission="student.view">
          <span>Học viên</span>
        </RequirePermission>
        <RequirePermission anyOf={["user.view", "course.view"]}>
          <span>Khóa học</span>
        </RequirePermission>
      </PermissionProvider>,
    );
    expect(screen.getByText("Học viên")).toBeInTheDocument();
    expect(screen.getByText("Khóa học")).toBeInTheDocument();
  });
});
