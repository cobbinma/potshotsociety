'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = 'search for recipes... 🔍' }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="relative group">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary group-hover:scale-110 transition-transform" />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="w-full rounded-2xl border-2 border-primary/30 bg-white py-3 pl-12 pr-4 text-base font-medium placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
      />
    </div>
  )
}
