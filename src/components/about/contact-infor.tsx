
import Image from 'next/image'
import React from 'react'
import CommunityCard from '../community/community-card';
import { About } from '@/types/about';
import { cn } from '@/lib/utils';

const description = `Kết nối với hơn 20,000 học viên trong cộng đồng học tập năng động của chúng tôi. 
Chia sẻ kinh nghiệm, học hỏi và cùng nhau tiến bộ.`;

interface ContactInforProps {
    title?: string;
    desc?: string;
    data: About;
}
const ContactInfor = ({
    title = "Tham gia cộng đồng iPTE",
    desc = description,
    data
}: ContactInforProps) => {
    if (!data || Object.keys(data).length === 0) return null;
    const dataSocial = [
        {
            id: 1,
            icon: "/images/icon/icon-facebook.png",
            title: "iPTE Facebook Group",
            description: "Nhóm Facebook với hơn 15,000 thành viên.",
            url: data?.facebookUrl || "#"
        },
        {
            id: 2,
            icon: "/images/icon/icon-youtube.png",
            title: "iPTE YouTube Channel",
            description: "Kênh YouTube với hơn 200 video",
            url: data?.youtubeUrl || "#"
        },
        {
            id: 3,
            icon: "/images/icon/icon-tiktok.png",
            title: "iPTE TikTok",
            description: "Tài khoản TikTok với các meo học tập ngắn, thú vị",
            url: data?.tiktokUrl || "#"
        },
    ];


    return (
        <section className="community">
            <div className="community__container">
                <div className="community__layout">
                    {/* LEFT – CONTENT */}
                    <div className="community__left">
                        <div className="community__header">
                            <h2 className="community__title">{title}</h2>
                            <p className="community__desc">{desc}</p>
                        </div>

                        {/* LIST CARD – nếu > 3 thì scroll */}
                        <div
                            className={cn(
                                "community__list",
                                dataSocial.length > 3 && "community__list--scroll"
                            )}
                        >
                            {dataSocial.map((item: any, index: number) => (
                                <div key={index} className="community__list-item">
                                    <CommunityCard data={item} className="community-card" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT – IMAGE */}
                    <div className="community__right">
                        <div className="community__image-wrap">
                            <Image
                                src="/images/img-comunity.png"
                                alt="Professional woman with clipboard"
                                width={600}
                                height={700}
                                className="community__image"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default ContactInfor