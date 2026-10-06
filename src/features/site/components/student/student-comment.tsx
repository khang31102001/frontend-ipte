import Image from "next/image";
import type { PublicTestimonial } from "@/features/public-api";
import NameAvatar from "../../shared/name-avatar";
import PageContent from "../../shared/page/page-content";
import { Section } from "../../shared/page/section";

interface StudentCommentProps {
  title?: string;
  description?: string;
  eyebrow?: string;
  comments: PublicTestimonial[];
}

const StudentComment = ({
  title = "Từ học viên iPTEPASS",
  description = "Những đánh giá chân thực từ học viên đã giúp họ chinh phục mục tiêu PTE một cách hiệu quả cùng PTE iPASS.",
  eyebrow = "Cảm nhận",
  comments,
}: StudentCommentProps) => {
  if (comments.length === 0) return null;
  return (
    <Section className="w-full">
      <PageContent>
        <div className="student-comment">
          <div className="student-comment__col-left">
            <p className="student-comment__eyebrow">{eyebrow}</p>
            <h2 className="student-comment__title">{title}</h2>
            <p className="student-comment__desc">{description}</p>
          </div>

          <div className="student-comment__col-right">
            <div className="student-comment__content">
              {comments.map((student) => (
                <article key={student.id} className="card min-h-[150px] flex flex-col">
                  <div className="card__author">
                    {student.avatarUrl ? <Image className="card__avatar" src={student.avatarUrl} alt={student.studentName} width={28} height={28} /> : <NameAvatar name={student.studentName} size={64} />}
                    <span className="card__name">
                      {student.studentName}
                      <span className="block text-xs font-normal opacity-70">
                        {student.scoreBefore ? `PTE ${student.scoreBefore} → ` : "PTE "}
                        {student.scoreAfter}
                      </span>
                    </span>
                  </div>
                  <span className="card__quote"></span>
                  <p className="card__text">{student.quote}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </PageContent>
    </Section>
  );
};

export default StudentComment;
