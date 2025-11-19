import { CheckCircle2, Calendar, Users, Target } from "lucide-react"


interface CourseStageCardProps {
  id: number;
  title: string;
  description?: string;
  content?: string;
}

export function CourseStageCard({
  id,
  title,
  description,
  content
}: CourseStageCardProps) {
  return (
    <div className="course-stage-card ">
      <h3 className="course-stage-card__title text-hero-gradient">{title}</h3>

      <p className="course-stage-card__desc">{description}</p>

      <div
        className="course-stage-card__content"
        dangerouslySetInnerHTML={{ __html: content || "" }}
      />

      <div className="course-stage-card__footer">
        <button className="course-stage-card__btn">Đăng ký ngay</button>
      </div>
    </div>
  )
}
