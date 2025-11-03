// import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import { getTeachersList } from "@/lib/service/teacher";
import TeamTeacherPage from "@/pages/pte-ipass/team-teacher/team-teacher-page";



export default async function TeacherIndex() {
  const data = await getTeachersList({});
  const features = data.features ?? [];
  const items = data.data ?? [];
  // console.log("features:", features);
  return (
    <div>
      <HeroBanner 
        img="/images/banner-team-teacher.jpg" 
        className="mb-12 "
        />
        
      <TeamTeacherPage
        data={items}
        features={features}
      />
    </div>
  );
}
