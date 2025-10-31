'use client';

import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { CategoryItem } from '@/types/category';

type Variant = 'auto' | 'desktop' | 'mobile';

interface SubMenuMobileProps {
  items?: CategoryItem[];
  className?: string;
  variant?: Variant;
  level?: number;            // cấp menu (để sinh id & style indent)
  idPrefix?: string;         // prefix id cho aria-controls
}

const SubMenuMobile: React.FC<SubMenuMobileProps> = ({
  items,
  className,
  variant = 'mobile',
  level = 1,
  idPrefix = 'submenu-l',
}) => {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  const uid = React.useId(); // đảm bảo id duy nhất trong cây

  if (!items || items.length === 0) return null;

  const handleToggle = (idx: number) => setOpenIdx((cur) => (cur === idx ? null : idx));

  return (
    <nav
      className={clsx(className)}
      aria-label={level === 1 ? 'Mobile submenu' : undefined}
    >
      <ul className={clsx('submenu-mobile__list')}>
        {items.map((item, idx) => {
          const hasChildren = !!(item.children && item.children.length > 0);
          const isOpen = openIdx === idx;
          const panelId = `${idPrefix}${level}-${idx}-${uid}`;

          return (
            <li key={item.id ?? `${level}-${idx}`} className="submenu-mobile__item">
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    className="submenu-mobile__toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggle(idx)}
                  >
                    <span className="submenu-mobile__text">{item.name}</span>
                    <span className="submenu-mobile__icon" aria-hidden="true">
                      {/* <Image
                        src={item.icon ?? '/icons/caret.svg'}
                        alt=""
                        width={16}
                        height={16}
                      /> */}
                      ▶
                    </span>
                  </button>

                  <SubMenuMobile
                    items={item.children!}
                    level={level + 1}
                    idPrefix={idPrefix}
                    className={clsx(
                      "submenu-mobile",
                      isOpen ? ' on-submenu-mobile' : 'off-submenu-mobile'
                    )}
                  />
                </>
              ) : (
                <a href={item.url} className="submenu-mobile__link">
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SubMenuMobile;
