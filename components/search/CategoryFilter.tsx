'use client'

import { cn } from '@/lib/utils'
import { getCategoryTitle } from '@/lib/utils'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          'rounded-full px-4 py-2 text-sm font-medium transition-colors',
          selectedCategory === null
            ? 'bg-primary text-white'
            : 'bg-accent text-foreground hover:bg-accent/80'
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            selectedCategory === category
              ? 'bg-primary text-white'
              : 'bg-accent text-foreground hover:bg-accent/80'
          )}
        >
          {getCategoryTitle(category)}
        </button>
      ))}
    </div>
  )
}
