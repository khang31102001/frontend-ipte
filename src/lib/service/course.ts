
import 'server-only';

const API = process.env.NEXT_PUBLIC_URL_API!;

type CourseParams = | { slug: string } | { id: string | number } | { name: string };
type QueryParams = Record<string, string | number | boolean | null | undefined>;
function toQuery(params?: QueryParams) {
    if (!params) return "";
    const usp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null) return;
        usp.append(k, String(v));
    });
    const s = usp.toString();
    return s ? `?${s}` : "";
}

export class CoursesServices {

    async getCoursesList(params?: QueryParams): Promise<any> {
        const url = `${API}/courses/${toQuery(params)}`;
        try {
            const res = await fetch(url, {
                // next: { revalidate: 300, tags: ['courses'] }, // ISR 5 phút + tag
                signal: AbortSignal.timeout(15000),
            });
            if (!res.ok) return { items: [], total: 0 };
            const data = await res.json();
            // console.log("api list course:", data)
            return data;
        } catch {
            return { items: [], total: 0 };
        }
    }

    async getCoursesDetails(params: CourseParams) {
        const [slug, value] = Object.entries(params)[0];
        const url = `${API}/courses/detail/${slug}/${value}`;
        //    console.log("url", url);
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
            return null;
        }
    }

    async getCoursesByCate(params?: QueryParams) {

        const url = `${API}/courses${toQuery(params)}`;
        // console.log("url cate", url);
        try {
            const res = await fetch(url, {
                next: { revalidate: 300, tags: ['category', 'courses'] },
                signal: AbortSignal.timeout(15000),
            });
            if (!res.ok) return { items: [], total: 0 };
            const data = await res.json();
            //  console.log("data cate", data);
            return data;
        } catch {
            return { items: [], total: 0 };
        }
    }

}

export const coursesServices = new CoursesServices()


