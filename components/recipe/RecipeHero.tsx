import Image from 'next/image'
import { SanityImage } from '@/lib/types'
import { urlForImage } from '@/sanity/lib/image'
import { CategoryBadge } from '@/components/ui/Badge'

interface RecipeHeroProps {
  title: string
  description?: string
  mainImage: SanityImage
  categories: string[]
}

export function RecipeHero({ title, description, mainImage, categories }: RecipeHeroProps) {
  const imageUrl = urlForImage(mainImage)
    .width(1200)
    .height(600)
    .fit('crop')
    .url()

  return (
    <div className="space-y-6">
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={mainImage.alt || title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
        {description && (
          <p className="text-lg text-foreground/70 leading-relaxed">{description}</p>
        )}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <CategoryBadge key={category} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
