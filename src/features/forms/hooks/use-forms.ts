"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { formService, submissionService } from "../services/form-service";

const formHooks = createCrudHooks({ name: "forms", service: formService, label: "biểu mẫu" });
export const useForms = formHooks.useList;
export const useFormDefinition = formHooks.useDetail;
export const useCreateForm = formHooks.useCreate;
export const useUpdateForm = formHooks.useUpdate;
export const useDeleteForm = formHooks.useRemove;

const submissionHooks = createCrudHooks({ name: "form-submissions", service: submissionService, label: "dữ liệu biểu mẫu" });
export const useSubmissions = submissionHooks.useList;
export const useUpdateSubmission = submissionHooks.useUpdate;
export const useDeleteSubmission = submissionHooks.useRemove;
