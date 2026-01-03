import { MediaItemsRes } from '@/types/media';
import { TeacherItemsRes } from '@/types/teacher';
import 'server-only';

const API = process.env.NEXT_PUBLIC_URL_API!;

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

export class MediaServices {

    async getMediaStudentStories(
    params?: QueryParams
    ): Promise<MediaItemsRes> {

    const url = `${API}/media${toQuery(params)}`;
    console.log("cehck url media:", url)
    try {
        const res = await fetch(url, {
            next: { revalidate: 300, tags: ['media'] },
            signal: AbortSignal.timeout(15000),
        });

        if (!res.ok) {
        return {
            items: [],
            page: 1,
            pageSize: 0,
            total: 0,
            totalPages: 0,
        };
        }

        const data: MediaItemsRes = await res.json();
        return data;
    } catch {
        return {
        items: [],
        page: 1,
        pageSize: 0,
        total: 0,
        totalPages: 0,
        };
    }
    }

    async getMediaDetails(params?: QueryParams) {
        
        const url = `${API}/media/detail${toQuery(params)}`;
        try {
        const res = await fetch(url, {
            next: { revalidate: 1800, tags: ['media', "detail"] }, 
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

export const mediaServices = new MediaServices();

