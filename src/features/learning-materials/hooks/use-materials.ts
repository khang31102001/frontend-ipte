"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { materialService } from "../services/material-service";

const hooks = createCrudHooks({ name: "learning-materials", service: materialService, label: "học liệu" });
export const useMaterials = hooks.useList;
export const useCreateMaterial = hooks.useCreate;
export const useUpdateMaterial = hooks.useUpdate;
export const useDeleteMaterial = hooks.useRemove;
