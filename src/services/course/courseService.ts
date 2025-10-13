import { get } from "@/api/http";

export class CourseService {
  async getCourses(params: any): Promise<any> {
    const response = await get("/courses", params);
    return response;
  }

  async getCourseById(id: number): Promise<any> {
    const response = await get(`/courses/${id}`);
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

export const userService = new CourseService();
