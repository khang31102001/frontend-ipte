"use client"
import { useMemo, useState } from "react"
import { CategoryItem, CourseCategory } from "@/types/category"
import { ArticleSidebar } from "../../../shared/article";
import { Course } from "@/types/courses";
import { PteCategorySection } from "./pte-category-section";
import PtelistItems from "./pte-list-items";
import { SidebarItem } from "@/shared/article/article-sidebar";
import { COURSES_BASE, ROUTERS } from "@/config/routes/routers";
import { BreadcrumbItem } from "@/types/breadcrumbs";
import Breadcrumb from "@/shared/breadcrumb";



interface PteCategoryPageProps {
    breadcrumbs?: BreadcrumbItem[] | [];
    category: CategoryItem;
    categoryCourse?: CourseCategory[];
    featuredCourses?: Course[] | null;
    coures: Course[];
}
export function courseToSidebarItem(
    course: Course,
): SidebarItem {
    return {
        id: course.courseId ?? course.slug,
        title: course.title ?? course.courseName ?? "Khóa học",
        image: course.image ?? "/images/course-default.jpg",
        badge: "Miễn phí",
        href: course.slug ? ROUTERS.COURSES.detail(COURSES_BASE, course.slug) : COURSES_BASE,
    };
}

const PteCategoryPage = ({
    breadcrumbs = [],
    categoryCourse,
    category,
    featuredCourses,
    coures
}: PteCategoryPageProps) => {

    // const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    const courseFeaturedItems = useMemo(() => {
        if (!featuredCourses || featuredCourses.length === 0) return [];
        return featuredCourses.map((item) => courseToSidebarItem(item))
    }, [featuredCourses]);

    if (!coures) return null;

    return (
        <section className="section sm:section--sm lg:section--lg bg-white">
            <Breadcrumb
                items={breadcrumbs}
                className="container max-auto px-4 py-4 md:py-8"
            />

            <div className="container max-auto px-4 py-8 md:py-12">
                <p className="text-base  text-primary mb-2">{category?.description}</p>
            </div>

            {/* <ListGridControl onChangeView={setViewMode} /> */}
            <div className="grid gap-8 lg:grid-cols-3">

                <div className="lg:col-span-2">
                    <PtelistItems
                        category={category}
                        items={coures}
                    />
                </div>


                <div className="space-y-6">
                    {courseFeaturedItems && (
                        <ArticleSidebar
                            title="Khóa học tiêu biểu"
                            items={courseFeaturedItems}
                        />
                    )}

                    <ArticleSidebar
                        title="Cộng đồng PTE lớn nhất"
                        items={[
                            {
                                id: "1",
                                title: "Join our PTE community",
                                image: "/community-group.jpg",
                            },
                        ]}
                        variant="large"
                    />

                    <ArticleSidebar
                        title="Cập nhật thông tin PTE"
                        items={[
                            {
                                id: "1",
                                title: "Follow us on social media",
                                image: "/social-media-icons.jpg",
                            },
                        ]}
                        variant="large"
                    />
                </div>
            </div>


            {categoryCourse && categoryCourse.map((item, index) => {
                return (
                    <PteCategorySection key={index}
                        pteCategory={item}
                    />
                )
            })}


        </section>
    )
}

export default PteCategoryPage
