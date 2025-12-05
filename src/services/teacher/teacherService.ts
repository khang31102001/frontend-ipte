import { get } from "@/api/http";
import { Teacher } from "@/types/teacher";


interface TeacherResponse {
  data?: Teacher[];
  // features?: TeacherFeature[]; 
}

export class TeacherService {
  async getTeachers(params: any): Promise<TeacherResponse> {
    const response = await get<TeacherResponse>("/teachers", params);
    return response;
  }
}

export const teacherService = new TeacherService();
