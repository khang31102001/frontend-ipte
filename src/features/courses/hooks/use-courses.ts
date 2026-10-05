"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { courseCategoryService, courseService, lessonService } from "../services/course-service";

const courseHooks = createCrudHooks({ name: "courses", service: courseService, label: "khóa học" });
export const courseKeys = courseHooks.keys;
export const useCourses = courseHooks.useList;
export const useCourse = courseHooks.useDetail;
export const useCreateCourse = courseHooks.useCreate;
export const useUpdateCourse = courseHooks.useUpdate;
export const useDeleteCourse = courseHooks.useRemove;

const categoryHooks = createCrudHooks({ name: "course-categories", service: courseCategoryService, label: "danh mục" });
export const useCourseCategories = categoryHooks.useList;
export const useCreateCourseCategory = categoryHooks.useCreate;
export const useUpdateCourseCategory = categoryHooks.useUpdate;
export const useDeleteCourseCategory = categoryHooks.useRemove;

const lessonHooks = createCrudHooks({ name: "lessons", service: lessonService, label: "bài học" });
export const useLessons = lessonHooks.useList;
export const useCreateLesson = lessonHooks.useCreate;
export const useUpdateLesson = lessonHooks.useUpdate;
export const useDeleteLesson = lessonHooks.useRemove;
