"use client"
// import { icon } from '@fortawesome/fontawesome-svg-core'
import Image from 'next/image'
import { ChevronDown, Home, Phone, Search } from "lucide-react";
import DropdownMenu from '../ui/DropdownMenu';
import { useState } from 'react';

const Header = () => {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const NavLink = [
        { name: 'PTE iPASS', href: '#', icon: '' },
        { name: 'HV REVIEW', href: '#', icon: '' },
        { name: 'KHÓA HỌC', href: '#', icon: '' },
        { name: 'TÀI LIỆU', href: '#', icon: '' },
        { name: 'CHÍNH SÁCH', href: '#', icon: '' },
        { name: 'DU HỌC, ĐỊ LÀM & ĐỊNH CƯ', href: '#', icon: '' },
        { name: 'PTE ĐẠI HỌC', href: '#', icon: '' },
        { name: 'LIÊN HỆ', href: '#', icon: '' },
    ];

    const dataDropdown = [

        { label: 'PTE iPASS', href: '#' },
        { label: 'HV REVIEW', href: '#' },
        { label: 'KHÓA HỌC', href: '#' },
    ]
    const dataHotline = [
        { icon: <Phone size={28} className='text-white' />, phone: '1900 636 648' },
        { icon: <Phone size={28} className='text-white' />, phone: '1900 636 648' },
    ]
    return (
        <header className="bg-[#F6E10E] w-full ">
            {/* Top Header */}
            <div className="flex flex-row justify-between items-center max-w-[1440px] h-[130px] mx-auto px-4">
                {/* logo */}
                <div className='w-[280px] h-[120px] overflow-hidden'>
                    <Image
                        src="/images/logo/log-2.jpg"
                        alt="logo" width={220}
                        height={240}
                        className='object-cover w-full h-full'
                    />
                </div>

                {/* hotline infor */}
                <div className="flex items-start gap-4 w-[684px] h-[48px]">
                    {dataHotline.map((item, idx) => {
                        return (
                            <div key={idx} className="flex items-center  max-w-[284px] h-[48px] px-4 py-2 
                                text-white rounded-full border bg-[#212636]">
                                {/* <Image
                                   
                                    src="/images/icon/icon-call.png"
                                    alt="logo"
                                    width={28}
                                    height={28}
                                /> */}
                                {item.icon}
                                <span className=" text-sm font-medium text-center pl-4">Hotline:{item.phone}</span>
                            </div>
                        )
                    })}

                </div>
                {/* search */}
                <div className="relative max-w-[284px] h-[48px] sha">
                    <Search size={24} className='absolute left-3 top-1/2 -translate-y-1/2 opacity-60' />
                    <input
                        className='text-sm w-full h-full rounded-full border border-gray-300 pl-10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 '
                        type="text"
                        placeholder="Tìm kiếm khóa học..."
                    />
                </div>

            </div>
            {/* bottom Navigation */}
            <div className='w-full  bg-white shadow border-b border-gray-200 sticky top-0 z-50'>
                <nav className="max-w-7xl mx-auto ">
                    <ul className="flex items-center justify-center gap-6 py-4 text-sm font-semibold text-gray-700">
                        {NavLink.map((item, idx) => {
                            return (
                                <li


                                    key={idx}
                                    className='relative'
                                >
                                    <a href={item.href}>{item.name} </a>

                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    )
}
export default Header
