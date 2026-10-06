import Image from "next/image";
import Link from "next/link";

export interface SidebarItem {
  id?: number | string;
  title?: string;
  image?: string;
  badge?: string;
  href?: string;
}

interface ArticleSidebarProps {
  title: string;
  items: SidebarItem[];
  variant?: "default" | "large";
}

const ArticleSidebar = ({
  title,
  items,
  variant = "default",
}: ArticleSidebarProps) => {
  if (!items || items.length === 0) return null;

  return (
    <aside className="article-sidebar">
      <h3 className="article-sidebar__title">{title}</h3>

      <div className="article-sidebar__list scroll-container">
        {items.map((item, idx) => {
          const href = item.href ?? "#";

          return (
            <article
              key={item.id ?? idx}
              className={`sidebar-card ${
                variant === "large"
                  ? "sidebar-card--large"
                  : "sidebar-card--compact"
              }`}
            >
              {variant === "large" ? (
                <Link href={href} className="sidebar-card__link">
                  <div className="sidebar-card__media sidebar-card__media--large">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title ?? ""}
                      fill
                      className="sidebar-card__image"
                    />
                  </div>
                  <div className="sidebar-card__body">
                    <h4 className="sidebar-card__title sidebar-card__title--two-lines">
                      {item.title}
                    </h4>
                    {item.badge && (
                      <p className="sidebar-card__badge">{item.badge}</p>
                    )}
                  </div>
                </Link>
              ) : (
                <Link
                  href={href}
                  className="sidebar-card__link sidebar-card__link--compact"
                >
                  <div className="sidebar-card__media sidebar-card__media--compact">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title ?? ""}
                      fill
                      className="sidebar-card__image"
                    />
                  </div>

                  <div className="sidebar-card__body">
                    <h4 className="sidebar-card__title sidebar-card__title--two-lines">
                      {item.title}
                    </h4>
                    {item.badge && (
                      <p className="sidebar-card__badge">{item.badge}</p>
                    )}
                  </div>
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </aside>
  );
};

export default ArticleSidebar;
