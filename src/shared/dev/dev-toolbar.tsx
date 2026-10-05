"use client";

import { FlaskConical, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth, DEV_ROLES, type DevAuthAdapter } from "@/core/auth";
import { isDevToolsEnabled } from "@/core/config/env";
import {
  MOCK_SCENARIOS,
  getMockScenario,
  registerMockScenarioHeaders,
  setMockScenario,
  type MockScenario,
} from "@/core/dev/mock-scenario";

const SCENARIO_LABEL: Record<MockScenario, string> = {
  none: "Bình thường",
  slow: "Phản hồi chậm (3s)",
  error: "Lỗi server (500)",
  empty: "Dữ liệu rỗng",
};

function isDevAdapter(adapter: unknown): adapter is DevAuthAdapter {
  return typeof adapter === "object" && adapter !== null && (adapter as { name?: string }).name === "dev";
}

/**
 * Bảng công cụ dev (chỉ hiện khi NEXT_PUBLIC_DEV_TOOLS=true):
 * đổi vai trò để thử RBAC và ép Mock API trả chậm / lỗi / rỗng để thử các trạng thái UI.
 */
export function DevToolbar() {
  const { adapter, refresh } = useAuth();
  const [open, setOpen] = useState(false);
  const [scenario, setScenario] = useState<MockScenario>("none");
  const [role, setRole] = useState("");
  const enabled = isDevToolsEnabled();

  useEffect(() => {
    if (!enabled) return;
    setScenario(getMockScenario());
    if (isDevAdapter(adapter)) setRole(adapter.getRole());
    return registerMockScenarioHeaders();
  }, [enabled, adapter]);

  if (!enabled) return null;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Mở công cụ dev"
        className="fixed right-4 bottom-4 z-99999 flex size-11 items-center justify-center rounded-full bg-gray-900 text-white shadow-theme-lg hover:bg-gray-700"
      >
        <FlaskConical className="size-5" />
      </button>
    );
  }

  return (
    <div className="fixed right-4 bottom-4 z-99999 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xl dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold">Công cụ dev</p>
        <button type="button" aria-label="Đóng" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700">
          <X className="size-4" />
        </button>
      </div>
      {isDevAdapter(adapter) && (
        <label className="mb-3 block text-theme-xs text-gray-500">
          Vai trò (thử RBAC)
          <select
            value={role}
            onChange={(e) => {
              adapter.setRole(e.target.value);
              setRole(e.target.value);
              void refresh();
            }}
            className="mt-1 h-9 w-full rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-800 dark:bg-gray-900 dark:text-white"
          >
            {DEV_ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="block text-theme-xs text-gray-500">
        Mock API giả lập
        <select
          value={scenario}
          onChange={(e) => {
            const next = e.target.value as MockScenario;
            setMockScenario(next);
            setScenario(next);
          }}
          className="mt-1 h-9 w-full rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-800 dark:bg-gray-900 dark:text-white"
        >
          {MOCK_SCENARIOS.map((s) => (
            <option key={s} value={s}>
              {SCENARIO_LABEL[s]}
            </option>
          ))}
        </select>
      </label>
      <p className="mt-3 text-theme-xs text-gray-400">Áp dụng cho request kế tiếp. Chỉ có tác dụng với Mock API.</p>
    </div>
  );
}
