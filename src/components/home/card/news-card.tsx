import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
interface News {
    id: number,
    category: any[],
    title: string
    img?: string;
    description: string
}
interface NewsCardProps {
    data: News;
    className?: string;
    enableImg?: boolean;
    heightImg?: string;
}
const NewsCard = ({ data, className, enableImg, heightImg }: NewsCardProps) => {
    const { id, category, title, img, description } = data;
    return (
        <div className={` bg-white ${className} `}>
            <div className="flex flex-col gap-2">
                {/* Featured Image */}
                {img && enableImg && (
                    <div className={`relative ${heightImg} rounded-xl overflow-hidden`}>
                        <Image
                            src={img}
                            alt={title}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-3 mt-2">
                    {category.map((item, index) => {
                        return (
                            <div key={index}>
                                <a 
                                    className= "border rounded border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent px-2 py-1"
                                >
                                    {item.name}
                                </a>
                            </div>
                        )
                    })}

                </div>

                {/* Featured Article Content */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        {title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed line-clamp-4">
                        {description}
                    </p>
                    <button className="flex items-center text-purple-600 hover:text-purple-700 font-medium">
                        Đọc tiếp
                        <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsCard