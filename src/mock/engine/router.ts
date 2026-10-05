import type { MockMethod, MockRoute } from "./types";

interface CompiledRoute {
  route: MockRoute;
  regex: RegExp;
  keys: string[];
}

interface RegistryState {
  routes: CompiledRoute[];
}

const g = globalThis as unknown as { __pteMockRegistry?: RegistryState };
const registry: RegistryState = (g.__pteMockRegistry ??= { routes: [] });

function compile(pattern: string): { regex: RegExp; keys: string[] } {
  const keys: string[] = [];
  const source = pattern
    .replace(/\/+$/, "")
    .split("/")
    .map((seg) => {
      if (seg.startsWith(":")) {
        keys.push(seg.slice(1));
        return "([^/]+)";
      }
      return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");
  return { regex: new RegExp(`^${source}/?$`), keys };
}

export function clearRoutes(): void {
  registry.routes = [];
}

export function addRoutes(...routes: MockRoute[]): void {
  for (const route of routes) {
    // Route tĩnh phải được ưu tiên hơn route có tham số (ví dụ /students/export vs /students/:id).
    const compiled = { route, ...compile(route.pattern) };
    const firstDynamic = registry.routes.findIndex((r) => r.keys.length > 0 && compiled.keys.length === 0);
    if (firstDynamic >= 0 && compiled.keys.length === 0) registry.routes.splice(firstDynamic, 0, compiled);
    else registry.routes.push(compiled);
  }
}

export type MatchResult =
  | { kind: "match"; route: MockRoute; params: Record<string, string> }
  | { kind: "method-not-allowed" }
  | { kind: "not-found" };

export function matchRoute(method: MockMethod, path: string): MatchResult {
  let pathMatched = false;
  for (const { route, regex, keys } of registry.routes) {
    const m = regex.exec(path);
    if (!m) continue;
    pathMatched = true;
    if (route.method !== method) continue;
    const params: Record<string, string> = {};
    keys.forEach((k, i) => {
      params[k] = decodeURIComponent(m[i + 1] ?? "");
    });
    return { kind: "match", route, params };
  }
  return pathMatched ? { kind: "method-not-allowed" } : { kind: "not-found" };
}

export function routeCount(): number {
  return registry.routes.length;
}

/** Mô tả các route đã đăng ký (phục vụ tài liệu hóa contract và debug). */
export function describeRoutes(): { method: MockMethod; pattern: string; permission: string; anonymous: boolean }[] {
  return registry.routes.map(({ route }) => ({
    method: route.method,
    pattern: route.pattern,
    permission: route.permission,
    anonymous: Boolean(route.anonymous),
  }));
}
