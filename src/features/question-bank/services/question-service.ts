import { apiClient, createCrudService } from "@/core/api";
import type { QuestionInput } from "../schemas";
import type { Question, QuestionQuery } from "../types";

const crud = createCrudService<Question, QuestionInput, QuestionInput, QuestionQuery>("/questions");

export const questionService = {
  ...crud,
  /** Toàn bộ câu hỏi khớp bộ lọc (không phân trang) để xuất file. */
  async exportAll(query: Omit<QuestionQuery, "page" | "pageSize"> = {}): Promise<Question[]> {
    return (await apiClient.get<Question[]>("/questions/export", { params: query as Record<string, string> })).data;
  },
};
