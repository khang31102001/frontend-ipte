"use client";

import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLockScroll } from "../../hooks/use-locked-scroll";
import { useSite } from "../../providers/site-provider";
import type { NavItem } from "../../types/nav";
import SubMenuMobile from "./submenu/sub-menu-mobile";

interface MenuMobileListProps {
  data: NavItem[];
  IsOpenMenu: boolean;
  ClassName?: string;
  onClose?: () => void;
}

const MobileMenu = ({ data, IsOpenMenu = false, ClassName = "", onClose }: MenuMobileListProps) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { openRegistration, hasRegistrationForm } = useSite();
  useLockScroll(IsOpenMenu);

  useEffect(() => {
    if (!IsOpenMenu) setOpenIdx(null);
  }, [IsOpenMenu]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[10000] bg-black/40 transition-opacity duration-300",
        IsOpenMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ClassName,
      )}
      onClick={onClose}
    >
      <aside
        className={clsx(
          "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl",
          "transition-transform duration-300 ease-out",
          IsOpenMenu ? "translate-x-0" : "translate-x-full",
        )}
        onClick={(e) => e.stopPropagation()}
        aria-label="Menu di động"
      >
        <div className="mobile-menu__header">
          <div className="mobile-menu__brand">
            <span className="mobile-menu__brand-dot" />
            <span className="mobile-menu__brand-text">PTE iPASS</span>
          </div>
        </div>
        <nav className="mobile-menu__wrapper">
          <ul className="mobile-menu__list">
            {data.map((item, idx) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpen = openIdx === idx;
              return (
                <li key={item.href} className="mobile-menu__item">
                  <div className="mobile-menu__row">
                    {hasChildren ? (
                      <button type="button" className="mobile-menu__toggle" onClick={() => setOpenIdx(isOpen ? null : idx)} aria-expanded={isOpen}>
                        <span className="mobile-menu__text">{item.label}</span>
                        <span className={clsx("mobile-menu__caret", isOpen && "is-rotated")} aria-hidden>
                          <ChevronRight size={16} />
                        </span>
                      </button>
                    ) : (
                      <Link href={item.href} className="mobile-menu__link no-scrollbar" onClick={onClose}>
                        {item.label}
                      </Link>
                    )}
                  </div>
                  {hasChildren && (
                    <SubMenuMobile
                      items={item.children}
                      level={1}
                      idPrefix={`submenu-l1-${idx}`}
                      isOpen={isOpen}
                      className="submenu-mobile__child"
                      onNavigate={onClose}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {hasRegistrationForm && (
          <div className="mt-10">
            <button
              onClick={() => {
                onClose?.();
                openRegistration();
              }}
              type="button"
              className="absolute bottom-4 left-4 md:bottom-6 md:left-6 relative overflow-hidden border border-white/80 text-white font-semibold py-2.5 px-7 rounded-full bg-red-500 shadow-lg shadow-red-500/40 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/60 hover:bg-red-600 hover:text-white active:translate-y-0 active:scale-95 animate-cta-pulse"
            >
              <span className="relative z-10">Tư vấn miễn phí</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default MobileMenu;
