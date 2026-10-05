import { describe, expect, it } from "vitest";
import { ALL_PERMISSIONS, RESOURCE_ACTIONS, hasPermission, isPermission, parsePermission } from "./permissions";

describe("permissions", () => {
  it("sinh đủ quyền resource.action từ danh mục", () => {
    const expected = Object.values(RESOURCE_ACTIONS).reduce((sum, actions) => sum + actions.length, 0);
    expect(ALL_PERMISSIONS).toHaveLength(expected);
    expect(ALL_PERMISSIONS).toContain("student.view");
    expect(ALL_PERMISSIONS).toContain("article.approve");
  });

  it("không có quyền trùng lặp", () => {
    expect(new Set(ALL_PERMISSIONS).size).toBe(ALL_PERMISSIONS.length);
  });

  it("isPermission / parsePermission", () => {
    expect(isPermission("student.export")).toBe(true);
    expect(isPermission("student.fly")).toBe(false);
    expect(parsePermission("course.edit")).toEqual({ resource: "course", action: "edit" });
  });

  it("hasPermission hoạt động với Set và mảng", () => {
    expect(hasPermission(new Set(["student.view"]), "student.view")).toBe(true);
    expect(hasPermission(["student.view"], "student.delete")).toBe(false);
  });
});
