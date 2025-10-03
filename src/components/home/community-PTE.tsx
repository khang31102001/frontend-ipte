import { ArrowRight, Facebook, Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import ComunityCard from './card/comunity-card';

const CommunityPTE = () => {
    const dataSocial = [
        {
            id: 1,
            icon: "/images/icon/icon-facebook.png",
            title: "iPTE Facebook Group",
            description: "Nhóm Facebook với hơn 15,000 thành viên.",
            bgColor: "blue"
        },
        {
            id: 2,
            icon: "/images/icon/icon-youtube.png",
            title: "iPTE YouTube Channel",
            description: "Kênh YouTube với hơn 200 video",
            bgColor: "red"
        },
        {
            id: 3,
            icon: "/images/icon/icon-tiktok.png",
            title: "iPTE TikTok",
            description: "Tài khoản TikTok với các meo học tập ngắn, thú vị",
            bgColor: "black"
        },
    ];
    return (
        <section className="py-16  bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                        {/* Left side - Image */}
                        <div className="relative h-full">
                            <div className="relative w-full h-full max-w-md mx-auto">
                                <Image
                                    src="/images/student-1.jpg"
                                    alt="Professional woman with clipboard"
                                    width={600}
                                    height={700}
                                    className="w-full h-full object-cover rounded"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right side - Content */}
                        <div className="space-y-6 h-full flex flex-col justify-between">
                            <div className="space-y-4">
                                <h2 className="text-4xl lg:text-5xl font-bold text-brandBlue-900 leading-tight">Tham gia cộng đồng iPTE</h2>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Kết nối với hơn 20,000 học viên trong cộng đồng học tập năng động của chúng tôi. Chia sẻ kinh nghiệm,
                                    học hỏi và cùng nhau tiến bộ.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 w-full h-full py-4 max-h-96 overflow-y-auto no-scrollbar ">
                                {dataSocial.map((item: any, index) => {
                                    return (
                                        <div key={index} className="w-full" >
                                            <ComunityCard data={item} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default CommunityPTE