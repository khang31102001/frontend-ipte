import type { Option } from "@/shared/domain/pte";
import { normalizeText } from "./list";
import { ok } from "./responses";
import { addRoutes } from "./router";

type Resolver = (params: { q?: string; parentId?: string }) => Option[];

const g = globalThis as unknown as { __pteMockLookups?: Map<string, Resolver> };
const resolvers: Map<string, Resolver> = (g.__pteMockLookups ??= new Map<string, Resolver>());

/** Mỗi module đăng ký lookup của mình; route /lookups/:name dùng chung. */
export function registerLookup(name: string, resolver: Resolver): void {
  resolvers.set(name, resolver);
}

export function registerLookupRoute(): void {
  addRoutes({
    method: "GET",
    pattern: "/lookups/:name",
    permission: "public", // cần đăng nhập, không cần quyền cụ thể
    handler: (req) => {
      const resolver = resolvers.get(req.params.name ?? "");
      if (!resolver) return ok<Option[]>([]);
      const q = req.query.get("q") ?? undefined;
      const parentId = req.query.get("parentId") ?? undefined;
      let options = resolver({ q, parentId });
      if (q) {
        const needle = normalizeText(q);
        options = options.filter((o) => normalizeText(o.label).includes(needle));
      }
      return ok(req.scenario === "empty" ? [] : options);
    },
  });
}
