// utils/currency.ts
export function formatVND(
  value: number | string | null | undefined,
  opts?: {
    showSymbol?: boolean;   // hiển thị "₫" hay không
    compact?: boolean;      // rút gọn 1.2M, 2.5B
    fallback?: string;      // khi value không hợp lệ
  }
) {
  const { showSymbol = true, compact = false, fallback = "-" } = opts ?? {};

  if (value === null || value === undefined || value === "") return fallback;

  const num =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^\d.-]/g, ""));

  if (!Number.isFinite(num)) return fallback;

  // Intl cho VND: mặc định có ₫
  if (!compact) {
    const formatted = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(num);

    return showSymbol ? formatted : formatted.replace(/\s?₫/g, "").trim();
  }

  // Compact: 1.2 triệu / 2.5 tỷ
  const abs = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  const formatCompact = (n: number, suffix: string) => {
    const v = (abs / n).toFixed(abs / n >= 10 ? 0 : 1).replace(/\.0$/, "");
    return `${sign}${v}${suffix}${showSymbol ? " ₫" : ""}`;
  };

  if (abs >= 1_000_000_000) return formatCompact(1_000_000_000, "B"); // tỷ
  if (abs >= 1_000_000) return formatCompact(1_000_000, "M");         // triệu
  if (abs >= 1_000) return formatCompact(1_000, "K");                 // nghìn

  // nhỏ hơn 1000
  const small = new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits: 0,
  }).format(abs);

  return `${sign}${small}${showSymbol ? " ₫" : ""}`;
}
