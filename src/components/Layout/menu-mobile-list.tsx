import { CategoryItem } from '@/types/category'
import Image from 'next/image'
import React, { useState } from 'react'

import clsx from 'clsx'
import OnSubMenu from './submenu/sub-menu'

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
    <div className={clsx('mobile-menu', IsOpenMenu && 'mobile-menu--open', ClassName)}>
      <nav className="mobile-menu__inner">
        <ul className="mobile-menu__list">
          {data.map((item, idx) => {
            const hasChildren = !!(item.children && item.children.length > 0)
            const isOpen = openIdx === idx

            return (
              <li
                key={item.id ?? idx}
                className={clsx('mobile-menu__item', { 'is-open': isOpen })}
              >
                <div className="mobile-menu__row">
                  <a
                    href={item.url}
                    onClick={handleToggle(idx, hasChildren)}
                    className="mobile-menu__link no-scrollbar"
                    aria-expanded={isOpen}
                    aria-controls={`submenu-l1-${idx}`}
                  >
                    {item.name}
                  </a>

                  {item.icon && hasChildren && (
                    <button
                      onClick={handleToggle(idx, hasChildren)}
                      type="button"
                      className="submenu-toggle ml-4"
                      aria-expanded={isOpen}
                      aria-controls={`submenu-l1-${idx}`}
                      aria-label={isOpen ? 'Collapse submenu' : 'Expand submenu'}
                    >
                      <span className="caret inline-flex">
                        <Image
                          src={item.icon}
                          alt=""
                          width={16}
                          height={16}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  )}
                </div>

                {hasChildren && (
                  <OnSubMenu
                    items={item.children}
                    variant="mobile"
                    className={clsx('sub-menu-mobile', { 'is-open': isOpen })}
                    // nếu muốn cấp 2 cũng chỉ mở 1 mục, để OnSubMenu tự quản lý state openIdx riêng (như mình hướng dẫn trước đó)
                  />
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default MenuMobileList
