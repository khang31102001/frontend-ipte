"use client"
import { useMemo, useState } from "react"
import { CategoryItem, CourseCategory } from "@/types/category"
import { ArticleSidebar } from "../../../shared/article";
import { Course } from "@/types/courses";
import { PteCategorySection } from "./pte-category-section";
import PtelistItems from "./pte-list-items";
import { SidebarItem } from "@/shared/article/article-sidebar";



interface PteCategoryPageProps {
    category: CategoryItem;
    categoryCourse?: CourseCategory[];
    featuredCourses?: Course[] | null;
    coures: Course[];
}
export function courseToSidebarItem(
  course: Course,
  basePath = ""
): SidebarItem {
  return {
    id: course.courseId ?? course.slug,
    title: course.title ?? course.courseName ?? "Khóa học",
    image: course.image ?? "/images/course-default.jpg",
    badge: "Miễn phí",
    href: course.slug ? `${basePath}/${course.slug}` : basePath,
  };
}

const PteCategoryPage = ({
    categoryCourse,
    category,
    featuredCourses,
    coures
}: PteCategoryPageProps) => {

    // const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
 
       const courseFeaturedItems = useMemo(()=>{
           if(!featuredCourses || featuredCourses.length === 0) return [];
           return featuredCourses.map((item)=> courseToSidebarItem(item, category?.url))
         }, [featuredCourses, category?.url]);

    if(!coures) return null;

    return (
        <section className="section--sm">
            {/* <ListGridControl onChangeView={setViewMode} /> */}
            <div className="grid gap-8 lg:grid-cols-3">

                <div className="lg:col-span-2">
                    <PtelistItems
                        category={category}
                        items={coures}
                    />
                </div>


                <div className="space-y-6">
                   {courseFeaturedItems &&(
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

            <div>
                {categoryCourse && categoryCourse.map((item, index) => {
                    return (
                        <PteCategorySection key={index}
                            pteCategory={item}
                        />
                    )
                })}
            </div>

        </section>
    )
}

export default PteCategoryPage
