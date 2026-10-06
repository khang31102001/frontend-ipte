import Image from "next/image";
import Link from "next/link";
import { PTE_SKILL_LABELS } from "@/shared/domain/pte";
import type { PublicTeacher } from "@/features/public-api";
import { teacherHref } from "../../../config/routes";

interface TeacherProfilesCardProps {
  data: PublicTeacher;
}

const TeacherProfilesCard = ({ data }: TeacherProfilesCardProps) => (
  <Link href={teacherHref(data)} className="block h-full no-focus">
    <div className="teacher-card">
      <div className="teacher-card__img-area">
        <div className="teacher-card__img-frame">
          <Image
            src={data.avatarUrl || "/images/teacher-8.jpg"}
            alt={data.fullName}
            fill
            className="teacher-card__img"
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 280px"
          />
        </div>
      </div>

      <div className="teacher-card__body bg-[#001F3F] rounded-t-3xl text-white p-6">
        <h3 className="teacher-card__name font-bold text-lg mb-1">{data.fullName}</h3>
        {data.headline && <p className="text-sm text-white/80 mb-3 line-clamp-2">{data.headline}</p>}

        {data.pteScore && (
          <div className="teacher-card__overall flex items-center gap-3 mb-4">
            <span className="teacher-card__overall-score text-5xl font-bold text-[#FDD835]">{data.pteScore}</span>
            <span className="teacher-card__overall-label text-base font-medium">PTE Overall</span>
          </div>
        )}

        <div className="teacher-card__skills grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {data.specialties.map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span className="teacher-card__skill-label text-[#4FC3F7] font-semibold">{PTE_SKILL_LABELS[s]}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="teacher-card__skill-score text-[#4FC3F7] font-bold text-xl">{data.yearsExperience}+</span>
            <span className="teacher-card__skill-label text-white">năm KN</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default TeacherProfilesCard;
