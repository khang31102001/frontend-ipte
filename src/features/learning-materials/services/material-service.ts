import { createCrudService } from "@/core/api";
import type { MaterialInput } from "../schemas";
import type { LearningMaterial, MaterialQuery } from "../types";

export const materialService = createCrudService<LearningMaterial, MaterialInput, MaterialInput, MaterialQuery>("/learning-materials");
