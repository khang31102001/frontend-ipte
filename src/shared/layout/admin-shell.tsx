"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { usePermissions, type Permission } from "@/core/rbac";
import { cn } from "@/shared/lib/cn";
import { SidebarProvider, useSidebar } from "./sidebar-context";

export interface NavChild {
  label: string;
  href: string;
  permission?: Permission;
}

export interface NavItem {
  label: string;
  href?: string;
  /** Chỉ active khi đúng đường dẫn (không active cho các trang con), ví dụ Dashboard. */
  exact?: boolean;
  icon: ReactNode;
  permission?: Permission;
  children?: NavChild[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

function isActivePath(pathname: string, href: string, exact = false) {
  return pathname === href || (!exact && pathname.startsWith(`${href}/`));
}

function Sidebar({ groups, brand }: { groups: NavGroup[]; brand: ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen, setIsHovered, closeMobileSidebar } = useSidebar();
  const { can } = usePermissions();
  const pathname = usePathname();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const open = isExpanded || isHovered || isMobileOpen;

  // Đóng drawer mobile khi chuyển trang.
  useEffect(() => {
    closeMobileSidebar();
  }, [pathname, closeMobileSidebar]);

  const visibleGroups = groups
    .map((g) => ({
      ...g,
      items: g.items
        .map((item) => ({ ...item, children: item.children?.filter((c) => !c.permission || can(c.permission)) }))
        .filter((item) => {
          if (item.children) return item.children.length > 0;
          return !item.permission || can(item.permission);
        }),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <aside
      aria-label="Điều hướng chính"
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "fixed top-0 left-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-white px-5 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900",
        open ? "w-[290px]" : "w-[90px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      <div className={cn("flex h-16 items-center", open ? "justify-start" : "lg:justify-center")}>{brand}</div>
      <nav className="no-scrollbar flex-1 overflow-y-auto pb-6">
        {visibleGroups.map((group) => (
          <div key={group.title} className="mb-5">
            <h2 className={cn("mb-3 flex text-xs leading-5 text-gray-400 uppercase", open ? "justify-start" : "lg:justify-center")}>
              {open ? group.title : "···"}
            </h2>
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => {
                const key = `${group.title}:${item.label}`;
                const childActive = item.children?.some((c) => isActivePath(pathname, c.href)) ?? false;
                const active = item.href ? isActivePath(pathname, item.href, item.exact) : childActive;
                const expanded = openKey === key || (openKey === null && childActive);
                const content = (
                  <>
                    <span className={cn("menu-item-icon-size", active ? "menu-item-icon-active" : "menu-item-icon-inactive")}>
                      {item.icon}
                    </span>
                    {open && <span className="truncate">{item.label}</span>}
                  </>
                );
                return (
                  <li key={key}>
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={expanded}
                          onClick={() => setOpenKey(expanded ? "" : key)}
                          className={cn("menu-item group", active ? "menu-item-active" : "menu-item-inactive", !open && "lg:justify-center")}
                        >
                          {content}
                          {open && (
                            <ChevronDown className={cn("ml-auto size-4 transition-transform", expanded && "rotate-180")} />
                          )}
                        </button>
                        {open && expanded && (
                          <ul className="mt-1 ml-9 space-y-1">
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  className={cn(
                                    "menu-dropdown-item",
                                    isActivePath(pathname, c.href)
                                      ? "menu-dropdown-item-active"
                                      : "menu-dropdown-item-inactive",
                                  )}
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      item.href && (
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          title={open ? undefined : item.label}
                          className={cn("menu-item group", active ? "menu-item-active" : "menu-item-inactive", !open && "lg:justify-center")}
                        >
                          {content}
                        </Link>
                      )
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function Header({ brand, right }: { brand: ReactNode; right?: ReactNode }) {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 lg:px-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Bật/tắt thanh điều hướng"
          onClick={() => (window.innerWidth >= 1024 ? toggleSidebar() : toggleMobileSidebar())}
          className="flex size-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400"
        >
          {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <div className="lg:hidden">{brand}</div>
      </div>
      <div className="flex items-center gap-3">{right}</div>
    </header>
  );
}

function ShellBody({
  nav,
  brand,
  headerRight,
  children,
}: {
  nav: NavGroup[];
  brand: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen, closeMobileSidebar } = useSidebar();
  return (
    <div className="min-h-screen">
      <Sidebar groups={nav} brand={brand} />
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden" onClick={closeMobileSidebar} aria-hidden />
      )}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]",
        )}
      >
        <Header brand={brand} right={headerRight} />
        <main className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

/** Khung quản trị: sidebar (lọc theo quyền) + header + vùng nội dung. Không biết gì về feature. */
export function AdminShell(props: {
  nav: NavGroup[];
  brand: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <ShellBody {...props} />
    </SidebarProvider>
  );
}
