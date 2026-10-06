"use client";
import Link from "next/link";
import PageContent from "../../shared/page/page-content";
import { Section } from "../../shared/page/section";
import CustomSwiper from "../ui/custom-swiper";
import TrainingProgramCard from "./card/training-program-card";

export interface TrainingProgram {
  title: string;
  description: string;
  href?: string;
}

interface TrainingProgramsSectionProps {
  heading?: string;
  description?: string;
  programs: TrainingProgram[];
}

const BG_COLORS = [
  "bg-gradient-to-br from-amber-400 to-orange-500",
  "bg-gradient-to-br from-blue-500 to-blue-600",
  "bg-gradient-to-br from-green-500 to-green-600",
  "bg-gradient-to-br from-yellow-400 to-amber-500",
] as const;

const BREAKPOINTS = {
  0: { slidesPerView: 1, spaceBetween: 10 },
  640: { slidesPerView: 2, spaceBetween: 10 },
  870: { slidesPerView: 3, spaceBetween: 10 },
  1280: { slidesPerView: 4, spaceBetween: 10 },
};

const TrainingProgramsSection = ({ heading, description, programs }: TrainingProgramsSectionProps) => {
  if (programs.length === 0) return null;
  const useSwiper = programs.length >= 4;
  const loop = programs.length >= 6;

  const cards = programs.map((p, i) => {
    const card = <TrainingProgramCard name={p.title} description={p.description} bgColor={BG_COLORS[i % BG_COLORS.length]} textBtn="Khám phá khóa học" />;
    return p.href ? (
      <Link href={p.href} key={p.title} className="block h-full">
        {card}
      </Link>
    ) : (
      <div key={p.title} className="block h-full">
        {card}
      </div>
    );
  });

  return (
    <Section className="w-full">
      <PageContent>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-8">
          {heading && (
            <div className="lg:col-span-7 min-w-0 max-w-2xl">
              <h2 className="text-[40px] sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance">
                <span className="text-hero-gradient">{heading}</span>
              </h2>
            </div>
          )}
          {description && (
            <div className="lg:col-span-5 min-w-0 lg:pt-3 max-w-96">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 leading-relaxed">{description}</p>
            </div>
          )}
        </div>

        {useSwiper ? (
          <div className="w-full h-full">
            <CustomSwiper breakpoint={BREAKPOINTS} autoplay={loop} loop={loop}>
              {cards}
            </CustomSwiper>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((c, i) => (
              <div key={i} className="h-full">
                {c}
              </div>
            ))}
          </div>
        )}
      </PageContent>
    </Section>
  );
};

export default TrainingProgramsSection;
