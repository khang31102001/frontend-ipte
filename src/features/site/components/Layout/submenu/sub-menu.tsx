"use client";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { NavItem } from "../../../types/nav";

interface OnSubMenuProps {
  items?: NavItem[];
  className?: string;
}

const OnSubMenu = ({ items, className }: OnSubMenuProps) => {
  if (!items || items.length === 0) return null;
  return (
    <nav id="submenu" className={clsx("submenu", className)}>
      <ul className="submenu__list">
        {items.map((item) => {
          const hasChildren = Boolean(item.children?.length);
          return (
            <li key={item.href} className="submenu__item group">
              <Link href={item.href} className="submenu__link">
                <span className="submenu__text truncate">{item.label}</span>
                {hasChildren && (
                  <span className="submenu__icon group-hover:text-indigo-500">
                    <ChevronDown className="submenu__icon group-hover:text-indigo-500" />
                  </span>
                )}
              </Link>
              {hasChildren && <OnSubMenu items={item.children} className="on-submenu card-box" />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default OnSubMenu;
