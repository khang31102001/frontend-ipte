import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import { getCourseByCate } from "@/data/data-course";
import CoursePage from "@/pages/course/course-page";


export default function IndexCourse() {
    return (
        <div>
            <HeroBanner
                img="/images/hero-banner-new.png"
                className="mb-12 "
            />
           
            <CoursePage
                dataCourseByCate={getCourseByCate}
            />
        </div>
    );
}
