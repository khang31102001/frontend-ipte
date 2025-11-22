import 'server-only';

const API = process.env.NEXT_PUBLIC_URL_API!;
export class KnowledgesServices{

 async  getKnowledgeList(params?: Record<string, string | number>) {
  const qs = params ? '?' + new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString() : '';
  const url = `${API}/knowledges${qs}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 300, tags: ['knowledges'] }, // ISR 5 phút + tag
       signal: AbortSignal.timeout(15000), 
    });
    if (!res.ok) return { items: [], total: 0 };
    return res.json();
  } catch {
    return { items: [], total: 0 }; // không throw để không vỡ build/render
  }
}

 async  getKnowledgeDetail(params?: Record<string, string | number>) {
     const qs = params ? '?' + new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString() : '';
    const url = `${API}/knowledges/detail${qs}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 1800, tags: ['knowledge'] }, // ISR 30 phút + tag
        signal: AbortSignal.timeout(15000), 
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

}

export const knowledgesServices = new KnowledgesServices()

