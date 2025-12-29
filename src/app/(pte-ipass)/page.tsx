
import AboutSection from "@/components/about/about-section";
import CommunityPTEiPass from "@/components/community/community-pte-ipass";
import ConsultationForm from "@/components/form/consultation-form";
import FeaturedCoursesPTE from "@/components/home/featured-courses-PTE";
import NewList from "@/components/home/news-list";
import StudentReview from "@/components/home/student-review";
import StudyPathPTE from "@/components/home/study-path-PTE";
import TeamTeacherPTE from "@/components/home/team-teacher";
import TrainingProgramsSection from "@/components/home/training-program-section";
import KnowledgePTE from "@/components/knowledge/knowledge-pte";
import { HeroBanner } from "@/components/shared/banner/hero-banner";
import { homeSchema } from "@/lib/schema/homeSchema";
import { aboutService } from "@/lib/service/about";
import { categoriesServices } from "@/lib/service/category";


export const metadata = {
    title: "PTE iPASS – Trung tâm luyện thi PTE tiếng Anh hàng đầu tại Australia & Việt Nam",
    description:
        "PTE iPASS cung cấp khóa học PTE 1:1, nhóm nhỏ, lộ trình rõ ràng, giáo viên bản ngữ, đảm bảo đầu ra PTE 50 - 65 - 79+. Học online – linh hoạt – hiệu quả.",
    keywords: [
        "luyện thi PTE",
        "PTE iPASS",
        "khóa học PTE",
        "học PTE online",
        "PTE 79+",
        "PTE tiếng Anh",
        "trung tâm PTE",
        "luyện thi PTE cấp tốc"
    ],

    // 🔥 SEO cho chia sẻ mạng xã hội
    openGraph: {
        title: "PTE iPASS – Trung tâm luyện thi PTE tiếng Anh hàng đầu",
        description:
            "Khóa học PTE cam kết đầu ra với giáo viên bản ngữ, lộ trình cá nhân hoá và bài mẫu chuẩn chỉnh.",
        url: "https://pteipass.com",
        siteName: "PTE iPASS",
        images: [
            {
                url: "https://pteipass.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "PTE iPASS – Trung tâm luyện thi PTE tiếng Anh"
            }
        ],
        locale: "vi_VN",
        type: "website"
    },

    // 🔥 Twitter / X SEO
    twitter: {
        card: "summary_large_image",
        title: "PTE iPASS – Luyện thi PTE tiếng Anh chuyên nghiệp",
        description:
            "Khóa học PTE đảm bảo đầu ra 50-65-79+ với giáo viên bản ngữ và lộ trình bài bản.",
        images: ["https://pteipass.com/og-image.jpg"]
    },

    // Cấu hình indexing
    robots: {
        index: true,
        follow: true
    }
};



export default async function Home() {

    const aboutData = await aboutService.getAboutMeList({}).then((result)=> result.items );
    const cateCourses = await categoriesServices.getCategoryTree({categoryType: "H_MENU_COURSE"});
    // const pageSection:any[] = pageHome[0].children ?? [];
    // const trainingProgram =  pageSection.filter((i)=> i.categoryType === "HOME_PROGRAM_OVERVIEW") ?? null;

    // console.log("check data about", aboutData)
    console.log("check cate  categoryCourses:", cateCourses)
    return ( 
        <div className='bg-background text-foreground'>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
            />
            <HeroBanner
                alt="Trang chủ pte ipass"
                src="/images/banner/about-us-banner.png"
                priority= {true}
            />

            <AboutSection data={aboutData[0]} />
            <StudyPathPTE />
            <TrainingProgramsSection data={cateCourses[0]}  />
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
