import { CategoryItem } from '@/types/category'
import Image from 'next/image'
import React from 'react'

interface MobileMenuListProps {
    data: CategoryItem[],
    IsOpenMenu: boolean,
    ClassName?: string

}
const MobileMenuList = ({
    data,
    IsOpenMenu = false,
    ClassName = ""
}: MobileMenuListProps) => {


    const handleOpenMenuChild = () =>{
        
    }
    return (
        <div className={`md:hidden fixed inset-0 top-0 right-0 z-40 
           h-full bg-white shadow border-t border-gray-200
           transform transition-transform duration-300 ease-out p-6 
           overflow-y-auto custom-scrollbar
           ${IsOpenMenu ? "translate-y-0" : " -translate-y-full"}
           `}>


            <div className="relative h-full w-full ">

                <ul className="h-full flex-grow flex flex-col  gap-4 p-4 text-sm font-medium text-gray-700
                 overflow-y-auto max-h-[calc(100vh-80px)] custom-scrollbar
                 ">
                    {data.map((item, idx) => (
                        <li
                            onClick={handleOpenMenuChild}
                            key={idx}
                            className="h-12 flex items-center"
                        >
                            <a href={item.url} className="text-gray-900 text-sm lg:text-ld font-bold inline-flex items-center gap-2 hover:text-brandBlue-500 nav-link-underline">
                                {item.name}
                                {item.icon &&
                                 item.children && 
                                 (
                                    <span className="w-3 h-3 flex items-center justify-center transition-transform duration-100  group-hover:rotate-180">
                                        <Image
                                            src={item.icon}
                                            alt={item.name}
                                            width={16}
                                            height={16}
                                        />
                                    </span>
                                )}
                            </a>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default MobileMenuList