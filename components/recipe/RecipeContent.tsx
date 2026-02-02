'use client'

import { useState } from 'react'
import { Recipe } from '@/lib/types'
import { IngredientList } from '@/components/recipe/IngredientList'
import { InstructionSteps } from '@/components/recipe/InstructionSteps'
import { RecipeMetadata } from '@/components/recipe/RecipeMetadata'

interface RecipeContentProps {
  recipe: Recipe
}

export function RecipeContent({ recipe }: RecipeContentProps) {
  const [scale, setScale] = useState(1)

  return (
    <>
      {/* Recipe Metadata with Servings Scaler */}
      <RecipeMetadata
        prepTime={recipe.prepTime}
        cookTime={recipe.cookTime}
        servings={recipe.servings}
        onScaleChange={setScale}
      />

      {/* Recipe Content Grid */}
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <IngredientList ingredients={recipe.ingredients} scale={scale} />
        </div>
        
        <div>
          <InstructionSteps instructions={recipe.instructions} />
        </div>
      </div>
    </>
  )
}
