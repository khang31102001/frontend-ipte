
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
import { homeSchema } from "@/lib/schema/homeSchema";


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



export default function Home() {
    return (
        <div className='bg-background text-foreground'>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
            />

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
