// Utility functions for Pot Shot Society

import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatTime(minutes?: number): string {
  if (!minutes) return ''
  
  if (minutes < 60) {
    return `${minutes}min`
  }
  
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (mins === 0) {
    return `${hours}hr`
  }
  
  return `${hours}hr ${mins}min`
}

export function getTotalTime(prepTime?: number, cookTime?: number): string {
  const total = (prepTime || 0) + (cookTime || 0)
  return formatTime(total)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export function getCategoryTitle(slug: string): string {
  const categoryMap: Record<string, string> = {
    'breakfast': 'Breakfast & Brunch',
    'appetizers': 'Appetizers & Snacks',
    'mains': 'Main Dishes',
    'sides': 'Side Dishes',
    'soups-salads': 'Soups & Salads',
    'desserts': 'Desserts',
    'breads': 'Breads & Baking',
    'drinks': 'Drinks & Beverages',
    'sauces': 'Sauces & Condiments',
    'quick-easy': 'Quick & Easy',
    'vegetarian': 'Vegetarian',
    'kid-friendly': 'Kid-Friendly'
  }
  
  return categoryMap[slug] || slug
}
