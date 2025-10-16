import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
interface community {
    id: 1,
    icon: string,
    title: string,
    description: string,
    bgColor: string,

}
interface ComunityCardProps {
    data: community,
    className?: string;

}
const CommunityCard = ({ data, className }: ComunityCardProps) => {
    const {id, icon, title, description, bgColor} = data;
    return (
       <div
      className={`
        p-4 sm:p-6 lg:p-6 
        hover:shadow-lg transition-all duration-300 cursor-pointer group

        bg-white
        ${className}
      `}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Icon + Content */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-shrink">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
            <Image alt="" src={icon} width={32} height={32} className="w-8 h-8 object-contain" />
          </div>

          {/* Text */}
          <div className="flex flex-col min-w-0 flex-shrink">
            <h3 className="font-semibold text-lg text-gray-900 truncate">{title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Right: Arrow */}
        <ArrowRight className={`w-5 h-5 text-${bgColor}-600 group-hover:translate-x-1 transition-transform flex-shrink-0`} />
      </div>
    </div>
    )
}

export default CommunityCard