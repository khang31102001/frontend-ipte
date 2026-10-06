import { createCrudService } from "@/core/api";
import type { BannerInput } from "../schemas";
import type { Banner, BannerQuery } from "../types";

export const bannerService = createCrudService<Banner, BannerInput, BannerInput, BannerQuery>("/banners");
