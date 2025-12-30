"use client"
import Image from 'next/image'
import React, { useMemo, useRef, useState } from 'react'
import { Teacher } from '@/types/teacher';
import AvatarCarousel from '../shared/avatar-carousel';


interface TeamTeacherProps{
    dataTeacher: Teacher[] | [];
}
type AvatarItem = {
  id: number | string;
  name: string;
  image?: string | null;
};

const toOption = (teacher: Teacher[]):AvatarItem[]=>{
   if(!teacher || teacher.length === 0) return [];
   return teacher.map((i)=>({
    id: i.teacherId,
    name: i.name,
    image: i.image,
   }));
}
const TeamTeacherPTE = ({
   dataTeacher = [], 
}:TeamTeacherProps) => {

    const [selectTecherId, setSelectTecherId] = useState<number | null>(31);

    const selectTeacher = useMemo(()=> {
        if(!dataTeacher || dataTeacher.length === 0) return null;
        return dataTeacher.find((i)=> i.teacherId === selectTecherId);
    }, [dataTeacher, selectTecherId]);

    const option = useMemo(()=>toOption(dataTeacher), [dataTeacher]);

    const teacherImage = selectTeacher?.image || "/images/teacher-placeholder.png";



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
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8  items-stretch mb-12'>
                            <div className='block h-full'>
                                <div className='h-full w-full grid justify-items-center'>
                                    <div className='h-full w-full max-w-md rounded-md shadow-lg overflow-hidden'>
                                        <Image
                                            src={teacherImage}
                                            alt={selectTeacher?.name ?? ""}
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
                                            {selectTeacher?.name}
                                        </h3>
                                    </div>

                                    {/* IELTS Overall Score */}
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400">
                                            {selectTeacher?.overallScore}
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
                                                {selectTeacher?.listeningScore}
                                            </span>
                                            <span className="text-[10px] sm:text-xs md:text-sm text-blue-200 text-center">
                                                Listening
                                            </span>
                                        </div>

                                    

                                        {/* Reading */}
                                        <div className="flex flex-col items-center min-w-[70px] sm:min-w-[90px] md:min-w-[100px]">
                                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">
                                                {selectTeacher?.readingScore}
                                            </span>
                                            <span className="text-[10px] sm:text-xs md:text-sm text-blue-200 text-center">
                                                Reading
                                            </span>
                                        </div>

                                       

                                        {/* Speaking */}
                                        <div className="flex flex-col items-center min-w-[70px] sm:min-w-[90px] md:min-w-[100px]">
                                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">
                                                {selectTeacher?.speakingScore}
                                            </span>
                                            <span className="text-[10px] sm:text-xs md:text-sm text-blue-200 text-center">
                                                Speaking
                                            </span>
                                        </div>

                                     

                                        {/* Writing */}
                                        <div className="flex flex-col items-center min-w-[70px] sm:min-w-[90px] md:min-w-[100px]">
                                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">
                                                {selectTeacher?.writingScore}
                                            </span>
                                            <span className="text-[10px] sm:text-xs md:text-sm text-blue-200 text-center">
                                                Writing
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="line-clamp-6 overflow-hidden">
                                        <p className="text-blue-100 leading-relaxed text-sm sm:text-base md:text-lg">
                                            {selectTeacher?.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* swiper teacher list */}
                       <div className="w-full flex items-center justify-center">
                        <div className="max-w-full md:max-w-[38rem] w-full">
                            <AvatarCarousel
                            items={option}
                            selectedId={selectTecherId as number}
                            onSelect={(id) =>setSelectTecherId(Number(id))}
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