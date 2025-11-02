import { ArrowRight, Clock, Facebook, Phone, Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { aboutMeService } from '@/services/about-me/aboutMeService';
import CommunityCard from '../community/community-card';
import { url } from 'inspector';
import { About } from '@/types/about';

interface ContactItem {
    icon: React.ReactNode;
    title: string;
    details: { label: string; value: string; href?: string }[];
}

interface ContactInforProps {
    data: About
}
const ContactInfor = async ({ data }: ContactInforProps) => {
    if (!data || {}) return null;
    const dataSocial = [
        {
            id: 1,
            icon: "/images/icon/icon-facebook.png",
            title: "iPTE Facebook Group",
            description: "Nhóm Facebook với hơn 15,000 thành viên.",
            bgColor: "blue",
            url: data?.facebook_url || "#"
        },
        {
            id: 2,
            icon: "/images/icon/icon-youtube.png",
            title: "iPTE YouTube Channel",
            description: "Kênh YouTube với hơn 200 video",
            bgColor: "red",
            url: data?.youtube_url || "#"
        },
        {
            id: 3,
            icon: "/images/icon/icon-tiktok.png",
            title: "iPTE TikTok",
            description: "Tài khoản TikTok với các meo học tập ngắn, thú vị",
            bgColor: "black",
            url: data?.tiktok_url || "#"
        },
    ];

    const contactData: ContactItem[] = [
        {
            icon: <Phone className="w-5 h-5 text-black mt-1 font-bold" />,
            title: "Hotline liên hệ",
            details: [
                { label: "Việt Nam", value: data.hotline ?? "" },
                { label: "Mail", value: data.email ?? "", href: `mailto:${data.email}` },
            ],
        },
        {
            icon: <Clock className="w-5 h-5 text-black mt-1 font-bold" />,
            title: "Thời gian làm việc",
            details: [
                { label: "Mở cửa", value: "từ thứ 2 đến Chủ nhật" },
                { label: "Thời gian", value: "8h00 - 21h00" },
            ],
        },
    ];

    return (
        <section className="py-16  bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                        {/* left side - Content */}
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
                                            <CommunityCard data={item} className="shrink-0" />
                                        </div>
                                    )
                                })}
                            </div>

                            <div className='flex items-start justify-between gap-4 w-full h-full'>
                                {contactData.map((item, index) => {
                                    return (
                                        <div key={index} className='flex-1 flex items-start gap-3 md:w-1/2'>
                                            {item.icon}
                                            <div>
                                                <h4 className='font-semibold text-sm md:text-base'>{item.title}</h4>
                                                {item.details.map((detail, i) => (
                                                    <p key={i} className="text-sm text-gray-600">
                                                        {detail.label}:{" "}
                                                        {detail.href ? (
                                                            <a
                                                                href={detail.href}
                                                                className="text-black underline hover:text-blue-600 transition"
                                                            >
                                                                {detail.value}
                                                            </a>
                                                        ) : (
                                                            <span className="font-medium text-black">{detail.value}</span>
                                                        )}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                        {/* right side - Image */}
                        <div className="relative h-full">
                            <div className="relative h-full max-w-md mx-auto">
                                <Image
                                    src="/images/img-comunity.png"
                                    alt="Professional woman with clipboard"
                                    width={600}
                                    height={700}
                                    className=" h-full object-cover rounded"
                                    priority
                                />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactInfor