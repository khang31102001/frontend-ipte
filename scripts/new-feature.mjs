#!/usr/bin/env node
/**
 * Sinh khung một module CRUD mới theo đúng kiến trúc (types → schemas → service → hooks → trang danh sách
 * + dialog form → route → mock API) và tự đăng ký vào RBAC, eslint boundaries, mock registry, routes.
 *
 *   node scripts/new-feature.mjs <ten-kebab> --noun "mã giảm giá" --title "Mã giảm giá" [--entity DiscountCode]
 *
 * Ví dụ: node scripts/new-feature.mjs discount-codes --noun "mã giảm giá" --title "Mã giảm giá"
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const name = args[0];
const flag = (key) => {
  const i = args.indexOf(`--${key}`);
  return i >= 0 ? args[i + 1] : undefined;
};

if (!name || !/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)) {
  console.error('Cách dùng: node scripts/new-feature.mjs <ten-kebab> --noun "mã giảm giá" --title "Mã giảm giá" [--entity DiscountCode]');
  process.exit(1);
}

const pascal = (s) => s.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");
const camel = (s) => pascal(s)[0].toLowerCase() + pascal(s).slice(1);
const singularKebab = name.endsWith("ies") ? `${name.slice(0, -3)}y` : name.endsWith("s") ? name.slice(0, -1) : name;
const Entity = flag("entity") ?? pascal(singularKebab);
const entityVar = camel(singularKebab);
const Plural = pascal(name);
const resource = name.replace(/-/g, "_");
const noun = flag("noun") ?? name.replace(/-/g, " ");
const title = flag("title") ?? noun[0].toUpperCase() + noun.slice(1);
const collectionKey = camel(name);
const routeKey = camel(name);
const idPrefix = singularKebab.replace(/-/g, "").slice(0, 3);

const featureDir = join(root, "src/features", name);
if (existsSync(featureDir)) {
  console.error(`Feature "${name}" đã tồn tại: ${featureDir}`);
  process.exit(1);
}

const write = (rel, content) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log(`  + ${rel}`);
};

const patch = (rel, fn, label) => {
  const file = join(root, rel);
  const before = readFileSync(file, "utf8");
  const after = fn(before);
  if (after === before) {
    console.warn(`  ! Không tự cập nhật được ${rel} (${label}). Hãy thêm thủ công.`);
    return;
  }
  writeFileSync(file, after);
  console.log(`  ~ ${rel} (${label})`);
};

console.log(`\nTạo feature "${name}" (${Entity}, resource RBAC "${resource}")\n`);

// ── 1. Contract: types + schemas ───────────────────────────────────────────
write(
  `src/features/${name}/types.ts`,
  `import type { BaseEntity, ListQuery } from "@/core/api";

export const ${resource.toUpperCase()}_STATUSES = ["active", "inactive"] as const;
export type ${Entity}Status = (typeof ${resource.toUpperCase()}_STATUSES)[number];
export const ${resource.toUpperCase()}_STATUS_LABELS: Record<${Entity}Status, string> = {
  active: "Đang dùng",
  inactive: "Tạm tắt",
};

export interface ${Entity} extends BaseEntity {
  name: string;
  description?: string;
  status: ${Entity}Status;
}

export interface ${Entity}Query extends ListQuery {
  status?: ${Entity}Status;
}
`,
);

write(
  `src/features/${name}/schemas.ts`,
  `import { requiredString, z } from "@/core/validation";
import { ${resource.toUpperCase()}_STATUSES } from "./types";

export const ${entityVar}Schema = z.object({
  name: requiredString("Vui lòng nhập tên").max(120, "Tối đa 120 ký tự"),
  description: z
    .string()
    .trim()
    .max(500, "Tối đa 500 ký tự")
    .optional()
    .transform((v) => v || undefined),
  status: z.enum(${resource.toUpperCase()}_STATUSES),
});
export type ${Entity}Input = z.infer<typeof ${entityVar}Schema>;
export type ${Entity}FormValues = z.input<typeof ${entityVar}Schema>;
`,
);

// ── 2. Service → hooks ─────────────────────────────────────────────────────
write(
  `src/features/${name}/services/${singularKebab}-service.ts`,
  `import { createCrudService } from "@/core/api";
import type { ${Entity}Input } from "../schemas";
import type { ${Entity}, ${Entity}Query } from "../types";

export const ${entityVar}Service = createCrudService<${Entity}, ${Entity}Input, ${Entity}Input, ${Entity}Query>("/${name}");
`,
);

write(
  `src/features/${name}/hooks/use-${name}.ts`,
  `"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { ${entityVar}Service } from "../services/${singularKebab}-service";

const hooks = createCrudHooks({ name: "${name}", service: ${entityVar}Service, label: "${noun}" });
export const use${Plural} = hooks.useList;
export const use${Entity} = hooks.useDetail;
export const useCreate${Entity} = hooks.useCreate;
export const useUpdate${Entity} = hooks.useUpdate;
export const useDelete${Entity} = hooks.useRemove;
`,
);

// ── 3. UI: danh sách + dialog form ─────────────────────────────────────────
write(
  `src/features/${name}/components/${name}-page.tsx`,
  `"use client";

import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { toOptions } from "@/shared/domain/pte";
import { Form, FormModal, createFormFields, useEntityForm } from "@/shared/form";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDate } from "@/shared/lib/format";
import { Badge } from "@/shared/ui";
import { useCreate${Entity}, useDelete${Entity}, use${Plural}, useUpdate${Entity} } from "../hooks/use-${name}";
import { ${entityVar}Schema, type ${Entity}FormValues } from "../schemas";
import { ${resource.toUpperCase()}_STATUS_LABELS, type ${Entity}, type ${Entity}Query } from "../types";

const F = createFormFields<${Entity}FormValues>();

type FilterKey = "status";

function use${Plural}List(query: ListParams<FilterKey>) {
  return use${Plural}(query as ${Entity}Query);
}

const columns: Column<${Entity}>[] = [
  {
    key: "name",
    header: "${title}",
    sortKey: "name",
    className: "min-w-[240px]",
    cell: (x) => (
      <span>
        <span className="block font-medium text-gray-800 dark:text-white/90">{x.name}</span>
        {x.description && <span className="block text-theme-xs text-gray-500">{x.description}</span>}
      </span>
    ),
  },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (x) => <Badge color={x.status === "active" ? "success" : "gray"}>{${resource.toUpperCase()}_STATUS_LABELS[x.status]}</Badge> },
  { key: "createdAt", header: "Ngày tạo", sortKey: "createdAt", hideBelow: "md", cell: (x) => formatDate(x.createdAt) },
];

function ${Entity}Dialog({ item, open, onClose }: { item: ${Entity} | null; open: boolean; onClose: () => void }) {
  const create = useCreate${Entity}();
  const update = useUpdate${Entity}();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: ${entityVar}Schema,
    entity: item,
    defaults: { name: "", description: "", status: "active" },
    toValues: (x) => ({ name: x.name, description: x.description ?? "", status: x.status }),
    resetKey: open,
    create: (v) => create.mutateAsync(v),
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved: onClose,
  });
  return (
    <FormModal open={open} onClose={onClose} title={isEdit ? "Sửa ${noun}" : "Thêm ${noun}"} formId="${name}-form" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="${name}-form">
        <F.Input name="name" label="Tên" required />
        <F.Textarea name="description" label="Mô tả" rows={3} />
        <F.Select name="status" label="Trạng thái" options={toOptions(${resource.toUpperCase()}_STATUS_LABELS)} />
      </Form>
    </FormModal>
  );
}

export function ${Plural}Page() {
  const dialog = useDialogState<${Entity}>();
  const filters: FilterDef<FilterKey>[] = [{ key: "status", label: "Trạng thái", options: toOptions(${resource.toUpperCase()}_STATUS_LABELS) }];
  return (
    <>
      <CrudListPage<${Entity}, FilterKey>
        title="${title}"
        resource="${resource}"
        noun="${noun}"
        useList={use${Plural}List}
        useRemove={useDelete${Entity}}
        columns={columns}
        filters={filters}
        defaultSort={{ sortBy: "createdAt", sortOrder: "desc" }}
        getRowLabel={(x) => x.name}
        onCreate={dialog.openCreate}
        onEdit={dialog.openEdit}
      />
      <${Entity}Dialog item={dialog.editing} open={dialog.open} onClose={dialog.close} />
    </>
  );
}
`,
);

write(`src/features/${name}/index.ts`, `export { ${Plural}Page } from "./components/${name}-page";\nexport type { ${Entity} } from "./types";\n`);

write(
  `src/app/(admin)/admin/${name}/page.tsx`,
  `import type { Metadata } from "next";
import { ${Plural}Page } from "@/features/${name}";

export const metadata: Metadata = { title: "${title}" };

export default function Page() {
  return <${Plural}Page />;
}
`,
);

// ── 4. Mock API (dùng chung contract) ──────────────────────────────────────
write(
  `src/mock/modules/${name}.ts`,
  `import { ${entityVar}Schema, type ${Entity}Input } from "@/features/${name}/schemas";
import type { ${Entity} } from "@/features/${name}/types";
import { COLLECTIONS } from "../collections";
import { registerCollection } from "../engine/db";
import { defineResource } from "../engine/resource";
import { addRoutes } from "../engine/router";
import { isoDaysAgo } from "../seed/random";

const COLLECTION = COLLECTIONS.${collectionKey};

function seed(): ${Entity}[] {
  return Array.from({ length: 6 }, (_, i) => ({
    id: \`${idPrefix}-\${String(i + 1).padStart(3, "0")}\`,
    name: \`${title} mẫu \${i + 1}\`,
    description: "Dữ liệu mẫu do script new-feature sinh ra.",
    status: i % 4 === 3 ? "inactive" : "active",
    createdAt: isoDaysAgo(60 - i * 5),
    updatedAt: isoDaysAgo(i),
  }));
}

export function register${Plural}Module(): void {
  registerCollection<${Entity}>(COLLECTION, seed);
  addRoutes(
    ...defineResource<${Entity}, ${Entity}Input>({
      path: "/${name}",
      permission: "${resource}",
      collection: COLLECTION,
      idPrefix: "${idPrefix}",
      label: "${noun}",
      entityName: (x) => x.name,
      createSchema: ${entityVar}Schema,
      list: {
        searchFields: ["name", "description"],
        filters: { status: "status" },
        sortable: ["name", "status", "createdAt"],
        defaultSort: { sortBy: "createdAt", sortOrder: "desc" },
      },
      unique: [{ field: "name", message: "Tên đã tồn tại" }],
      merge: (current, input) => ({ ...current, ...input }),
    }),
  );
}
`,
);

// ── 5. Đăng ký vào các điểm trung tâm ──────────────────────────────────────
patch(
  "eslint.config.mjs",
  (s) => s.replace(/(const FEATURES = \[\n[\s\S]*?)(\n\];)/, (_m, list, end) => `${list}\n  "${name}",${end}`),
  "ranh giới feature",
);
patch(
  "src/core/rbac/permissions.ts",
  (s) =>
    s
      .replace(/(export const RESOURCE_ACTIONS = \{\n[\s\S]*?)(\n\} as const satisfies)/, (_m, list, end) => `${list}\n  ${resource}: ["view", "create", "edit", "delete"],${end}`)
      .replace(/(export const RESOURCE_LABELS: Record<Resource, string> = \{\n[\s\S]*?)(\n\};)/, (_m, list, end) => `${list}\n  ${resource}: "${title}",${end}`),
  "RBAC resource + nhãn",
);
patch("src/mock/collections.ts", (s) => s.replace(/(\n\} as const;)/, `\n  ${collectionKey}: "${name}",$1`), "tên collection mock");
patch(
  "src/mock/modules/index.ts",
  (s) =>
    s
      .replace(/(import \{ register[A-Za-z]+Module \} from "\.\/[a-z-]+";\n)(?!import)/, `$1import { register${Plural}Module } from "./${name}";\n`)
      .replace(/(export function registerAllModules\(\): void \{\n[\s\S]*?)(\n\})/, (_m, body, end) => `${body}\n  register${Plural}Module();${end}`),
  "đăng ký module mock",
);
patch("src/core/config/routes.ts", (s) => s.replace(/(\n\} as const;)/, `\n  ${routeKey}: \`\${A}/${name}\`,$1`), "route constant");

console.log(`
Hoàn tất. Việc còn lại (thủ công):
  1. Thêm mục menu trong src/config/admin-nav.tsx:
       { label: "${title}", href: ROUTES.${routeKey}, icon: <Layers />, permission: "${resource}.view" }
  2. Sửa types.ts / schemas.ts cho đúng nghiệp vụ, rồi cập nhật dữ liệu seed trong src/mock/modules/${name}.ts
  3. Chạy: npm run typecheck && npm run lint && npm test
  4. (Tùy chọn) node scripts/generate-api-docs.mjs để cập nhật docs/api-endpoints.md
`);
