"use client";

import { useMutation } from "@tanstack/react-query";
import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { notifyApiError } from "@/shared/lib/notify";
import { learningPathService } from "../services/learning-path-service";

const hooks = createCrudHooks({ name: "learning-paths", service: learningPathService, label: "lộ trình" });
export const useLearningPaths = hooks.useList;
export const useLearningPath = hooks.useDetail;
export const useCreateLearningPath = hooks.useCreate;
export const useUpdateLearningPath = hooks.useUpdate;
export const useDeleteLearningPath = hooks.useRemove;

export function useGeneratePath() {
  return useMutation({ mutationFn: learningPathService.generate, onError: notifyApiError });
}
