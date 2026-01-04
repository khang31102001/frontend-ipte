export const isEmpty = (value: unknown) => value === null || value === undefined || String(value).trim() === "";

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_DOMAIN_URL) {
    return process.env.NEXT_PUBLIC_DOMAIN_URL
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'http://localhost:3000'
}

export const buildUrl = ({
  baseUrl = "",
  slug = "",
}: {
  baseUrl?: string;
  slug?: string;
}): string => {
  const base = (baseUrl ?? "").replace(/\/+$/, "");    // bỏ "/" cuối
  const cleanSlug = (slug ?? "").replace(/^\/+/, "");  // bỏ "/" đầu

  // Ghép path
  const path = cleanSlug ? `${base}/${cleanSlug}` : base;

  // Đảm bảo luôn có "/" đầu
  if (!path.startsWith("/")) return `/${path}`;
  return path;
};

export function fixUrl(url: string): string {
  if (!url) return "/";

  // Trim khoảng trắng
  let cleanUrl = url.trim();

  // Nếu có full URL rồi → giữ nguyên
  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return cleanUrl;
  }

  // Nếu bắt đầu bằng "/" → OK
  if (cleanUrl.startsWith("/")) {
    return cleanUrl;
  }

  // Nếu KHÔNG có "/" → thêm vào
  return "/" + cleanUrl;
}

export const joinPath = (...parts: (string | undefined | null)[]) => {
  const cleaned = parts
    .filter(Boolean)
    .map(p => String(p).trim())
    .map(p => p.replace(/^\/+|\/+$/g, "")) // bỏ slash đầu/cuối mỗi phần
    .filter((p) => p.length > 0)
    .map((p)=> encodeURIComponent(p));
  // return cleaned.length ? `/${cleaned.join("/")}` : "/";
  return "/" + cleaned.join("/");
};


