import type { BaseEntity } from "@/core/api";
import type { Resource } from "@/core/rbac";
import type { ZodType } from "@/core/validation";
import { writeAudit } from "./audit";
import { collection, findById, insert, newId, nowIso, removeById, replaceById } from "./db";
import { queryList, type ListConfig } from "./list";
import { created, notFound, ok, validation } from "./responses";
import type { MockActor, MockRequest, MockResult, MockRoute } from "./types";
import { validateBody } from "./validate";

export interface ResourceConfig<T extends BaseEntity, TCreate, TUpdate> {
  /** Đường dẫn REST, ví dụ "/students". */
  path: string;
  /** Resource RBAC để kiểm tra quyền, ví dụ "student". */
  permission: Resource;
  collection: string;
  idPrefix: string;
  /** Tên hiển thị trong thông báo, ví dụ "học viên". */
  label: string;
  /** Tên dễ đọc của bản ghi cho audit log. */
  entityName: (item: T) => string;
  createSchema: ZodType<TCreate>;
  /** Mặc định dùng lại createSchema. */
  updateSchema?: ZodType<TUpdate>;
  list?: ListConfig<T>;
  /** Tạo thực thể từ input hợp lệ. Mặc định: spread input + id/timestamps. */
  build?: (input: TCreate, base: BaseEntity, actor: MockActor | null) => T;
  /** Gộp input vào bản ghi hiện có. Mặc định: spread. */
  merge?: (current: T, input: TUpdate) => T;
  /** Trường duy nhất (so sánh không phân biệt hoa/thường) → lỗi 422 theo field. */
  unique?: readonly { field: keyof T & string; message: string }[];
  /** Biến đổi bản ghi trước khi trả về (trường tính toán, ví dụ roleName, userCount). Không ghi vào DB. */
  present?: (item: T) => T;
  /**
   * Kiểm tra nghiệp vụ/quyền chi tiết trước khi tạo/sửa (ví dụ chỉ người có quyền "approve" mới xuất bản).
   * Trả về lỗi để chặn thao tác.
   */
  guard?: (ctx: { input: TCreate | TUpdate; current?: T; actor: MockActor | null }) => MockResult | undefined;
  /** Trả về lỗi để chặn xóa (ví dụ còn dữ liệu liên quan). */
  beforeDelete?: (item: T) => MockResult | undefined;
  /** Chạy sau khi tạo thành công (tạo dữ liệu con, sự kiện đầu tiên…). */
  afterCreate?: (item: T, actor: MockActor | null) => void;
  /** Chạy sau khi xóa thành công (xóa dữ liệu con). */
  afterDelete?: (item: T) => void;
  /** Tắt bớt thao tác (ví dụ resource chỉ đọc). */
  only?: readonly ("list" | "get" | "create" | "update" | "delete")[];
}

function findDuplicate<T extends BaseEntity>(
  items: readonly T[],
  candidate: Partial<T>,
  unique: NonNullable<ResourceConfig<T, unknown, unknown>["unique"]>,
  ignoreId?: string,
) {
  const errors: { field: string; message: string }[] = [];
  for (const { field, message } of unique) {
    const value = candidate[field];
    if (value === undefined || value === null || value === "") continue;
    const dup = items.some(
      (x) => x.id !== ignoreId && String(x[field]).toLowerCase() === String(value).toLowerCase(),
    );
    if (dup) errors.push({ field, message });
  }
  return errors;
}

/**
 * Sinh bộ route CRUD chuẩn (list/get/create/update/delete) cho một resource:
 * validate bằng zod schema dùng chung với FE, kiểm tra trùng, ghi audit log, trả đúng envelope.
 */
export function defineResource<T extends BaseEntity, TCreate extends object, TUpdate extends object = TCreate>(
  cfg: ResourceConfig<T, TCreate, TUpdate>,
): MockRoute[] {
  const enabled = (op: NonNullable<ResourceConfig<T, TCreate, TUpdate>["only"]>[number]) =>
    !cfg.only || cfg.only.includes(op);
  const perm = (action: "view" | "create" | "edit" | "delete") => `${cfg.permission}.${action}` as MockRoute["permission"];
  const updateSchema = (cfg.updateSchema ?? cfg.createSchema) as unknown as ZodType<TUpdate>;
  const present = (item: T): T => (cfg.present ? cfg.present(item) : item);
  const routes: MockRoute[] = [];

  if (enabled("list")) {
    routes.push({
      method: "GET",
      pattern: cfg.path,
      permission: perm("view"),
      handler: (req: MockRequest) => {
        // present trước để search/filter/sort cũng thấy được trường tính toán.
        const items = cfg.present ? collection<T>(cfg.collection).map(present) : collection<T>(cfg.collection);
        return queryList(items, req, cfg.list);
      },
    });
  }

  if (enabled("get")) {
    routes.push({
      method: "GET",
      pattern: `${cfg.path}/:id`,
      permission: perm("view"),
      handler: (req) => {
        const item = findById<T>(cfg.collection, req.params.id ?? "");
        return item ? ok(present(item)) : notFound(`Không tìm thấy ${cfg.label}`);
      },
    });
  }

  if (enabled("create")) {
    routes.push({
      method: "POST",
      pattern: cfg.path,
      permission: perm("create"),
      handler: (req) => {
        const parsed = validateBody(cfg.createSchema, req.body);
        if (!parsed.ok) return parsed.error;
        const blocked = cfg.guard?.({ input: parsed.data, actor: req.actor });
        if (blocked) return blocked;
        const base: BaseEntity = { id: newId(cfg.idPrefix), createdAt: nowIso(), updatedAt: nowIso() };
        const candidate = (cfg.build ? cfg.build(parsed.data, base, req.actor) : { ...parsed.data, ...base }) as T;
        const dup = cfg.unique ? findDuplicate(collection<T>(cfg.collection), candidate, cfg.unique) : [];
        if (dup.length) return validation(dup);
        insert(cfg.collection, candidate);
        writeAudit(req.actor, {
          action: "create",
          resource: cfg.permission,
          entityId: candidate.id,
          entityLabel: cfg.entityName(candidate),
          after: candidate,
        });
        cfg.afterCreate?.(candidate, req.actor);
        return created(present(candidate));
      },
    });
  }

  if (enabled("update")) {
    const handler = (req: MockRequest): MockResult => {
      const current = findById<T>(cfg.collection, req.params.id ?? "");
      if (!current) return notFound(`Không tìm thấy ${cfg.label}`);
      const parsed = validateBody(updateSchema, req.body);
      if (!parsed.ok) return parsed.error;
      const blocked = cfg.guard?.({ input: parsed.data, current, actor: req.actor });
      if (blocked) return blocked;
      const next = (
        cfg.merge
          ? cfg.merge(current, parsed.data)
          : { ...current, ...parsed.data, id: current.id, createdAt: current.createdAt }
      ) as T;
      next.updatedAt = nowIso();
      const dup = cfg.unique ? findDuplicate(collection<T>(cfg.collection), next, cfg.unique, current.id) : [];
      if (dup.length) return validation(dup);
      const before = structuredClone(current);
      replaceById(cfg.collection, current.id, next);
      writeAudit(req.actor, {
        action: "update",
        resource: cfg.permission,
        entityId: next.id,
        entityLabel: cfg.entityName(next),
        before,
        after: next,
      });
      return ok(present(next));
    };
    routes.push(
      { method: "PUT", pattern: `${cfg.path}/:id`, permission: perm("edit"), handler },
      { method: "PATCH", pattern: `${cfg.path}/:id`, permission: perm("edit"), handler },
    );
  }

  if (enabled("delete")) {
    routes.push({
      method: "DELETE",
      pattern: `${cfg.path}/:id`,
      permission: perm("delete"),
      handler: (req) => {
        const item = findById<T>(cfg.collection, req.params.id ?? "");
        if (!item) return notFound(`Không tìm thấy ${cfg.label}`);
        const blocked = cfg.beforeDelete?.(item);
        if (blocked) return blocked;
        removeById(cfg.collection, item.id);
        cfg.afterDelete?.(item);
        writeAudit(req.actor, {
          action: "delete",
          resource: cfg.permission,
          entityId: item.id,
          entityLabel: cfg.entityName(item),
          before: item,
        });
        return ok(null, { message: `Đã xóa ${cfg.label}` });
      },
    });
  }

  return routes;
}
