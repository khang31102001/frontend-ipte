import Footer from '@/components/Layout/footer';
import Header from '@/components/Layout/header';
import { CategoryItem } from '@/types/category';
import React from 'react'
interface MainLayoutProps {
    children: React.ReactNode;
    headerlogo?: string;
    headerMenu?: CategoryItem[];
    footerMenu?: CategoryItem[];

}
const MainLayout = ({
  children,
  headerlogo,
  headerMenu 
}: MainLayoutProps) => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Header 
          logo={headerlogo} 
          menuItems={headerMenu}
        />
        <main className='flex-1 w-full'>
            {children}
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout;