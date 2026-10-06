import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type BadgeColor = "primary" | "success" | "error" | "warning" | "info" | "gray";

const colors: Record<BadgeColor, string> = {
  primary: "bg-brand-25 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
  error: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
  info: "bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-500",
  gray: "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80",
};

export function Badge({
  color = "gray",
  className,
  children,
}: {
  color?: BadgeColor;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-theme-xs font-medium whitespace-nowrap",
        colors[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
