import HeroBanner from "@/components/banner/hero-banner";
import TeamTeacherPage from "@/pages/pte-ipass/team-teacher/team-teacher-page";
import { teacherService } from "@/services/teacher/teacherService";


export default async function TeacherIndex() {
  const teachers = await teacherService.getTeachers({});
  // console.log("Teachers data:", teachers);
  return (
    <div>
      <HeroBanner 
        img="/images/banner-team-teacher.jpg" 
        className="mb-12 "
        />
      <TeamTeacherPage
        data={teachers.data}
        features={teachers.features}
      />
    </div>
  );
}
