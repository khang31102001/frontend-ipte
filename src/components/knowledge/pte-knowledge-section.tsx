
"use client"
import React, { useEffect, useMemo, useRef } from 'react'
import { useState } from "react"
import TabScroll from '../ui/tabSroll'
import CustomSwiper from '../ui/custom-swiper'
import { ChevronRight } from 'lucide-react'
import { Course } from '@/types/courses'
import { CategoryItem } from '@/types/category'
import { useKnowledGetByCate } from '@/hooks/use-knowledge'
import SectionLoading from '../../shared/loading/section-loading'
import CourseCard from '../courses/card/course-card'
import { KNOWLEDGE_BASE, ROUTERS } from '../../config/routes/routers'


export interface TabItem {
  id: string | number;
  label: string;
}
interface PteKnowledgeSectionProps {
  cateKnowledges: CategoryItem | null;
  knowledgesData?: Course[] | [];
}
const PteKnowledgeSection = ({
  cateKnowledges,
  knowledgesData = [],
}: PteKnowledgeSectionProps) => {


  const tabs: TabItem[] = useMemo(() => {
    return (
      cateKnowledges?.children?.map((item) => ({
        id: String(item?.categoryId),
        label: item?.name,
      })) ?? []
    );
  }, [cateKnowledges]);

  const [activeTab, setActiveTab] = useState<number | string>("");

  useEffect(() => {
    if (tabs.length && !activeTab) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  const activeCategoryId = activeTab ? Number(activeTab) : null;
  const { data: coursesResponse, isLoading } = useKnowledGetByCate({
    cateId: activeCategoryId,
    page: 1,
    pageSize: 12
  });

  const knowledgeItem = coursesResponse?.items ?? [];




  // const prevRef = useRef<HTMLButtonElement>(null);
  // const nextRef = useRef<HTMLButtonElement>(null);
  const breakpoints = {
    0: { slidesPerView: 1, spaceBetween: 10 },  // mobile nhỏ
    640: { slidesPerView: 2, spaceBetween: 10 },  // sm
    870: { slidesPerView: 3, spaceBetween: 10 },  // md
    1280: { slidesPerView: 4, spaceBetween: 10 }, // xl
  };

  const children = Array.isArray(cateKnowledges?.children) ? cateKnowledges.children : [];
  const hasCateKnowledges = children.length > 0;
  const cateHref = cateKnowledges?.url ? ROUTERS.KNOWLEDGE.index(KNOWLEDGE_BASE) : "";

  if (!cateKnowledges) return null;
  return (
    <section className="w-full bg-white section sm:section--sm lg:section--lg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-6xl font-bold text-brandBlue-900 mb-4 text-balance">Tài liệu tham khảo</h2>
          <p className="text-gray-600 text-lg">Tổng hợp tất cả tài liệu có trong chương trình học</p>
        </div>


        {/* Navigation Tabs */}
        {
          hasCateKnowledges && (
            <TabScroll
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )
        }
        <div className="w-full h-auto mb-12">

          {/* Loading state */}
          {isLoading && (
            <SectionLoading text="Đang tải nội dung..." />
          )}

          {/* Render Swiper khi đã có data */}
          <CustomSwiper
            breakpoint={breakpoints}
            autoplay
            slidesPerView={4}
            loop
          >

            {knowledgeItem?.map((item, index) => {
              const cateChild = cateKnowledges?.children?.find((i) => i.slug === item.slug);
              const href = ROUTERS.KNOWLEDGE.detail(KNOWLEDGE_BASE, item.slug, cateChild?.url);
              const imgSrc = item?.image?.trim() ? item.image : "/images/course-placeholder.jpg";
              return (
                <CourseCard
                  key={index}
                  href={href}
                  title={item?.title}
                  image={imgSrc}
                  description={item?.description}
                  card_layout='col'
                />
              )
            })}
          </CustomSwiper>
        </div>


        {cateHref && (
          <div className="flex items-center justify-center">
            <a href={cateHref} className=" inline-flex items-center bg-brandBlue-500 hover:bg-brandBlue-900 text-white px-8 py-4 rounded-full font-medium text-lg group">
              Xem toàn bộ tài liệu
              <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        )}


      </div>
    </section>
  )
}

export default PteKnowledgeSection