import { client } from '@/sanity/lib/client'
import { allRecipesQuery, allCategoriesQuery } from '@/sanity/lib/queries'
import { Recipe } from '@/lib/types'
import { RecipePageClient } from './RecipePageClient'

export const revalidate = 60 // Revalidate every 60 seconds

async function getRecipes(): Promise<Recipe[]> {
  try {
    const recipes = await client.fetch(allRecipesQuery)
    return recipes
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
}

async function getCategories(): Promise<string[]> {
  try {
    const categories = await client.fetch(allCategoriesQuery)
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function HomePage() {
  const [recipes, categories] = await Promise.all([
    getRecipes(),
    getCategories(),
  ])

  return <RecipePageClient recipes={recipes} categories={categories} />
}

