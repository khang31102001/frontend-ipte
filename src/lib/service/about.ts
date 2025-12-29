
import 'server-only';

const API = process.env.NEXT_PUBLIC_URL_API!;

export class AboutSevice {
 async  getAboutMeList(params?: Record<string, string | number>):Promise<any> {

  const qs = params ? '?' + new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString() : '';

  const url = `${API}/about${qs}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300, tags: ['about'] }, // ISR 5 phút + tag
        signal: AbortSignal.timeout(15000), 
    });
    if (!res.ok) return { items: [], total: 0 };
    const data = await res.json();
    // console.log("about: ",data)
    return data;
  } catch {
    return { items: [], total: 0 }; 
  }
}

}

export const aboutService = new AboutSevice()


