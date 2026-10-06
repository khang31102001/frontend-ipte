"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { PublicCourse } from "@/features/public-api";
import { courseCardProps } from "../../lib/course-view";
import PageContent from "../../shared/page/page-content";
import { Section } from "../../shared/page/section";
import CourseCard from "../courses/card/course-card";
import CustomSwiper from "../ui/custom-swiper";

interface FeaturedCoursesSectionProps {
  heading?: string;
  description?: string;
  courses: PublicCourse[];
}

const BREAKPOINTS = {
  0: { slidesPerView: 1, spaceBetween: 10 },
  640: { slidesPerView: 2, spaceBetween: 10 },
  870: { slidesPerView: 3, spaceBetween: 10 },
  1280: { slidesPerView: 4, spaceBetween: 10 },
};

const FeaturedCoursesSection = ({
  heading = "Khóa học nổi bật",
  description = "Các khóa học được lựa chọn kỹ càng để giúp bạn đạt được mục tiêu PTE một cách hiệu quả.",
  courses,
}: FeaturedCoursesSectionProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  if (courses.length === 0) return null;

  const useSwiper = courses.length >= 4;
  const loop = courses.length >= 6;

  return (
    <Section className="w-full">
      <PageContent>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <div className="text-center md:text-left space-y-2">
            <h2 className="sm:text-3xl md:text-5xl font-bold text-brandBlue-900 text-center md:text-left my-2">{heading}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto md:mx-0">{description}</p>
          </div>
        </div>

        {useSwiper ? (
          <div className="w-full h-full pt-1">
            <CustomSwiper breakpoint={BREAKPOINTS} autoplay={loop} loop={loop} navigation={{ prevEl: prevRef, nextEl: nextRef }}>
              {courses.map((course) => (
                <div key={course.id} className="w-full h-full">
                  <CourseCard {...courseCardProps(course)} btnText="Tìm hiểu thêm" card_layout="col" />
                </div>
              ))}
            </CustomSwiper>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} {...courseCardProps(course)} btnText="Tìm hiểu thêm" card_layout="col" />
            ))}
          </div>
        )}

        {courses.length > 4 && (
          <div className="flex justify-center mb-2 gap-2">
            <button ref={prevRef} className="swiper-nav-btn" aria-label="Khóa học trước">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button ref={nextRef} className="swiper-nav-btn" aria-label="Khóa học sau">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </PageContent>
    </Section>
  );
};

export default FeaturedCoursesSection;
