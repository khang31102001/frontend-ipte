import { FeaturesSection } from "@/components/pte-ipass/featured-section"
import { TeacherProfilesSection } from "@/components/pte-ipass/teacher-profiles-section"


const TeacherList = () => {
  return (
    <div className='bg-background text-foreground'>
        
      <FeaturesSection/>
      <TeacherProfilesSection/>
    </div>
  )
}

export default TeacherList