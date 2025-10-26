import React from "react";
import clsx from "clsx";

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  className?: string;
}

const DropdownMenu = ({ items, className }: DropdownMenuProps) => {
  return (
    <ul
      className={clsx(
        "absolute top-8 left-0 mt-2  bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden",
        "transform origin-top transition-all duration-200 ease-out ",
        className
      )}
    >
      {items.map((item, idx) => (
        <li key={idx}
        className="py-4 px-2 group" 
        >
          <a
            href={item.href}
            className="block px-4 py-2.5 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 
                       transition-colors duration-150 focus:outline-none focus:bg-indigo-100"
          >
            {item.label}
          </a>
          <DropdownMenu
            items={items}
            className="hidden group-hover:block w-52"
          />
        </li>
      ))}
    </ul>
  );
};

const SubMenu = ({
  items,
  className

}: DropdownMenuProps) => {
  return (
    <ul
      className={clsx(
        "absolute top-8 left-0 mt-2  bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden",
        "transform origin-top transition-all duration-200 ease-out",
        className
      )}
    >
      {items.map((item, idx) => (
        <li key={idx} >
          <a
            href={item.href}
            className="block px-4 py-2.5 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 
                       transition-colors duration-150 focus:outline-none focus:bg-indigo-100"
          >
            {item.label}
          </a>

        </li>
      ))}
    </ul>
  );
}

export default DropdownMenu;
