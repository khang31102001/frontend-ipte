"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { bannerService } from "../services/banner-service";

const hooks = createCrudHooks({ name: "banners", service: bannerService, label: "banner" });
export const useBanners = hooks.useList;
export const useCreateBanner = hooks.useCreate;
export const useUpdateBanner = hooks.useUpdate;
export const useDeleteBanner = hooks.useRemove;
