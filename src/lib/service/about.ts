
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

export class AboutSevice {
 async  getAboutMeList(params?: QueryParams):Promise<any> {
  const url = `${API}/abouts${toQuery(params)}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 300, tags: ['abouts'] }, 
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
 async  getSocialList(params?: QueryParams):Promise<any> {
  const url = `${API}/socials${toQuery(params)}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 300, tags: ['socials'] }, 
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

 async  getBranchList(params?: QueryParams):Promise<any> {
  const url = `${API}/branches${toQuery(params)}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 300, tags: ['branches'] }, 
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


