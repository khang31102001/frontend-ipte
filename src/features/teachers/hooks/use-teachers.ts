"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { teacherService } from "../services/teacher-service";

const hooks = createCrudHooks({ name: "teachers", service: teacherService, label: "giáo viên" });
export const useTeachers = hooks.useList;
export const useTeacher = hooks.useDetail;
export const useCreateTeacher = hooks.useCreate;
export const useUpdateTeacher = hooks.useUpdate;
export const useDeleteTeacher = hooks.useRemove;
