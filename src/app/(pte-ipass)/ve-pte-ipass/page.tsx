import AboutPage from '@/components/about/about-page';

import { aboutService } from '@/lib/service/about';
import type { Metadata } from "next";

//SEO metadata cho trang "Về chúng tôi"
export const metadata: Metadata = {
    title: "Về PTE iPASS",
    description:
        "PTE iPASS là hệ thống luyện thi PTE được thiết kế cho người đi làm bận rộn, với lộ trình cá nhân hóa, giáo viên kinh nghiệm và tài liệu sát đề.",
    keywords: [
        "PTE iPASS",
        "trung tâm luyện thi PTE",
        "luyện thi PTE Darwin",
        "PTE online cho người đi làm",
        "khóa học PTE iPASS",
    ],
    alternates: {
        canonical: "/ve-chung-toi",
    },
    openGraph: {
        title: "Về PTE iPASS",
        description:
            "Tìm hiểu câu chuyện, tầm nhìn và phương pháp luyện thi PTE tại PTE iPASS – nơi đồng hành cùng bạn chinh phục mục tiêu định cư và du học.",
        url: "/ve-chung-toi",
        type: "website",
        siteName: "PTE iPASS",
        images: [
            {
                url: "/images/og/pte-about-og.jpg", // 🔁 đổi thành ảnh thật nếu có
                width: 1200,
                height: 630,
                alt: "Về PTE iPASS",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Về PTE iPASS",
        description:
            "Hệ thống luyện thi PTE dành cho người đi làm bận rộn với lộ trình rõ ràng và giáo viên tận tâm.",
        images: ["/images/og/pte-about-og.jpg"],
    },
};

//  JSON-LD cho trang Về chúng tôi
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Về PTE iPASS",
    description:
        "Giới thiệu về PTE iPASS – trung tâm luyện thi PTE với lộ trình cá nhân hóa dành cho người đi làm.",
    url: "https://iptepass.com/ve-chung-toi", // NHỚ đổi domain đúng
    publisher: {
        "@type": "Organization",
        name: "PTE iPASS",
        url: "https://iptepass.com",
        logo: {
            "@type": "ImageObject",
            url: "https://iptepass.com/images/logo.png", // logo full URL
        },
    },
    mainEntity: {
        "@type": "Organization",
        name: "PTE iPASS",
        url: "https://iptepass.com",
        description:
            "Hệ thống luyện thi PTE với giáo viên kinh nghiệm, tài liệu sát đề và lộ trình cá nhân hóa cho từng mục tiêu điểm.",
        foundingDate: "2024",
        sameAs: [
            "https://www.facebook.com/...", // nếu có social thì thêm, không có thì xoá mảng này
        ],
    },
};

export default async function IndexAbout() {
    const dataEcosystem = await aboutService.getAboutMeList({ category: "ABOUT_ME" }).then(res => res?.items ?? []);
    const dataBranches = await aboutService.getAboutMeList({ category: "BRANCH" }).then(res => res?.items ?? []);
    const dataAudiences = await aboutService.getAboutMeList({ category: "AUDIENCE" }).then(res => res?.items || []);

    // console.log("dataEcosystem", dataEcosystem);
    // console.log("branches", branches);
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        
            <AboutPage
                dataEcosystem={dataEcosystem}
                dataBranches={dataBranches}
                dataAudiences={dataAudiences}
            />
        </>
    )
}
