import React from 'react'
 interface StudentCommentItem {
  id: number
  name: string
  avatar: string
  comment: string
}
interface StudentCommentProps {
    title?: string ;
    description?: string ;
    eyebrow?: string ;
    comments: StudentCommentItem[];
}
const StudentComment = ({
    title = 'Từ học viên iPTEPASS',
    description = "Những đánh giá chân thực từ học viên đã giúp họ chinh phục mục tiêu PTE một cách hiệu quả cùng iPTEPASS.",
    eyebrow = 'Cảm nhận',
    comments
}: StudentCommentProps) => {
  return (
     <section className="student-comment">
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
                <img className="card__avatar" src={student.avatar} alt={student.name} />
                <span className="card__name">{student.name}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StudentComment