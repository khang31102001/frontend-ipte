import React from 'react'
interface ArticleHeaderProps {
    title?: string | null;
    summary?: string | null;
    className?: string | null;
}
const ArticleHeader = ({
    title,
    summary,
    className
}: ArticleHeaderProps) => {
    if(!title &&  !summary) return null;;
    
    return (
        <header className="w-full px-4 sm:px-6 lg:px-8 mt-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">{title}</h1>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl">{summary}</p>
            <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
                <img src="https://i.pravatar.cc/64?img=5" alt="Giảng viên" className="w-9 h-9 rounded-full object-cover" />
                <span>Giảng viên đội PTE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <time dateTime={new Date().toISOString()}>Cập nhật hôm nay</time>
            </div>
        </header>
    )
}

export default ArticleHeader