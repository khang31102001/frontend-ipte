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
const ComunityCard = ({ data, className }: ComunityCardProps) => {
    const {id, icon, title, description, bgColor} = data;
    return (
        <div className={`${className} p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border-l-4 border-l-${bgColor}-500`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-${bgColor}-600 rounded-full flex items-center justify-center`}>
                       <Image  alt='' src={icon} width={60} height={60} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
                        <p className="text-gray-600">{description}</p>
                    </div>
                </div>
                <ArrowRight className={`w-5 h-5 text-${bgColor}-600 group-hover:translate-x-1 transition-transform`} />
            </div>
        </div>
    )
}

export default ComunityCard