interface SidebarItem {
  id: string
  title: string
  image: string
  badge?: string
}

interface SidebarSectionProps {
  title: string
  items: SidebarItem[]
  variant?: "default" | "large"
}

export default function SidebarSection({ title, items, variant = "default" }: SidebarSectionProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-gray-900">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {variant === "large" ? (
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="flex gap-3 p-3">
                <div className="h-20 w-24 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <h4 className="line-clamp-2 text-sm font-semibold text-gray-900">{item.title}</h4>
                  {item.badge && <p className="text-xs font-semibold text-blue-600">{item.badge}</p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
