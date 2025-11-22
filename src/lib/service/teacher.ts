import 'server-only';

const API = process.env.NEXT_PUBLIC_URL_API!;
export class TeachersServices {
  async getTeachersList(params?: Record<string, string | number>) {
    const qs = params ? '?' + new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString() : '';

    const url = `${API}/teachers${qs}`;
    try {
      const res = await fetch(url, {
        next: { revalidate: 300, tags: ['teachers'] }, // ISR 5 phút + tag
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return { items: [], total: 0 };
      const data = await res.json()
;      return data;
    } catch {
      return { items: [], total: 0 }; // không throw để không vỡ build/render
    }
  }

  async getTechersDetails(params?: Record<string, string | number>) {

    const qs = params ? '?' + new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString() : '';
    const url = `${API}/teachers/detail${qs}`;
    try {
      const res = await fetch(url, {
        next: { revalidate: 1800, tags: ['teachers'] }, // ISR 30 phút + tag
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data;
    } catch {
      return null;
    }
  }
}

export const teacherServices = new TeachersServices();

