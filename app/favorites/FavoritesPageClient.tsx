'use client'

import { Recipe } from '@/lib/types'
import { RecipeGrid } from '@/components/recipe/RecipeGrid'
import { useFavorites } from '@/lib/hooks/useFavorites'
import { Heart } from 'lucide-react'

interface FavoritesPageClientProps {
  recipes: Recipe[]
}

export function FavoritesPageClient({ recipes }: FavoritesPageClientProps) {
  const { favorites, isLoaded } = useFavorites()

  // Filter recipes to only show favorites
  const favoriteRecipes = recipes.filter((recipe) => favorites.has(recipe._id))

  // Show loading state until localStorage is loaded
  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-foreground/60">Loading your favorites...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Heart className="h-8 w-8 text-primary fill-primary" />
          <h1 className="text-4xl md:text-5xl font-black text-foreground">
            My Favorites
          </h1>
        </div>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          {favoriteRecipes.length > 0
            ? `You have ${favoriteRecipes.length} saved ${favoriteRecipes.length === 1 ? 'recipe' : 'recipes'} 💖`
            : 'Start saving your favorite recipes by clicking the heart button!'}
        </p>
      </div>

      {favoriteRecipes.length > 0 ? (
        <RecipeGrid recipes={favoriteRecipes} />
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            No favorites yet
          </h2>
          <p className="text-foreground/60 mb-6">
            Browse recipes and click the heart icon to save them here
          </p>
          <a
            href="/"
            className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
          >
            Browse Recipes ✨
          </a>
        </div>
      )}
    </div>
  )
}
