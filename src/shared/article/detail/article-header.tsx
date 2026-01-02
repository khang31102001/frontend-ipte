import NameAvatar from "@/shared/name-avatar";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import React from 'react'
interface ArticleHeaderProps {
    title: string | null;
    summary: string | null;
    authorAvatarUrl?: string | null;
    authorName?: string;
    createdAt?: string | null;
    publishedAt?: string | null;
    updatedAt?: string | null;
    className?: string | null;
}
const ArticleHeader = ({
    title,
    summary,
    authorName,
    authorAvatarUrl,
    createdAt,
    publishedAt,
    updatedAt,
    className
}: ArticleHeaderProps) => {
    if (!title && !summary) return null;

    const primaryDateLabel = publishedAt ? "Xuất bản" : updatedAt ? "Cập nhật" : null;
    const primaryDateValue = publishedAt ?? updatedAt ?? createdAt ?? null;

    return (
        <header className={`w-full px-4 sm:px-6 lg:px-8 mt-3 ${className}`}>
            {!!title && (
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    {title}
                </h1>
            )}

            {!!summary && <p className="mt-3 text-lg text-gray-600 max-w-3xl">{summary}</p>}
            {/* <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
                <Image
                    src="https://i.pravatar.cc/64?img=5"
                    alt="Giảng viên"
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover"
                />
                <span>Giảng viên đội PTE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <time dateTime={new Date().toISOString()}>Cập nhật hôm nay</time>
            </div> */}
            {/* <NameAvatar name={news.author} src={authorAvatarUrl} size={36} /> */}
            {(authorName || primaryDateValue) && (
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    {authorAvatarUrl ? (
                        <Image
                            src={authorAvatarUrl}
                            alt={authorName ?? "Tác giả"}
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                    ) : (
                        <NameAvatar name={authorName} size={36} />
                    )}
                    {authorName && primaryDateValue && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    )}

                    {primaryDateValue && primaryDateLabel && (
                        <time dateTime={primaryDateValue}>
                            {primaryDateLabel}: {formatDate(primaryDateValue)}
                        </time>
                    )}

                    {/* Optional: show updated if published exists */}
                    {publishedAt && updatedAt && publishedAt !== updatedAt && (
                        <>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            <time dateTime={updatedAt}>Cập nhật: {formatDate(updatedAt)}</time>
                        </>
                    )}
                </div>
            )}
        </header>
    )
}

export default ArticleHeader
