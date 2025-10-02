import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import StudentreviewCard from './card/student-review-card'
type StatCard = {
    id: string;
    value: string;
    label: string;
    type: "stat-1";
    description: string;
    bgColor: string;
    textColor: string;
};

type StudentReview = {
    id: number;
    name: string;
    role: string;
    type: "review";
    content: string;
    avatar: string;
};

type AllData = StatCard | StudentReview;

const StudentReview = () => {
    const stateData: StatCard = {
        id: "stat-1",
        value: "52.000+",
        label: "học viên",
        type: "stat-1",
        description: "Cùng đọc chia sẻ về trải nghiệm học tiếng Anh tại iPTE",
        bgColor: "bg-red-500",
        textColor: "text-white",
    };

    const studentReview: StudentReview[] = [
        {
            id: 1,
            name: "Phạm Duy Anh",
            role: "Học viên tại iPTE",
            type: "review",
            content:
                "Giáo trình học đơn giản dễ hiểu, mình chọn lộ trình 4 khóa, được tặng nhiều ưu đãi và tặng bộ sách Grammar",
            avatar: "/images/student-1.jpg",
        },
        {
            id: 2,
            name: "Phạm Duy Anh",
            role: "Học viên tại iPTE",
            type: "review",
            content:
                "Giáo trình học đơn giản dễ hiểu, mình chọn lộ trình 4 khóa, được tặng nhiều ưu đãi và tặng bộ sách Grammar",
            avatar: "/images/student-2.jpg",
        },
        {
            id: 3,
            name: "Phạm Duy Anh",
            role: "Học viên tại iPTE",
            type: "review",
            content:
                "Giáo trình học đơn giản dễ hiểu, mình chọn lộ trình 4 khóa, được tặng nhiều ưu đãi và tặng bộ sách Grammar",
            avatar: "/images/student-3.jpg",
        },


    ]

    const allData: (StatCard | StudentReview)[] = [stateData, ...studentReview];

    return (
        <section className="bg-yellow-400 py-16 px-4 md:px-4 ">
            <div className="container mx-auto">
                {/* title */}
                <div className="h-48 flex justify-between items-center gap-x-3 mb-12">
                    <h2 className="text-4xl md:text-6xl lg:text-6xl font-bold text-blue-600 text-balance">
                        Học viên nói gì về <span className="text-white">iPTE</span>?
                    </h2>
                    <div className="w-40 flex items-end overflow-hidden">
                        <button className="group flex items-center rounded-3xl text-blue-600 hover:text-blue-700 hover:bg-yellow-300/50 font-medium p-4">
                            Xem thêm{" "}
                            <ChevronRight className="inline-block ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>

                {/* main content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                    {/* Left side */}
                    <div className="col-span-2 h-full flex flex-col">
                        <div
                            className="grid grid-cols-1 lg:grid-cols-5 gap-2 lg:gap-3 h-full"
                        >
                            {allData.map((item, index) => {
                                let colSpan = "lg:col-span-2";
                                if (index === 1) colSpan = "lg:col-span-3";
                                if (index === 2) colSpan = "lg:col-span-3";

                                return (
                                    <div key={index} className={`${colSpan} h-full`}>
                                        {item.type === "stat-1" ? (
                                            <div
                                                className={`${item.bgColor} ${item.textColor} rounded-3xl shadow-lg overflow-hidden h-full`}
                                            >
                                                <div className="p-4 sm:p-6 md:p-8 lg:p-10 h-full flex flex-col">
                                                    {/* value */}
                                                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl font-bold mb-2">
                                                        {item.value}
                                                    </div>
                                                    {/* label */}
                                                    <div className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
                                                        {item.label}
                                                    </div>
                                                    {/* description */}
                                                    <p className="text-red-100 text-sm sm:text-base md:text-md leading-relaxed flex-grow">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <StudentreviewCard data={item} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="col-span-1 h-full">
                        <Image
                            src="/images/student-2.jpg"
                            alt=""
                            width={560}
                            height={460}
                            className="w-full h-full object-cover rounded-3xl object-center"
                        />
                    </div>
                </div>
            </div>
        </section>

    )
}

export default StudentReview