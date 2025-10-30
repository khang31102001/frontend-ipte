import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import StudentReviewPage from "@/pages/student-review/student-review-page";

export default function StudentRviewIndex(){
    return(
        <div>
            <HeroBanner
            img="/images/hero-banner-primary.png"
            className="mb-12"
            />

            
            <StudentReviewPage/>

        </div>   
    );
}