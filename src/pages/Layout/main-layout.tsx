import Footer from '@/components/Layout/footer';
import Header from '@/components/Layout/header';
import { CategoryItem } from '@/types/category';
import React from 'react'
interface MainLayoutProps {
    children: React.ReactNode
    menu: CategoryItem[] 

}
const MainLayout = ({
  children,
  menu 
}: MainLayoutProps) => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Header menuItems={menu }/>
        <main className='flex-1'>
            {children}
        </main>
        
        <Footer/>
    </div>
  )
}

export default MainLayout;