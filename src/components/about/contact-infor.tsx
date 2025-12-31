
import Image from 'next/image'
import React, { ReactNode, useMemo } from 'react'
import CommunityCard from '../community/community-card';
import { cn } from '@/lib/utils';
import { Facebook, Globe, Link2, MessageCircle, Music, Youtube } from 'lucide-react';


const description = `Kết nối với hơn 20,000 học viên trong cộng đồng học tập năng động của chúng tôi. 
Chia sẻ kinh nghiệm, học hỏi và cùng nhau tiến bộ.`;

type SocialItem = {
    socialId: number;
    categoryType: string;
    title: string;
    description?: string;
    url?: string;
    icon?: string;
};


interface ContactInforProps {
    title?: string;
    desc?: string;
    data: SocialItem[] | null;
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
const ContactInfor = ({
    title = "Tham gia cộng đồng iPTE",
    desc = description,
    data
}: ContactInforProps) => {

    const socialItem = useMemo(() => {
        if (!data?.length) return [];
        return data.map((item) => ({
            ...item,
            icon: ICON_BY_TYPE[item.categoryType] ?? DEFAULT_ICON,
            bgColor: BG_BY_TYPE[item.categoryType] ?? DEFAULT_BG,
        }))
    }, [data]);
    if (!data || Object.keys(data).length === 0) return null;


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
                                socialItem.length > 3 && "community__list--scroll"
                            )}
                        >
                            {/* {dataSocial.map((item: any, index: number) => (
                                <div key={index} className="community__list-item">
                                    <CommunityCard data={item} className="community-card" />
                                </div>
                            ))} */}

                            {socialItem.map((item, index) => {
                                return (
                                    <CommunityCard
                                        key={index}
                                        icon={item?.icon}
                                        href={item?.url}
                                        title={item?.title}
                                        description={item?.description ?? ""}
                                        bgColor={item?.bgColor}
                                        className="community-card"
                                    />
                                )
                            })}
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