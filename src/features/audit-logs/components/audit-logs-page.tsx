"use client";

import { CrudListPage, ExportCsvButton, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { RESOURCES, RESOURCE_LABELS, type Resource } from "@/core/rbac/permissions";
import { toOptions } from "@/shared/domain/pte";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDateTime } from "@/shared/lib/format";
import { useLookup } from "@/shared/lookups/use-lookup";
import { Badge, Modal, type BadgeColor } from "@/shared/ui";
import { useAuditLogs } from "../hooks/use-audit-logs";
import { auditLogService } from "../services/audit-log-service";
import { AUDIT_ACTION_LABELS, type AuditAction, type AuditLog, type AuditLogQuery } from "../types";
import { changedEntries, type DiffKind } from "../utils/diff";

type FilterKey = "action" | "resource" | "actorId" | "from" | "to";

function useAuditList(query: ListParams<FilterKey>) {
  return useAuditLogs(query as AuditLogQuery);
}

const ACTION_COLOR: Record<AuditAction, BadgeColor> = {
  create: "success",
  update: "info",
  delete: "error",
  login: "gray",
  approve: "primary",
  export: "warning",
};

const resourceLabel = (r: string) => RESOURCE_LABELS[r as Resource] ?? r;

const columns: Column<AuditLog>[] = [
  { key: "createdAt", header: "Thời gian", sortKey: "createdAt", className: "whitespace-nowrap", cell: (l) => formatDateTime(l.createdAt) },
  {
    key: "actor",
    header: "Người thực hiện",
    sortKey: "actorName",
    cell: (l) => (
      <span>
        <span className="block font-medium text-gray-800 dark:text-white/90">{l.actorName}</span>
        <span className="block text-theme-xs text-gray-500">{l.actorRole}</span>
      </span>
    ),
  },
  { key: "action", header: "Hành động", sortKey: "action", cell: (l) => <Badge color={ACTION_COLOR[l.action]}>{AUDIT_ACTION_LABELS[l.action]}</Badge> },
  { key: "resource", header: "Đối tượng", sortKey: "resource", hideBelow: "md", cell: (l) => resourceLabel(l.resource) },
  { key: "entity", header: "Bản ghi", className: "min-w-[200px]", cell: (l) => <span className="line-clamp-2">{l.entityLabel}</span> },
  { key: "ip", header: "IP", hideBelow: "xl", cell: (l) => <span className="font-mono text-theme-xs">{l.ip}</span> },
];

const CSV_COLUMNS = [
  { header: "Thời gian", value: (l: AuditLog) => formatDateTime(l.createdAt) },
  { header: "Người thực hiện", value: (l: AuditLog) => l.actorName },
  { header: "Vai trò", value: (l: AuditLog) => l.actorRole },
  { header: "Hành động", value: (l: AuditLog) => AUDIT_ACTION_LABELS[l.action] },
  { header: "Đối tượng", value: (l: AuditLog) => resourceLabel(l.resource) },
  { header: "Bản ghi", value: (l: AuditLog) => l.entityLabel },
  { header: "IP", value: (l: AuditLog) => l.ip },
];

const KIND_STYLE: Record<DiffKind, string> = {
  added: "bg-success-50 text-success-700",
  removed: "bg-error-50 text-error-700",
  changed: "bg-warning-50 text-warning-600",
  unchanged: "",
};
const KIND_LABEL: Record<DiffKind, string> = { added: "Thêm", removed: "Xóa", changed: "Sửa", unchanged: "" };

const show = (v: unknown) => (v === undefined || v === null ? "—" : typeof v === "object" ? JSON.stringify(v) : String(v));

function AuditDetailDialog({ log, open, onClose }: { log: AuditLog | null; open: boolean; onClose: () => void }) {
  const changes = log ? changedEntries(log.before, log.after) : [];
  return (
    <Modal
      open={open && log !== null}
      onClose={onClose}
      size="lg"
      title="Chi tiết thay đổi"
      description={log ? `${AUDIT_ACTION_LABELS[log.action]} · ${resourceLabel(log.resource)} · ${formatDateTime(log.createdAt)}` : undefined}
    >
      {log && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            <strong>{log.actorName}</strong> ({log.actorRole}) · {log.entityLabel} · <span className="font-mono text-theme-xs">{log.entityId}</span>
          </p>
          {changes.length === 0 ? (
            <p className="rounded-lg bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">Thao tác không làm thay đổi dữ liệu ghi nhận được.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-theme-xs tracking-wide text-gray-500 uppercase dark:bg-white/[0.02]">
                  <tr>
                    <th className="px-3 py-2 text-left">Trường</th>
                    <th className="px-3 py-2 text-left">Trước</th>
                    <th className="px-3 py-2 text-left">Sau</th>
                    <th className="px-3 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {changes.map((c) => (
                    <tr key={c.path} className="border-t border-gray-100 align-top dark:border-gray-800">
                      <td className="px-3 py-2 font-mono text-theme-xs">{c.path}</td>
                      <td className="max-w-[240px] px-3 py-2 break-words text-gray-600">{show(c.before)}</td>
                      <td className="max-w-[240px] px-3 py-2 break-words text-gray-800 dark:text-white/90">{show(c.after)}</td>
                      <td className="px-3 py-2">
                        <span className={`rounded-full px-2 py-0.5 text-theme-xs font-medium ${KIND_STYLE[c.kind]}`}>{KIND_LABEL[c.kind]}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

export function AuditLogsPage() {
  const dialog = useDialogState<AuditLog>();
  const staff = useLookup("staff");
  const filters: FilterDef<FilterKey>[] = [
    { key: "action", label: "Hành động", options: toOptions(AUDIT_ACTION_LABELS) },
    { key: "resource", label: "Đối tượng", options: RESOURCES.map((r) => ({ value: r, label: RESOURCE_LABELS[r] })) },
    { key: "actorId", label: "Người thực hiện", options: staff.options.map((o) => ({ value: o.value, label: o.label.replace(/ \(.*\)$/, "") })) },
    { key: "from", label: "Từ ngày", type: "date" },
    { key: "to", label: "Đến ngày", type: "date" },
  ];
  return (
    <>
      <CrudListPage<AuditLog, FilterKey>
        title="Nhật ký hoạt động"
        description="Ai đã thay đổi dữ liệu gì, trước/sau và thời điểm"
        resource="audit_log"
        noun="nhật ký"
        useList={useAuditList}
        columns={columns}
        filters={filters}
        defaultSort={{ sortBy: "createdAt", sortOrder: "desc" }}
        searchPlaceholder="Tìm theo người thực hiện, bản ghi…"
        getRowLabel={(l) => l.entityLabel}
        toolbarActions={(query) => (
          <ExportCsvButton<AuditLog>
            permission="audit_log.export"
            noun="dòng nhật ký"
            filename="nhat-ky-hoat-dong.csv"
            columns={CSV_COLUMNS}
            fetchRows={() => {
              const q: AuditLogQuery = { ...(query as AuditLogQuery) };
              delete q.page;
              delete q.pageSize;
              return auditLogService.exportAll(q);
            }}
          />
        )}
        onView={dialog.openEdit}
      />
      <AuditDetailDialog log={dialog.editing} open={dialog.open} onClose={dialog.close} />
    </>
  );
}
