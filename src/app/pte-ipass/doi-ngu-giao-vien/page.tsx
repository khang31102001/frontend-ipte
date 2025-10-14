import HeroBanner from "@/components/banner/hero-banner";
import { teacherProfiles } from "@/data/data-teacher";
import TeamTeacherPage from "@/pages/pte-ipass/team-teacher/team-teacher-page";


export default function TeacherIndex() {
  return (
    <div>
      <HeroBanner 
        img="/images/banner-team-teacher.jpg" 
        className="mb-12 "
        />
      <TeamTeacherPage
        data={teacherProfiles}
      />
    </div>
  );
}
