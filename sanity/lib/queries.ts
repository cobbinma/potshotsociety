import { groq } from 'next-sanity'

// Get all recipes (with preview data)
export const allRecipesQuery = groq`
  *[_type == "recipe"] | order(publishedAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    mainImage,
    prepTime,
    cookTime,
    servings,
    categories,
    publishedAt
  }
`

// Get single recipe by slug
export const recipeBySlugQuery = groq`
  *[_type == "recipe" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    mainImage,
    gallery,
    prepTime,
    cookTime,
    servings,
    ingredients,
    instructions,
    categories,
    notes,
    source,
    publishedAt
  }
`

// Get recipes by category
export const recipesByCategoryQuery = groq`
  *[_type == "recipe" && $category in categories] | order(publishedAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    mainImage,
    prepTime,
    cookTime,
    servings,
    categories,
    publishedAt
  }
`

// Get all recipe slugs (for static generation)
export const allRecipeSlugsQuery = groq`
  *[_type == "recipe" && defined(slug.current)][].slug.current
`

// Get all unique categories
export const allCategoriesQuery = groq`
  array::unique(*[_type == "recipe"].categories[])
`
