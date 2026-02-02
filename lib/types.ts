// Core TypeScript types for Pot Shot Society

export interface Recipe {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  description?: string
  mainImage: SanityImage
  gallery?: SanityImage[]
  prepTime?: number
  cookTime?: number
  servings?: number
  ingredients: Ingredient[]
  instructions: Instruction[]
  categories: string[]
  notes?: string
  source?: string
  publishedAt: string
}

export interface Ingredient {
  _key: string
  item: string
}

export interface Instruction {
  _key: string
  step: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
}

export interface RecipeCardProps {
  recipe: Recipe
}

export interface RecipeGridProps {
  recipes: Recipe[]
}

export type CategorySlug =
  | 'breakfast'
  | 'appetizers'
  | 'mains'
  | 'sides'
  | 'soups-salads'
  | 'desserts'
  | 'breads'
  | 'drinks'
  | 'sauces'
  | 'quick-easy'
  | 'vegetarian'
  | 'kid-friendly'

export interface Category {
  slug: CategorySlug
  title: string
}
