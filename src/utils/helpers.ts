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