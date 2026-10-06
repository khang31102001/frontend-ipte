import type { Metadata } from "next";
import { TestimonialsPage } from "@/features/testimonials";

export const metadata: Metadata = { title: "Cảm nhận học viên" };

export default function Page() {
  return <TestimonialsPage />;
}
