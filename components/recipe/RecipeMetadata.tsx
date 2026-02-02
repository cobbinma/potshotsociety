import { Clock, Users, ChefHat } from 'lucide-react'
import { formatTime } from '@/lib/utils'

interface RecipeMetadataProps {
  prepTime?: number
  cookTime?: number
  servings?: number
}

export function RecipeMetadata({ prepTime, cookTime, servings }: RecipeMetadataProps) {
  const items = [
    prepTime && {
      icon: ChefHat,
      label: 'Prep Time',
      value: formatTime(prepTime),
    },
    cookTime && {
      icon: Clock,
      label: 'Cook Time',
      value: formatTime(cookTime),
    },
    servings && {
      icon: Users,
      label: 'Servings',
      value: servings.toString(),
    },
  ].filter(Boolean)

  if (items.length === 0) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item, index) => {
        if (!item) return null
        const Icon = item.icon
        return (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg border border-accent bg-accent/30 p-4"
          >
            <Icon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-foreground/60">{item.label}</p>
              <p className="text-lg font-semibold text-foreground">{item.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
