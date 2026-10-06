"use client";
import clsx from "clsx";
import { ChevronDown, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavItem } from "../../types/nav";
import CourseSearchBox from "../search/CourseSearchBox";
import { ROUTES } from "../../config/routes";
import MobileMenu from "./mobile-menu";
import OnSubMenu from "./submenu/sub-menu";

interface HeaderProps {
  nav: NavItem[];
  logoUrl?: string;
  siteName?: string;
  hotline?: string;
}

function normalizePath(p: string) {
  if (!p) return "/";
  const clean = p.split("?")[0]?.split("#")[0] ?? "/";
  return clean !== "/" ? clean.replace(/\/+$/, "") : "/";
}

function isActivePath(currentPath: string, itemPath: string) {
  const cur = normalizePath(currentPath);
  const target = normalizePath(itemPath);
  return cur === target || (target !== "/" && cur.startsWith(target + "/"));
}

const Header = ({ nav, logoUrl = "/images/logo/logo-final.jpg", siteName = "PTE iPASS", hotline }: HeaderProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="is-sticky-mobile header">
        <div className="header__container">
          <div className="header__inner">
            <div className="flex gap-2 items-center">
              <Link href="/" className="header__logo">
                <Image src={logoUrl} alt={siteName} width={200} height={150} className="header__logo-img" priority />
              </Link>

              {hotline && (
                <div className="header__hotline">
                  <a className="hotline-pill" href={`tel:${hotline.replace(/\s/g, "")}`}>
                    <Phone size={20} className="text-white hover:text-white" />
                    <span className="hotline-text">Hotline: {hotline}</span>
                  </a>
                </div>
              )}
            </div>

            <div className="flex gap-4 items-center">
              <CourseSearchBox suggestions={nav.find((i) => i.href === ROUTES.courses)?.children} />
              <button
                className={clsx(
                  "z-[10001] lg:hidden flex flex-col items-center justify-center space-y-1.5 text-primary",
                  openMenu && "text-red-500",
                )}
                onClick={() => setOpenMenu((v) => !v)}
                aria-label="Mở menu"
                aria-expanded={openMenu}
              >
                <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${openMenu ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${openMenu ? "opacity-0" : "opacity-100"}`} />
                <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${openMenu ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>

            <MobileMenu data={nav} IsOpenMenu={openMenu} onClose={() => setOpenMenu(false)} />
          </div>
        </div>
      </header>

      <div id="nav-menu" className="nav-menu is-sticky">
        <nav className="nav-menu__wrapper" aria-label="Menu chính">
          <ul className="nav-menu__list">
            {nav.map((item) => {
              const active = isActivePath(pathname, item.href);
              const hasChildren = Boolean(item.children?.length);
              return (
                <li key={item.href} className="nav-menu__item group">
                  <Link
                    href={item.href}
                    className={clsx("nav-menu__link link-underline", active && "nav-menu__link--active")}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="nav-menu__text text-lg lg:text-base font-semibold">{item.label}</span>
                    {hasChildren && <ChevronDown size={16} className="nav-menu__icon group-hover:rotate-180" />}
                  </Link>
                  {hasChildren && <OnSubMenu items={item.children} className="on-submenu card-box" />}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
