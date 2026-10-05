import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { initials } from "@/shared/lib/format";

export function Avatar({ name, src, className }: { name: string; src?: string | null; className?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className={cn("size-9 rounded-full object-cover", className)} />;
  }
  return (
    <span
      aria-label={name}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-25 text-xs font-semibold text-brand-600",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

/** Danh sách "nhãn: giá trị" cho trang chi tiết. */
export function DescriptionList({
  items,
  columns = 2,
}: {
  items: { label: string; value: ReactNode }[];
  columns?: 1 | 2 | 3;
}) {
  const cols = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" }[columns];
  return (
    <dl className={cn("grid grid-cols-1 gap-x-8 gap-y-4", cols)}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-theme-xs font-medium tracking-wide text-gray-500 uppercase">{item.label}</dt>
          <dd className="mt-1 text-sm break-words text-gray-800 dark:text-white/90">{item.value ?? "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">{value}</p>
          {hint && <p className="mt-1 text-theme-xs text-gray-500">{hint}</p>}
        </div>
        {icon && <div className="flex size-11 items-center justify-center rounded-xl bg-brand-25 text-brand-500">{icon}</div>}
      </div>
    </div>
  );
}
