import React from 'react';
import Link from 'next/link'; // Sử dụng Link của Next.js cho SEO và navigation
import { ChevronRight } from 'lucide-react'; // Icon phân cách


interface BreadcrumbItem {
    label: string;
    href: string; 
}
interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode; 
    className?: string; 
}
const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
    items, 
    separator = <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />, 
    className = "" 
}) => {

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <nav aria-label="breadcrumb" className={className}>
            <ol className="flex items-center space-x-2 text-sm">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={item.href} className="flex items-center">
                            {/* 1. Đường dẫn (Link hoặc Span) */}
                            {isLast ? (
                                // Mục cuối cùng là trang hiện tại, không phải link
                                <span className="text-foreground font-medium">
                                    {item.label}
                                </span>
                            ) : (
                                // Các mục trước là link
                                <Link 
                                    href={item.href} 
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}

                         
                            {!isLast && (
                                <span className="mx-2 text-muted-foreground/70">
                                    {separator}
                                </span>
                            )}
                        </li>
                    );
                
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;