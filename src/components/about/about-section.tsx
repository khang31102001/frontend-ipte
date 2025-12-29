"use client"
import { FullscreenVideoPlayer } from '@/components/ui/fullscreen-video-player'
import { IAbout } from '@/types/about'
import { ChevronRight, Play } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

interface AboutSectionProps {
    data?: IAbout | null;
}
const AboutSection = ({
    data = null
}: AboutSectionProps) => {

    const [openVideo, setOpenVideo] = useState<boolean>(false);

    if (!data) return null;

    return (
        <section className='w-full py-16 bg-white '>
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
                        </div>
                    </div>
                </div>


                {/* content */}
                <div className='block w-full'>
                    <div className='max-w-5xl mx-auto px-4 '>
                        <div className='text-center space-y-6'>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                                {data.title}{" "}
                                <span className="text-yellow-500 relative">
                                    PTE
                                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0,8 Q50,0 100,8" stroke="#EAB308" strokeWidth="2" fill="none" />
                                    </svg>
                                </span>
                            </h1>

                            {/* description */}
                            <div className='max-w-[856px] mx-auto text-grey-600 space-y-4 text-lg leading-relaxed'>
                                {data.description}
                            </div>

                        </div>
                    </div>
                </div>

                {data.content && (
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
                )}

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
        </section>
    )
}

export default AboutSection