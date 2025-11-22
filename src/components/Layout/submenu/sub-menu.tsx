'use client'
import React from "react";
import clsx from "clsx";
import { CategoryItem } from "@/types/category";
import { ChevronDown } from "lucide-react";
import Image from "next/image";


interface OnSubMenuProps {
  items?: CategoryItem[];
  className?: string;

}

const OnSubMenu = ({
  items,
  className,

}: OnSubMenuProps) => {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  if (!items || items.length === 0) return null;
  return (
    <nav
      id="submenu"
      role="submenu"
      className={clsx(
        "submenu ",
        className,
      )}
    >
      <ul className="submenu__list">
        {items.map((item, idx) => {
          const hasChildren = !!(item.children && item.children.length > 0);
          const isThisOpen = openIdx === idx; // mục con ở cấp hiện tại có đang mở?

          const onToggle = (e: React.MouseEvent) => {
            if (!hasChildren) return;          // mục lá -> cho đi link
            e.preventDefault();                // chặn điều hướng khi toggle
            setOpenIdx((prev) => (prev === idx ? null : idx));
          };
          return (
            <li key={idx} className={clsx("submenu__item  group")}>
              <a
                onClick={onToggle}
                href={item.url}
                className="submenu__link"
              >
                <span className="submenu__text truncate">{item.name}</span>
                {hasChildren && (
                  <span className="submenu__icon group-hover:text-indigo-500">
                     <ChevronDown className="submenu__icon group-hover:text-indigo-500" />
                  </span>
                ) }
              </a>
              {hasChildren && (
                <OnSubMenu
                  items={item.children}
                  className="on-submenu card-box"
                />
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  );
};



export default OnSubMenu;
