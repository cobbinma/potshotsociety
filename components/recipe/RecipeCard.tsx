import Link from 'next/link'
import Image from 'next/image'
import { Recipe } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { CategoryBadge } from '@/components/ui/Badge'
import { urlForImage } from '@/sanity/lib/image'
import { formatTime, getTotalTime } from '@/lib/utils'
import { Clock, Users } from 'lucide-react'

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const imageUrl = urlForImage(recipe.mainImage)
    .width(600)
    .height(400)
    .fit('crop')
    .url()

  const totalTime = getTotalTime(recipe.prepTime, recipe.cookTime)

  return (
    <Link href={`/recipes/${recipe.slug.current}`}>
      <Card className="overflow-hidden transition-all hover:scale-[1.02] cursor-pointer h-full flex flex-col">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-accent">
          <Image
            src={imageUrl}
            alt={recipe.mainImage.alt || recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-2 text-lg font-semibold text-foreground line-clamp-2">
            {recipe.title}
          </h3>
          {recipe.description && (
            <p className="mb-3 text-sm text-foreground/70 line-clamp-2">
              {recipe.description}
            </p>
          )}
          <div className="mt-auto space-y-3">
            {(totalTime || recipe.servings) && (
              <div className="flex items-center gap-4 text-sm text-foreground/60">
                {totalTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{totalTime}</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                )}
              </div>
            )}
            {recipe.categories && recipe.categories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {recipe.categories.slice(0, 2).map((category) => (
                  <CategoryBadge key={category} category={category} />
                ))}
                {recipe.categories.length > 2 && (
                  <span className="text-xs text-foreground/60 self-center">
                    +{recipe.categories.length - 2} more
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
