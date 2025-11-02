
import HeroBanner from "@/components/banner/hero-banner"
import { FeaturesSection } from "@/components/pte-ipass/teacher/featured-section"
import PTECallToAction from "@/components/pte-ipass/teacher/pte-call-to-action"
import { TeacherProfile } from "@/types/teacher";
import TeacherList from "./teacher-list";
import CommunityPTEiPass from "@/components/community/community-pte-ipass";
import { TeacherFeature } from "@/types/teacherFeatures";


interface TeamTeacherPageProps {
  data?: TeacherProfile[];
  features?: TeacherFeature[]; 
}

const TeamTeacherPage = ({ data, features }: TeamTeacherPageProps) => {
  return (
    <div className='bg-background text-foreground'>
      <FeaturesSection data={features ?? []}/>
      <TeacherList data={data ?? []} />
      <CommunityPTEiPass />
      <PTECallToAction />
    </div>
  )
}

export default TeamTeacherPage