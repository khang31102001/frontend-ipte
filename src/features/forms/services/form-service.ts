import { apiClient, createCrudService } from "@/core/api";
import type { FormDefinitionInput, SubmissionUpdateInput } from "../schemas";
import type { FormDefinition, FormQuery, FormSubmission, SubmissionQuery } from "../types";

export const formService = createCrudService<FormDefinition, FormDefinitionInput, FormDefinitionInput, FormQuery>("/forms");

const submissionCrud = createCrudService<FormSubmission, SubmissionUpdateInput, SubmissionUpdateInput, SubmissionQuery>("/form-submissions");

export const submissionService = {
  ...submissionCrud,
  /** Toàn bộ lead khớp bộ lọc (không phân trang) để xuất file. */
  async exportAll(query: Omit<SubmissionQuery, "page" | "pageSize"> = {}): Promise<FormSubmission[]> {
    return (await apiClient.get<FormSubmission[]>("/form-submissions/export", { params: query as Record<string, string> })).data;
  },
};
