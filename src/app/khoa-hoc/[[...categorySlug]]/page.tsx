import { notFound } from "next/navigation";
import { coursesServices } from "@/lib/service/course";
import CourseDetailPage from "@/pages/course/course-detail-page";
import { Suspense } from "react";
import Skeleton from "@/components/shared/loading/Skeleton";
import CoursesCategoryPage from "@/pages/course/course-category-page";
import CategoryGroupItem from "@/pages/course/category-group-item";
import { CategoryItem, CourseCategory } from "@/types/category";
import { categoriesServices } from "@/lib/service/category";
import { checkCategoryBySlugs } from "@/lib/check-category";
import { BreadcrumbItem } from "@/types/breadcrumbs";
import CourseList from "@/components/courses/course-list";
import { CourseListResponse } from "@/types/courses";
import CourseSwiper from "@/components/courses/course-swiper";




async function CategorySection({
  courseCategory
}: { courseCategory: CourseCategory | null }) {

  if (!courseCategory) return null;
  // console.log("category in section", id, name, url);
  const courses = Array.isArray(courseCategory.courses) ? courseCategory.courses : [];
  // console.log(`courses in section: `, courses);
  //  Trả về UI render sẵn (SSR)
  if (!courses || courses.length === 0) return null;
  return (
    <CourseSwiper
      data={courses}
      title={courseCategory.name}
      description={courseCategory.description || ""}
      url={courseCategory.url || ""}
    />

  );
}

async function CourseCatgoryIndex({
  found,
  breadcrumbs,
}: {
  found: any;
  breadcrumbs: BreadcrumbItem[];
}) {
  const categories = found?.children ?? [];
  const courses:CourseListResponse = await coursesServices.getCoursesByCate({
    categoryId: found.id,
  });


  const categoryResults = await Promise.all(
    categories.map(async (item: any) => {
      try {
        const data = await coursesServices.getCoursesByCate({
          categoryId: item.id,
        });
        const courses = Array.isArray(data?.items) ? data.items : [];
        // console.log("courses in page", courses);
        return { ...item, courses: courses };
      } catch (err) {
        // console.error("Fetch error:", err);
        return { ...item, courses: [] };
      }
    })
  );

  // console.log("categoryResults in contianer", categoryResults);
  return (
    <CoursesCategoryPage
      data={{
        title: found.name,
        description: found.description ?? "",
        breadcrumbs,
      }}
    >
      <>
      {courses && courses.items && courses.items.length > 0 && (
        <CourseList viewMode="grid" data={courses.items} />
      )}
      {categories && categoryResults.map((item: any) => (
        <CategorySection key={item.id} courseCategory={item} />
      ))}
      </>
    </CoursesCategoryPage>
  );
}

type Params = { categorySlug?: string[] };

export default async function Page({ params }: { params: Params }) {
  const { categorySlug } = params ?? []; // [], ['a'], ['a','b'], ...
  const data = await categoriesServices.getCategoryTree({ url: "/khoa-hoc" });
  const categoryCourse:CategoryItem = data ?? []
  // console.log("categoryCourse:", categoryCourse);
  // console.log("slugs:", categorySlug);

  if (!categorySlug) {
    return (
        <CourseCatgoryIndex
          found={categoryCourse}
          breadcrumbs={[{ name: categoryCourse.name, href: categoryCourse.url ?? "" }]}
        />
    );
  }

  const lastUrl = categorySlug[categorySlug.length - 1];
  // console.log("lastUrl:", lastUrl);

  const isCourse = await coursesServices.getCoursesDetails({ slug: lastUrl });
  // console.log("isCourse:", isCourse);
 
  if(isCourse){
    return(
      <CourseDetailPage course={isCourse} breadcrumbs={[]}/>
    )
  }

  // kiểm tra lastUrl có phải là category không
  const {found, breadcrumbs} = await checkCategoryBySlugs(categoryCourse.children ?? [], categorySlug);

  // console.log("found category:", found);
  if( found){
    return(
      <CourseCatgoryIndex
        found={found}
        breadcrumbs={breadcrumbs}
      />
    )
  }

  return  notFound();
}
