#!/usr/bin/env node
/**
 * Sinh docs/api-endpoints.md từ danh sách route của Mock API đang chạy.
 *   1. npm run dev
 *   2. node scripts/generate-api-docs.mjs [baseUrl]
 * Contract chi tiết của từng DTO nằm ở src/features/<name>/{types,schemas}.ts (nguồn sự thật duy nhất).
 */
import { writeFileSync } from "node:fs";

const base = (process.argv[2] ?? "http://localhost:3000/api").replace(/\/+$/, "");
const res = await fetch(`${base}/__mock/routes`);
if (!res.ok) {
  console.error(`Không lấy được danh sách route (${res.status}). Mock API đã bật (MOCK_API_ENABLED=true) chưa?`);
  process.exit(1);
}
const { data: routes } = await res.json();

const groups = new Map();
for (const r of routes.filter((r) => !r.pattern.startsWith("/__mock"))) {
  const seg = r.pattern.split("/").filter(Boolean)[0] ?? "root";
  const list = groups.get(seg) ?? [];
  list.push(r);
  groups.set(seg, list);
}

const order = { GET: 0, POST: 1, PUT: 2, PATCH: 3, DELETE: 4 };
let md = `# API Endpoints\n\n> Sinh tự động bởi \`scripts/generate-api-docs.mjs\` (${new Date().toISOString().slice(0, 10)}). Tổng ${routes.length - 2} endpoint.\n\n`;
md += "Quy ước chung xem [api-contract.md](./api-contract.md). Cột **Quyền** là quyền backend phải kiểm tra (`resource.action`); `public` = chỉ cần đăng nhập, `anonymous` = không cần đăng nhập.\n\n";

for (const [name, list] of [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  md += `## /${name}\n\n| Method | Endpoint | Quyền |\n|---|---|---|\n`;
  for (const r of list.sort((a, b) => a.pattern.localeCompare(b.pattern) || order[a.method] - order[b.method])) {
    md += `| ${r.method} | \`${r.pattern}\` | ${r.anonymous ? "anonymous" : `\`${r.permission}\``} |\n`;
  }
  md += "\n";
}

writeFileSync(new URL("../docs/api-endpoints.md", import.meta.url), md);
console.log(`Đã ghi docs/api-endpoints.md (${routes.length - 2} endpoint, ${groups.size} nhóm)`);
