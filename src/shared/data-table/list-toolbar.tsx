"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDebouncedValue } from "@/shared/hooks/use-debounce";
import { Input, Select } from "@/shared/ui";

export function ListToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm…",
  filters,
  actions,
}: {
  /** Giá trị tìm kiếm hiện tại (từ URL). */
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: ReactNode;
  actions?: ReactNode;
}) {
  const [text, setText] = useState(search ?? "");
  const debounced = useDebouncedValue(text, 350);
  const lastSent = useRef(search ?? "");

  // Đồng bộ khi URL đổi từ bên ngoài (reset, back/forward).
  useEffect(() => {
    setText(search ?? "");
    lastSent.current = search ?? "";
  }, [search]);

  useEffect(() => {
    if (!onSearchChange) return;
    if (debounced.trim() !== lastSent.current.trim()) {
      lastSent.current = debounced;
      onSearchChange(debounced);
    }
  }, [debounced, onSearchChange]);

  return (
    <div className="mb-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {onSearchChange ? (
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-400" aria-hidden />
            <Input
              type="search"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label="Tìm kiếm"
              className="pr-9 pl-10"
            />
            {text && (
              <button
                type="button"
                aria-label="Xóa tìm kiếm"
                onClick={() => setText("")}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        ) : (
          <span />
        )}
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {filters && <div className="flex flex-wrap items-center gap-3">{filters}</div>}
    </div>
  );
}

/** Ô lọc theo ngày (yyyy-MM-dd), gắn với `useListParams().setFilter`. */
export function FilterDate({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (value: string | undefined) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-600">
      <span className="whitespace-nowrap">{label}</span>
      <Input type="date" aria-label={label} value={value ?? ""} onChange={(e) => onChange(e.target.value || undefined)} className="h-10 w-auto py-0" />
    </label>
  );
}

/** Ô lọc dạng select, gắn với `useListParams().setFilter`. */
export function FilterSelect({
  label,
  value,
  onChange,
  options,
  allLabel = "Tất cả",
}: {
  label: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  options: readonly { value: string; label: string }[];
  allLabel?: string;
}) {
  return (
    <Select
      aria-label={label}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || undefined)}
      className="h-10 w-auto min-w-40 py-0"
    >
      <option value="">{`${label}: ${allLabel}`}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </Select>
  );
}
