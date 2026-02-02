'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'pot-shot-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setFavorites(new Set(parsed))
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever favorites change
  const saveFavorites = (newFavorites: Set<string>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...newFavorites]))
    } catch (error) {
      console.error('Error saving favorites:', error)
    }
  }

  const toggleFavorite = (recipeId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(recipeId)) {
      newFavorites.delete(recipeId)
    } else {
      newFavorites.add(recipeId)
    }
    setFavorites(newFavorites)
    saveFavorites(newFavorites)
  }

  const isFavorite = (recipeId: string) => favorites.has(recipeId)

  const getFavoritesCount = () => favorites.size

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    isLoaded,
  }
}
