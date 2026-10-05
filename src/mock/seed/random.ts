/**
 * Bộ sinh dữ liệu giả có seed (deterministic): mỗi lần khởi động Mock API cho ra cùng một bộ dữ liệu,
 * giúp test UI ổn định và dễ tái hiện lỗi.
 */
export function createRng(seed: number) {
  let s = seed >>> 0;
  const next = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (min: number, max: number) => Math.floor(next() * (max - min + 1)) + min;
  const pick = <T>(arr: readonly T[]): T => arr[int(0, arr.length - 1)] as T;
  const chance = (p: number) => next() < p;
  const pickMany = <T>(arr: readonly T[], min: number, max: number): T[] => {
    const count = Math.min(arr.length, int(min, max));
    const copy = [...arr];
    const out: T[] = [];
    while (out.length < count && copy.length) out.push(copy.splice(int(0, copy.length - 1), 1)[0] as T);
    return out;
  };
  return { next, int, pick, pickMany, chance };
}

export type Rng = ReturnType<typeof createRng>;

/** Mốc "hiện tại" cố định để dữ liệu seed không trôi theo ngày chạy. Dùng làm gốc tính ngày. */
export const SEED_NOW = new Date("2026-10-01T08:00:00.000Z").getTime();
const DAY = 86_400_000;

export const isoDaysAgo = (days: number) => new Date(SEED_NOW - days * DAY).toISOString();
export const isoDaysAhead = (days: number) => new Date(SEED_NOW + days * DAY).toISOString();
export const dateOnlyAhead = (days: number) => isoDaysAhead(days).slice(0, 10);

export const pad = (n: number, width = 3) => String(n).padStart(width, "0");

const LAST_NAMES = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý"];
const MIDDLE_NAMES_F = ["Thị", "Ngọc", "Thu", "Minh", "Khánh", "Bảo", "Phương", "Hồng", "Thanh"];
const MIDDLE_NAMES_M = ["Văn", "Minh", "Quốc", "Hữu", "Đức", "Gia", "Anh", "Thành", "Tuấn"];
const FIRST_NAMES_F = ["Linh", "Trang", "Hương", "Lan", "Mai", "Hà", "Thảo", "Ngọc", "Vy", "Nhi", "Châu", "Yến", "Quyên", "Hạnh", "Uyên"];
const FIRST_NAMES_M = ["Hùng", "Nam", "Long", "Khoa", "Phúc", "Dũng", "Huy", "Sơn", "Tín", "Bình", "Đạt", "Hiếu", "Thịnh", "Khải", "Toàn"];

export function stripVietnamese(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export function vietnameseName(rng: Rng): { fullName: string; gender: "female" | "male" } {
  const female = rng.chance(0.55);
  const last = rng.pick(LAST_NAMES);
  const middle = rng.pick(female ? MIDDLE_NAMES_F : MIDDLE_NAMES_M);
  const first = rng.pick(female ? FIRST_NAMES_F : FIRST_NAMES_M);
  return { fullName: `${last} ${middle} ${first}`, gender: female ? "female" : "male" };
}

export function emailFor(fullName: string, n: number, domain = "gmail.com"): string {
  const parts = stripVietnamese(fullName).toLowerCase().split(/\s+/);
  const first = parts[parts.length - 1] ?? "user";
  const initials = parts.slice(0, -1).map((p) => p[0]).join("");
  return `${first}.${initials}${n}@${domain}`;
}

export function phoneFor(rng: Rng): string {
  const prefix = rng.pick(["090", "091", "093", "097", "098", "032", "033", "070", "077", "081", "088"]);
  return `${prefix}${rng.int(1_000_000, 9_999_999)}`;
}
