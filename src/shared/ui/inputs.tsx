import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

const controlBase =
  "w-full rounded-lg border bg-transparent text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30";
const controlOk =
  "border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800";
const controlErr =
  "border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:border-error-500";
const controlDisabled = "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60 dark:disabled:bg-gray-800";

export interface ControlProps {
  invalid?: boolean;
}

export function Input({ invalid, className, ...props }: ComponentProps<"input"> & ControlProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(controlBase, "h-11 px-4 py-2.5", invalid ? controlErr : controlOk, controlDisabled, className)}
      {...props}
    />
  );
}

export function Textarea({ invalid, className, rows = 4, ...props }: ComponentProps<"textarea"> & ControlProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(controlBase, "px-4 py-2.5", invalid ? controlErr : controlOk, controlDisabled, className)}
      {...props}
    />
  );
}

export function Select({ invalid, className, children, ...props }: ComponentProps<"select"> & ControlProps) {
  return (
    <select
      aria-invalid={invalid || undefined}
      className={cn(controlBase, "h-11 px-3 py-2.5", invalid ? controlErr : controlOk, controlDisabled, className)}
      {...props}
    >
      {children}
    </select>
  );
}

export function Checkbox({ className, label, ...props }: Omit<ComponentProps<"input">, "type"> & { label?: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
      <input
        type="checkbox"
        className={cn("size-4 rounded border-gray-300 accent-brand-500", className)}
        {...props}
      />
      {label}
    </label>
  );
}

export function Switch({ className, label, ...props }: Omit<ComponentProps<"input">, "type"> & { label?: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
      <span className="relative inline-flex h-6 w-11 items-center">
        <input type="checkbox" role="switch" className={cn("peer sr-only", className)} {...props} />
        <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-brand-500 peer-focus-visible:ring-3 peer-focus-visible:ring-brand-500/30 peer-disabled:opacity-50 dark:bg-gray-700" />
        <span className="absolute left-0.5 size-5 rounded-full bg-white shadow-theme-sm transition peer-checked:translate-x-5" />
      </span>
      {label}
    </label>
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label className={cn("mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300", className)} {...props} />
  );
}
