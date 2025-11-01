import React from "react";
import clsx from "clsx";

type Variant = "mobile";

interface SubMenuMobileProps {
  items?: any[];
  className?: string;
  variant?: Variant;
  level?: number;
  idPrefix?: string;
  isOpen?: boolean; // nhận từ cấp trên để mở/đóng panel hiện tại
}

const SubMenuMobile: React.FC<SubMenuMobileProps> = ({
  items,
  className,
  variant = "mobile",
  level = 1,
  idPrefix = "submenu",
  isOpen = false,
}) => {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  const uid = React.useId();

  if (!items || items.length === 0) return null;
  const toggle = (idx: number) => setOpenIdx((cur) => (cur === idx ? null : idx));

  return (
    <div
      className={clsx("submenu-mobile", className)}
      role="region"
      id={idPrefix}
      aria-label={level === 1 ? "Mobile submenu" : undefined}
    >
      <ul
        className={clsx(
          "submenu-mobile__panel",
          isOpen ? "is-open" : "is-closed",
          className
        )}
      >
        {items.map((item, idx) => {
          const hasChildren = !!(item.children && item.children.length);
          const childOpen = openIdx === idx;
          const panelId = `${idPrefix}-${level + 1}-${idx}-${uid}`;

          return (
            <li key={item.id ?? `${level}-${idx}`}
              className={clsx(
                "submenu-mobile__item",
                hasChildren && "submenu-mobile__item--has-children"
              )}
            >
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    className="submenu-mobile__toggle"
                    aria-expanded={childOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(idx)}
                  >
                    <span className="submenu-mobile__text">{item.name}</span>
                    <span
                      className={clsx("submenu-mobile__icon", childOpen && "is-rotated")}
                      aria-hidden
                    >
                      ▶
                    </span>
                  </button>


                </>
              ) : (
                <a href={item.url} className="submenu-mobile__link">
                  {item.name}
                </a>
              )}
              {hasChildren && (
                <SubMenuMobile
                  items={item.children}
                  level={level + 1}
                  idPrefix={panelId}
                  className="submenu-mobile__child"
                  isOpen={childOpen}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubMenuMobile;
