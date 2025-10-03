"use client"
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CustomSwiper from '../ui/CustomSwiper';

const TeamTeacherPTE = () => {
    const [selectTecher, setSelectTecher] = useState<Number>(0);
    const dataTeacher = [
        {
            id: 1,
            name: "ThS. Hoàng Quốc Bảo",
            title: "Giảng viên chính",
            image: "/images/teacher-1.png",
            ieltsOverall: 8.8,
            ieltsScores: {
                listening: 9.0,
                reading: 8.9,
                speaking: 8.8,
                writing: 8.6,
            },
            description:
                "Với 7 năm đồng hành cùng hàng ngàn học viên, thầy Bảo tự hào là một giảng viên tiếng Anh giàu kinh nghiệm. Thầy đã từng giảng dạy tại nhiều cấp độ khác nhau, từ cơ bản đến nâng cao, và luôn nhận được sự tin tưởng từ học viên.",
            isMain: true,
        },
        {
            id: 2,
            name: "Cô Minh Anh",
            title: "Giảng viên IELTS",
            image: "/images/teacher-2.jpg",
            ieltsOverall: 8.5,
            ieltsScores: {
                listening: 8.5,
                reading: 8.5,
                speaking: 8.0,
                writing: 8.5,
            },
            description: "Chuyên gia về IELTS Writing với nhiều năm kinh nghiệm.",
        },
        {
            id: 3,
            name: "Thầy Đức Minh",
            title: "Giảng viên Speaking",
            image: "/images/teacher-4.jpg",
            ieltsOverall: 8.0,
            ieltsScores: {
                listening: 8.0,
                reading: 7.5,
                speaking: 8.5,
                writing: 7.5,
            },
            description: "Chuyên gia về IELTS Speaking với phương pháp giảng dạy độc đáo.",
        },
        {
            id: 4,
            name: "Cô Thu Hà",
            title: "Giảng viên Reading",
            image: "/images/teacher-3.jpg",
            ieltsOverall: 8.5,
            ieltsScores: {
                listening: 8.0,
                reading: 9.0,
                speaking: 8.0,
                writing: 8.5,
            },
            description: "Chuyên gia về IELTS Reading với nhiều kỹ thuật đọc hiệu quả.",
        },
        {
            id: 5,
            name: "Thầy Quang Huy",
            title: "Giảng viên Listening",
            image: "/images/teacher-5.jpg",
            ieltsOverall: 8.0,
            ieltsScores: {
                listening: 8.5,
                reading: 8.0,
                speaking: 7.5,
                writing: 8.0,
            },
            description: "Chuyên gia về IELTS Listening với phương pháp luyện nghe hiệu quả.",
        },
        {
            id: 6,
            name: "Thầy Quang Huy",
            title: "Giảng viên Listening",
            image: "/images/teacher-5.jpg",
            ieltsOverall: 8.0,
            ieltsScores: {
                listening: 8.5,
                reading: 8.0,
                speaking: 7.5,
                writing: 8.0,
            },
            description: "Chuyên gia về IELTS Listening với phương pháp luyện nghe hiệu quả.",
        },
        {
            id: 7,
            name: "Thầy Quang Huy",
            title: "Giảng viên Listening",
            image: "/images/teacher-5.jpg",
            ieltsOverall: 8.0,
            ieltsScores: {
                listening: 8.5,
                reading: 8.0,
                speaking: 7.5,
                writing: 8.0,
            },
            description: "Chuyên gia về IELTS Listening với phương pháp luyện nghe hiệu quả.",
        },
        {
            id: 8,
            name: "Thầy Quang Huy",
            title: "Giảng viên Listening",
            image: "/images/teacher-5.jpg",
            ieltsOverall: 8.0,
            ieltsScores: {
                listening: 8.5,
                reading: 8.0,
                speaking: 7.5,
                writing: 8.0,
            },
            description: "Chuyên gia về IELTS Listening với phương pháp luyện nghe hiệu quả.",
        },
    ];

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },  // mobile nhỏ
        500: { slidesPerView: 3, spaceBetween: 10 },  // mobile nhỏ
        640: { slidesPerView: 4, spaceBetween: 10 },  // sm
        870: { slidesPerView: 5, spaceBetween: 10 },  // md
        1200: { slidesPerView: 6, spaceBetween: 10 }, // xl
    };

    return (
        <section className="py-16 bg-white">
            <div className='container mx-auto'>
                <div className='bg-gradient-to-b from-blue-900 via-blue-800 to-blue-500 rounded-3xl px-12 py-8 relative overflow-hidden '>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
                    <div className='relative z-10'>
                        <div>
                            <h2 className="text-white text-3xl md:text-4xl font-bold mb-12 ">Các giảng viên của iPTE</h2>
                        </div>

                        {/* card teacher profile*/}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch mb-12'>
                            <div className='block h-full'>
                                <div className='relative h-full w-full'>
                                    <div className='h-full rounded-md shadow-lg overflow-hidden'>
                                        <Image
                                            src="/images/teacher-1.png"
                                            alt=""
                                            width={640}
                                            height={740}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className='h-full flex flex-col gap-8'>
                                {/* infor teacher */}
                                <div className="bg-black/15 rounded-2xl shadow-lg h-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 space-y-6">
                                    {/* Teacher Name */}
                                    <div>
                                        <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                                            {dataTeacher[0].name}
                                        </h3>
                                    </div>

                                    {/* IELTS Overall Score */}
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400">
                                            {dataTeacher[0].ieltsOverall}
                                        </div>
                                        <div className="text-white text-sm sm:text-base md:text-lg">
                                            <div className="font-semibold">IELTS</div>
                                            <div className="text-blue-200">Overall</div>
                                        </div>
                                    </div>

                                    {/* Individual IELTS Scores */}
                                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                                        {/* Listening */}
                                        <div className="flex flex-col items-center min-w-[70px] sm:min-w-[90px] md:min-w-[100px]">
                                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">
                                                {dataTeacher[0].ieltsScores.listening}
                                            </span>
                                            <span className="text-[10px] sm:text-xs md:text-sm text-blue-200 text-center">
                                                Listening
                                            </span>
                                        </div>

                                        <div className="hidden sm:block text-blue-300 text-lg sm:text-xl">|</div>

                                        {/* Reading */}
                                        <div className="flex flex-col items-center min-w-[70px] sm:min-w-[90px] md:min-w-[100px]">
                                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">
                                                {dataTeacher[0].ieltsScores.reading}
                                            </span>
                                            <span className="text-[10px] sm:text-xs md:text-sm text-blue-200 text-center">
                                                Reading
                                            </span>
                                        </div>

                                        <div className="hidden sm:block text-blue-300 text-lg sm:text-xl">|</div>

                                        {/* Speaking */}
                                        <div className="flex flex-col items-center min-w-[70px] sm:min-w-[90px] md:min-w-[100px]">
                                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">
                                                {dataTeacher[0].ieltsScores.speaking}
                                            </span>
                                            <span className="text-[10px] sm:text-xs md:text-sm text-blue-200 text-center">
                                                Speaking
                                            </span>
                                        </div>

                                        <div className="hidden sm:block text-blue-300 text-lg sm:text-xl">|</div>

                                        {/* Writing */}
                                        <div className="flex flex-col items-center min-w-[70px] sm:min-w-[90px] md:min-w-[100px]">
                                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">
                                                {dataTeacher[0].ieltsScores.writing}
                                            </span>
                                            <span className="text-[10px] sm:text-xs md:text-sm text-blue-200 text-center">
                                                Writing
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="line-clamp-6 overflow-hidden">
                                        <p className="text-blue-100 leading-relaxed text-sm sm:text-base md:text-lg">
                                            {dataTeacher[0].description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* swiper teacher list */}
                        <div className="w-full flex flex-row items-center justify-end">
                            <div className="flex flex-row items-center gap-2 max-w-full md:max-w-[38rem] w-full">
                                {/* Prev button */}
                                <button
                                    ref={prevRef}
                                    className="rounded-full text-white hover:bg-white/30 bg-transparent p-2 shrink-0"
                                >
                                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                                </button>

                                {/* Swiper */}
                                <CustomSwiper
                                    navigation={{ prevEl: prevRef, nextEl: nextRef }}
                                    breakpoint={breakpoints}
                                    pagination={false}
                                    className="flex-1"
                                >
                                    {dataTeacher.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectTecher(item.id)}
                                            className={`relative z-50 rounded-full overflow-hidden 
                                            transform transition-transform duration-300 ease-out
                                                ${item.id === selectTecher
                                                    ? "w-16 h-16 opacity-100"
                                                    : "w-16 h-16 opacity-70 hover:opacity-100"
                                                }
                                            `}
                                            style={{ willChange: "transform" }}
                                        >
                                            <Image
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                width={120}
                                                height={120}
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </CustomSwiper>

                                {/* Next button */}
                                <button
                                    ref={nextRef}
                                    className="rounded-full text-white hover:bg-white/30 bg-transparent p-2 shrink-0"
                                >
                                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeamTeacherPTE