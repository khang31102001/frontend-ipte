

import { Course } from "@/types/courses"
import Link from "next/link";
interface SidebarItem {
  id: string
  title: string
  image: string
  badge?: string
  href?: string;
}
interface ArticleSidebarProps {
  title: string
  items: SidebarItem[];
  variant?: "default" | "large"
}
const ArticleSidebar=({ 
  title, 
  items, 
  variant = "default" 
}: ArticleSidebarProps)=> {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-gray-900">{title}</h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {variant === "large" ? (
              <Link href={item.href ?? "#"} className="aspect-video overflow-hidden bg-gray-100">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />
              </Link>
            ) : (
              <Link href={item.href ?? "#"} className="flex gap-3 ">
                <div className="h-20 w-24 flex-shrink-0 overflow-hidden bg-gray-100">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-3">
                  <h4 className="line-clamp-2 text-sm font-semibold text-gray-900">{item.title}</h4>
                  {item.badge && <p className="text-xs font-semibold text-blue-600">{item.badge}</p>}
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticleSidebar
