'use client'
import Image from 'next/image'
import {
  Phone,
  Search,

} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import DropdownMenu from '../ui/DropdownMenu'
import MobileMenuList from './mobile-menu-list'
import { useIsMobile } from '@/hooks/use-mobile'
import Link from 'next/link'
import { NavMenuData } from '@/data/nav-menu-data'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<Boolean>(false)
  const menuRef = useRef<HTMLUListElement>(null);
  const isMobile = useIsMobile();

  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (
  //       menuRef.current &&
  //       !menuRef.current.contains(event.target as Node)
  //     ) {
  //       setOpenSubMenu(null)
  //     }
  //   }
  //   // listening a event to action something
  //   document.addEventListener('mousedown', handleClickOutside)

  //   // action the unmout it
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [])



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

  return (
    <>
      <header className={`${isMobile ? "sticky inset-0 top-0 z-50 bg-[#F6E10E] " : "relative bg-[#F6E10E] "} w-full overflow-hidden`}>
        {/* Top Header */}
        <div className="container mx-auto p-4">
          <div className="flex h-20 md:h-32 justify-between items-center px-4 gap-2 md:gap-4">
            {/* logo */}
            <div className="relative flex-shrink-0 overflow-hidden ">
              <Link href="/" className="w-36 md:w-64 ">
                <Image
                  src="/images/logo/log-2.jpg"
                  alt="logo"
                  width={220}
                  height={240}
                  priority
                  className="object-contain w-full h-full"
                />
              </Link>
            </div>

            <div className="h-auto flex-grow flex items-center justify-between">
              {/* hotline (hidden on mobile) */}
              <div className="hidden lg:flex items-start gap-3 flex-1 justify-center">
                {dataHotline.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center max-w-xs h-12 px-4 py-2 text-white rounded-full border border-gray-300 bg-black transition-smooth cursor-pointer"
                  >
                    {item.icon}
                    <span className="text-sm font-medium text-center pl-2 whitespace-nowrap">
                      Hotline: {item.phone}
                    </span>
                  </div>
                ))}
              </div>

              {/* search desktop */}
              <div className="hidden md:block relative flex-shrink-0 w-64 lg:w-72">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  className="text-sm w-full rounded-full border border-input bg-background pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  type="text"
                  placeholder="Tìm kiếm khóa học..."
                />
              </div>

            </div>

            {isMobile && (
              <>
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
                <MobileMenuList data={NavMenuData} IsOpenMenu={openMenu} />
              </>
            )}

          </div>
        </div>

      </header>

      {/* bottom nav desktop */}
      <div className="hidden md:flex items-center justify-center w-full bg-white shadow border-b border-gray-200 sticky top-0.5 z-50">
        <nav className="container mx-auto px-4">
          <ul
            ref={menuRef}
            className="flex items-center justify-center gap-6 p-0 text-sm font-semibold text-gray-700"
          >
            {NavMenuData.map((item, idx) => (
              <li
                key={idx}
                className="relative flex items-center cursor-pointer group "
              >
                <a
                  href=""
                  className="text-gray-900 text-sm font-semibold flex items-center  gap-1 hover:text-brandBlue-500 nav-link-underline group py-4 px-2"
                >
                  <span>{item.name}</span>
                  {item.icon && item.children && (
                    <span className="w-3 h-3 flex items-center justify-center transition-transform duration-100  group-hover:rotate-180">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={16}
                        height={16}
                      />
                    </span>
                  )}
                </a>
               
                  <DropdownMenu
                    items={
                      item.children?.map(child => ({
                        label: child.name,
                        href: child.url ?? "#",
                      })) ?? []
                    }
                    className="hidden group-hover:block w-56"
                  />
               
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
export default Header
