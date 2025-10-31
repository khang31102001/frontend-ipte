import { CategoryItem } from '@/types/category'
import Image from 'next/image'
import React, { useState } from 'react'

import clsx from 'clsx'
import OnSubMenu from './submenu/sub-menu'
import SubMenuMobile from './submenu/sub-menu-mobile'

interface MenuMobileListProps {
  data: CategoryItem[]
  IsOpenMenu: boolean
  ClassName?: string
}

const MenuMobileList = ({
  data,
  IsOpenMenu = false,
  ClassName = ''
}: MenuMobileListProps) => {

  // index của mục cấp 1 đang mở (null = đóng hết)
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const handleToggle = (idx: number, hasChildren?: boolean) => (e: React.MouseEvent) => {
    if (!hasChildren) return // mục lá: cho đi link
    e.preventDefault()
    setOpenIdx(prev => (prev === idx ? null : idx))
  }

  return (
    <div className={clsx('mobile-menu', IsOpenMenu ? 'mobile-menu--open' : 'mobile-menu--close', ClassName)}>
      <nav className="mobile-menu__wrapper">
        {/* <div className='mobile-menu__header'></div> */}
        <ul className="mobile-menu__list">
          {data.map((item, idx) => {
            const hasChildren = !!(item.children && item.children.length > 0)
            const isOpen = openIdx === idx

            return (
              <li
                onClick={handleToggle(idx, hasChildren)}
                key={item.id ?? idx}
                className={clsx('mobile-menu__item', "")}
              >
                <div className="mobile-menu__row">


                  {hasChildren ? (
                   <>
                    <button
                      onClick={handleToggle(idx, hasChildren)}
                      type="button"
                      className="mobile-menu__toggle"
              
                    >
                      <span>{item.name}</span>
                      <span className="ml-4">
                        {/* <Image
                          src={item.icon || ""}
                          alt=""
                          width={16}
                          height={16}
                          aria-hidden="true"
                        /> */}
                        ▶
                      </span>
                    </button>
                   </>
                    
                  ) : (
                    <a
                      href={item.url}
                      onClick={handleToggle(idx, hasChildren)}
                      className="mobile-menu__link no-scrollbar"
                      aria-expanded={isOpen}
                      
                    >
                      {item.name}
                    </a>
                  )}
                </div>

                {hasChildren && (
                  <SubMenuMobile
                    items={item.children}
                    variant="mobile"
                    className={clsx("submenu-mobile", isOpen ? "on-submenu-mobile" : "off-submenu-mobile")}
                  // nếu muốn cấp 2 cũng chỉ mở 1 mục, để OnSubMenu tự quản lý state openIdx riêng (như mình hướng dẫn trước đó)
                  />
                )}
              </li>
            )
          })}
        </ul>
        {/* <div className='mobile-menu__footer'></div> */}
      </nav>
    </div>
  )
}

export default MenuMobileList
