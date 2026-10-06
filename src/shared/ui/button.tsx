import { LoaderCircle } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type ButtonVariant = "primary" | "outline" | "ghost" | "danger" | "warning";
export type ButtonSize = "sm" | "md" | "icon";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
  outline:
    "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-white/[0.03]",
  ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5",
  danger: "bg-error-500 text-white shadow-theme-xs hover:bg-error-600 disabled:bg-error-300",
  warning: "bg-warning-500 text-white shadow-theme-xs hover:bg-warning-600 disabled:bg-warning-300",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  icon: "size-9 p-0",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  startIcon,
  endIcon,
  type = "button",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition focus-visible:ring-3 focus-visible:ring-brand-500/30 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : startIcon}
      {children}
      {!loading && endIcon}
    </button>
  );
}
