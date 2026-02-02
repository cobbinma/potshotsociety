import Link from 'next/link'
import Image from 'next/image'
import { Recipe } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { CategoryBadge } from '@/components/ui/Badge'
import { FavoriteButton } from '@/components/recipe/FavoriteButton'
import { urlForImage } from '@/sanity/lib/image'
import { formatTime, getTotalTime } from '@/lib/utils'
import { Clock, Users } from 'lucide-react'

interface RecipeCardProps {
  recipe: Recipe
}

const categoryStickers: Record<string, string> = {
  'breakfast': 'rise & shine! 🌅',
  'appetizers': 'snack time! 🥟',
  'mains': 'dig in! 🍽️',
  'sides': 'on the side! 🥗',
  'soups-salads': 'fresh! 🥣',
  'desserts': 'sweet treat! 🍰',
  'breads': 'fresh baked! 🥖',
  'drinks': 'sip sip! 🧃',
  'sauces': 'tasty! 🍯',
  'quick-easy': 'super quick! ⚡',
  'vegetarian': 'plant-based! 🌱',
  'kid-friendly': 'kids love it! 👶'
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const imageUrl = urlForImage(recipe.mainImage)
    .width(600)
    .height(400)
    .fit('crop')
    .url()

  const totalTime = getTotalTime(recipe.prepTime, recipe.cookTime)
  
  const getStickerText = () => {
    if (recipe.categories && recipe.categories.length > 0) {
      const firstCategory = recipe.categories[0]
      return categoryStickers[firstCategory] || 'yum! 😋'
    }
    return 'yum! 😋'
  }

  return (
    <Link href={`/recipes/${recipe.slug.current}`}>
      <Card className="group overflow-hidden transition-all hover:scale-[1.03] hover:shadow-2xl hover:-rotate-1 cursor-pointer h-full flex flex-col border-2 hover:border-primary">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-accent to-secondary/30">
          <Image
            src={imageUrl}
            alt={recipe.mainImage.alt || recipe.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Favorite button overlay */}
          <FavoriteButton recipeId={recipe._id} variant="card" />
          {/* Fun sticker overlay - changes based on category */}
          <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">
            {getStickerText()}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5 bg-gradient-to-b from-white to-accent/10">
          <h3 className="mb-2 text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          {recipe.description && (
            <p className="mb-3 text-sm text-foreground/70 line-clamp-2">
              {recipe.description}
            </p>
          )}
          <div className="mt-auto space-y-3">
            {(totalTime || recipe.servings) && (
              <div className="flex items-center gap-4 text-sm text-foreground/60 font-medium">
                {totalTime && (
                  <div className="flex items-center gap-1.5 bg-accent/50 px-2 py-1 rounded-full">
                    <Clock className="h-4 w-4" />
                    <span>{totalTime}</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex items-center gap-1.5 bg-secondary/20 px-2 py-1 rounded-full">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                )}
              </div>
            )}
            {recipe.categories && recipe.categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {recipe.categories.slice(0, 2).map((category) => (
                  <CategoryBadge key={category} category={category} />
                ))}
                {recipe.categories.length > 2 && (
                  <span className="text-xs font-bold text-primary self-center bg-primary/10 px-2 py-1 rounded-full">
                    +{recipe.categories.length - 2} more ✨
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
