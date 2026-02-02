import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { recipeBySlugQuery, allRecipeSlugsQuery } from '@/sanity/lib/queries'
import { Recipe } from '@/lib/types'
import { Container } from '@/components/layout/Container'
import { RecipeHero } from '@/components/recipe/RecipeHero'
import { RecipeMetadata } from '@/components/recipe/RecipeMetadata'
import { IngredientList } from '@/components/recipe/IngredientList'
import { InstructionSteps } from '@/components/recipe/InstructionSteps'
import { RecipeActions } from '@/components/recipe/RecipeActions'
import { ArrowLeft } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/image'
import { SITE_NAME } from '@/lib/constants'

export const revalidate = 60 // Revalidate every 60 seconds

interface RecipePageProps {
  params: Promise<{ slug: string }>
}

async function getRecipe(slug: string): Promise<Recipe | null> {
  try {
    const recipe = await client.fetch(recipeBySlugQuery, { slug })
    return recipe
  } catch (error) {
    console.error('Error fetching recipe:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(allRecipeSlugsQuery)
    return slugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params
  const recipe = await getRecipe(slug)

  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    }
  }

  const imageUrl = urlForImage(recipe.mainImage).width(1200).height(630).url()

  return {
    title: recipe.title,
    description: recipe.description || `Check out this recipe for ${recipe.title}`,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
      type: 'article',
      publishedTime: recipe.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.description,
      images: [imageUrl],
    },
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params
  const recipe = await getRecipe(slug)

  if (!recipe) {
    notFound()
  }

  // JSON-LD structured data for recipe
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    image: urlForImage(recipe.mainImage).url(),
    description: recipe.description,
    prepTime: recipe.prepTime ? `PT${recipe.prepTime}M` : undefined,
    cookTime: recipe.cookTime ? `PT${recipe.cookTime}M` : undefined,
    totalTime:
      recipe.prepTime || recipe.cookTime
        ? `PT${(recipe.prepTime || 0) + (recipe.cookTime || 0)}M`
        : undefined,
    recipeYield: recipe.servings?.toString(),
    recipeIngredient: recipe.ingredients.map((i) => i.item),
    recipeInstructions: recipe.instructions.map((inst, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: inst.step,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />
      <Container className="py-8">
        <div className="space-y-8">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground no-print transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all recipes
          </Link>

          {/* Recipe Hero */}
          <RecipeHero
            title={recipe.title}
            description={recipe.description}
            mainImage={recipe.mainImage}
            categories={recipe.categories}
          />

          {/* Recipe Metadata */}
          <RecipeMetadata
            prepTime={recipe.prepTime}
            cookTime={recipe.cookTime}
            servings={recipe.servings}
          />

          {/* Action buttons */}
          <RecipeActions />

          {/* Recipe Content */}
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <IngredientList ingredients={recipe.ingredients} />
            </div>
            <div>
              <InstructionSteps instructions={recipe.instructions} />
            </div>
          </div>

          {/* Notes */}
          {recipe.notes && (
            <div className="rounded-lg border border-accent bg-accent/30 p-6">
              <h2 className="mb-3 text-xl font-bold text-foreground">
                Notes & Tips
              </h2>
              <p className="whitespace-pre-wrap text-foreground/80 leading-relaxed">
                {recipe.notes}
              </p>
            </div>
          )}

          {/* Source */}
          {recipe.source && (
            <div className="text-sm text-foreground/60">
              <span className="font-medium">Source:</span> {recipe.source}
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
