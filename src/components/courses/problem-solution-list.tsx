
import { title } from 'process'
import React from 'react'
import ProblemsAndSolutionItem from './problem-solution-item';


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
        title: "Vấn đề học viên PTE thường gặp phải",
        img: "/images/pte-2.png",
        items: [
            {
                title: 'Không biết bắt đầu từ đâu',
                icon: "/images/icon/iocn-problem.jpg",
                description:
                    'Kiến thức IELTS rộng lớn, tài liệu lại quá nhiều, cần 1 lộ trình hiệu quả.',

              
            },
            {
                title: 'Kẹt band, mất động lực',
                icon: "/images/icon/iocn-problem.jpg",
                description:
                    'Làm đề liên tục nhưng không tăng band, không tự tin đi thi, chán nản, muốn bỏ cuộc.',
              
            },
            {
                title: 'Không ai theo sát, dễ bỏ cuộc',
                icon: "/images/icon/iocn-problem.jpg",
                description:
                    'Tự học không ai nhắc nhở, không ai chỉnh lỗi, không biết học đúng hay sai.',
               
            },
            {
                title: 'Phương pháp học chưa hiệu quả',
                icon: "/images/icon/iocn-problem.jpg",
                description:
                    'Học tích lũy kiểu cũ thì quá tốn sức mà không hiệu quả; học mẹo học tủ thì gặp đề lạ, khó là "tạch band".',
              
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
              
            },
            {
                title: 'Tăng 1-1.5 band điểm PTE sau 9 tuần',
                icon: "/images/icon/icon-solution.jpg",
                description:
                    'Cam kết đảm bảo đầu ra sau 9 tuần, đã học là đạt band.',
             
            },
            {
                title: 'Phương pháp Linearthinking độc quyền',
                icon: "/images/icon/icon-solution.jpg",
                description:
                    'Học thông minh, bản chất, giải quyết hiệu quả mọi vấn đề thuộc mọi level của người học ở cả 4 kĩ năng.',
               
            },
            {
                title: 'Đội ngũ giáo viên và công nghệ hỗ trợ',
                icon: "/images/icon/icon-solution.jpg",
                description:
                    'Đội ngũ giáo viên 8.0, 9.0 IELTS siêu tận tâm và nền tảng siêu công nghệ đồng hành 24/7.',
               
            },
        ],
    }

]

interface ProblemsAndSolutionListPops{
    backgroundImage: string;
}
const ProblemsAndSolutionList = ({
backgroundImage
}:ProblemsAndSolutionListPops) => {

      const styleBackground = {
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };


    return (
        <section className="py-4 md:py-8  bg-transparent" style={styleBackground}>
            <div className="container mx-auto px-4">
                <div className="mb-4">
                    {data.map((item, index) => {
                        return (
                            <ProblemsAndSolutionItem
                                key={index}
                                img={item.img as string}
                                title={item.title}
                                data={item.items}
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
