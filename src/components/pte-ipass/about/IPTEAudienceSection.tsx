// components/IPTEAudienceSection.jsx

import { BookOpen } from 'lucide-react'; // Sử dụng icon từ lucide-react (một thư viện phổ biến trong Next/React)

const CardItem = ({ title, description }: { title: string; description: string }) => {
    return (
        // Sử dụng class 'card-box' đã định nghĩa trong global CSS
        <div className="card-box p-6 flex flex-col items-start space-y-3"> 
            <div className="flex items-center space-x-2">
                {/* Icon (sử dụng màu primary hoặc accent) */}
                <BookOpen className="w-6 h-6 text-[--primary]" /> 
                <h3 className="text-xl font-bold text-[--foreground]">
                    {title}
                </h3>
            </div>
            <p className="text-sm text-[--muted-foreground]">
                <span className="text-[--primary] font-semibold">iPTE</span> {description}
            </p>
        </div>
    );
};

const IPTEAudienceSection = () => {
    // Dữ liệu cho 4 card
    const cardData = [
        {
            title: "Học sinh cấp 1, cấp 2 và cấp 3",
            description: "cung cấp các khóa học tiếng Anh được thiết kế đặc biệt để phù hợp với nhu cầu học tập của học sinh ở mọi trình độ rèn luyện kỹ năng ngôn ngữ một cách hiệu quả và phát triển khả năng giao tiếp tiếng Anh một cách tự tin"
        },
        {
            title: "Học sinh cấp 1, cấp 2 và cấp 3",
            description: "cung cấp các khóa học tiếng Anh được thiết kế đặc biệt để phù hợp với nhu cầu học tập của học sinh ở mọi trình độ rèn luyện kỹ năng ngôn ngữ một cách hiệu quả và phát triển khả năng giao tiếp tiếng Anh một cách tự tin"
        },
        {
            title: "Học sinh cấp 1, cấp 2 và cấp 3",
            description: "cung cấp các khóa học tiếng Anh được thiết kế đặc biệt để phù hợp với nhu cầu học tập của học sinh ở mọi trình độ rèn luyện kỹ năng ngôn ngữ một cách hiệu quả và phát triển khả năng giao tiếp tiếng Anh một cách tự tin"
        },
        {
            title: "Học sinh cấp 1, cấp 2 và cấp 3",
            description: "cung cấp các khóa học tiếng Anh được thiết kế đặc biệt để phù hợp với nhu cầu học tập của học sinh ở mọi trình độ rèn luyện kỹ năng ngôn ngữ một cách hiệu quả và phát triển khả năng giao tiếp tiếng Anh một cách tự tin"
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-[--background]">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Cột 1: Tiêu đề và Mô tả chung */}
                    <div className="lg:col-span-1">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-[--foreground]">
                            <span className="text-[--primary]">iPTE</span> phù hợp với đối tượng nào?
                        </h2>
                        <p className="text-lg text-[--muted-foreground]">
                            <span className="text-[--primary] font-semibold">iPTE</span> cung cấp các khóa học tiếng Anh linh hoạt và đa dạng để đáp ứng nhu cầu của mọi đối tượng học viên
                        </p>
                    </div>

                    {/* Cột 2 & 3: Lưới 4 Card */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {cardData.map((item, index) => (
                                <CardItem 
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default IPTEAudienceSection;