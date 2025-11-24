
"use client"
import React, { useEffect, useMemo, useRef } from 'react'
import { useState } from "react"
import TabScroll from '../ui/tabSroll'
import CustomSwiper from '../ui/custom-swiper'
import KnowledgeCard from './knowledge-card'
import { Knowledges } from '@/types/knowledges'
import { CategoryItem } from '@/types/category'
import { useKnowledgeByCategory } from '@/hooks/knowledges/useKnowledgeByCategory'
import { ChevronRight } from 'lucide-react'
import SectionLoading from '../shared/loading/section-loading'

export interface TabItem {
  id: string | number;
  label: string;
}
interface PTEKnowledgeProps {
  data?: Knowledges[];
  category?: CategoryItem;
}
const KnowledgePTE = ({
  data,
  category
}: PTEKnowledgeProps) => {
  // const [activeTab, setActiveTab] = useState("writing");
  // console.log("knowleds cate: ", category);
  const tabs: TabItem[] = useMemo(() => {
    return (
      category?.children?.map((item) => ({
        id: item.category_type!,
        label: item.name,
      })) ?? []
    );
  }, [category]);
  // console.log("tab cate:", tabs)
  const [activeTab, setActiveTab] = useState<number | string>("");
  console.log("activeTab:", activeTab);

  useEffect(() => {
    if (tabs.length && !activeTab) {
      setActiveTab(tabs[0].id);
    }

  }, [tabs, activeTab]);

  const {
    data: knowledgeItems = [],
    isLoading,
  } = useKnowledgeByCategory(activeTab);



  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const breakpoints = {
    0: { slidesPerView: 1, spaceBetween: 10 },  // mobile nhỏ
    640: { slidesPerView: 2, spaceBetween: 10 },  // sm
    870: { slidesPerView: 3, spaceBetween: 10 },  // md
    1280: { slidesPerView: 4, spaceBetween: 10 }, // xl
  };


  return (
    <section className="py-16 bg-white">
      <div className="container  mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-6xl font-bold text-brandBlue-900 mb-4 text-balance">Tài liệu tham khảo</h2>
          <p className="text-gray-600 text-lg">Tổng hợp tất cả tài liệu có trong chương trình học</p>
        </div>


        {/* Navigation Tabs */}
        <TabScroll
          tabs={tabs}
          activeTab={activeTab}
          navigation={true}
          onTabChange={setActiveTab}
        />
        <div className="w-full h-auto mb-12">

          {/* Loading state */}
          {isLoading && (
            <SectionLoading text="Đang tải nội dung..." />
          )}

          {/* Render Swiper khi đã có data */}
          {!isLoading && (
            <CustomSwiper
              breakpoint={breakpoints}
              autoplay
              slidesPerView={4}
              loop
            >
              {knowledgeItems?.map((item, index) => (
                <KnowledgeCard
                  key={index}
                  data={item}
                  className="flex flex-col justify-center"
                />
              ))}
            </CustomSwiper>
          )}
        </div>

        {/* View All Materials Button */}
        <div className="flex items-center justify-center">
          <button className=" inline-flex items-center bg-brandBlue-500 hover:bg-brandBlue-900 text-white px-8 py-4 rounded-full font-medium text-lg group">
            Xem toàn bộ tài liệu
            <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>


      </div>
    </section>
  )
}

export default KnowledgePTE