import { describe, expect, it } from "vitest";
import { toCsv } from "./csv";
import { formatDate, formatVnd, initials, slugify, toDateInputValue } from "./format";
import { notifyApiError } from "./notify";
import { toQueryString } from "@/core/api";

describe("csv", () => {
  it("thêm BOM, escape dấu phẩy/ngoặc kép/xuống dòng, bỏ null", () => {
    const csv = toCsv(
      [
        { name: 'Nguyễn "An", Văn', note: "dòng 1\ndòng 2", score: 65 },
        { name: "Bình", note: null as string | null, score: 0 },
      ],
      [
        { header: "Họ tên", value: (r) => r.name },
        { header: "Ghi chú", value: (r) => r.note },
        { header: "Điểm", value: (r) => r.score },
      ],
    );
    expect(csv.startsWith("﻿")).toBe(true);
    const lines = csv.slice(1).split("\r\n");
    expect(lines[0]).toBe("Họ tên,Ghi chú,Điểm");
    expect(lines[1]).toBe('"Nguyễn ""An"", Văn","dòng 1\ndòng 2",65');
    expect(lines[2]).toBe("Bình,,0");
  });
});

describe("format", () => {
  it("slugify bỏ dấu tiếng Việt, đ → d", () => {
    expect(slugify("Luyện thi PTE 50 – Du học & visa 482")).toBe("luyen-thi-pte-50-du-hoc-visa-482");
    expect(slugify("  Đặng Văn Đức  ")).toBe("dang-van-duc");
  });
  it("initials", () => {
    expect(initials("Nguyễn Thị Lan")).toBe("NL");
    expect(initials("An")).toBe("A");
    expect(initials("  ")).toBe("?");
  });
  it("định dạng ngày/tiền xử lý giá trị rỗng và không hợp lệ", () => {
    expect(formatDate(null)).toBe("—");
    expect(formatDate("không phải ngày")).toBe("—");
    expect(formatDate("2026-10-05T00:00:00Z")).toMatch(/05\/10\/2026/);
    expect(formatVnd(undefined)).toBe("—");
    expect(formatVnd(13500000)).toMatch(/13\.500\.000/);
    expect(toDateInputValue("2026-10-05T12:00:00Z")).toBe("2026-10-05");
  });
});

describe("query string", () => {
  it("bỏ giá trị rỗng, lặp key với mảng, mã hóa ký tự đặc biệt", () => {
    expect(toQueryString({ q: "an & bình", page: 2, empty: "", nil: null, ids: ["a", "b"], flag: false })).toBe(
      "?q=an+%26+b%C3%ACnh&page=2&ids=a&ids=b&flag=false",
    );
    expect(toQueryString({})).toBe("");
    expect(toQueryString(undefined)).toBe("");
  });
});

describe("notifyApiError", () => {
  it("tồn tại và không ném lỗi với lỗi bất kỳ", () => {
    expect(() => notifyApiError(new Error("x"))).not.toThrow();
  });
});
