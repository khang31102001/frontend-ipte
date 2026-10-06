import { apiClient, createCrudService } from "@/core/api";
import type { GeneratePathInput, LearningPathInput } from "../schemas";
import type { GeneratedPath, LearningPath, LearningPathQuery } from "../types";

const crud = createCrudService<LearningPath, LearningPathInput, LearningPathInput, LearningPathQuery>("/learning-paths");

export const learningPathService = {
  ...crud,
  /** Gợi ý lộ trình dựa trên trình độ hiện tại + điểm mục tiêu + hạn chứng chỉ (chưa lưu). */
  async generate(input: GeneratePathInput): Promise<GeneratedPath> {
    return (await apiClient.post<GeneratedPath>("/learning-paths/generate", input)).data;
  },
};
