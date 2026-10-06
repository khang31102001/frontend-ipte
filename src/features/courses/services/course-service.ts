import { createCrudService } from "@/core/api";
import type { CourseCategoryInput, CourseInput, LessonInput } from "../schemas";
import type { Course, CourseCategory, CourseCategoryQuery, CourseQuery, Lesson, LessonQuery } from "../types";

export const courseService = createCrudService<Course, CourseInput, CourseInput, CourseQuery>("/courses");

export const courseCategoryService = createCrudService<
  CourseCategory,
  CourseCategoryInput,
  CourseCategoryInput,
  CourseCategoryQuery
>("/course-categories");

export const lessonService = createCrudService<Lesson, LessonInput, LessonInput, LessonQuery>("/lessons");
