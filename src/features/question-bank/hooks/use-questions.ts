"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { questionService } from "../services/question-service";

const hooks = createCrudHooks({ name: "questions", service: questionService, label: "câu hỏi" });
export const useQuestions = hooks.useList;
export const useCreateQuestion = hooks.useCreate;
export const useUpdateQuestion = hooks.useUpdate;
export const useDeleteQuestion = hooks.useRemove;
