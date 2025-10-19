import PteProblemsAndSolution from '@/components/courses/pte-problems-solution'
import { title } from 'process'
import React from 'react'

interface CardItem {
    title: string;
    icon?: string;
    description: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
interface SectionData {
    type: 'problem' | 'solution'; // Dùng để xác định loại hiển thị
    img?: string;
    title: string;
    items: CardItem[]; // Mảng các thẻ con
}

const data: SectionData[] = [
    {
        type: "problem",
        title: "Vấn đề học viên PTE thường gặp phải",
        img: "/images/pte-1.png",
        items: [
            {
                title: 'Không biết bắt đầu từ đâu',
                icon: "/images/icon/iocn-problem.jpg",
                description:
                    'Kiến thức IELTS rộng lớn, tài liệu lại quá nhiều, cần 1 lộ trình hiệu quả.',

                position: 'top-left' as const,
            },
            {
                title: 'Kẹt band, mất động lực',
                icon: "/images/icon/iocn-problem.jpg",
                description:
                    'Làm đề liên tục nhưng không tăng band, không tự tin đi thi, chán nản, muốn bỏ cuộc.',
                position: 'top-right' as const,
            },
            {
                title: 'Không ai theo sát, dễ bỏ cuộc',
                icon: "/images/icon/iocn-problem.jpg",
                description:
                    'Tự học không ai nhắc nhở, không ai chỉnh lỗi, không biết học đúng hay sai.',
                position: 'bottom-left' as const,
            },
            {
                title: 'Phương pháp học chưa hiệu quả',
                icon: "/images/icon/iocn-problem.jpg",
                description:
                    'Học tích lũy kiểu cũ thì quá tốn sức mà không hiệu quả; học mẹo học tủ thì gặp đề lạ, khó là "tạch band".',
                position: 'bottom-right' as const,
            },
        ],
    },
    {
        type: "solution",
        title: "Giải pháp của iPTE",
        img: "/images/pte-2.png",
        items: [
            {
                title: 'Lộ trình cá nhân hoá, tinh gọn',
                icon: "/images/icon/icon-solution.jpg",
                description:
                    'Học trọng tâm, không dàn trải, phát huy điểm mạnh khắc phục điểm yếu để tối đa điểm số.',
                position: 'top-left' as const,
            },
            {
                title: 'Tăng 1-1.5 band điểm PTE sau 9 tuần',
                icon: "/images/icon/icon-solution.jpg",
                description:
                    'Cam kết đảm bảo đầu ra sau 9 tuần, đã học là đạt band.',
                position: 'top-right' as const,
            },
            {
                title: 'Phương pháp Linearthinking độc quyền',
                icon: "/images/icon/icon-solution.jpg",
                description:
                    'Học thông minh, bản chất, giải quyết hiệu quả mọi vấn đề thuộc mọi level của người học ở cả 4 kĩ năng.',
                position: 'bottom-left' as const,
            },
            {
                title: 'Đội ngũ giáo viên và công nghệ hỗ trợ',
                icon: "/images/icon/icon-solution.jpg",
                description:
                    'Đội ngũ giáo viên 8.0, 9.0 IELTS siêu tận tâm và nền tảng siêu công nghệ đồng hành 24/7.',
                position: 'bottom-right' as const,
            },
        ],
    }

]

const ProblemsAndSolutionList = () => {

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    {data.map((item, index) => {
                        return (
                            <PteProblemsAndSolution
                                key={index}
                                data={item}
                            />
                        )
                    })}
                </div>
                <div className="flex items-center justify-center p-6">
                    <button className="text-white font-semibold bg-hero-gradient rounded-xl  p-4">
                        Liên hệ tư vấn ngay
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProblemsAndSolutionList
