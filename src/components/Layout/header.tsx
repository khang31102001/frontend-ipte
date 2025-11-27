'use client'
import Image from 'next/image'
import {
  ChevronDown,
  Phone,
  Search,

} from 'lucide-react'
import {  useRef, useState } from 'react'
import Link from 'next/link'
import { CategoryItem } from '@/types/category'
import MenuMobileList from './menu-mobile-list'
import OnSubMenu from './submenu/sub-menu'

import { fixUrl } from '@/utils/helpers'
import {
  usePathname,
  useRouter,
} from 'next/navigation'

interface HeaderProps {
  menuItems: CategoryItem[]
}
const Header = ({
  menuItems
}: HeaderProps) => {

  const [openMenu, setOpenMenu] = useState(false)
  const menuRef = useRef<HTMLUListElement>(null);
  // const isMobile = useIsMobile();
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  // const menuFiltered = menuItems.filter((item)=> !item.is_disable);

  const menuFiltered = (menuItems: CategoryItem[]): CategoryItem[] => {
    if (!Array.isArray(menuItems) || menuItems.length === 0) return [];

    const parentMenu = menuItems.filter(item => !item.is_disable);

    return parentMenu.map((parent) => {
      if (!parent.children || parent.children.length === 0) {
        return parent;
      }

      const filteredChildren = menuFiltered(parent.children);

      return {
        ...parent,
        children: filteredChildren,
      };
    });
  };

  const menuData = menuItems ? menuFiltered(menuItems) : [];

  const dataHotline = [
    {
      icon: <Phone size={20} className="text-white" />,
      phone: '1900 636 648',
    },
    {
      icon: <Phone size={20} className="text-white" />,
      phone: '1900 636 648',
    },
  ]

  const handleSearchQuery = (value?: string | null) => {
    const params = new URLSearchParams();

    if (value?.trim()) {
      params.set('search', value.trim())
      console.log("tạo params search", params.toString());
    } else {
      params.delete('search');
    }
    const queryString = params.toString(); //search = value;

    //vd: http://localhost:3000/hoc-vien-review?search=value;
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(url, { scroll: false });

  }

  if (!menuData || menuData.length === 0) return null
  return (
    <>
      <header className="header">
        {/* Top Header */}
        <div className="header__container">
          <div className="header__inner">

            {/* logo */}
            <Link href="/" className="header__logo">
              <Image
                src="/images/logo/logo-header.png"
                alt="PTE iPASS"
                width={300}
                height={180}
                className="header__logo-img"
                priority
              />
            </Link>

            <div className="header__hotline">
              {dataHotline.map((item, idx) => (
                <div key={idx} className="hotline-pill">
                  {item.icon}
                  <span className="hotline-text">Hotline: {item.phone}</span>
                </div>
              ))}
            </div>
            <div className="header__search">
              <Search size={18} className="search-icon" />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchQuery(searchText)
                  }
                }}
                className="search-input"
                type="text"
                placeholder="Tìm kiếm khóa học..."
              />
            </div>


            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col justify-center items-center text-primary max-w-52 space-y-1.5 z-50"
              onClick={() => setOpenMenu(!openMenu)}
              aria-label="open menu"
            >
              <span
                className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${openMenu ? 'rotate-45 translate-y-2' : ''}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${openMenu ? 'opacity-0' : 'opacity-100'}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${openMenu ? '-rotate-45 -translate-y-2' : ''}`}
              ></span>
            </button>

            {/* mobile menu */}
            <MenuMobileList data={menuItems} IsOpenMenu={openMenu} />


          </div>
        </div>

      </header>

      {/* bottom nav desktop */}
      <div id="nav-menu" className="nav-menu is-sticky">
        <nav className="nav-menu__wrapper">
          <ul ref={menuRef} className="nav-menu__list">
            {menuData.map((item, idx) => {
              const fixedUrl = fixUrl(item.url ?? "/");
              return (
                <li key={idx} className="nav-menu__item group">
                  <a href={fixedUrl} className="nav-menu__link link-underline ">
                    <span className="nav-menu__text">{item.name}</span>
                    {item.children?.length !== 0 && (
                      item.icon ? (
                        <span className="nav-menu__icon group-hover:rotate-180">
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={16}
                            height={16}
                          />
                        </span>
                      ) : (
                        <ChevronDown size={16} className="nav-menu__icon group-hover:rotate-180" />
                      )
                    )}
                  </a>

                  {item.children && (
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
      </div>

    </>
  )
}
export default Header
