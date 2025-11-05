
import 'server-only';

const API = process.env.NEXT_PUBLIC_URL_API!;

export class CategoriesServices {
  async getCategoriesList(params?: Record<string, string | number>) {
    const qs = params ? '?' + new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString() : '';

    try {
      const res = await fetch(`${API}/categories/header-menu${qs}`, {
        // cache: 'no-store',
        next: { revalidate: 300, tags: ['categories'] }, // ISR 5 phút + tag
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return { items: [], total: 0 };
      return res.json();
    } catch {
      return { items: [], total: 0 }; // không throw để không vỡ build/render
    }
  }



}

export const categoriesServices = new CategoriesServices()


