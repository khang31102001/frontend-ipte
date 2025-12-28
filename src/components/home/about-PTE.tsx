"use client"
import { ChevronRight, Play } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { FullscreenVideoPlayer } from '../ui/fullscreen-video-player';

const AboutPTE = () => {
    const [openVideo, setOpenVideo] = useState<boolean>(false);
    return (
        <section className='section sm:section-sm lg:section-lg bg-white '>
            <div className="container mx-auto space-y-6 ">
                {/* video */}
                <div className="w-full flex-col items-center justify-center">
                    <div className="relative max-w-5xl mx-auto overflow-hidden rounded-xl">
                        {/* Image wrapper phải relative để absolute overlay bám đúng */}
                        <div className="relative  ">
                            <Image
                                className="w-full h-full object-cover"
                                src="/images/about-banner.png"
                                alt="PTE Training Center - Two people looking at phone"
                                width={1094}
                                height={478}
                            />

                            {/* Play Button Overlay */}
                            <div
                                onClick={() => setOpenVideo(true)}
                                className="absolute inset-0 flex items-center justify-center bg-black/30"
                            >
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border-4 border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
                                    <Play width={44} height={44} className="text-white" />
                                </div>
                            </div>

                            {/* Popup Video Player */}
                            {openVideo && (
                                <FullscreenVideoPlayer
                                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                                    poster="/images/about-banner.png"
                                    isOpen={openVideo}
                                    onClose={() => setOpenVideo(false)}
                                />
                            )}
                        </div>

                    </div>
                </div>


                {/* content */}
                <div className='block w-full'>
                    <div className='max-w-5xl mx-auto px-4 '>
                        <div className='text-center space-y-6'>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                                Về trung tâm luyện thi{" "}
                                <span className="text-yellow-500 relative">
                                    PTE
                                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0,8 Q50,0 100,8" stroke="#EAB308" strokeWidth="2" fill="none" />
                                    </svg>
                                </span>
                            </h1>

                            {/* description */}
                            <div className='max-w-[856px] mx-auto text-grey-600 space-y-4 text-lg leading-relaxed'>
                                <p>
                                    Tại Trung Tâm Luyện Thi PTE Cấp Tốc, chúng tôi tự hào là địa chỉ hàng đầu dành cho những ai đang tìm kiếm
                                    cơ hội để nâng cao điểm số PTE của mình trong thời gian ngắn nhất. Với nền tảng chuyên sâu về giáo dục và
                                    kinh nghiệm thực tiễn trong việc giảng dạy PTE, chúng tôi cam kết mang đến cho học viên sự hỗ trợ toàn
                                    diện và chất lượng tốt nhất.
                                </p>

                                <p>
                                    Hãy đồng hành cùng chúng tôi trên con đường chinh phục PTE và mở ra cánh cửa cho tương lai sáng sủa của
                                    bạn!
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="w-full inline-flex items-center justify-center text-white p-2 gap-2 ">
                    <button
                        className='inline-flex items-center gap-1 
                        rounded-full 
                        bg-gradient-to-r from-[#04016C] to-[#4A16BD] 
                        px-6 py-3
                        hover:opacity-90 transition duration-300 group'
                    >
                        Xem thêm
                        <ChevronRight className='w-6 h-6 transition-transform duration-300  group-hover:translate-x-1' />
                    </button>
                </div>

            </div>
        </section>
    )
}

export default AboutPTE