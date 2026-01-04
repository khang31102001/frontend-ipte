import { TeacherItemsRes } from '@/types/teacher';
import { getAPIBaseUrl } from '@/lib/helper';

import 'server-only';

const API = getAPIBaseUrl();;

export interface TeacherQueryParams {
  page?: number;
  pageSize?: number;   
}

export class TeachersServices {
  async getTeachersList(
  params?: TeacherQueryParams
): Promise<TeacherItemsRes> {
  const qs = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ).toString()
    : '';
      console.log("qs", qs)
  const url = `${API}/teachers${qs}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300, tags: ['teachers'] },
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

    const data: TeacherItemsRes = await res.json();
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

  async getTechersDetails(params?: Record<string, string | number>) {

    const qs = params ? '?' + new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString() : '';
    const url = `${API}/teachers/detail${qs}`;
    try {
      const res = await fetch(url, {
        next: { revalidate: 1800, tags: ['teachers', "detail"] }, 
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

export const teacherServices = new TeachersServices();

