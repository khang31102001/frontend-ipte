"use client"
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Search from '@/components/search/Search'
import Button from '@/components/button/Button'
import { Grid3x3, List, ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react"
type ViewMode = "grid" | "list";
interface ListGridControlProps {
    className?: string
    onChangeView: (type: ViewMode) => void
}
const ListGridControl = ({
    className,
    onChangeView
}: ListGridControlProps) => {


    //   const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("newest")
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <Search />

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Newly published" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Newly published</SelectItem>
                    <SelectItem value="popular">Most popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex gap-2">
                <Button
                    onClick={() => onChangeView("grid")}
                >
                    <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                    onClick={() => onChangeView("list")}
                >
                    <List className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

export default ListGridControl