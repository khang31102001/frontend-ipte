"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { testimonialService } from "../services/testimonial-service";

const hooks = createCrudHooks({ name: "testimonials", service: testimonialService, label: "cảm nhận" });
export const useTestimonials = hooks.useList;
export const useCreateTestimonial = hooks.useCreate;
export const useUpdateTestimonial = hooks.useUpdate;
export const useDeleteTestimonial = hooks.useRemove;
