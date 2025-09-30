import React from "react";
import clsx from "clsx"; // thư viện tiện cho merge className

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
        "absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg   transition-all duration-200 ease-out",
        className
      )}
    >
      {items.map((item, idx) => (
        <li key={idx}>
          <a
            href={item.href}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-150"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DropdownMenu;
