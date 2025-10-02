"use client"
import Image from 'next/image'
import { ChevronDown, Home, Phone, Search, Menu, X, ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import DropdownMenu from '../ui/DropdownMenu';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenSubMenu(null);
      }
    }
    // listening a event to action something
    document.addEventListener("mousedown", handleClickOutside);

    // action the unmout it
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, []);

  const NavLink = [
    {
      id: 1,
      name: "PTE iPASS",
      href: "#",
      icon: <ChevronDown size={16} />,
      children: [
        { id: 11, name: "Giới thiệu", href: "/pte-ipass/intro" },
        { id: 12, name: "Lịch học", href: "/pte-ipass/schedule" },
        { id: 13, name: "Đăng ký", href: "/pte-ipass/register" },
      ],
    },
    {
      id: 2,
      name: "HV REVIEW",
      href: "/review",
    },
    {
      id: 3,
      name: "KHÓA HỌC",
      href: "#",
      icon: <ChevronDown size={16} />,
      children: [
        { id: 31, name: "PTE Cơ bản", href: "/khoa-hoc/pte-co-ban" },
        { id: 32, name: "PTE Nâng cao", href: "/khoa-hoc/pte-nang-cao" },
        { id: 33, name: "PTE iPASS", href: "/khoa-hoc/pte-ipass" },
      ],
    },
    {
      id: 4,
      name: "TÀI LIỆU",
      href: "#",
      icon: <ChevronDown size={16} />,
      children: [
        { id: 41, name: "Ebook", href: "/tai-lieu/ebook" },
        { id: 42, name: "Sample test", href: "/tai-lieu/sample" },
      ],
    },
    {
      id: 5,
      name: "CHÍNH SÁCH",
      href: "/chinh-sach",
    },
    {
      id: 6,
      name: "DU HỌC, ĐI LÀM & ĐỊNH CƯ",
      href: "#",
      icon: <ChevronDown size={16} />,
      children: [
        { id: 61, name: "Du học Úc", href: "/du-hoc/uc" },
        { id: 62, name: "Du học Canada", href: "/du-hoc/canada" },
        { id: 63, name: "Định cư", href: "/dinh-cu" },
      ],
    },
    {
      id: 7,
      name: "PTE ĐẠI HỌC",
      href: "#",
      icon: <ChevronDown size={16} />,
      children: [
        { id: 71, name: "Trường đối tác", href: "/pte-dai-hoc/truong-doi-tac" },
        { id: 72, name: "Thông tin tuyển sinh", href: "/pte-dai-hoc/tuyen-sinh" },
      ],
    },
    {
      id: 8,
      name: "LIÊN HỆ",
      href: "/lien-he",
    },
  ];


  const dataHotline = [
    { icon: <Phone size={20} className='text-white' />, phone: '1900 636 648' },
    { icon: <Phone size={20} className='text-white' />, phone: '1900 636 648' },
  ];
  const handleOpenSubMenu = (id: number) => {
    const isOpen = openSubMenu === id ? null : id;
    setOpenSubMenu(isOpen);
  }
  return (
    <>
    <header className="bg-[#F6E10E] w-full">
      {/* Top Header */}
      <div className="flex justify-between items-center max-w-7xl mx-auto h-[80px] md:h-[130px] px-4 gap-2 ">
        {/* logo */}
        <div className='w-[180px] md:w-[280px] :h-[220px] overflow-hidden'>
          <Image
            src="/images/logo/log-2.jpg"
            alt="logo"
            width={220}
            height={240}
            className='object-contain w-full h-full'
          />
        </div>

        {/* hotline (hidden on mobile) */}
        <div className="hidden md:flex items-start gap-4 w-[684px] h-[48px]">
          {dataHotline.map((item, idx) => (
            <div key={idx}
              className="flex items-center max-w-[284px] h-[48px] px-4 py-2 
                         text-white rounded-full border bg-[#212636]">
              {item.icon}
              <span className="text-sm font-medium text-center pl-2">
                Hotline: {item.phone}
              </span>
            </div>
          ))}
        </div>

        {/* search desktop */}
        <div className="hidden md:block relative max-w-[284px] h-[48px]">
          <Search size={20} className='absolute left-3 top-1/2 -translate-y-1/2 opacity-60' />
          <input
            className='text-sm w-full h-full rounded-full border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            type="text"
            placeholder="Tìm kiếm khóa học..."
          />
        </div>

        {/* mobile menu button */}
        <button
          className="md:hidden fixed top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

     
      {/* mobile menu dropdown */}
      <div className={`md:hidden fixed inset-0 z-40 
          w-full h-full bg-white shadow border-t border-gray-200
           transform transition-transform duration-300 ease-out py-16 px-2 
           ${openMenu ? "translate-y-0" : " -translate-y-full"}
           `}>


        <div className="h-full flex flex-col justify-between gap-2  ">
          {/* search bar in mobile */}
          <div className="p-4 flex items-center gap-2">
            <Search size={20} className="opacity-60" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="flex-1 border-b focus:outline-none text-sm ml-2 py-1"
            />
          </div>
          <ul className="flex flex-col gap-3 p-4 text-sm font-medium text-gray-700">
            {NavLink.map((item, idx) => (
              <li key={idx}>
                <a href={item.href} className="block py-2">{item.name}</a>
              </li>
            ))}
          </ul>
          {/* hotline in mobile */}
          <div className="p-4 flex flex-col gap-2">
            {dataHotline.map((item, idx) => (
              <div key={idx} className="flex items-center px-3 py-2 bg-[#212636] rounded-full text-white">
                {item.icon}
                <span className="pl-2 text-sm">Hotline: {item.phone}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </header>

     {/* bottom nav desktop */}
      <div className='hidden md:block w-full bg-white shadow border-b border-gray-200 sticky top-0.5 z-50'>
        <nav className="container mx-auto">
          <ul
            ref={menuRef}
            className="flex items-center justify-center gap-6 py-4 text-sm font-semibold text-gray-700"
          >
            {NavLink.map((item: any, idx) => (
              <li
                onClick={() => handleOpenSubMenu(item.id)}
                key={idx}
                className='relative'>
                <a
                  href={item.href}
                  className='text-gray-900 inline-flex items-center gap-1 '
                >
                  <span>{item.name}</span>
                  {item.icon}

                </a>
                {openSubMenu === item.id && (
                  <DropdownMenu items={item.children} className='w-56' />
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
