'use client'

import { useState, useMemo } from 'react'
import { Recipe } from '@/lib/types'
import { RecipeGrid } from '@/components/recipe/RecipeGrid'
import { SearchBar } from '@/components/search/SearchBar'
import { CategoryFilter } from '@/components/search/CategoryFilter'
import { Container } from '@/components/layout/Container'

interface RecipePageClientProps {
  recipes: Recipe[]
  categories: string[]
}

export function RecipePageClient({ recipes, categories }: RecipePageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Filter by search query
      const matchesSearch =
        !searchQuery ||
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (recipe.ingredients?.some((ing) =>
          ing.item.toLowerCase().includes(searchQuery.toLowerCase())
        ) ?? false)

      // Filter by category
      const matchesCategory =
        !selectedCategory || recipe.categories.includes(selectedCategory)

      return matchesSearch && matchesCategory
    })
  }, [recipes, searchQuery, selectedCategory])

  return (
    <Container className="py-12">
      <div className="space-y-8">
        {/* Hero section with Gen Z vibes */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 text-6xl opacity-20 animate-bounce">
            ✨
          </div>
          <div className="absolute -top-4 -right-4 text-5xl opacity-20 animate-pulse">
            💫
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mb-3 animate-fade-in">
            Recipes ✨
          </h1>
        </div>

        <div className="space-y-4">
          <SearchBar onSearch={setSearchQuery} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-sm font-semibold text-foreground/70">
              {filteredRecipes.length === 0 ? (
                <>sad... no recipes found 😢 try another search?</>
              ) : filteredRecipes.length === recipes.length ? (
                <>showing all {recipes.length} recipes 🎉</>
              ) : (
                <>found {filteredRecipes.length} of {recipes.length} recipes! 🔍</>
              )}
            </p>
          </div>
          <RecipeGrid recipes={filteredRecipes} />
        </div>
      </div>
    </Container>
  )
}
