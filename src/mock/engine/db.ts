import type { BaseEntity } from "@/core/api";

/**
 * Cơ sở dữ liệu trong bộ nhớ của Mock API.
 * Lưu trên `globalThis` để sống sót qua HMR/reload module của Next dev server.
 * Dữ liệu seed được tạo lười lần đầu truy cập từng collection.
 */
type Seeder = () => unknown[];

interface MockDbState {
  data: Map<string, unknown[]>;
  seeders: Map<string, Seeder>;
}

const g = globalThis as unknown as { __pteMockDb?: MockDbState };
const state: MockDbState = (g.__pteMockDb ??= { data: new Map(), seeders: new Map() });

export function registerCollection<T extends object>(name: string, seed: () => T[]): void {
  state.seeders.set(name, seed);
}

export function collection<T extends object = BaseEntity>(name: string): T[] {
  let items = state.data.get(name);
  if (!items) {
    const seed = state.seeders.get(name);
    if (!seed) throw new Error(`Mock collection chưa đăng ký: ${name}`);
    items = seed();
    state.data.set(name, items);
  }
  return items as T[];
}

export function findById<T extends { id: string }>(name: string, id: string): T | undefined {
  return collection<T>(name).find((x) => x.id === id);
}

export function insert<T extends { id: string }>(name: string, item: T): T {
  collection<T>(name).unshift(item);
  return item;
}

export function replaceById<T extends { id: string }>(name: string, id: string, next: T): T | undefined {
  const items = collection<T>(name);
  const index = items.findIndex((x) => x.id === id);
  if (index < 0) return undefined;
  items[index] = next;
  return next;
}

export function removeById(name: string, id: string): boolean {
  const items = collection<{ id: string }>(name);
  const index = items.findIndex((x) => x.id === id);
  if (index < 0) return false;
  items.splice(index, 1);
  return true;
}

/** Xóa toàn bộ dữ liệu đã thay đổi, lần truy cập sau sẽ seed lại. */
export function resetDb(): void {
  state.data.clear();
}

export function newId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

export const nowIso = () => new Date().toISOString();
