import Image from 'next/image';
import React from 'react'
interface document {
    id: number,
    image: string,
    title: string,
    description: string,
}
 interface DocumentCardProps {
    data: any;
    className?: string;
 }
const DocumentCard = ({data, className}: DocumentCardProps) => {
    const {id, image, title, description}= data
    return (
        <a key={id} className={`${className} rounded-3xl shadow-lg overflow-hidden transition-shadow`}>
            <div className="aspect-[4/3] relative">
                <Image src={image || "#"} alt={title} fill className="object-cover" />
            </div>
            <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{description}</p>
                <button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-3 rounded-3xl">
                    Xem thêm
                </button>
            </div>
        </a>
    )
}

export default DocumentCard