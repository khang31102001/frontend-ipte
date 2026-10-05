import { createCrudService } from "@/core/api";
import type { TeacherInput } from "../schemas";
import type { Teacher, TeacherQuery } from "../types";

export const teacherService = createCrudService<Teacher, TeacherInput, TeacherInput, TeacherQuery>("/teachers");
