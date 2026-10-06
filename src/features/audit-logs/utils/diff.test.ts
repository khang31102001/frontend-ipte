import { describe, expect, it } from "vitest";
import { changedEntries, diffValues } from "./diff";

describe("diffValues / changedEntries", () => {
  it("phát hiện field thay đổi, thêm, xóa ở mọi cấp", () => {
    const before = { name: "A", level: { score: 50 }, tags: ["x", "y"], gone: 1 };
    const after = { name: "B", level: { score: 65 }, tags: ["x"], added: true };
    const changes = Object.fromEntries(changedEntries(before, after).map((e) => [e.path, e.kind]));
    expect(changes).toEqual({
      name: "changed",
      "level.score": "changed",
      tags: "changed",
      gone: "removed",
      added: "added",
    });
  });

  it("tạo mới (before = null): mọi field đều là added; xóa (after = null): removed", () => {
    expect(changedEntries(null, { a: 1, b: { c: 2 } }).map((e) => `${e.path}:${e.kind}`)).toEqual(["a:added", "b.c:added"]);
    expect(changedEntries({ a: 1 }, null).map((e) => `${e.path}:${e.kind}`)).toEqual(["a:removed"]);
  });

  it("không có thay đổi ⇒ rỗng; null và undefined coi như nhau", () => {
    expect(changedEntries({ a: 1, b: null }, { a: 1, b: undefined })).toEqual([]);
    expect(changedEntries(null, null)).toEqual([]);
  });

  it("mảng đối tượng được so sánh theo chỉ số", () => {
    const before = { steps: [{ title: "A" }, { title: "B" }] };
    const after = { steps: [{ title: "A" }, { title: "C" }, { title: "D" }] };
    expect(changedEntries(before, after).map((e) => `${e.path}:${e.kind}`)).toEqual(["steps[1].title:changed", "steps[2].title:added"]);
  });

  it("giá trị nguyên thủy khác kiểu", () => {
    expect(diffValues(1, "1")).toEqual([{ path: "", before: 1, after: "1", kind: "changed" }]);
  });
});
