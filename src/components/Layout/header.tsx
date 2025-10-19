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
      name: "KIẾN THỨC",
      href: "#",
      icon: <ChevronDown size={16} />,
      children: [
        { id: 41, name: "Reading", href: "/tai-lieu/reading" },
        { id: 42, name: "Writing", href: "/tai-lieu/writing" },
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
    <header className="bg-[#F6E10E] w-full overflow-hidden">
      {/* Top Header */}
      <div className="flex justify-between items-center max-w-7xl mx-auto h-[80px] md:h-[130px] px-4 gap-2 ">
        {/* logo */}
        <div className='w-[180px] md:w-[280px] :h-[220px] flex-shrink-0 overflow-hidden'>
          <Image
            src="/images/logo/log-2.jpg"
            alt="logo"
            width={220}
            height={240}
            className='object-contain w-full h-full'
          />
        </div>

        {/* hotline (hidden on mobile) */}
        <div className="hidden lg:flex items-start gap-3 flex-1 justify-center">
          {dataHotline.map((item, idx) => (
            <div key={idx}
              className="flex items-center max-w-xs h-12 px-4 py-2 text-white rounded-full border border-gray-300 bg-black transition-smooth cursor-pointer">
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
        {/* mobile menu button */}
        <button
          className="md:hidden fixed top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

     
      {/* mobile menu dropdown */}
      <div className={`md:hidden fixed inset-0 top-0 right-0 z-40 
          w-80 max-w-[85vw] h-full bg-white shadow border-t border-gray-200
           transform transition-transform duration-300 ease-out py-16 px-2 
           overflow-y-auto custom-scrollbar
           ${openMenu ? "translate-y-0" : " -translate-y-full"}
           `}>


        <div className="h-full flex flex-col  gap-2  ">
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
                <a href={item.href} className="text-gray-900 text-sm lg:text-ld font-bold hover:text-brandBlue-500 nav-link-underline">
                  {item.name}
                </a>
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
        <nav className="container mx-auto px-4">
          <ul
            ref={menuRef}
            className="flex flex-row items-center justify-center gap-6 py-4 text-sm font-semibold text-gray-700"
          >
            {NavLink.map((item: any, idx) => (
              <li
                onClick={() => handleOpenSubMenu(item.id)}
                key={idx}
                className='relative flex items-center'>
                <a
                  href={item.href}
                  className='text-gray-900 text-sm lg:text-ld font-bold inline-flex items-center gap-1 hover:text-brandBlue-500 nav-link-underline group'
                >
                  <span>{item.name}</span>
                  <span className="transition-transform duration-100  group-hover:rotate-180">
                    {item.icon}
                  </span>

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
