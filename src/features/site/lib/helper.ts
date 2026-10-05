/** Chuyển link Google Maps bất kỳ sang URL nhúng (iframe). */
export function toGoogleMapsEmbedUrl(input?: string | null): string {
  if (!input) return "";
  if (input.includes("/maps/embed")) return input;
  const embed = (q: string) => `https://www.google.com/maps?output=embed&q=${encodeURIComponent(q)}`;

  try {
    const u = new URL(input);
    const at = u.pathname.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
    if (at) return embed(`${at[1]},${at[2]}`);
    const place = u.pathname.match(/\/maps\/place\/([^/]+)/)?.[1];
    if (place) return embed(decodeURIComponent(place).replace(/\+/g, " "));
    const q = u.searchParams.get("q");
    if (q) return embed(q);
    return embed(input);
  } catch {
    return embed(input);
  }
}

export const isEmpty = (value: unknown) => value === null || value === undefined || String(value).trim() === "";
