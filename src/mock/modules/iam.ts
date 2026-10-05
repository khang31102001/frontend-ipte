import { ALL_PERMISSIONS, RESOURCE_ACTIONS, type Action, type Resource } from "@/core/rbac/permissions";
import type { AuditLog } from "@/features/audit-logs/types";
import type { Role } from "@/features/roles/types";
import { roleSchema, type RoleInput } from "@/features/roles/schemas";
import type { User } from "@/features/users/types";
import { userSchema, type UserInput } from "@/features/users/schemas";
import { AUDIT_COLLECTION, writeAudit } from "../engine/audit";
import { collection, registerCollection } from "../engine/db";
import { queryList, type ListConfig } from "../engine/list";
import { addRoutes } from "../engine/router";
import { defineResource } from "../engine/resource";
import { registerLookup } from "../engine/lookups";
import { conflict, notFound, ok, unauthorized } from "../engine/responses";
import { createRng, emailFor, isoDaysAgo, pad, phoneFor, vietnameseName } from "../seed/random";

const ROLES = "roles";
const USERS = "users";

/** Cấp toàn bộ quyền của các resource (trừ khi liệt kê action cụ thể). */
const full = (...resources: Resource[]): string[] =>
  resources.flatMap((r) => (RESOURCE_ACTIONS[r] as readonly Action[]).map((a) => `${r}.${a}`));
const only = (resource: Resource, ...actions: Action[]): string[] => actions.map((a) => `${resource}.${a}`);

function seedRoles(): Role[] {
  const defs: { id: string; name: string; description: string; permissions: string[] }[] = [
    { id: "role-admin", name: "Admin", description: "Toàn quyền hệ thống", permissions: [...ALL_PERMISSIONS] },
    {
      id: "role-sales",
      name: "Sales",
      description: "Tư vấn & chăm sóc học viên, xử lý lead",
      permissions: [
        ...only("student", "view", "create", "edit", "export"),
        ...only("course", "view"),
        ...only("learning_path", "view"),
        ...only("teacher", "view"),
        ...only("form", "view"),
        ...only("form_submission", "view", "edit", "export"),
        ...only("testimonial", "view"),
        ...only("branch", "view"),
        ...only("dashboard", "view"),
        ...only("report", "view"),
      ],
    },
    {
      id: "role-academic",
      name: "Academic",
      description: "Quản lý chương trình học, giáo viên, ngân hàng câu hỏi",
      permissions: [
        ...only("student", "view", "edit"),
        ...full("course", "lesson", "learning_path", "learning_material", "question", "teacher"),
        ...only("branch", "view"),
        ...only("dashboard", "view"),
      ],
    },
    {
      id: "role-teacher",
      name: "Teacher",
      description: "Giáo viên: xem học viên, soạn học liệu và câu hỏi",
      permissions: [
        ...only("student", "view"),
        ...only("course", "view"),
        ...only("lesson", "view", "edit"),
        ...only("learning_material", "view", "create", "edit"),
        ...only("question", "view", "create", "edit"),
        ...only("teacher", "view"),
        ...only("dashboard", "view"),
      ],
    },
    {
      id: "role-marketing",
      name: "Marketing",
      description: "Nội dung website, banner, biểu mẫu, cảm nhận học viên",
      permissions: [
        ...full("page", "article", "taxonomy", "form", "testimonial", "banner", "media"),
        ...only("form_submission", "view", "export"),
        ...only("site_config", "view", "edit"),
        ...only("course", "view"),
        ...only("dashboard", "view"),
        ...only("report", "view"),
      ],
    },
    {
      id: "role-finance",
      name: "Finance",
      description: "Báo cáo, đối soát, nhật ký hoạt động",
      permissions: [
        ...only("student", "view", "export"),
        ...only("report", "view", "export"),
        ...only("audit_log", "view", "export"),
        ...only("dashboard", "view"),
      ],
    },
  ];
  return defs.map((d, i) => ({
    ...d,
    isSystem: true,
    userCount: 0,
    createdAt: isoDaysAgo(400 - i),
    updatedAt: isoDaysAgo(60 - i),
  }));
}

function seedUsers(): User[] {
  const rng = createRng(2026);
  const demo: Pick<User, "id" | "fullName" | "roleId">[] = [
    { id: "usr-001", fullName: "Nguyễn Quản Trị", roleId: "role-admin" },
    { id: "usr-002", fullName: "Trần Thị Tư Vấn", roleId: "role-sales" },
    { id: "usr-003", fullName: "Lê Minh Học Vụ", roleId: "role-academic" },
    { id: "usr-004", fullName: "Phạm Văn Giáo", roleId: "role-teacher" },
    { id: "usr-005", fullName: "Hoàng Thu Truyền Thông", roleId: "role-marketing" },
    { id: "usr-006", fullName: "Đặng Ngọc Kế Toán", roleId: "role-finance" },
  ];
  const roleIds = ["role-sales", "role-sales", "role-academic", "role-teacher", "role-teacher", "role-teacher", "role-marketing", "role-finance"];
  const extra = roleIds.map((roleId, i) => ({ id: `usr-${pad(7 + i)}`, fullName: vietnameseName(rng).fullName, roleId }));
  return [...demo, ...extra].map((u, i) => ({
    id: u.id,
    fullName: u.fullName,
    email: emailFor(u.fullName, i + 1, "pteipass.vn"),
    phone: phoneFor(rng),
    roleId: u.roleId,
    roleName: "",
    branchId: i % 3 === 0 ? "br-001" : i % 3 === 1 ? "br-002" : "br-003",
    status: i === 11 ? "locked" : i === 12 ? "inactive" : "active",
    avatarUrl: null,
    lastLoginAt: isoDaysAgo(rng.int(0, 20)),
    createdAt: isoDaysAgo(300 - i * 10),
    updatedAt: isoDaysAgo(rng.int(1, 30)),
  }));
}

const ENTITY_SAMPLES: { resource: string; names: string[] }[] = [
  { resource: "student", names: ["Nguyễn Thị Lan", "Trần Văn Hùng", "Lê Ngọc Mai", "Phạm Quốc Bảo"] },
  { resource: "course", names: ["PTE 50 Cấp tốc", "PTE 65 Nâng cao", "Pre PTE Nền tảng", "PTE Core"] },
  { resource: "article", names: ["Cách tính điểm PTE", "Mẹo Read Aloud", "Kinh nghiệm thi PTE 65"] },
  { resource: "teacher", names: ["Amy Đoàn", "Liên Nguyễn"] },
  { resource: "testimonial", names: ["Câu chuyện của Minh Anh", "Từ PTE 36 lên 65"] },
];

function seedAuditLogs(): AuditLog[] {
  const rng = createRng(77);
  const users = collection<User>(USERS);
  const roles = collection<Role>(ROLES);
  const actions: AuditLog["action"][] = ["create", "update", "update", "update", "delete", "approve"];
  return Array.from({ length: 80 }, (_, i) => {
    const sample = rng.pick(ENTITY_SAMPLES);
    const user = rng.pick(users);
    const role = roles.find((r) => r.id === user.roleId);
    const action = rng.pick(actions);
    const name = rng.pick(sample.names);
    const createdAt = isoDaysAgo(rng.int(0, 30) + rng.next());
    const before = action === "create" ? null : { name, status: "draft", updatedBy: user.fullName };
    const after = action === "delete" ? null : { name, status: action === "approve" ? "published" : "active", updatedBy: user.fullName };
    return {
      id: `aud-${pad(i + 1, 4)}`,
      createdAt,
      updatedAt: createdAt,
      actorId: user.id,
      actorName: user.fullName,
      actorRole: role?.name ?? "—",
      action,
      resource: sample.resource,
      entityId: `${sample.resource.slice(0, 3)}-${pad(rng.int(1, 40))}`,
      entityLabel: name,
      before,
      after,
      ip: `192.168.1.${rng.int(2, 240)}`,
    };
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

const AUDIT_LIST: ListConfig<AuditLog> = {
  searchFields: ["actorName", "entityLabel", "entityId"],
  filters: {
    action: "action",
    resource: "resource",
    actorId: "actorId",
    from: (log, v) => log.createdAt.slice(0, 10) >= v,
    to: (log, v) => log.createdAt.slice(0, 10) <= v,
  },
  sortable: ["createdAt", "actorName", "action", "resource"],
  defaultSort: { sortBy: "createdAt", sortOrder: "desc" },
};

export function registerIamModule(): void {
  registerCollection<Role>(ROLES, seedRoles);
  registerCollection<User>(USERS, seedUsers);
  registerCollection<AuditLog>(AUDIT_COLLECTION, seedAuditLogs);

  const roleName = (id: string) => collection<Role>(ROLES).find((r) => r.id === id)?.name ?? "—";

  registerLookup("roles", () => collection<Role>(ROLES).map((r) => ({ value: r.id, label: r.name })));
  registerLookup("staff", () =>
    collection<User>(USERS)
      .filter((u) => u.status === "active")
      .map((u) => ({ value: u.id, label: `${u.fullName} (${roleName(u.roleId)})` })),
  );

  addRoutes(
    // Phiên hiện tại. Backend thật sẽ lấy từ token; mock lấy từ header `x-mock-role`.
    {
      method: "GET",
      pattern: "/auth/me",
      permission: "public",
      anonymous: true,
      handler: (req) => {
        if (!req.actor) return unauthorized();
        return ok({
          user: { id: req.actor.userId, name: req.actor.userName, email: `${req.actor.userId}@pteipass.vn`, avatarUrl: null },
          role: { id: req.actor.roleId, name: req.actor.roleName },
          permissions: [...req.actor.permissions],
        });
      },
    },
    // Danh mục quyền (chỉ đọc) cho ma trận phân quyền.
    {
      method: "GET",
      pattern: "/permissions",
      permission: "role.view",
      handler: () => ok(ALL_PERMISSIONS.map((p) => ({ key: p, resource: p.split(".")[0], action: p.split(".")[1] }))),
    },
    ...defineResource<Role, RoleInput>({
      path: "/roles",
      permission: "role",
      collection: ROLES,
      idPrefix: "role",
      label: "vai trò",
      entityName: (r) => r.name,
      createSchema: roleSchema,
      list: { searchFields: ["name", "description"], sortable: ["name", "createdAt", "userCount"], defaultSort: { sortBy: "name", sortOrder: "asc" } },
      unique: [{ field: "name", message: "Tên vai trò đã tồn tại" }],
      // Chống khóa hệ thống: vai trò Admin luôn giữ đủ quyền.
      guard: ({ input, current }) =>
        current?.id === "role-admin" && ALL_PERMISSIONS.some((p) => !input.permissions.includes(p))
          ? conflict("Không thể giảm quyền của vai trò Admin")
          : undefined,
      build: (input, base) => ({ ...input, ...base, isSystem: false, userCount: 0 }),
      merge: (current, input) => ({ ...current, ...input }),
      present: (r) => ({ ...r, userCount: collection<User>(USERS).filter((u) => u.roleId === r.id).length }),
      beforeDelete: (r) => {
        if (r.isSystem) return conflict("Không thể xóa vai trò hệ thống");
        if (collection<User>(USERS).some((u) => u.roleId === r.id)) return conflict("Vai trò đang được gán cho người dùng, hãy chuyển người dùng sang vai trò khác trước");
        return undefined;
      },
    }),
    {
      method: "GET",
      pattern: "/users/export",
      permission: "user.export",
      handler: (req) => {
        const q = new URLSearchParams(req.query);
        q.delete("page");
        q.set("pageSize", "200");
        writeAudit(req.actor, { action: "export", resource: "user", entityId: "-", entityLabel: "Xuất danh sách người dùng" });
        return queryList(collection<User>(USERS).map((u) => ({ ...u, roleName: roleName(u.roleId) })), { ...req, query: q }, {
          searchFields: ["fullName", "email", "phone"],
          filters: { roleId: "roleId", status: "status", branchId: "branchId" },
          defaultSort: { sortBy: "createdAt", sortOrder: "desc" },
        });
      },
    },
    ...defineResource<User, UserInput>({
      path: "/users",
      permission: "user",
      collection: USERS,
      idPrefix: "usr",
      label: "người dùng",
      entityName: (u) => u.fullName,
      createSchema: userSchema,
      list: {
        searchFields: ["fullName", "email", "phone"],
        filters: { roleId: "roleId", status: "status", branchId: "branchId" },
        sortable: ["fullName", "email", "createdAt", "lastLoginAt", "status"],
        defaultSort: { sortBy: "createdAt", sortOrder: "desc" },
      },
      unique: [{ field: "email", message: "Email đã được sử dụng" }],
      build: (input, base) => ({ ...input, ...base, roleName: roleName(input.roleId), avatarUrl: null, lastLoginAt: null }),
      present: (u) => ({ ...u, roleName: roleName(u.roleId) }),
      beforeDelete: (u) => (u.id === "usr-001" ? conflict("Không thể xóa tài khoản quản trị gốc") : undefined),
    }),
    // Nhật ký hoạt động: chỉ đọc, có lọc theo hành động/resource/người thực hiện/khoảng ngày.
    {
      method: "GET",
      pattern: "/audit-logs/export",
      permission: "audit_log.export",
      handler: (req) => {
        const q = new URLSearchParams(req.query);
        q.delete("page");
        q.set("pageSize", "200");
        return queryList(collection<AuditLog>(AUDIT_COLLECTION), { ...req, query: q }, AUDIT_LIST);
      },
    },
    {
      method: "GET",
      pattern: "/audit-logs",
      permission: "audit_log.view",
      handler: (req) => queryList(collection<AuditLog>(AUDIT_COLLECTION), req, AUDIT_LIST),
    },
    {
      method: "GET",
      pattern: "/audit-logs/:id",
      permission: "audit_log.view",
      handler: (req) => {
        const log = collection<AuditLog>(AUDIT_COLLECTION).find((l) => l.id === req.params.id);
        return log ? ok(log) : notFound("Không tìm thấy nhật ký");
      },
    },
  );
}
