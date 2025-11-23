import { Knowledges } from '@/types/knowledges';
import Image from 'next/image';
import React from 'react'

 interface KnowledgeCardProps {
    data: Knowledges;
    className?: string;
 }
const KnowledgeCard = ({data, className}: KnowledgeCardProps) => {
    
    return (
        <div
  className={`
    ${className ?? ""}
    rounded-3xl shadow-lg overflow-hidden transition-shadow
    bg-white h-full flex flex-col
  `}
>
  <div className="aspect-[4/3] relative">
    <Image
      src={data.image || "/images/course-1.jpg"}
      alt={data.title ?? "PTE IPASS"}
      fill
      className="object-cover"
    />
  </div>

  <div className="p-6 flex flex-col flex-1">
    {/* Title: cố định 2 dòng */}
    <h3
      className="
        font-bold text-lg text-gray-900 
        line-clamp-2 
        min-h-[3.5rem] 
        mb-3
      "
    >
      {data.title}
    </h3>

    {/* Description: tối đa 3 dòng + giữ chiều cao */}
    <p
      className="
        text-gray-600 text-sm leading-relaxed
        line-clamp-3
        min-h-[4.2rem]
        mb-6
        flex-1
      "
    >
      {data.description}
    </p>

    <button
      className="
        w-full bg-brandBlue-500 hover:bg-brandBlue-900 
        text-white font-medium py-3 rounded-3xl
      "
    >
      Xem thêm
    </button>
  </div>
</div>

    )
}

export default KnowledgeCard