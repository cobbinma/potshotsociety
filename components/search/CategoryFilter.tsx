'use client'

import { cn } from '@/lib/utils'
import { getCategoryTitle } from '@/lib/utils'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

const categoryEmojis: Record<string, string> = {
  'breakfast': '🍳',
  'appetizers': '🥟',
  'mains': '🍝',
  'sides': '🥗',
  'soups-salads': '🥣',
  'desserts': '🍰',
  'breads': '🥖',
  'drinks': '🧃',
  'sauces': '🍯',
  'quick-easy': '⚡',
  'vegetarian': '🌱',
  'kid-friendly': '👶'
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          'rounded-full px-5 py-2.5 text-sm font-bold transition-all transform hover:scale-105 border-2',
          selectedCategory === null
            ? 'bg-primary text-white border-primary shadow-lg scale-105'
            : 'bg-white text-foreground border-primary/30 hover:border-primary hover:shadow-md'
        )}
      >
        ✨ All Recipes
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            'rounded-full px-5 py-2.5 text-sm font-bold transition-all transform hover:scale-105 border-2',
            selectedCategory === category
              ? 'bg-primary text-white border-primary shadow-lg scale-105'
              : 'bg-white text-foreground border-accent hover:border-secondary hover:shadow-md'
          )}
        >
          <span className="mr-1">{categoryEmojis[category] || '🍽️'}</span>
          {getCategoryTitle(category)}
        </button>
      ))}
    </div>
  )
}
