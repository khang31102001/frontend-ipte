'use client'
import React from "react";
import clsx from "clsx";
import { CategoryItem } from "@/types/category";

type Variant = "auto" | "desktop" | "mobile";
interface OnSubMenuProps {
  items?: CategoryItem[];
  className?: string;
  variant?: Variant;
}

const OnSubMenu = ({
  items,
  className,
  variant
}: OnSubMenuProps) => {
const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  if (!items || items.length === 0) return null;
  return (
    <ul
     
      className={clsx(
        className,
      )}
    >
      {items.map((item, idx) => {
        const hasChildren = !!(item.children && item.children.length > 0);
            const isThisOpen = openIdx === idx; // mục con ở cấp hiện tại có đang mở?

        const onToggle = (e: React.MouseEvent) => {
          if (!hasChildren) return;          // mục lá -> cho đi link
          e.preventDefault();                // chặn điều hướng khi toggle
          setOpenIdx((prev) => (prev === idx ? null : idx));
        };
        return (
            <li key={idx} className={clsx("has-children py-2 px-2 group", { "is-open": isThisOpen })}>
            <a
              onClick={onToggle}
              href={item.url}
              className="inline-flex items-center w-full
                        px-4 py-2.5 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 
                       transition-colors duration-150 focus:outline-none focus:bg-indigo-100 "
            >
              <span className="truncate">{item.name}</span>
              {hasChildren && <span className="caret ml-2 text-sm text-gray-400 group-hover:text-indigo-500">▶</span>}
            </a>
            {hasChildren && (
              <OnSubMenu
                items={item.children}
                variant={variant}
                className={clsx(
                  variant === "desktop" ? "sub-menu-desktop card-box" : "sub-menu-mobile",
                  { "is-open": isThisOpen } // chỉ mở cấp này nếu mục hiện tại mở
                )}
              />
            )}
          </li>
        )
      })}
    </ul>
  );
};



export default OnSubMenu;
