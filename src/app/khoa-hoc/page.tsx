import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import CoursePage from "@/pages/course/course-page";


export default function IndexCourse() {
    return (
        <div>
            {/* <HeroBanner
                img="/images/hero-banner-new.png"
                className="mb-12 "
            /> */}
              <HeroImage
                src="/images/hero-banner-new.png"
                objectPosition="center"
                preset="soft"
                className="hero--fullscreen"
            />
            <CoursePage
                data={[]}
            />
        </div>
    );
}
