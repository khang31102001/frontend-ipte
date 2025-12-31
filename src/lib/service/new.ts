import { url } from 'inspector';
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

interface NewsJoinedKnowledge  {
    news: {
        id: number;
        image: string;
        title: string;
        description: string;
        content: string;
        category: string | null;
        authorName: string | null;
        authorAvatar: string | null;
    }[];
    tips: {
        id: number;
        image: string;
        title: string;
        description: string;
        content: string;
        category: string | null;
        authorName: string | null;
        authorAvatar: string | null;
    }[];
};

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
      async getNewsAndTipList(params?: Record<string, string | number>):Promise<NewsJoinedKnowledge> {
        const qs = params ? '?' + new URLSearchParams(
            Object.entries(params).map(([k, v]) => [k, String(v)])
        ).toString() : '';

        try {
            const res = await fetch(`${API}/news/news-and-tips${qs}`, {
                next: { revalidate: 300, tags: ['news'] }, // ISR 5 phút + tag
                signal: AbortSignal.timeout(15000), 
            });
            if (!res.ok) return { news: [], tips: []};
            
            return  res.json();
        } catch {
            return { news: [], tips: []}; // không throw để không vỡ build/render
        }
    }


    async getNewsDetail(params: QueryParams) {
        try {
            const res = await fetch(`${API}/news/${toQuery(params)}`, {
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


