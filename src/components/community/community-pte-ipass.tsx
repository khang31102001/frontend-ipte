'use client'
import Image from 'next/image'
import React, { ReactNode, useMemo } from 'react'
import CommunityCard from './community-card';
import { Facebook, Globe, Link2, MessageCircle, Music, Youtube } from 'lucide-react';

type SocialItem = {
    socialId: number;
    categoryType: string;
    title: string;
    description?: string;
    url?: string;
    icon?: string;
};


interface CommunityProps {
    socialData: SocialItem[];
}


const ICON_BY_TYPE: Record<string, ReactNode> = {
    CONTACT_COMMUNITY_LINK_FACEBOOK: <Facebook className="h-6 w-6 text-white" />,
    CONTACT_COMMUNITY_LINK_TIKTOK: <Music className="h-6 w-6 text-white" />,
    CONTACT_COMMUNITY_LINK_YOUTUBE: <Youtube className="h-6 w-6 text-white" />,
    CONTACT_COMMUNITY_LINK_ZALO: <MessageCircle className="h-6 w-6 text-white" />,
    CONTACT_COMMUNITY_LINK_WEBSITE: <Globe className="h-6 w-6 text-white" />,
};
const BG_BY_TYPE: Record<string, string> = {
    CONTACT_COMMUNITY_LINK_FACEBOOK: "#1877F2",
    CONTACT_COMMUNITY_LINK_TIKTOK: "#000000",
    CONTACT_COMMUNITY_LINK_YOUTUBE: "#FF0000",
    CONTACT_COMMUNITY_LINK_ZALO: "#0068FF",
    CONTACT_COMMUNITY_LINK_WEBSITE: "#111827",
};

const DEFAULT_ICON = <Link2 className="h-6 w-6 text-white" />;
const DEFAULT_BG = "#000000";

const CommunityPTE = ({
    socialData = []
}: CommunityProps) => {


    const socialItem = useMemo(() => {
        if (!socialData.length) return [];
        return socialData.map((item) => ({
            ...item,
            icon: ICON_BY_TYPE[item.categoryType] ?? DEFAULT_ICON,
            bgColor: BG_BY_TYPE[item.categoryType] ?? DEFAULT_BG,
        }))
    }, [socialData]);



    if (!socialData || socialData.length === 0) return null;
    return (
        <section className="py-16  bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-stretch">

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

                        <div className="space-y-6 h-full flex flex-col justify-between">
                            <div className="space-y-4">
                                <h2 className="text-4xl lg:text-5xl font-bold text-brandBlue-900 leading-tight">Tham gia cộng đồng iPTE</h2>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Kết nối với hơn 20,000 học viên trong cộng đồng học tập năng động của chúng tôi. Chia sẻ kinh nghiệm,
                                    học hỏi và cùng nhau tiến bộ.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 w-full h-full py-4 max-h-96 overflow-y-auto no-scrollbar ">
                                {socialItem.map((item, index) => {
                                    return (
                                        <CommunityCard
                                            key={index}
                                            icon={item?.icon}
                                            href={item?.url}
                                            title={item?.title}
                                            description={item?.description ?? ""}
                                            bgColor={item?.bgColor}
                                            className="shrink-0"
                                        />
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