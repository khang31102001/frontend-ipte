import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import Link from 'next/link'

type SearchSuggestion = {
    id: string
    label: string
    subLabel?: string
    kind?: 'sparkles' | 'search'
    highlight?: { prefix?: string; emphasis?: string; suffix?: string }
}

type SearchProduct = {
    id: string | number
    title: string
    href: string
    price?: string
    oldPrice?: string
    discountText?: string
    imageUrl?: string
    meta?: string
}

export type SearchSuggestionItem = {
    id: string
    label: string
    subLabel?: string
    kind?: 'sparkles' | 'search'
    href: string
}

export type SearchPopupData = {
    corrected?: SearchSuggestion
    recentTitle?: string
    suggestions: SearchSuggestionItem[]
    products: SearchProduct[]
    total?: number
    viewAllHref?: string
}

export type SearchPopupProps = {
    query: string
    data?: SearchPopupData
    loading?: boolean
    disabled?: boolean

    open?: boolean
    onOpenChange?: (open: boolean) => void

    /** input anchor */
    children: React.ReactNode

    onPickSuggestion?: (text: string, suggestion: SearchSuggestion) => void
    onPickProduct?: (product: SearchProduct) => void
    onViewAll?: (href: string) => void

    contentClassName?: string
    emptyText?: string
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
            />
            <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 3v4"
            />
            <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 17v4"
            />
            <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5h4"
            />
            <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 19h4"
            />
        </svg>
    )
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path
                d="m21 21-4.3-4.3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function cx(...classes: Array<string | undefined | false | null>) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchPopup({
    query,
    data,
    loading,
    disabled,
    open,
    onOpenChange,
    children,
    onPickSuggestion,
    onPickProduct,
    onViewAll,
    contentClassName,
    emptyText = 'Không có kết quả phù hợp',
}: SearchPopupProps) {
    const hasAnything =
        !!data?.corrected ||
        (data?.suggestions?.length ?? 0) > 0 ||
        (data?.products?.length ?? 0) > 0

    const allowRender = !disabled

    return (
        <Popover.Root open={open} onOpenChange={onOpenChange}>
            {/* ✅ Anchor thay vì Trigger để input luôn render bình thường */}
            <Popover.Anchor asChild>{children}</Popover.Anchor>

            <Popover.Portal>
                <Popover.Content
                    side="bottom"
                    align="center"
                    sideOffset={8}
                    collisionPadding={16}
                    className={cx(
                        'z-50 rounded-md bg-white text-gray-900 outline-none',
                        'w-[calc(100vw-32px)] md:w-[500px]',
                        'overflow-y-auto max-h-[calc(100vh-150px)] p-0 border-0 shadow-lg',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out',
                        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                        'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
                        contentClassName,
                    )}
                    style={{ display: allowRender ? undefined : 'none' }}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                >
                    <div className="py-2">
                        {/* corrected */}
                        {data?.corrected && (
                            <div className="border-b border-gray-100">
                                <button
                                    type="button"
                                    className="w-full text-left flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() =>
                                        onPickSuggestion?.(
                                            data.corrected!.label,
                                            data.corrected!,
                                        )
                                    }
                                >
                                    <SparklesIcon className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" />
                                    <div className="flex-1">
                                        <div className="text-xs md:text-sm text-gray-700">
                                            {data.corrected.highlight?.prefix ??
                                                'Có thể bạn muốn tìm: '}
                                            <span className="font-medium text-blue-600">
                                                {data.corrected.highlight
                                                    ?.emphasis ??
                                                    data.corrected.label}
                                            </span>
                                            {data.corrected.highlight?.suffix ??
                                                ''}
                                        </div>
                                        {data.corrected.subLabel && (
                                            <div className="text-xs text-gray-500">
                                                {data.corrected.subLabel}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            </div>
                        )}

                        {!!data?.products?.length && (
                            <div>
                                {data.products.map((p) => (
                                    <div
                                        key={String(p.id)}
                                        className="border-b cursor-pointer"
                                    >
                                        <a
                                            href={p.href}
                                            title={p.title}
                                            className="block"
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            onClick={() => onPickProduct?.(p)}
                                        >
                                            <div className="w-full flex justify-between gap-2 py-2 px-3 md:px-4 border-b hover:bg-gray-100 cursor-pointer">
                                                <div className="w-full flex flex-col justify-center gap-1 md:gap-2">
                                                    <h3 className="font-medium text-xs md:text-sm leading-snug m-0 line-clamp-2">
                                                        {p.title}
                                                    </h3>

                                                    {p.meta && (
                                                        <div className="text-xs text-gray-500 line-clamp-1">
                                                            {p.meta}
                                                        </div>
                                                    )}

                                                    {(p.price ||
                                                        p.oldPrice ||
                                                        p.discountText) && (
                                                        <div className="flex items-start gap-1 md:gap-2">
                                                            <div className="flex flex-col gap-0.5 md:gap-1">
                                                                {p.price && (
                                                                    <span className="text-priceColor text-xs md:text-sm font-semibold">
                                                                        {
                                                                            p.price
                                                                        }
                                                                    </span>
                                                                )}
                                                                {(p.oldPrice ||
                                                                    p.discountText) && (
                                                                    <span className="text-subPriceColor text-xs font-semibold">
                                                                        {p.oldPrice && (
                                                                            <span className="line-through">
                                                                                {
                                                                                    p.oldPrice
                                                                                }
                                                                            </span>
                                                                        )}
                                                                        {p.discountText && (
                                                                            <span className="text-priceColor text-xs font-semibold ml-1">
                                                                                {
                                                                                    p.discountText
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {p.imageUrl ? (
                                                    <picture>
                                                        <img
                                                            alt={p.title}
                                                            loading="lazy"
                                                            width={50}
                                                            height={50}
                                                            className="min-w-[40px] md:min-w-[50px] w-[40px] md:w-[50px] h-[40px] md:h-[50px] object-cover"
                                                            src={p.imageUrl}
                                                        />
                                                    </picture>
                                                ) : null}
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div>
                            <div className="px-3 md:px-4 py-2">
                                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    {data?.recentTitle ?? 'Gợi ý tìm kiếm'}
                                </h4>
                            </div>

                            {loading && (
                                <div className="px-3 md:px-4 pb-2 text-xs text-gray-500">
                                    Đang tìm kiếm…
                                </div>
                            )}

                            {!!data?.suggestions?.length && (
                                <div>
                                    {data.suggestions.map((s) => (
                                        <Link
                                            key={s.id}
                                            href={s.href}
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            className="w-full text-left flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                        >
                                            {s.kind === 'sparkles' ? (
                                                <SparklesIcon className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" />
                                            ) : (
                                                <SearchIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <span className="text-xs md:text-sm text-gray-700 truncate">
                                                    {s.label}
                                                </span>
                                                {s.subLabel && (
                                                    <div className="text-xs text-gray-500">
                                                        {s.subLabel}
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {!loading && !hasAnything && (
                                <div className="px-3 md:px-4 pb-2 text-xs text-gray-500">
                                    {query.trim()
                                        ? emptyText
                                        : 'Nhập từ khóa để tìm khóa học…'}
                                </div>
                            )}
                        </div>
                    </div>

                    {data?.viewAllHref && (
                        <a
                            className="py-3 md:py-4 px-2 md:px-4 flex flex-wrap items-center justify-center hover:bg-gray-50 whitespace-pre-line text-center"
                            href={data.viewAllHref}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={(e) => {
                                if (onViewAll) {
                                    e.preventDefault()
                                    onViewAll(data.viewAllHref!)
                                }
                            }}
                        >
                            <span className="text-xs md:text-sm">
                                Xem tất cả{' '}
                                <span className="text-primary font-semibold mx-1 inline">
                                    {typeof data.total === 'number'
                                        ? data.total
                                        : ''}
                                </span>
                                kết quả với từ khóa{' '}
                                <span className="text-primary font-semibold mx-1 inline">
                                    &quot;{query}&quot;
                                </span>
                            </span>
                        </a>
                    )}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
