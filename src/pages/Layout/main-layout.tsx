import Footer from '@/components/Layout/footer';
import Header from '@/components/Layout/header';
import React from 'react'
interface MainLayoutProps {
    children: React.ReactNode
}
const MainLayout = ({children}: MainLayoutProps) => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Header/>
        <main className='flex-1'>
            {children}
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout;