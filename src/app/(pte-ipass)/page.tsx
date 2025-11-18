
import CommunityPTEiPass from "@/components/community/community-pte-ipass";
import ConsultationForm from "@/components/form/consultation-form";
import AboutPTE from "@/components/home/about-PTE";
import FeaturedCoursesPTE from "@/components/home/featured-courses-PTE";
import NewList from "@/components/home/news-list";
import StudentReview from "@/components/home/student-review";
import StudyPathPTE from "@/components/home/study-path-PTE";
import TeamTeacherPTE from "@/components/home/team-teacher";
import TrainingProgramPTE from "@/components/home/training-program-PTE";
import KnowledgePTE from "@/components/knowledge/knowledge-pte";



export function MainHomePage() {
    return (
        <div className='bg-background text-foreground'>
            <AboutPTE />
            <StudyPathPTE />
            <TrainingProgramPTE />
            <FeaturedCoursesPTE />
            <TeamTeacherPTE />
            <StudentReview />
            <NewList />
            <KnowledgePTE />
            {/* <PressSection/> */}
            <CommunityPTEiPass />
            <ConsultationForm />
        </div>
    )
}

export default function Home() {
    return <MainHomePage />
}
