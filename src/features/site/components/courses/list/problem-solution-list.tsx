
import React from 'react'
import ProblemsAndSolutionItem from '../problem-solution-item';
import { Section } from '@/features/site/shared/page/section';
import PageContent from '@/features/site/shared/page/page-content';


interface CardItem {
    title: string;
    icon?: string;
    description: string;

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
        title: "Những rào cản khiến học viên PTE mãi chưa đạt target",
        img: "/images/pte-2.png",
        items: [
            {
                title: 'Mất phương hướng ngay từ bước đầu',
                icon: "/images/icon/iocn-problem.jpg",
                description:
                    'Quá nhiều tài liệu, quá nhiều lời khuyên trái chiều khiến học viên không biết nên học gì trước, học như thế nào cho đúng với PTE.',

            },
            {
                title: 'Chững điểm kéo dài, dần mất niềm tin',
                icon: "/images/icon/iocn-problem.jpg",
                description:
                    'Làm đề liên tục nhưng điểm không cải thiện, thi lại nhiều lần vẫn kẹt band, dẫn đến áp lực tâm lý và nỗi sợ kỳ thi.',

            },
            {
                title: 'Tự học đơn độc, dễ bỏ cuộc giữa chừng',
                icon: "/images/icon/iocn-problem.jpg",
                description:
                    'Không có người theo sát, không được sửa lỗi chi tiết nên học viên không biết mình đang sai ở đâu và vì sao không lên điểm.',

            },
            {
                title: 'Học nhiều nhưng không trúng trọng tâm',
                icon: "/images/icon/iocn-problem.jpg",
                description:
                    'Áp dụng phương pháp học truyền thống hoặc học mẹo rời rạc khiến gặp đề lạ là lúng túng, dễ mất điểm đáng tiếc.',

            },
        ],
    },
    {
        type: "solution",
        title: "Giải pháp đột phá giúp học viên chinh phục PTE cùng iPASS",
        img: "/images/pte-2.png",
        items: [
            {
                title: 'Lộ trình cá nhân hóa theo đúng năng lực',
                icon: "/images/icon/icon-solution.jpg",
                description:
                    'Mỗi học viên được xây dựng lộ trình riêng, tập trung đúng điểm yếu, tối ưu thời gian học và hiệu quả điểm số.',

            },
            {
                title: 'Cam kết cải thiện 1–1.5 band chỉ sau 9 tuần',
                icon: "/images/icon/icon-solution.jpg",
                description:
                    'Lộ trình được thiết kế thực tế, bám sát tiêu chí chấm điểm PTE, giúp học viên tự tin đạt mục tiêu trong thời gian ngắn.',

            },
            {
                title: 'Phương pháp Linear Thinking độc quyền',
                icon: "/images/icon/icon-solution.jpg",
                description:
                    'Giúp học viên tư duy logic, xử lý bài thi PTE một cách có hệ thống, linh hoạt trước mọi dạng câu hỏi ở cả 4 kỹ năng.',

            },
            {
                title: 'Giảng viên kinh nghiệm cao & công nghệ hỗ trợ 24/7',
                icon: "/images/icon/icon-solution.jpg",
                description:
                    'Đội ngũ giảng viên giàu kinh nghiệm PTE kết hợp nền tảng công nghệ chấm – sửa – theo dõi tiến độ liên tục cho từng học viên.',

            },
        ],
    }
];

interface ProblemsAndSolutionListPops {
    backgroundImage: string;
}
const ProblemsAndSolutionList = ({
    backgroundImage
}: ProblemsAndSolutionListPops) => {


    return (
        <Section className="w-full" backgroundImage={backgroundImage} >
            <PageContent  >
                {data.map((item, index) => {
                    return (
                        <ProblemsAndSolutionItem
                            key={index}
                            img={null}
                            title={item.title}
                            data={item.items}
                        />
                    )
                })}
                {/* <div className="flex items-center justify-center p-6">
                    <button className="text-white font-semibold bg-hero-gradient rounded-xl  p-4">
                        Liên hệ tư vấn ngay
                    </button>
                </div> */}
            </PageContent>
        </Section>
    )
}

export default ProblemsAndSolutionList
