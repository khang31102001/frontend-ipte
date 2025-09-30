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
  const { id, name, role, content, avatar } = data;
  return (
    <div className='h-[260px] bg-white rounded-3xl shadow-lg'>
      <div className='flex flex-col items-start p-6 h-full '>
        <div className='flex items-start gap-4'>
          {/* avatar */}
          <div className='h-16 w-16 border border-gray-200  rounded-full overflow-hidden'>
            <Image
              src={avatar || ""}
              alt={name}
              width={70}
              height={70}
              className='object-cover'
            />
          </div>
          {/* description */}
          <div className='leading-8 tracking-wide'>
            <h3 className='text-xl font-bold'>{name}</h3>
            <span className='text-gray-600 text-xl font-medium'>{role}</span>
           
          </div>
          
        </div>
         <p className='text-gray-700 text-sm font-normal'>{content}</p>
      </div>

    </div>
  )
}

export default StudentreviewCard