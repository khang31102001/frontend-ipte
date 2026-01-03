import NameAvatar from "@/shared/name-avatar";
import Image from "next/image";
import React from 'react'
interface StudentCommentItem {
  id: number
  name: string
  avatar: string
  comment: string
}
interface StudentCommentProps {
  title?: string;
  description?: string;
  eyebrow?: string;
  comments: StudentCommentItem[];
}
const StudentComment = ({
  title = 'Từ học viên iPTEPASS',
  description = "Những đánh giá chân thực từ học viên đã giúp họ chinh phục mục tiêu PTE một cách hiệu quả cùng iPTEPASS.",
  eyebrow = 'Cảm nhận',
  comments
}: StudentCommentProps) => {

if(!comments || comments.length ===0) return;
  return (
    <section className="w-full bg-white py-16 sm:py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="student-comment">
          <div className="student-comment__col-left">
            <p className="student-comment__eyebrow">{eyebrow}</p>
            <h2 className="student-comment__title">{title}</h2>
            <p className="student-comment__desc">{description}</p>
          </div>

          <div className="student-comment__col-right">
            <div className="student-comment__content">
              {comments.map((student) => (
                <article key={student.id} className="card">
                  <span className="card__quote"></span>
                  <p className="card__text">{student.comment}</p>

                  <div className="card__author">
                    {student.avatar ? (
                      <Image
                      className="card__avatar"
                      src={student.avatar}
                      alt={student.name}
                      width={28}
                      height={28}
                    />
                    ):(
                      <NameAvatar name={student.name} size={64}/>
                    )}
                    <span className="card__name">{student.name}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudentComment
