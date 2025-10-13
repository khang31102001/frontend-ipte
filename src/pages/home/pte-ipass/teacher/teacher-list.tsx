import CommunityPTE from "@/components/home/community-PTE"
import { FeaturesSection } from "@/components/pte-ipass/teacher/featured-section"
import PTECallToAction from "@/components/pte-ipass/teacher/pte-call-to-action"
import { TeacherProfilesSection } from "@/components/pte-ipass/teacher/teacher-profiles-section"


const TeacherList = () => {
  return (
    <div className='bg-background text-foreground'>
        
      <FeaturesSection/>
      <TeacherProfilesSection/>
      <CommunityPTE/>
      <PTECallToAction/>
      
    </div>
  )
}

export default TeacherList