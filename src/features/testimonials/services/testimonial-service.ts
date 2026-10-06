import { createCrudService } from "@/core/api";
import type { TestimonialInput } from "../schemas";
import type { Testimonial, TestimonialQuery } from "../types";

export const testimonialService = createCrudService<Testimonial, TestimonialInput, TestimonialInput, TestimonialQuery>("/testimonials");
