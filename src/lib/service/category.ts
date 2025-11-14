
import 'server-only';

const API = process.env.NEXT_PUBLIC_URL_API!;

export class CategoriesServices {
  async getCategoriesList(params?: Record<string, string | number>) {
    const qs = params ? '?' + new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString() : '';
    const url = `${API}/categories/header-menu${qs}`;
    console.log("url cate:", url)
    try {
      const res = await fetch(url, {
        cache: 'no-store',
       // next: { revalidate: 300, tags: ['categories'] }, // ISR 5 phút + tag
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return { items: [], total: 0 };
      return res.json();
    } catch {
      return { items: [], total: 0 }; // không throw để không vỡ build/render
    }
  }

    async getItemBycategories(params?: Record<string, string | number>) {
    const qs = params ? '?' + new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString() : '';
      const url = `${API}/categories${qs}`;
      // console.log("url-category:", url);
    try {
      const res = await fetch(url, {
        // cache: 'no-store',
        // next: { revalidate: 300, tags: ['categories'] }, // ISR 5 phút + tag
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return { items: [], total: 0 };
      const data = res.json();
      // console.log("data category:", data);
      return data;
    } catch {
      return { items: [], total: 0 }; // không throw để không vỡ build/render
    }
  }

   async getCategoryTree(params?: Record<string, string | number>) {
    const qs = params ? '?' + new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString() : '';
      const url = `${API}/categories/category-tree${qs}`;
      // console.log("url-category:", url);
    try {
      const res = await fetch(url, {
        // cache: 'no-store',
        // next: { revalidate: 300, tags: ['categories'] }, // ISR 5 phút + tag
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return { items: [], total: 0 };
      const data = res.json();
      // console.log("data course category:", data);
      return data;
    } catch {
      return { items: [], total: 0 }; // không throw để không vỡ build/render
    }
  }





}

export const categoriesServices = new CategoriesServices()


