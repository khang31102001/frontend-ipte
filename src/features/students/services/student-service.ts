import { apiClient, createCrudService } from "@/core/api";
import type { AdvanceJourneyInput, JourneyNoteInput, StudentInput, StudentProfileInput } from "../schemas";
import type { JourneyEvent, Student, StudentJourney, StudentProfile, StudentQuery } from "../types";

const crud = createCrudService<Student, StudentInput, StudentInput, StudentQuery>("/students");

/** Service học viên: CRUD chuẩn + hồ sơ PTE + hành trình + xuất dữ liệu. */
export const studentService = {
  ...crud,

  async getProfile(studentId: string, signal?: AbortSignal): Promise<StudentProfile | null> {
    return (await apiClient.get<StudentProfile | null>(`/students/${encodeURIComponent(studentId)}/profile`, { signal })).data;
  },

  async saveProfile(studentId: string, input: StudentProfileInput): Promise<StudentProfile> {
    return (await apiClient.put<StudentProfile>(`/students/${encodeURIComponent(studentId)}/profile`, input)).data;
  },

  async getJourney(studentId: string, signal?: AbortSignal): Promise<StudentJourney> {
    return (await apiClient.get<StudentJourney>(`/students/${encodeURIComponent(studentId)}/journey`, { signal })).data;
  },

  async advanceJourney(studentId: string, input: AdvanceJourneyInput): Promise<JourneyEvent> {
    return (await apiClient.post<JourneyEvent>(`/students/${encodeURIComponent(studentId)}/journey/advance`, input)).data;
  },

  async addJourneyNote(studentId: string, input: JourneyNoteInput): Promise<JourneyEvent> {
    return (await apiClient.post<JourneyEvent>(`/students/${encodeURIComponent(studentId)}/journey/notes`, input)).data;
  },

  /** Lấy toàn bộ bản ghi khớp bộ lọc (không phân trang) để xuất file. */
  async exportAll(query: Omit<StudentQuery, "page" | "pageSize"> = {}): Promise<Student[]> {
    return (await apiClient.get<Student[]>("/students/export", { params: query as Record<string, string> })).data;
  },
};
