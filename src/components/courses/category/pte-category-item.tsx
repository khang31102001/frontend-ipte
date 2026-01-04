"use client"
import React, { useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import CustomSwiper from '@/components/ui/custom-swiper'
import { CategoryItem } from '@/types/category'
import { Course } from '@/types/courses'
import CourseCard from '../card/course-card'
import { COURSES_BASE, ROUTERS } from '@/config/routes/routers'


type layout = 'grid' | 'swiper'

interface PteCategoryItemProps {
    data?: Course[];
    category: CategoryItem;
    layout_type?: layout
}
const PteCategoryItem = ({
    data = [],
    category,
    layout_type
}: PteCategoryItemProps) => {
    // const [loadMore, setloadMore] = useState<boolean>()
   
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },  
        640: { slidesPerView: 2, spaceBetween: 10 },  
        870: { slidesPerView: 3, spaceBetween: 10 },  
        1280: { slidesPerView: 4, spaceBetween: 10 }, 
    };
    const cateHref = category.url ? ROUTERS.COURSES.index(category?.url) : "";
    // console.log("check cateHref PteCategoryItem", cateHref)
    return (
        <section className="section sm:section-sm lg:section-lg">
            <div className="container mx-auto px-4">
                <div className='w-full flex items-center justify-between min-h-24 mb-8'>
                    <div className="flex-1 space-y-1 md:space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-primary">{category.name}</h3>
                        <p className="text-muted-foreground mt-1">{category.description}.</p>
                    </div>
                    {layout_type === "swiper" && (
                        <div className="flex items-center justify-center gap-2">
                            <button

                                ref={prevRef}
                                className="swiper-nav-btn"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <button
                                ref={nextRef}
                                className="swiper-nav-btn"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {layout_type === "swiper" ? (
                    <>
                        <CustomSwiper
                            breakpoint={
                                breakpoints
                            }
                            slidesPerView={4}
                            loop
                            navigation={{ prevEl: prevRef, nextEl: nextRef }}
                            className="swiper-course"
                        >
                            {data.map((item, index) => {
                               const href = ROUTERS.COURSES.detail("", item?.slug, category?.url);
                            //    console.log("check href PteCategoryItem", href)
                                const imgSrc = item?.image?.trim() ? item.image : "/images/course-placeholder.jpg";
                                return (
                                    <CourseCard
                                     key={index}
                                        href={href}
                                        title={item.title}
                                        image={imgSrc}
                                        description={item.description}
                                        card_layout='col'
                                    />
                                )
                            })}
                        </CustomSwiper>
                    </>
                ) : (
                    null
                )}

               {cateHref &&(
                 <div className="w-full max-w-56 mx-auto mt-8">
                    <Link href={cateHref} className="btn-link-custom">
                        Xem thêm
                        <ArrowRight className="btn-link-custom__icon" />
                    </Link>
                </div>
               )}
            </div>
        </section>
    )
}

export default PteCategoryItem      