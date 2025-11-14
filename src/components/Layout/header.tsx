'use client'
import Image from 'next/image'
import {
  Phone,
  Search,

} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import Link from 'next/link'

import { CategoryItem } from '@/types/category'

import MenuMobileList from './menu-mobile-list'
import OnSubMenu from './submenu/sub-menu'

interface HeaderProps {
  menuItems: CategoryItem[]
}
const Header = ({
  menuItems
}: HeaderProps) => {
  
  const [openMenu, setOpenMenu] = useState(false)
  const menuRef = useRef<HTMLUListElement>(null);
  const isMobile = useIsMobile();

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

  if (!menuItems || menuItems.length === 0) return null
  return (
    <>
      <header className={` header ${isMobile ? "header--sticky " : "no--sticky"} `}>
        {/* Top Header */}
        <div className="header__container">
          <div className="header__inner">
            {/* logo */}
            <Link href="/" className="block overflow-hidden rounded-full w-48 h-28">
              <Image
                src="/images/logo/log-2.jpg"
                alt="logo"
                width={80}
                height={80}
                className="object-cover w-full h-full"
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
                className="search-input"
                type="text"
                placeholder="Tìm kiếm khóa học..."
              />
            </div>

          
                {/* Mobile Menu Button */}
                <button
                  className="md:hidden flex flex-col justify-center items-center text-primary space-y-1.5 z-50"
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
      <div id="nav-menu" className="nav-menu">
        <nav className="nav-menu__wrapper">
          <ul ref={menuRef} className="nav-menu__list">
            {menuItems.map((item, idx) => (
              <li key={idx} className="nav-menu__item group">
                <a href={item.url} className="nav-menu__link link-underline ">
                  <span className="nav-menu__text">{item.name}</span>
                  {item.icon && item.children && (
                    <span className="nav-menu__icon group-hover:rotate-180">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={16}
                        height={16}
                      />
                    </span>
                  )}
                </a>

                {item.children && (
                  <OnSubMenu
                    items={item.children}
                    variant="desktop"
                    className="on-submenu card-box"
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

    </>
  )
}
export default Header
