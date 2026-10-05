import type { AuditLog } from "@/features/audit-logs/types";
import { insert, newId, nowIso } from "./db";
import type { MockActor } from "./types";

export const AUDIT_COLLECTION = "audit-logs";

/**
 * Ghi nhật ký thay đổi dữ liệu (user nào, đổi gì, trước/sau, khi nào).
 * Mọi resource tạo bằng `defineResource` tự ghi audit, giống cách backend thật nên làm.
 */
export function writeAudit(
  actor: MockActor | null,
  entry: {
    action: AuditLog["action"];
    resource: string;
    entityId: string;
    entityLabel: string;
    before?: unknown;
    after?: unknown;
  },
): void {
  const log: AuditLog = {
    id: newId("aud"),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    actorId: actor?.userId ?? "system",
    actorName: actor?.userName ?? "Hệ thống",
    actorRole: actor?.roleName ?? "System",
    action: entry.action,
    resource: entry.resource,
    entityId: entry.entityId,
    entityLabel: entry.entityLabel,
    before: entry.before === undefined ? null : JSON.parse(JSON.stringify(entry.before)),
    after: entry.after === undefined ? null : JSON.parse(JSON.stringify(entry.after)),
    ip: "127.0.0.1",
  };
  insert(AUDIT_COLLECTION, log);
}
