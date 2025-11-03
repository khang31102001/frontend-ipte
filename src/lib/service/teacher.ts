import 'server-only';

const API = process.env.NEXT_PUBLIC_URL_API!;

export async function getTeachersList(params?: Record<string, string | number>) {
  const qs = params ? '?' + new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString() : '';

  try {
    const res = await fetch(`${API}/teachers${qs}`, {
      next: { revalidate: 300, tags: ['teachers'] }, // ISR 5 phút + tag
       signal: AbortSignal.timeout(15000), 
    });
    if (!res.ok) return { items: [], total: 0 };
    return res.json();
  } catch {
    return { items: [], total: 0 }; // không throw để không vỡ build/render
  }
}

export async function getTechersDetail(slug: string) {
  try {
    const res = await fetch(`${API}/teachers/${slug}`, {
      next: { revalidate: 1800, tags: ['teachers'] }, // ISR 30 phút + tag
        signal: AbortSignal.timeout(15000), 
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
