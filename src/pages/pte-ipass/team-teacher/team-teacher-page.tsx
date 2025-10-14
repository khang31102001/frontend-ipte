
import HeroBanner from "@/components/banner/hero-banner"
import { FeaturesSection } from "@/components/pte-ipass/teacher/featured-section"
import PTECallToAction from "@/components/pte-ipass/teacher/pte-call-to-action"
import { TeacherProfile } from "@/types/teacher";
import TeacherList from "./teacher-list";
import CommunityPTEiPass from "@/components/community-pte-ipass/community-pte-ipass";


interface TeamTeacherPageProps {
  data?: TeacherProfile[];
}

const TeamTeacherPage = ({ data }: TeamTeacherPageProps) => {
  return (
    <div className='bg-background text-foreground'>
      <FeaturesSection />
      <TeacherList data={data} />
      <CommunityPTEiPass />
      <PTECallToAction />
    </div>
  )
}

export default TeamTeacherPage