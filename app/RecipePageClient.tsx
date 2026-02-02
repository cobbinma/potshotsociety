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
        recipe.ingredients.some((ing) =>
          ing.item.toLowerCase().includes(searchQuery.toLowerCase())
        )

      // Filter by category
      const matchesCategory =
        !selectedCategory || recipe.categories.includes(selectedCategory)

      return matchesSearch && matchesCategory
    })
  }, [recipes, searchQuery, selectedCategory])

  return (
    <Container className="py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            All Recipes
          </h1>
          <p className="text-foreground/60">
            Discover delicious recipes to share with friends and family
          </p>
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
          <p className="mb-4 text-sm text-foreground/60">
            Showing {filteredRecipes.length} of {recipes.length} recipes
          </p>
          <RecipeGrid recipes={filteredRecipes} />
        </div>
      </div>
    </Container>
  )
}
