'use client'
import { ArticleGridSection } from '@/components/shared/article'
import Breadcrumb from '@/components/shared/Breadcrumb/breadcrumb'
import ListGridControl from '@/components/shared/Control/list-grid-control'
import { Article } from '@/data/daihoc'
import React, { useState } from 'react'
const breadcrumbItems = [
    {
        name: 'Trang chủ',
        href: '/', // Đường dẫn đến trang chủ
    },
    {
        name: 'DU HỌC, ĐI LÀM & ĐỊNH CƯ',
        href: '/du-hoc-di-lam-dinh-cu', // Đường dẫn của trang hiện tại (mục cuối cùng)
    },
]
type ViewMode = 'grid' | 'list'
interface StudyWorkListProps {
    data?: Article[]
}
const StudyWorkList = ({
    data
}: StudyWorkListProps) => {
   
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <Breadcrumb
                items={breadcrumbItems}
                className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
            />
             <ArticleGridSection data = {data}/>
        </div>
    )
}

export default StudyWorkList
