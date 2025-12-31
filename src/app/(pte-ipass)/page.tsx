
import AboutSection from "@/components/about/about-section";
import CommunityPTE from "@/components/community/community-pte-ipass";
import ConsultationForm from "@/components/form/consultation-form";
import FeaturedCoursesSection from "@/components/home/featured-courses-section";
import NewsListSection from "@/components/home/news-list-section";
import StudyPathPTE from "@/components/home/study-path-PTE";
import TeamTeacherPTE from "@/components/home/team-teacher";
import TrainingProgramsSection from "@/components/home/training-program-section";
import PteKnowledgeSection from "@/components/knowledge/pte-knowledge-section";
import { HeroBanner } from "@/shared/banner/hero-banner";
import { homeSchema } from "@/lib/schema/homeSchema";
import { aboutService } from "@/lib/service/about";
import { categoriesServices } from "@/lib/service/category";
import { coursesServices } from "@/lib/service/course";
import { newsServices } from "@/lib/service/new";
import { teacherService } from "@/services/teacher/teacherService";


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

  const [
    aboutRes,
    cateCourses,
    featuredCoursesRes,
    teacherRes,
    newsRes,
    socialRes,
    cateKnowledgeRes,
  ] = await Promise.all([
    aboutService.getAboutMeList({}), 
    categoriesServices.getCategoryTree({ categoryType: "H_MENU_COURSE" }),
    coursesServices.getCoursesList({ page: 1, pageSize: 12, isFeatured: true }),
    teacherService.getTeachersList({ page: 1, pageSize: 12 }),
    newsServices.getNewsList({ page: 1, pageSize: 12 }),
    aboutService.getSocialList(),
    categoriesServices.getCategoryTree({ categoryType: "H_MENU_KNOWLEDGE"}),
  ]);

  const aboutData = aboutRes?.items?.[0] ?? null;
  const featuredCourses = featuredCoursesRes?.items ?? [];
  const teacherData = teacherRes?.items ?? [];
  const newsData = newsRes?.items ?? [];
  const socialData = socialRes?.items ?? [];
  const trainingCategory = cateCourses?.[0] ?? null;
  const cateKnowledgeData = cateKnowledgeRes?.[0] ?? [];

  // console.log(" check cateKnowledgeData ",cateKnowledgeData)

  return (
    <div className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      <HeroBanner
        alt="Trang chủ pte ipass"
        src="/images/banner/about-us-banner.png"
        priority={true}
      />

      <AboutSection data={aboutData} />
      <StudyPathPTE />
      {trainingCategory && <TrainingProgramsSection data={trainingCategory} />}
      <FeaturedCoursesSection featuredCourses={featuredCourses} />
      <TeamTeacherPTE dataTeacher={teacherData} />
      <NewsListSection newsData={newsData} />
      <PteKnowledgeSection cateKnowledges={cateKnowledgeData}/>
      <CommunityPTE socialData={socialData} />
      <ConsultationForm />
    </div>
  );
}