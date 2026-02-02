// Constants for Pot Shot Society

import { Category } from './types'

export const CATEGORIES: Category[] = [
  { slug: 'breakfast', title: 'Breakfast & Brunch' },
  { slug: 'appetizers', title: 'Appetizers & Snacks' },
  { slug: 'mains', title: 'Main Dishes' },
  { slug: 'sides', title: 'Side Dishes' },
  { slug: 'soups-salads', title: 'Soups & Salads' },
  { slug: 'desserts', title: 'Desserts' },
  { slug: 'breads', title: 'Breads & Baking' },
  { slug: 'drinks', title: 'Drinks & Beverages' },
  { slug: 'sauces', title: 'Sauces & Condiments' },
  { slug: 'quick-easy', title: 'Quick & Easy' },
  { slug: 'vegetarian', title: 'Vegetarian' },
  { slug: 'kid-friendly', title: 'Kid-Friendly' }
]

export const SITE_NAME = 'Pot Shot Society'
export const SITE_DESCRIPTION = 'A collection of delicious recipes to share with friends and family'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const INSTAGRAM_URL = 'https://www.instagram.com/potshotsociety'
