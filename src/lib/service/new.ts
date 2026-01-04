
import 'server-only';
import { getAPIBaseUrl } from '@/lib/helper';

import 'server-only';

const API = getAPIBaseUrl();;

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



export class NewsServices {

    async getNewsList(params?: QueryParams) {
        const url = `${API}/news${toQuery(params)}`;
        try {
            const res = await fetch(url, {
                next: { revalidate: 300, tags: ['news'] },
                signal: AbortSignal.timeout(15000),
            });
            if (!res.ok) return { items: [], total: 0 };

            const data = await res.json();
            // console.log('data news', data);

            return data;
        } catch {
            return { items: [], total: 0 }; // không throw để không vỡ build/render
        }
    }
    async getNewssByCate(params?: QueryParams) {

        const url = `${API}/news${toQuery(params)}`;
        // console.log("url cate", url);
        try {
            const res = await fetch(url, {
                next: { revalidate: 300, tags: ['category', 'news'] },
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

    async getNewsDetail(params: QueryParams) {
        try {
            const res = await fetch(`${API}/news/detail/${toQuery(params)}`, {
                // cache: 'no-store', sử dụng SSR  dùng dử liệu tươi  
                next: { revalidate: 1800, tags: ['news'] },
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

}

export const newsServices = new NewsServices();


