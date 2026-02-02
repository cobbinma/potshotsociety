import { client } from '@/sanity/lib/client'
import { allRecipesQuery } from '@/sanity/lib/queries'
import { Recipe } from '@/lib/types'
import { FavoritesPageClient } from './FavoritesPageClient'

export const revalidate = 60 // Revalidate every 60 seconds

export const metadata = {
  title: 'My Favorites | Pot Shot Society',
  description: 'Your saved favorite recipes',
}

async function getRecipes(): Promise<Recipe[]> {
  try {
    const recipes = await client.fetch(allRecipesQuery)
    return recipes
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
}

export default async function FavoritesPage() {
  const recipes = await getRecipes()

  return <FavoritesPageClient recipes={recipes} />
}
