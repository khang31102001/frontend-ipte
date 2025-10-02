import Image from 'next/image'
import React from 'react'

interface StudentRview {
  id: number,
  name: string,
  role: string,
  type: string,
  content: string;
  avatar: string;
}

interface StudentreviewCardProps {
  data: StudentRview
}

const StudentreviewCard = ({ data }: StudentreviewCardProps) => {
  const { name, role, content, avatar } = data;

  return (
    <div className="bg-white rounded-3xl shadow-lg h-full">
      <div className="flex flex-col p-4 sm:p-5 md:p-6 lg:p-8 h-full">
        {/* header: avatar + info */}
        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
          {/* avatar */}
          <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 border border-gray-200 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={avatar || ""}
              alt={name}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>

          {/* description */}
          <div className="leading-6 sm:leading-7 md:leading-8 tracking-wide">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-xl font-bold">{name}</h3>
            <span className="text-gray-600 text-sm sm:text-base md:text-md font-medium line-clamp-1">{role}</span>
          </div>
        </div>

        {/* content */}
        <p className="text-gray-700 text-sm sm:text-base md:text-md font-normal flex-grow line-clamp-3">
          {content}
        </p>
      </div>
    </div>

  )
}

export default StudentreviewCard
