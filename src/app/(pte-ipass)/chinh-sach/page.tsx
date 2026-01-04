import type { Metadata } from "next";
import ConsultationForm from "@/components/form/consultation-form";
import PolicyList from "@/components/policy/policy-list";

export const metadata: Metadata = {
    title: "Chính sách | PTE iPASS",
    description:
        "Chính sách của PTE iPASS: học phí, hoàn/đổi khóa học, bảo mật thông tin, điều khoản sử dụng và quy định hỗ trợ học viên.",
    alternates: {
        canonical: "/chinh-sach",
    },
    robots: {
        index: false,
        follow: false,
    },
    openGraph: {
        type: "website",
        locale: "vi_VN",
        url: "/chinh-sach",
        siteName: "PTE iPASS",
        title: "Chính sách | PTE iPASS",
        description:
            "Tổng hợp chính sách học phí, hoàn/đổi, bảo mật, điều khoản sử dụng và hỗ trợ học viên tại PTE iPASS.",
        images: [
            {
                url: "/images/og/policy.jpg",
                width: 1200,
                height: 630,
                alt: "Chính sách PTE iPASS",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Chính sách | PTE iPASS",
        description:
            "Chính sách học phí, hoàn/đổi, bảo mật, điều khoản sử dụng và hỗ trợ học viên tại PTE iPASS.",
        images: ["/images/og/policy.jpg"],
    },
};

export default function PolicyPage() {
    return (
        <div className="bg-white">

            <header className="container mx-auto px-4 py-8 md:py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Chính sách PTE iPASS
                </h1>
                <p className="mt-3 max-w-3xl text-base md:text-lg leading-relaxed text-slate-600">
                    Tại PTE iPASS, chúng tôi minh bạch về học phí, hoàn/đổi, bảo mật thông tin và
                    quy định hỗ trợ để đảm bảo quyền lợi tốt nhất cho học viên.
                </p>
            </header>
            <PolicyList />
            <ConsultationForm className="" />
        </div>
    );
}
