export type DiffKind = "added" | "removed" | "changed" | "unchanged";

export interface DiffEntry {
  /** Đường dẫn field, ví dụ "profile.targetScore" hoặc "tags[1]". */
  path: string;
  before: unknown;
  after: unknown;
  kind: DiffKind;
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isNil = (v: unknown): v is null | undefined => v === null || v === undefined;
const isPrimitiveArray = (v: unknown[]) => v.every((x) => typeof x !== "object" || x === null);

function leafKind(before: unknown, after: unknown): DiffKind {
  if (isNil(before) && isNil(after)) return "unchanged";
  if (isNil(before)) return "added";
  if (isNil(after)) return "removed";
  return before === after ? "unchanged" : "changed";
}

/**
 * So sánh hai giá trị JSON theo từng field (đệ quy), trả về danh sách phẳng.
 * `null/undefined` coi như "không có": tạo mới ⇒ mọi field "added", xóa ⇒ mọi field "removed".
 * Dùng cho màn hình Audit Log để hiển thị trước/sau một thao tác.
 */
export function diffValues(before: unknown, after: unknown, path = ""): DiffEntry[] {
  const beforeIsObjectLike = isObject(before) || isNil(before);
  const afterIsObjectLike = isObject(after) || isNil(after);

  if (beforeIsObjectLike && afterIsObjectLike && !(isNil(before) && isNil(after))) {
    const b = isObject(before) ? before : {};
    const a = isObject(after) ? after : {};
    const keys = [...new Set([...Object.keys(b), ...Object.keys(a)])].sort();
    return keys.flatMap((k) => diffValues(b[k], a[k], path ? `${path}.${k}` : k));
  }

  if (Array.isArray(before) || Array.isArray(after)) {
    const b = Array.isArray(before) ? before : [];
    const a = Array.isArray(after) ? after : [];
    if (isPrimitiveArray(b) && isPrimitiveArray(a)) {
      const same = JSON.stringify(b) === JSON.stringify(a);
      const kind: DiffKind = same ? "unchanged" : b.length === 0 ? "added" : a.length === 0 ? "removed" : "changed";
      return [{ path, before, after, kind }];
    }
    return Array.from({ length: Math.max(b.length, a.length) }, (_, i) => diffValues(b[i], a[i], `${path}[${i}]`)).flat();
  }

  return [{ path, before, after, kind: leafKind(before, after) }];
}

/** Chỉ các thay đổi thật sự (bỏ unchanged). */
export const changedEntries = (before: unknown, after: unknown): DiffEntry[] =>
  diffValues(before, after).filter((e) => e.kind !== "unchanged" && e.path !== "");
