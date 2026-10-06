import { cn } from "@/shared/lib/cn";

/**
 * Biểu đồ nhẹ, không phụ thuộc thư viện ngoài (CSS/SVG), có aria-label/title để đọc được bằng trình đọc màn hình.
 * Đủ cho dashboard KPI; khi cần biểu đồ phức tạp hơn có thể thay thế bằng thư viện chuyên dụng.
 */

export interface ChartDatum {
  label: string;
  value: number;
}

export function ColumnChart({
  data,
  height = 160,
  formatValue = (v: number) => String(v),
  className,
  ariaLabel,
}: {
  data: ChartDatum[];
  height?: number;
  formatValue?: (v: number) => string;
  className?: string;
  ariaLabel: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const step = Math.max(1, Math.ceil(data.length / 8));
  return (
    <figure className={className} aria-label={ariaLabel}>
      <div className="flex items-end gap-0.5" style={{ height }} role="img" aria-label={ariaLabel}>
        {data.map((d, i) => (
          <div key={`${d.label}-${i}`} className="group relative flex h-full min-w-0 flex-1 items-end" title={`${d.label}: ${formatValue(d.value)}`}>
            <div
              className={cn("w-full rounded-t-sm transition-colors", d.value > 0 ? "bg-brand-400 group-hover:bg-brand-600" : "bg-gray-200 dark:bg-gray-800")}
              style={{ height: `${d.value > 0 ? Math.max(4, (d.value / max) * 100) : 2}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-0.5 text-[10px] text-gray-500">
        {data.map((d, i) => (
          <span key={`${d.label}-${i}`} className="min-w-0 flex-1 truncate text-center">
            {i % step === 0 ? d.label : ""}
          </span>
        ))}
      </div>
    </figure>
  );
}

export function BarList({
  items,
  formatValue = (v: number) => String(v),
  emptyText = "Chưa có dữ liệu",
}: {
  items: ChartDatum[];
  formatValue?: (v: number) => string;
  emptyText?: string;
}) {
  const max = Math.max(1, ...items.map((i) => i.value));
  if (items.length === 0) return <p className="py-6 text-center text-sm text-gray-500">{emptyText}</p>;
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <div className="mb-1 flex items-center justify-between gap-3 text-sm">
            <span className="truncate text-gray-700 dark:text-gray-300">{item.label}</span>
            <span className="font-medium text-gray-800 dark:text-white/90">{formatValue(item.value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div className="h-full rounded-full bg-brand-500" style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export interface FunnelDatum {
  label: string;
  count: number;
  /** % so với bước trước (null với bước đầu). */
  fromPrevious: number | null;
  /** % so với đầu phễu. */
  fromTop: number;
}

export function FunnelChart({ steps }: { steps: FunnelDatum[] }) {
  const top = Math.max(1, steps[0]?.count ?? 1);
  return (
    <ol className="space-y-2.5" aria-label="Phễu chuyển đổi">
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-sm text-gray-600 dark:text-gray-400">{s.label}</span>
          <div className="relative h-8 flex-1 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <div
              className="flex h-full items-center rounded-lg bg-brand-500 px-3 text-sm font-medium text-white"
              style={{ width: `${Math.max(8, (s.count / top) * 100)}%`, opacity: 1 - i * 0.08 }}
            >
              {s.count}
            </div>
          </div>
          <span className="w-28 shrink-0 text-right text-theme-xs text-gray-500">
            {s.fromPrevious === null ? "100%" : `${s.fromPrevious}% so với trước`}
          </span>
        </li>
      ))}
    </ol>
  );
}
