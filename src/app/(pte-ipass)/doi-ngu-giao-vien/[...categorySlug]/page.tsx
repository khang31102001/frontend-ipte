
import Skeleton from "@/components/shared/loading/Skeleton";
import TeacherDetails from "@/components/teacher/details/teacher-detail";
import TeacherDetail from "@/components/teacher/details/teacher-detail";
import { teacherServices } from "@/lib/service/teacher";

// app/doi-ngu-giao-vien/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

//  SEO metadata cho trang Đội ngũ giáo viên
export const metadata: Metadata = {
  title: "Đội ngũ giáo viên PTE iPASS",
  description:
    "Đội ngũ giáo viên PTE iPASS nhiều năm kinh nghiệm, hiểu rõ cấu trúc đề thi và chiến lược giúp học viên đạt 50+, 65+ và 79+ trong thời gian ngắn.",
  keywords: [
    "đội ngũ giáo viên PTE",
    "giáo viên PTE iPASS",
    "luyện thi PTE với giáo viên bản ngữ",
    "PTE Darwin",
    "PTE online",
  ],
  alternates: {
    canonical: "/doi-ngu-giao-vien",
  },
  openGraph: {
    title: "Đội ngũ giáo viên PTE iPASS",
    description:
      "Gặp gỡ đội ngũ giáo viên PTE iPASS – những người đồng hành cùng bạn trên hành trình chinh phục mục tiêu PTE.",
    url: "/doi-ngu-giao-vien",
    type: "website",
    siteName: "PTE iPASS",
    images: [
      {
        url: "/images/og/pte-teachers-og.jpg", // 🔁 Đổi sang ảnh thật nếu có
        width: 1200,
        height: 630,
        alt: "Đội ngũ giáo viên PTE iPASS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đội ngũ giáo viên PTE iPASS",
    description:
      "Giáo viên giàu kinh nghiệm, tận tâm và chiến lược luyện thi rõ ràng cho từng mục tiêu PTE.",
    images: ["/images/og/pte-teachers-og.jpg"],
  },
};

//  Data mẫu cho giáo viên (sau này có thể lấy từ API)
const teachers = [
  {
    name: "Teacher Jenefer",
    role: "Giáo viên bản ngữ – Chuyên Speaking & Writing",
    experience: "10+ năm giảng dạy tiếng Anh học thuật & luyện thi PTE.",
    specialties: "Speaking, Writing, chiến lược đạt 65+ & 79+.",
    image: "/images/teachers/jenefer.jpg", // đổi nếu có
    description:
      "Tập trung vào sửa phát âm, xây dựng template nói & viết, giúp học viên tự tin khi vào phòng thi.",
  },
  {
    name: "Teacher Christine",
    role: "Giáo viên – Chuyên Listening & Reading",
    experience: "8+ năm làm việc trong môi trường quốc tế và giảng dạy PTE.",
    specialties: "Listening, Reading, kỹ thuật làm nhanh và chính xác.",
    image: "/images/teachers/christine.jpg",
    description:
      "Hướng dẫn cách phân bổ thời gian, mẹo làm từng dạng câu hỏi để tối ưu điểm cho người đi làm bận rộn.",
  },
  {
    name: "Teacher Concepcion",
    role: "Giáo viên – Lộ trình nền tảng & 50+",
    experience: "6+ năm dạy tiếng Anh giao tiếp & PTE cho beginner.",
    specialties: "Xây nền tảng, sửa ngữ pháp cơ bản, giúp học viên mới bắt đầu.",
    image: "/images/teachers/concepcion.jpg",
    description:
      "Phong cách dạy dễ hiểu, kiên nhẫn, giúp học viên mất gốc xây lại nền tảng tự tin trước khi vào lộ trình 65+.",
  },
];

//  JSON-LD giúp Google hiểu trang “About team / Teachers”
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Đội ngũ giáo viên PTE iPASS",
  description:
    "Thông tin về đội ngũ giáo viên PTE iPASS – những người trực tiếp đồng hành và hỗ trợ học viên đạt mục tiêu PTE.",
  url: "https://iptepass.com/doi-ngu-giao-vien", // 🔁 đổi domain cho đúng
  publisher: {
    "@type": "Organization",
    name: "PTE iPASS",
    url: "https://iptepass.com",
    logo: {
      "@type": "ImageObject",
      url: "https://iptepass.com/images/logo.png", // logo full URL
    },
  },
  mainEntity: teachers.map((t) => ({
    "@type": "Person",
    name: t.name,
    jobTitle: t.role,
    description: t.description,
    worksFor: {
      "@type": "Organization",
      name: "PTE iPASS",
    },
  })),
};


async function TeacherDetailsPage({ teacherSlug }: { teacherSlug: string }) {
  const dataTeacher = await teacherServices.getTechersDetails({ slug: teacherSlug });
  console.log("dataTeacher:", dataTeacher);
  return <TeacherDetails teacher={dataTeacher} />
}

interface TeacherDetailsPageProps {
  params: { categorySlug: string[] }
}

export default async function Page({ params }: TeacherDetailsPageProps) {
  const { categorySlug } = params ?? [];
  console.log("categorySlug", categorySlug);

  const lastUrl = categorySlug ? categorySlug[categorySlug.length - 1] : null;
  if (!lastUrl) return notFound();
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
     
      <Suspense fallback={<Skeleton title="đang tải........." />}>
        <TeacherDetailsPage teacherSlug={lastUrl} />
      </Suspense>
    </>
  );

}
