'use client'

import { Heart } from 'lucide-react'
import { useFavorites } from '@/lib/hooks/useFavorites'
import { cn } from '@/lib/utils'

interface FavoriteButtonProps {
  recipeId: string
  variant?: 'card' | 'detail'
  className?: string
}

export function FavoriteButton({ recipeId, variant = 'detail', className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites()
  const favorite = isFavorite(recipeId)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(recipeId)
  }

  // Don't render until localStorage is loaded to prevent hydration mismatch
  if (!isLoaded) {
    return null
  }

  if (variant === 'card') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'absolute top-3 left-3 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 group',
          className
        )}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          className={cn(
            'h-5 w-5 transition-all duration-300',
            favorite
              ? 'fill-primary text-primary scale-110'
              : 'text-foreground/60 group-hover:text-primary group-hover:scale-110'
          )}
        />
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'group flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 text-sm font-bold border-2 hover:shadow-lg transform hover:scale-105',
        favorite
          ? 'bg-primary text-white border-primary hover:bg-primary/90'
          : 'bg-white text-foreground border-accent hover:border-primary hover:bg-accent/20',
        className
      )}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={cn(
          'h-4 w-4 transition-all duration-300 group-hover:scale-110',
          favorite && 'fill-current'
        )}
      />
      <span className="hidden sm:inline">
        {favorite ? 'Saved!' : 'Save Recipe'}
      </span>
    </button>
  )
}
