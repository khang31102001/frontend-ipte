import { notFound } from "next/navigation";
import { resolveNodeBySlugs, isLeaf } from "@/lib/nav/resolveNode";
import { coursesServices } from "@/lib/service/course";
import CourseDetailPage from "@/pages/course/course-detail-page";
import { Suspense } from "react";
import Skeleton from "@/components/shared/loading/Skeleton";
import CoursesCategoryPage from "@/pages/course/course-category-page";
import CategoryGroupItem from "@/pages/course/category-group-item";
import { CourseCategory } from "@/types/category";


async function CategorySection({
  courseCategory
}: { courseCategory: CourseCategory | null }) {

  if (!courseCategory) return null;
  // console.log("category in section", id, name, url);
  const courses = Array.isArray(courseCategory.courses) ? courseCategory.courses : [];
  // console.log(`courses in section: `, courses);
  //  Trả về UI render sẵn (SSR)
  if (!courses.length) {
    return (
      <CategoryGroupItem
        courses={[]}
        viewMode="grid"
        title={courseCategory.name}
        subTitle="Chưa có khóa học trong danh mục này"
      />
    )
  };
  return (
    <CategoryGroupItem
      courses={courses}
      viewMode="grid"
      title={courseCategory.name}
      subTitle="Danh sách các khóa học thuộc danh mục này"
    />

  );
}

async function CourseContainer({
  found,
  breadcrumbs,
}: {
  found: any;
  breadcrumbs: Array<{ name: string; href: string }>;
}) {
  const categories = found?.children ?? [];

  const categoryResults = await Promise.all(
    categories.map(async (item: any) => {
      try {
        const data = await coursesServices.getCoursesByCate({
          category: item.category_type, 
        });
        const courses = Array.isArray(data?.items) ? data.items : [];
        return { ...item, courses };
      } catch (err) {
        console.error("Fetch error:", err);
        return { ...item, courses: [] };
      }
    })
  );

  console.log("categoryResults in contianer", categoryResults);
  return (
    <CoursesCategoryPage
      data={{
        title: found.name,
        description: found.description ?? "",
        breadcrumbs,
      }}
    >
      {categoryResults.map((item: any) => (
          <CategorySection key={item.id} courseCategory={item} />
      ))}
    </CoursesCategoryPage>
  );
}

type Params = { slug?: string[] };

export default async function Page({ params }: { params: Params }) {
  const slugs = params.slug ?? []; // [], ['a'], ['a','b'], ...
  //  console.log("Category Page slugs:", slugs);
  const { found, breadcrumbs } = await resolveNodeBySlugs(slugs);
  // console.log("Resolved node:", { slugs, found, breadcrumbs });
  // Không tìm thấy node theo slug path
  if (!found) return notFound();

  // Nếu leaf -> Detail
  if (isLeaf(found)) {
    // Bạn có thể fetch dữ liệu detail theo found.id/slug
    const course = await coursesServices.getCoursesDetails({ slug: found?.slug! });
    if (!course) return notFound();
    return <CourseDetailPage course={course} breadcrumbs={breadcrumbs} />;
  }

  // Ngược lại -> Category (listing con)
  // Nếu là danh mục, liệt kê children hoặc courses của category đó
  return (
    <Suspense fallback={<Skeleton title={found.name} />}>
      <CourseContainer found={found} breadcrumbs={breadcrumbs} />
    </Suspense>
  );
}
