"use client"
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Grid3x3, List } from "lucide-react"
import { CategoryItem } from '@/types/category'
import SearchLayout from '@/components/ui/search'
type ViewMode = "grid" | "list";
interface ListGridControlProps {
    items?: CategoryItem[];
    className?: string;
    onChangeView: (type: ViewMode) => void;
    onSelectSort?: (value: string) => void;
}
const ListGridControl = ({
    items = [],
    className,
    onChangeView,
    onSelectSort
}: ListGridControlProps) => {

   
    //   const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<string>();
    const [isActive, setIsActive] = useState<ViewMode>("grid");
    //  console.log("sort by cate: ----", sortBy)

    const handleViewChange = (mode: ViewMode) => {
        setIsActive(mode);
        onChangeView(mode);
    }
    const handleSortChange = (value: string )=>{
        setSortBy(value);
        onSelectSort?.(value);
    }
    if (!items || items.length === 0) return null;

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <SearchLayout onSearch={()=>{}} />

            {/* Sort */}
            <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Newly published" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all" >Tất cả</SelectItem>
                    {
                        items.map((item, index) => {
                            return (
                                <SelectItem key={item.categoryId ?? item.slug ?? `idx-${index}`}
                                    value={item.name}>{item.name}
                                </SelectItem>
                            )
                        })
                    }
                     
                </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex gap-2">
                <button
                    className={`
                    p-2 rounded-md border border-gray-200
                    text-primary hover:text-white hover:bg-hero-gradient 
                    transition-colors duration-200 ease-out
                    ${isActive === "grid" ? "bg-hero-gradient" : "bg-background"}
                    `}
                    onClick={() => handleViewChange("grid")}
                >
                    <Grid3x3 className=" w-4 h-4 flex-shrink-0" />
                </button>
                <button
                    className={`
                    p-2 rounded-md border border-gray-200
                    text-primary hover:text-white hover:bg-hero-gradient 
                    transition-colors duration-200 ease-out
                    ${isActive === "list" ? "bg-hero-gradient" : "bg-background"}
                    `}
                    onClick={() => handleViewChange("list")}
                >
                    <List className="w-4 h-4 flex-shrink-0" />
                </button>
            </div>
        </div>
    )
}

export default ListGridControl