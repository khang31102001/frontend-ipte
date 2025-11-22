
import { CourseCategory } from "@/types/category";
import PteCategoryItem from "./pte-category-item";



export function PteCategorySection({
  pteCategory
}: {   pteCategory: CourseCategory}) {

  if (!pteCategory) return null;
  // console.log("category in section", id, name, url);
  const courses = Array.isArray(pteCategory.courses) ? pteCategory.courses : [];
  // console.log(`courses in section: `, courses);
  //  Trả về UI render sẵn (SSR)
  if (!courses || courses.length === 0) return null;
  return (

    <PteCategoryItem
      categoryParent={pteCategory}
      data={courses}
      layout_type="swiper"
    />

  );
}
