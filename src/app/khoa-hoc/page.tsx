import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import { getCourseByCate } from "@/data/data-course";
import { coursesServices } from "@/lib/service/course";
import CoursePage from "@/pages/course/course-page";


export default function IndexCourse() {
    // const items= coursesServices.getCoursesList({});
    // console.log("course:", items);
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
