"use client"

import React, { FormEvent } from "react"
import { Search as SearchIcon } from "lucide-react"

interface SearchProps {
  query: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  className?: string
}

const Search: React.FC<SearchProps> = ({
  query,
  onChange,
  onSubmit,
  placeholder = "Tìm kiếm...",
  className = "",
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit?.(query)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center ${className}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        type="submit"
        className="absolute right-2 p-1 text-gray-500 hover:text-gray-800 transition"
      >
        <SearchIcon size={20} />
      </button>
    </form>
  )
}

export default Search
