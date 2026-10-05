import type { SortOrder } from "@/core/api";
import { buildMeta, ok } from "./responses";
import type { MockRequest, MockResult } from "./types";

export interface ListConfig<T> {
  /** Các field tìm kiếm văn bản (không phân biệt hoa/thường và dấu tiếng Việt). */
  searchFields?: readonly (keyof T & string)[];
  /** Hàm tạo chuỗi tìm kiếm tùy biến (dùng thay/kèm searchFields). */
  searchText?: (item: T) => string;
  /**
   * Bộ lọc theo query param.
   * - string: so sánh bằng với field cùng tên của item (hỗ trợ field mảng và nhiều giá trị "a,b").
   * - function: tùy biến.
   */
  filters?: Record<string, string | ((item: T, value: string) => boolean)>;
  /** Các field được phép sắp xếp. Mặc định: mọi field gốc. */
  sortable?: readonly string[];
  defaultSort?: { sortBy: string; sortOrder: SortOrder };
}

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

function getField(item: unknown, key: string): unknown {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[part];
    return undefined;
  }, item);
}

function compare(a: unknown, b: unknown): number {
  if (a === b) return 0;
  if (a === undefined || a === null) return 1;
  if (b === undefined || b === null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (typeof a === "boolean" && typeof b === "boolean") return Number(a) - Number(b);
  return String(a).localeCompare(String(b), "vi", { numeric: true, sensitivity: "base" });
}

function matchesEquals(itemValue: unknown, filterValue: string): boolean {
  const wanted = filterValue.split(",").map((s) => s.trim()).filter(Boolean);
  if (wanted.length === 0) return true;
  if (Array.isArray(itemValue)) return itemValue.some((v) => wanted.includes(String(v)));
  return wanted.includes(String(itemValue));
}

/** Áp search/filter/sort/phân trang lên mảng dữ liệu rồi trả về envelope chuẩn. */
export function queryList<T extends object>(items: readonly T[], req: MockRequest, cfg: ListConfig<T> = {}): MockResult {
  const sp = req.query;
  const page = Math.max(1, Number(sp.get("page")) || 1);
  const pageSize = Math.min(200, Math.max(1, Number(sp.get("pageSize")) || 20));

  if (req.scenario === "empty") {
    return ok([], { meta: buildMeta(1, pageSize, 0) });
  }

  let result = [...items];

  const q = sp.get("q")?.trim();
  if (q && (cfg.searchFields || cfg.searchText)) {
    const needle = normalizeText(q);
    result = result.filter((item) => {
      const hay = [
        ...(cfg.searchFields ?? []).map((f) => String(getField(item, f) ?? "")),
        cfg.searchText?.(item) ?? "",
      ].join(" ");
      return normalizeText(hay).includes(needle);
    });
  }

  for (const [param, rule] of Object.entries(cfg.filters ?? {})) {
    const value = sp.get(param);
    if (!value) continue;
    result =
      typeof rule === "function"
        ? result.filter((item) => rule(item, value))
        : result.filter((item) => matchesEquals(getField(item, rule), value));
  }

  const sortBy = sp.get("sortBy") ?? cfg.defaultSort?.sortBy;
  if (sortBy && (!cfg.sortable || cfg.sortable.includes(sortBy))) {
    const rawOrder = sp.get("sortOrder");
    const order: SortOrder =
      rawOrder === "asc" || rawOrder === "desc" ? rawOrder : (cfg.defaultSort?.sortOrder ?? "asc");
    const dir = order === "asc" ? 1 : -1;
    result.sort((a, b) => dir * compare(getField(a, sortBy), getField(b, sortBy)));
  }

  const total = result.length;
  const start = (page - 1) * pageSize;
  return ok(result.slice(start, start + pageSize), { meta: buildMeta(page, pageSize, total) });
}
