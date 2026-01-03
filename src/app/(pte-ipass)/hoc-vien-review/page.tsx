import StudentReviewPage from "@/components/student/student-review-page";
import { mediaServices } from "@/lib/service/media";
import { HeroBanner } from "@/shared/banner/hero-banner";

export default async function Page() {
    const studentStoryRes = await mediaServices.getMediaStudentStories();
    const studentStoryData = studentStoryRes.items ?? [];
    // console.log("audit check data:", studentStoryRes)
    
    return (
       

            <StudentReviewPage dataStudentStories={studentStoryData} dataVideo={studentStoryData} />
     
    );
}