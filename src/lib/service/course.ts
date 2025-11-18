
import 'server-only';

const API = process.env.NEXT_PUBLIC_URL_API!;

type CourseParams = | { slug: string } | { id: string | number } | { name: string };

export class CoursesServices {
    async getCoursesList(params?: Record<string, string | number>) {
        const qs = params ? '?' + new URLSearchParams(
            Object.entries(params).map(([k, v]) => [k, String(v)])
        ).toString() : '';
        const url = `${API}/courses/${qs}`;
        try {
            const res = await fetch(url, {
                // next: { revalidate: 300, tags: ['courses'] }, // ISR 5 phút + tag
                signal: AbortSignal.timeout(15000),
            });
            if (!res.ok) return { items: [], total: 0 };
            const data = await res.json()
            return data;
        } catch {
            return { items: [], total: 0 }; // không throw để không vỡ build/render
        }
    }

    async getCoursesDetails(params: CourseParams) {
       const [slug, value] = Object.entries(params)[0];
       const url = `${API}/courses/${slug}/${value}`;
       console.log("url", url);
        try {
            const res = await fetch(url, {
                next: { revalidate: 300, tags: ['courses'] }, // ISR 5 phút + tag
                signal: AbortSignal.timeout(15000),
            });
      
            if (!res.ok) return null;
            const data = await res.json(); 
            //  console.log("result", data);
            return data;
        } catch {
            return null; // không throw để không vỡ build/render
        }
    }

    async getCoursesByCate(params?: Record<string, string | number>) {
        const qs = params ? '?' + new URLSearchParams(
            Object.entries(params).map(([k, v]) => [k, String(v)])
        ).toString() : '';
         const url = `${API}/courses${qs}`;
            // console.log("url cate", url);
        try {
            const res = await fetch(url, {
                next: { revalidate: 300, tags: ['courses'] }, // ISR 5 phút + tag
                signal: AbortSignal.timeout(15000),
            });
            if (!res.ok) return { items: [], total: 0 };
             const data = await res.json(); 
            //  console.log("data cate", data);
            return data;
        } catch {
            return { items: [], total: 0 }; // không throw để không vỡ build/render
        }
    }

}

export const coursesServices = new CoursesServices()


