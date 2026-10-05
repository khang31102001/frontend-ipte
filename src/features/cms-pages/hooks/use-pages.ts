"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { pageService } from "../services/page-service";

const hooks = createCrudHooks({ name: "pages", service: pageService, label: "trang" });
export const usePages = hooks.useList;
export const usePage = hooks.useDetail;
export const useCreatePage = hooks.useCreate;
export const useUpdatePage = hooks.useUpdate;
export const useDeletePage = hooks.useRemove;
