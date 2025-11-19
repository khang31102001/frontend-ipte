
import HeroBanner from "@/components/shared/banner/hero-banner";
import StudentReviewPage from "@/components/student/student-review-page";

export default function StudentRviewIndex(){
    return(
        <div>
            <HeroBanner img="/images/hero-img-hoc-vien-review.png"/>
             <StudentReviewPage/>
        </div>   
    );
}