import { createCrudService } from "@/core/api";
import type { MediaInput } from "../schemas";
import type { MediaItem, MediaQuery } from "../types";

export const mediaService = createCrudService<MediaItem, MediaInput, MediaInput, MediaQuery>("/media");
