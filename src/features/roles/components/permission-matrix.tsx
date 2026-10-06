"use client";

import {
  ACTIONS,
  ACTION_LABELS,
  RESOURCES,
  RESOURCE_ACTIONS,
  RESOURCE_LABELS,
  type Action,
  type Resource,
} from "@/core/rbac/permissions";
import { cn } from "@/shared/lib/cn";

interface PermissionMatrixProps {
  value: readonly string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
}

const supports = (resource: Resource, action: Action) => (RESOURCE_ACTIONS[resource] as readonly Action[]).includes(action);
const key = (resource: Resource, action: Action) => `${resource}.${action}`;

/**
 * Ma trận phân quyền Resource × Action (View/Create/Edit/Delete/Approve/Export).
 * Có "chọn cả hàng" và "chọn cả cột". Chỉ là giao diện cấu hình; backend là nơi thực thi quyền.
 */
export function PermissionMatrix({ value, onChange, disabled }: PermissionMatrixProps) {
  const selected = new Set(value);

  function toggle(keys: string[], on: boolean) {
    const next = new Set(selected);
    for (const k of keys) {
      if (on) next.add(k);
      else next.delete(k);
    }
    onChange([...next]);
  }

  const rowKeys = (resource: Resource) => (RESOURCE_ACTIONS[resource] as readonly Action[]).map((a) => key(resource, a));
  const colKeys = (action: Action) => RESOURCES.filter((r) => supports(r, action)).map((r) => key(r, action));

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 dark:bg-white/[0.02]">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-theme-xs font-medium tracking-wide text-gray-500 uppercase">
              Chức năng
            </th>
            {ACTIONS.map((action) => {
              const keys = colKeys(action);
              const allOn = keys.every((k) => selected.has(k));
              return (
                <th key={action} scope="col" className="px-3 py-3 text-center text-theme-xs font-medium tracking-wide text-gray-500 uppercase">
                  <label className="inline-flex cursor-pointer flex-col items-center gap-1">
                    {ACTION_LABELS[action]}
                    <input
                      type="checkbox"
                      aria-label={`Chọn cả cột ${ACTION_LABELS[action]}`}
                      checked={allOn}
                      disabled={disabled}
                      onChange={(e) => toggle(keys, e.target.checked)}
                      className="size-4 accent-brand-500"
                    />
                  </label>
                </th>
              );
            })}
            <th scope="col" className="px-3 py-3 text-center text-theme-xs font-medium tracking-wide text-gray-500 uppercase">
              Tất cả
            </th>
          </tr>
        </thead>
        <tbody>
          {RESOURCES.map((resource) => {
            const keys = rowKeys(resource);
            const allOn = keys.every((k) => selected.has(k));
            return (
              <tr key={resource} className="border-t border-gray-100 dark:border-gray-800">
                <th scope="row" className="px-4 py-2.5 text-left font-medium text-gray-700 dark:text-gray-300">
                  {RESOURCE_LABELS[resource]}
                  <span className="ml-2 font-mono text-theme-xs font-normal text-gray-400">{resource}</span>
                </th>
                {ACTIONS.map((action) => (
                  <td key={action} className="px-3 py-2.5 text-center">
                    {supports(resource, action) ? (
                      <input
                        type="checkbox"
                        aria-label={`${RESOURCE_LABELS[resource]} – ${ACTION_LABELS[action]}`}
                        checked={selected.has(key(resource, action))}
                        disabled={disabled}
                        onChange={(e) => toggle([key(resource, action)], e.target.checked)}
                        className="size-4 accent-brand-500"
                      />
                    ) : (
                      <span className="text-gray-300" aria-hidden>
                        —
                      </span>
                    )}
                  </td>
                ))}
                <td className={cn("px-3 py-2.5 text-center")}>
                  <input
                    type="checkbox"
                    aria-label={`Chọn cả hàng ${RESOURCE_LABELS[resource]}`}
                    checked={allOn}
                    disabled={disabled}
                    onChange={(e) => toggle(keys, e.target.checked)}
                    className="size-4 accent-brand-500"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
