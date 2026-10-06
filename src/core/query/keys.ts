/**
 * Query key factory chuẩn. Dùng chung để invalidate nhất quán:
 *   const keys = createQueryKeys("students");
 *   keys.list({ page: 1 })  → ["students", "list", { page: 1 }]
 *   keys.all                → ["students"]   (invalidate toàn bộ module)
 */
export function createQueryKeys<TName extends string>(name: TName) {
  return {
    all: [name] as const,
    lists: () => [name, "list"] as const,
    list: (query?: object) => [name, "list", query ?? {}] as const,
    details: () => [name, "detail"] as const,
    detail: (id: string) => [name, "detail", id] as const,
    custom: (...parts: readonly unknown[]) => [name, ...parts] as const,
  };
}

export type QueryKeys = ReturnType<typeof createQueryKeys>;
