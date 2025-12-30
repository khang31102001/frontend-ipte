import { get } from "@/api/http";

export type QueryParams = Record<string, any>;

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

export class CourseService {
  async getCourses(params: any): Promise<any> {
    const response = await get("/courses", params);
    return response;
  }

  async getCourseById(id: number): Promise<any> {
    const response = await get(`/courses/${id}`);
    return response;
  }
   async getCourseByCateId(params: QueryParams): Promise<any> {
    const response = await get(`/courses/${toQuery(params)}`);
    return response;
  }


  async updateCourse(id: number, data: any): Promise<any> {
    const response = await get(`/courses/${id}`, data);
    return response;
  }

    async deleteCourse(id: number): Promise<any> {
        const response = await get(`/courses/${id}`);
        return response;
    }
}

export const coursesService = new CourseService();
