import { url } from 'inspector';
import 'server-only';

const API = process.env.NEXT_PUBLIC_URL_API!;
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

export class NewServices {
    async getNewsList(params?: Record<string, string | number>) {
        const qs = params ? '?' + new URLSearchParams(
            Object.entries(params).map(([k, v]) => [k, String(v)])
        ).toString() : '';
        const url = `${API}/news${qs}`;
        // console.log('fetch url news', url);
        try {
            const res = await fetch(url, {
                next: { revalidate: 300, tags: ['news'] }, // ISR 5 phút + tag
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


    async getNewsDetail(slug: string) {
        try {
            const res = await fetch(`${API}/news/${slug}`, {
                // cache: 'no-store', sử dụng SSR  dùng dử liệu tươi  
                next: { revalidate: 1800, tags: ['news'] }, // ISR 30 phút + tag
                signal: AbortSignal.timeout(15000), 
            });
            if (!res.ok) return null;
            return res.json();
        } catch {
            return null;
        }
    }

}

export const newServices = new NewServices();


