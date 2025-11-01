// import { CourseData } from "@/types/course";

// interface CourseSchemaProps {
//   course: CourseData;
// }

// export function CourseSchema({ course }: CourseSchemaProps) {
//   const schema = {
//     "@context": "https://schema.org",
//     "@type": "Course",
//     "name": course.title,
//     "description": course.summary,
//     "provider": {
//       "@type": "Organization",
//       "name": "PTE Excellence Academy",
//       "sameAs": window.location.origin
//     },
//     ...(course.author && {
//       "instructor": {
//         "@type": "Person",
//         "name": course.author.name,
//         ...(course.author.avatar && { "image": course.author.avatar })
//       }
//     }),
//     ...(course.coverImage && { "image": course.coverImage }),
//     ...(course.tuition && { "offers": {
//       "@type": "Offer",
//       "category": "Educational",
//       "price": course.tuition
//     }}),
//     ...(course.publishedAt && { "datePublished": course.publishedAt }),
//     ...(course.updatedAt && { "dateModified": course.updatedAt }),
//   };

//   return (
//     <script
//       type="application/ld+json"
//       dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
//     />
//   );
// }
