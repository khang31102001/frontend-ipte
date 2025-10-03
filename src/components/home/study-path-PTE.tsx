import Image from 'next/image'
import React from 'react'


const StudyPathPTE = () => {
    const dataStudy = [
        {
            number: 1,
            position: 'left',
            icon: '/svg/icon-nen-tang.svg',
            title: 'Nền tảng',
            description: 'Xây dựng kiến thức cơ bản về cấu trúc bài thi, định dạng câu hỏi và chiến lược làm bài.'
        },
        {
            number: 2,
            position: 'right',
            icon: '/svg/icon-mail.svg',
            title: 'Luyện tập',
            description: 'Thực hành các kỹ năng Nghe, Nói, Đọc, Viết với bài tập chuyên sâu và hướng dẫn chi tiết.'
        },
        {
            number: 3,
            position: 'left',
            icon: '/svg/icon-download.svg',
            title: 'Thi thử',
            description: 'Làm bài thi thử hoàn chỉnh theo thời gian thực, nhận phản hồi chi tiết và điều chỉnh chiến lược..'
        },
        {
            number: 4,
            position: 'right',
            icon: '/svg/icon-play.svg',
            title: 'Sẵn sàng thi',
            description: 'Ôn tập tổng hợp, chiến lược quản lý thời gian và tâm lý thi đấu, sẵn sàng cho ngày thi chính thức.'
        },
        
    ]

    return (
        <section
            className='relative z-0  bg-cover bg-center bg-no-repeat py-16 bg-white'
            style={{ backgroundImage: "url('/images/bg-study-path.png')" }}
        >
            <div className='container mx-auto px-4'>
                {/* title */}
                <div className='text-center'>
                    <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4 tracking-wide">LỘ TRÌNH HỌC TẬP</h1>
                    <div className="w-32 h-1 bg-white rounded-full mx-auto mb-6"></div>
                    <p className="text-blue-700 text-lg max-w-2xl mx-auto leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna, non nisl tincidunt ut elementum turpis..
                    </p>
                </div>

                {/* timeline */}
                <div className='relative'>
                    {dataStudy.map((step, index) => {
                        const Icon = step.icon
                        const isLeft = step.position === "left"

                        return (
                            <div key={index} className="relative mb-12 last:mb-0">
                                {/* Step Number */}
                                <div
                                    className={`absolute top-8 text-6xl md:text-8xl font-bold text-white z-0 ${isLeft ? "right-4 md:right-8" : "left-4 md:left-8"
                                        }`}
                                >
                                    Step {step.number}.
                                </div>

                                {/* Content Card */}
                                <div className={`relative z-10 flex ${isLeft ? "justify-start" : "justify-end"}`}>
                                    <div className="bg-white rounded-3xl p-6 shadow-lg max-w-md w-full mx-4 md:mx-8">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-indigo-600 rounded-full  flex-shrink-0">
                                                {step.icon && (
                                                    <Image
                                                        src={step.icon}
                                                        alt={step.title}
                                                        width={72}
                                                        height={72}
                                                        className="w-16 h-16 text-white" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                                                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Connecting Line */}
                                {index < dataStudy.length - 1 && (
                                    <div
                                        className={`absolute top-full left-1/2 transform -translate-x-1/2 ${isLeft ? "translate-x-16" : "-translate-x-16"
                                            }`}
                                    >
                                        <div className="w-0.5 h-8 bg-gray-800/20"></div>
                                        <div className={`w-16 h-0.5 bg-gray-800/20 ${isLeft ? "" : "transform -translate-x-16"}`}></div>
                                        <div className="w-0.5 h-8 bg-gray-800/20 ml-16"></div>

                                        {/* Dashed connecting line */}
                                        <div
                                            className={`absolute top-16 w-32 border-t-2 border-dashed border-gray-800/30 ${isLeft ? "-left-16" : "-left-32"
                                                }`}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

        </section>
    )
}

export default StudyPathPTE