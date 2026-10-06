"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { mediaService } from "../services/media-service";

const hooks = createCrudHooks({ name: "media", service: mediaService, label: "tệp media" });
export const useMedia = hooks.useList;
export const useCreateMedia = hooks.useCreate;
export const useUpdateMedia = hooks.useUpdate;
export const useDeleteMedia = hooks.useRemove;
