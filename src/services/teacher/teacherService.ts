import { get } from "@/api/http";
import { Teacher } from "@/types/teacher";


interface TeacherResponse {
  items?: Teacher[];
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
  // features?: TeacherFeature[]; 
}

export class TeacherService {
  async getTeachersList(params: any): Promise<TeacherResponse> {
    const response = await get<TeacherResponse>("/teachers", params);
    return response;
  }
}

export const teacherService = new TeacherService();
