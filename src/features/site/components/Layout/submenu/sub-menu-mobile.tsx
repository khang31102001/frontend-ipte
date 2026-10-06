"use client";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import type { NavItem } from "../../../types/nav";

interface SubMenuMobileProps {
  items?: NavItem[];
  className?: string;
  level?: number;
  idPrefix?: string;
  isOpen?: boolean;
  onNavigate?: () => void;
}

const SubMenuMobile = ({ items, className, level = 1, idPrefix = "submenu", isOpen = false, onNavigate }: SubMenuMobileProps) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const uid = useId();

  if (!items || items.length === 0) return null;
  const toggle = (idx: number) => setOpenIdx((cur) => (cur === idx ? null : idx));

  return (
    <div className={clsx("submenu-mobile", isOpen ? "is-open" : "is-closed", className)} role="region" id={idPrefix}>
      <div className="submenu-mobile__container">
        <ul className="submenu-mobile__panel">
          {items.map((item, idx) => {
            const hasChildren = Boolean(item.children?.length);
            const childOpen = openIdx === idx;
            const panelId = `${idPrefix}-${level + 1}-${idx}-${uid}`;
            return (
              <li key={item.href} className={clsx("submenu-mobile__item", hasChildren && "submenu-mobile__item--has-children")}>
                {hasChildren ? (
                  <button type="button" className="submenu-mobile__toggle" aria-expanded={childOpen} aria-controls={panelId} onClick={() => toggle(idx)}>
                    <span className="submenu-mobile__text">{item.label}</span>
                    <span className={clsx("submenu-mobile__icon", childOpen && "is-rotated")} aria-hidden>
                      <ChevronRight size={16} className="submenu-mobile__chevron" />
                    </span>
                  </button>
                ) : (
                  <Link href={item.href} className="submenu-mobile__link" onClick={onNavigate}>
                    <span className="submenu-mobile__text">{item.label}</span>
                  </Link>
                )}
                {hasChildren && (
                  <SubMenuMobile items={item.children} level={level + 1} idPrefix={panelId} className="submenu-mobile__child" isOpen={childOpen} onNavigate={onNavigate} />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SubMenuMobile;
