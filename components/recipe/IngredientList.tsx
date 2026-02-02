'use client'

import { useState } from 'react'
import { Ingredient } from '@/lib/types'
import { scaleIngredient } from '@/lib/utils'

interface IngredientListProps {
  ingredients?: Ingredient[]
  scale?: number
}

export function IngredientList({ ingredients = [], scale = 1 }: IngredientListProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleItem = (key: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(key)) {
      newChecked.delete(key)
    } else {
      newChecked.add(key)
    }
    setCheckedItems(newChecked)
  }

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-foreground mb-4">Ingredients</h2>
      <ul className="space-y-3">
        {ingredients.map((ingredient) => {
          const displayText = scaleIngredient(ingredient.item, scale)
          
          return (
            <li key={ingredient._key} className="flex items-start gap-3">
              <input
                type="checkbox"
                id={ingredient._key}
                checked={checkedItems.has(ingredient._key)}
                onChange={() => toggleItem(ingredient._key)}
                className="mt-1 h-4 w-4 rounded border-foreground/30 text-primary focus:ring-primary"
              />
              <label
                htmlFor={ingredient._key}
                className={cn(
                  'flex-1 cursor-pointer select-none text-foreground',
                  checkedItems.has(ingredient._key) && 'line-through text-foreground/50'
                )}
              >
                {displayText}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
