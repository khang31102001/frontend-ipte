"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PTE_SKILL_LABELS } from "@/shared/domain/pte";
import type { PublicTeacher } from "@/features/public-api";
import { teacherHref } from "../../config/routes";
import AvatarCarousel from "../../shared/avatar-carousel";
import { Section } from "../../shared/page/section";
import Image from "next/image";

interface TeamTeacherProps {
  heading?: string;
  description?: string;
  teachers: PublicTeacher[];
}

const TeamTeacherPTE = ({
  heading = "Các giảng viên của iPTE",
  description = "Đội ngũ giảng viên giàu kinh nghiệm, tận tâm tại PTE iPASS cam kết mang đến cho bạn trải nghiệm học tập xuất sắc và hỗ trợ cá nhân hóa để giúp bạn đạt được mục tiêu PTE của mình.",
  teachers,
}: TeamTeacherProps) => {
  const [selectedId, setSelectedId] = useState<string>(teachers[0]?.id ?? "");
  const selected = useMemo(() => teachers.find((t) => t.id === selectedId) ?? teachers[0], [teachers, selectedId]);
  const options = useMemo(() => teachers.map((t) => ({ id: t.id, name: t.fullName, image: t.avatarUrl })), [teachers]);

  if (!selected) return null;
  const image = selected.avatarUrl || "/images/teacher-8.jpg";

  return (
    <Section className="w-full">
      <div className="mx-auto py-6 sm:w-[var(--width-container-sm)] md:w-[var(--width-container-md)] lg:w-[var(--width-container-lg)] xl:w-[var(--width-container-xl)] sm:px-[var(--padding-x-container-sm)] md:px-[var(--padding-x-container-md)] lg:px-[var(--padding-x-container-lg)] xl:px-[var(--padding-x-container-xl)]">
        <div className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-500 rounded-3xl px-12 py-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent" />
          <div className="relative z-10">
            <div>
              <h2 className="text-white sm:text-3xl md:text-5xl font-bold mb-6">{heading}</h2>
              <p className="text-blue-200 mb-10 leading-relaxed text-sm sm:text-base md:text-lg">{description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch mb-12">
              <div className="md:col-span-5 w-full h-full flex justify-center md:justify-start">
                <div className="relative w-[min(420px,90vw)] md:w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-white/5">
                  <Image src={image} alt={selected.fullName} fill className="object-cover object-center" sizes="(min-width: 768px) 25vw, 90vw" />
                </div>
              </div>

              <div className="md:col-span-7 h-full">
                <div className="h-full bg-white/10 rounded-2xl shadow-lg px-6 py-8 lg:px-8 lg:py-10 flex flex-col">
                  <div className="space-y-6">
                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                      <Link href={teacherHref(selected)} className="hover:underline">
                        {selected.fullName}
                      </Link>
                    </h3>
                    {selected.headline && <p className="text-blue-100">{selected.headline}</p>}

                    <div className="flex items-center gap-4">
                      {selected.pteScore && <div className="text-4xl md:text-5xl font-bold text-orange-400">{selected.pteScore}</div>}
                      <div className="text-white">
                        <div className="font-semibold">PTE Academic</div>
                        <div className="text-blue-200">Overall</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-start gap-3">
                      {selected.specialties.map((s) => (
                        <span key={s} className="rounded-full bg-white/15 px-3 py-1 text-sm text-white">
                          {PTE_SKILL_LABELS[s]}
                        </span>
                      ))}
                      <span className="rounded-full bg-white/15 px-3 py-1 text-sm text-white">{selected.yearsExperience}+ năm kinh nghiệm</span>
                    </div>
                  </div>

                  <div className="mt-6 flex-1">
                    <p className="text-blue-100 leading-relaxed text-sm sm:text-base md:text-lg line-clamp-8">{selected.bio || "Thông tin giảng viên đang được cập nhật."}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end">
              <div className="w-full min-w-[12rem] sm:min-w-64 max-w-[38rem] flex items-center justify-end">
                <AvatarCarousel items={options} selectedId={selected.id} onSelect={(id) => setSelectedId(String(id))} itemSize={64} gap={8} scrollStep="item" autoScrollToSelected className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TeamTeacherPTE;
