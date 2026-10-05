import Image from "next/image";
import { PTE_SKILL_LABELS } from "@/shared/domain/pte";
import type { PublicTeacher } from "@/features/public-api";
import { sanitizeHtml, toHtml } from "../../../lib/sanitize";

interface TeacherDetailProps {
  teacher: PublicTeacher;
}

const TeacherDetails = ({ teacher }: TeacherDetailProps) => (
  <article className="teacher-container">
    <div className="teacher-wrapper">
      <div className="teacher-header">
        <div className="teacher-header-content">
          <Image src={teacher.avatarUrl || "/images/teacher-8.jpg"} alt={teacher.fullName} width={160} height={160} className="teacher-profile-image" priority />
          <div className="teacher-header-info">
            <h1 className="teacher-title">{teacher.fullName}</h1>
            {teacher.headline && <p className="teacher-score-label">{teacher.headline}</p>}
            {teacher.pteScore && (
              <>
                <div className="teacher-score-display">
                  <span className="teacher-score-value">{teacher.pteScore}</span>
                  <span className="teacher-score-max">/ 90</span>
                </div>
                <p className="teacher-score-label">PTE Academic Overall</p>
              </>
            )}
          </div>
        </div>
      </div>

      <section className="teacher-section">
        <h2 className="teacher-section-title">Thế mạnh giảng dạy</h2>
        <div className="flex flex-wrap gap-3">
          {teacher.specialties.map((s) => (
            <span key={s} className="rounded-full border px-4 py-1.5 text-sm font-medium">
              {PTE_SKILL_LABELS[s]}
            </span>
          ))}
          <span className="rounded-full border px-4 py-1.5 text-sm font-medium">{teacher.yearsExperience}+ năm kinh nghiệm</span>
        </div>
      </section>

      {teacher.qualifications.length > 0 && (
        <section className="teacher-section">
          <h2 className="teacher-section-title">Chứng chỉ &amp; trình độ</h2>
          <ul className="list-disc pl-6 space-y-1">
            {teacher.qualifications.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>
      )}

      {teacher.bio && (
        <section className="teacher-section">
          <h2 className="teacher-section-title">Thông tin giáo viên</h2>
          <div className="teacher-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(toHtml(teacher.bio)) }} />
        </section>
      )}
    </div>
  </article>
);

export default TeacherDetails;
