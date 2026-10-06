import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export function Card({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  description,
  actions,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-start justify-between gap-3 px-5 pt-5 pb-3 sm:px-6", className)}>
      <div>
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">{title}</h3>
        {description && <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function CardBody({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("px-5 pb-5 sm:px-6 sm:pb-6", className)} {...props} />;
}
