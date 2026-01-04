import Image from 'next/image'
import React from 'react'

interface StudyPathProps {
    backgroundImage?: string;
}
const StudyPathPTE = ({ backgroundImage = "/images/bg-study-path.png" }: StudyPathProps) => {
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

    const styleBackground = {
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

    };
    return (
        <section
            className='relative z-0 bg-white section sm:section--sm lg:section--lg'
            style={styleBackground}
        >
            <div className='max-w-6xl mx-auto px-4'>
                {/* title */}
                <div className='text-center mb-8'>
                    <h1 className="text-4xl md:text-6xl font-bold text-blue-800  mb-4 tracking-wide">
                        <span className="relative  inline-block pb-10">
                            LỘ TRÌNH HỌC TẬP

                            <svg
                                aria-hidden="true"
                                className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-2 w-[260px] h-[25px]"
                                viewBox="0 0 173 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M64.5976 14.1335C54.1852 16.3024 42.1634 18.4608 30.5985 18.9997C20.7137 19.4597 11.1659 18.7452 3.35092 15.7053C2.24928 15.2773 0.869739 15.5716 0.273965 16.3637C-0.322717 17.1551 0.0877816 18.1463 1.18942 18.575C9.71462 21.8902 20.1097 22.7574 30.8918 22.255C42.6647 21.7069 54.9035 19.5341 65.5248 17.3339C66.7573 19.1276 69.3093 20.7999 73.8048 22.0337C80.7098 23.9292 90.1378 23.9057 100.07 22.8376C114.475 21.2892 129.97 17.5969 139.933 14.9733C140.342 14.8662 140.95 14.696 141.695 14.4715C141.922 14.8317 142.176 15.1866 142.458 15.5351C144.901 18.5717 149.224 21.027 153.629 21.9039C181.565 27.4643 214.169 20.8019 240.715 15.3797C241.914 15.1338 242.613 14.2308 242.277 13.3649C241.932 12.4991 240.679 11.996 239.471 12.242C213.669 17.5127 181.991 24.1628 154.836 18.7596C151.494 18.0941 148.243 16.2071 146.39 13.9025C146.181 13.6455 146 13.3825 145.827 13.1157C149.487 11.8127 153.792 9.99615 156.108 8.05176C158.487 6.05844 159.078 3.9307 157.007 1.92106C155.227 0.203083 152.53 0.0569249 149.723 0.94756C146.699 1.90149 143.584 4.13163 142.576 5.17821C140.687 7.13304 140.087 9.25362 140.433 11.3213C139.543 11.5915 138.82 11.7924 138.374 11.9099C128.629 14.4754 113.483 18.0967 99.3977 19.6111C90.3348 20.5859 81.7261 20.7157 75.425 18.9867C72.7377 18.2487 70.9622 17.3875 69.9986 16.3879C71.9003 15.9794 73.734 15.5775 75.4859 15.1938C78.9507 14.435 86.1644 13.179 91.3184 10.9403C95.4171 9.16033 98.1962 6.73897 98.0345 3.70364C97.9519 2.14421 96.6958 1.10348 94.6969 0.520167C91.7098 -0.350894 86.5441 0.0705989 84.6205 0.364215C78.7863 1.25289 70.9994 4.93159 67.1469 9.0768C65.6093 10.7308 64.6948 12.4612 64.5976 14.1335ZM69.3901 13.1143C71.0385 12.7581 72.6315 12.4083 74.1618 12.073C77.3958 11.3644 84.1564 10.2388 88.9689 8.1483C91.5173 7.04169 93.598 5.71587 93.4972 3.82825C93.489 3.68144 93.2864 3.63969 93.1075 3.57966C92.8305 3.48766 92.5136 3.42436 92.1757 3.37477C89.8898 3.03939 86.8192 3.36366 85.5623 3.55549C80.6671 4.30127 74.1554 7.41035 70.9231 10.8887C70.2402 11.6234 69.6962 12.3718 69.3901 13.1143ZM144.919 9.81932C147.053 9.03047 149.287 8.07653 151.049 7.03844C151.985 6.48709 152.775 5.92011 153.274 5.33157C153.692 4.84482 153.856 4.34629 153.356 3.86476C153.156 3.66967 152.857 3.66578 152.548 3.70232C152.221 3.74147 151.885 3.82497 151.549 3.93262C149.333 4.63339 147.044 6.27047 146.309 7.03844C145.446 7.92907 145.019 8.87127 144.919 9.81932Z" fill="#F9F9F9" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-[#604B01] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Lộ trình học bài bản từ nền tảng đến nâng cao.<br />
                        Mỗi bước đều có mục tiêu, bài tập và feedback để tăng điểm nhanh.
                    </p>

                </div>

                {/* timeline */}
                <div className='relative '>
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