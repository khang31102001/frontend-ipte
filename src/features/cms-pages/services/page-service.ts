import { createCrudService } from "@/core/api";
import type { CmsPageInput } from "../schemas";
import type { CmsPage, CmsPageQuery } from "../types";

export const pageService = createCrudService<CmsPage, CmsPageInput, CmsPageInput, CmsPageQuery>("/pages");
