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
            <div className="h-full w-full flex flex-col items-center justify-center gap-2">
                {/* Featured Image */}
                {img && enableImg && (
                    <div className={`relative w-full ${heightImg} rounded-xl overflow-hidden`}>
                        <Image
                            src={img}
                            alt={title}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className=" flex-1 items-center py-4 ">
                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap mb-3 ">
                        {category.map((item, index) => {
                            return (
                                <div key={index}>
                                    <a
                                        className="border rounded border-brandBlue-500 text-brandBlue-500 hover:bg-purple-50 bg-transparent px-2 py-1"
                                    >
                                        {item.name}
                                    </a>
                                </div>
                            )
                        })}
                    </div>

                    {/* Featured Article Content */}
                    <div className="h-full space-y-4 ">
                        <h2 className="text-xl font-semibold text-foreground line-clamp-1">
                            {title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed line-clamp-4">
                            {description}
                        </p>
                        <button className="flex items-center text-brandBlue-500 hover:text-brandBlue-900 font-medium">
                            Đọc tiếp
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default NewsCard