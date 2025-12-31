import { CategoryItem } from '@/types/category'
import Image from 'next/image'
import React, { useState } from 'react'

import clsx from 'clsx'
import OnSubMenu from './submenu/sub-menu'
import SubMenuMobile from './submenu/sub-menu-mobile'
import { useLockScroll } from '@/hooks/use-locked-scroll'
import { ChevronRight } from 'lucide-react'
import { fixUrl } from "@/lib/helper";

interface MenuMobileListProps {
  data: CategoryItem[]
  IsOpenMenu: boolean;
  ClassName?: string;
}

const MenuMobileList = ({
  data,
  IsOpenMenu = false,
  ClassName = ''
}: MenuMobileListProps) => {

  // index của mục cấp 1 đang mở (null = đóng hết)
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useLockScroll(IsOpenMenu);

 
  return (
    <div className={clsx("mobile-menu", IsOpenMenu && "mobile-menu--open", ClassName)}>
      <nav className="mobile-menu__wrapper" aria-label="Mobile main menu">
        {/* <div className='mobile-menu__header'></div> */}
        <ul className="mobile-menu__list">
          {data.map((item, idx) => {
            const hasChildren = !!(item.children && item.children.length > 0)
            const isOpen = openIdx === idx

            return (
              <li
                key={idx}
                className={clsx('mobile-menu__item')}
              >
                <div className="mobile-menu__row">


                  {hasChildren ? (
                   <>
                    <button
                      
                      type="button"
                      className="mobile-menu__toggle"
              
                    >
                      <span className="mobile-menu__text">{item.name}</span>
                      <span className={clsx("mobile-menu__caret", isOpen && "is-rotated")} aria-hidden>
                        {/* <Image
                          src={item.icon || ""}
                          alt=""
                          width={16}
                          height={16}
                          aria-hidden="true"
                        /> */}
                        <ChevronRight size={16} className="mobile-menu__caret" />
                      </span>
                    </button>
                   </>
                    
                  ) : (
                    <a
                      href={fixUrl(item.url ?? "/")}
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
                    level={1}
                    variant="mobile"
                    idPrefix={`submenu-l1-${idx}`}
                    isOpen={isOpen }
                    // className={clsx("submenu-mobile", isOpen ? "on-submenu-mobile" : "off-submenu-mobile")}
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
