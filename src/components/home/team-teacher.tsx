"use client"
import Image from 'next/image'
import React, { useMemo, useRef, useState } from 'react'
import { Teacher } from '@/types/teacher';
import AvatarCarousel from '../../shared/avatar-carousel';


interface TeamTeacherProps {
    dataTeacher: Teacher[] | [];
}
type AvatarItem = {
    id: number | string;
    name: string;
    image?: string | null;
};

const toOption = (teacher: Teacher[]): AvatarItem[] => {
    if (!teacher || teacher.length === 0) return [];
    return teacher.map((i) => ({
        id: i.teacherId,
        name: i.name,
        image: i.image,
    }));
}

const Score = ({ label, value }: { label: string; value?: number | string }) => (
    <div className="min-w-[88px]">
        <div className="text-2xl font-bold text-green-400 text-center">{value ?? "-"}</div>
        <div className="text-xs sm:text-sm text-blue-200 text-center">{label}</div>
    </div>
);

const TeamTeacherPTE = ({
    dataTeacher = [],
}: TeamTeacherProps) => {

    const [selectTecherId, setSelectTecherId] = useState<number>(dataTeacher[0]?.teacherId ?? 0);

    const selectTeacher = useMemo(() => {
        if (!dataTeacher || dataTeacher.length === 0) return null;
        return dataTeacher.find((i) => i.teacherId === selectTecherId);
    }, [dataTeacher, selectTecherId]);

    const option = useMemo(() => toOption(dataTeacher), [dataTeacher]);

    const teacherImage = selectTeacher?.image || "/images/teacher-placeholder.png";



    return (
        <section className="w-full bg-white section sm:section--sm lg:section--lg">
            <div className='max-w-6xl mx-auto px-4'>
                <div className='bg-gradient-to-b from-blue-900 via-blue-800 to-blue-500 rounded-3xl px-12 py-8 relative overflow-hidden '>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
                    <div className='relative z-10'>
                        <div>
                            <h2 className="text-white text-3xl md:text-4xl font-bold mb-12 ">Các giảng viên của iPTE</h2>
                        </div>

                        {/* card teacher profile*/}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch mb-12">
                 
                            <div className="md:col-span-5 w-full h-full flex justify-center md:justify-start">
                                <div className="relative w-[min(420px,90vw)] md:w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-white/5">
                                    <Image
                                        src={teacherImage}
                                        alt={selectTeacher?.name ?? ""}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(min-width: 768px) 25vw, 90vw"
                                        priority={false}
                                    />
                                </div>
                            </div>

          
                            <div className="md:col-span-7 h-full">
                                <div className="h-full bg-white/10 rounded-2xl shadow-lg px-6 py-8 lg:px-8 lg:py-10 flex flex-col">

                                    <div className="space-y-6">
                                        <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                                            {selectTeacher?.name}
                                        </h3>

                                        <div className="flex items-center gap-4">
                                            <div className="text-4xl md:text-5xl font-bold text-orange-400">
                                                {selectTeacher?.overallScore}
                                            </div>
                                            <div className="text-white">
                                                <div className="font-semibold">IELTS</div>
                                                <div className="text-blue-200">Overall</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-start gap-6">
                                            <Score label="Listening" value={selectTeacher?.listeningScore} />
                                            <Score label="Reading" value={selectTeacher?.readingScore} />
                                            <Score label="Speaking" value={selectTeacher?.speakingScore} />
                                            <Score label="Writing" value={selectTeacher?.writingScore} />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex-1">
                                        <p className="text-blue-100 leading-relaxed text-sm sm:text-base md:text-lg line-clamp-8">
                                            {selectTeacher?.bio || "Thông tin giảng viên đang được cập nhật."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* swiper teacher list */}
                        <div className="w-full flex justify-end">
                            <div className="w-full min-w-[12rem] sm:min-w-64 max-w-[38rem] flex items-center justify-end">
                                <AvatarCarousel
                                    items={option}
                                    selectedId={selectTecherId as number}
                                    onSelect={(id) => setSelectTecherId(Number(id))}
                                    itemSize={64}
                                    gap={8}
                                    scrollStep="item"
                                    autoScrollToSelected
                                    className="w-full"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeamTeacherPTE