"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export interface TabItem<TKey extends string = string> {
  key: TKey;
  label: ReactNode;
  disabled?: boolean;
}

export function Tabs<TKey extends string>({
  items,
  value,
  onChange,
  className,
}: {
  items: readonly TabItem<TKey>[];
  value: TKey;
  onChange: (key: TKey) => void;
  className?: string;
}) {
  return (
    <div role="tablist" className={cn("flex gap-1 overflow-x-auto border-b border-gray-200 dark:border-gray-800", className)}>
      {items.map((item) => {
        const active = item.key === value;
        return (
          <button
            key={item.key}
            role="tab"
            type="button"
            aria-selected={active}
            disabled={item.disabled}
            onClick={() => onChange(item.key)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition",
              active
                ? "border-brand-500 text-brand-500"
                : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200",
              item.disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
