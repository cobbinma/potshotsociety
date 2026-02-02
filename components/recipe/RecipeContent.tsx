'use client'

import { useState } from 'react'
import { Recipe } from '@/lib/types'
import { IngredientList } from '@/components/recipe/IngredientList'
import { InstructionSteps } from '@/components/recipe/InstructionSteps'
import { ServingsScaler } from '@/components/recipe/ServingsScaler'

interface RecipeContentProps {
  recipe: Recipe
}

export function RecipeContent({ recipe }: RecipeContentProps) {
  const [scale, setScale] = useState(1)

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
      <div className="space-y-6">
        {/* Servings Scaler */}
        {recipe.servings && (
          <div className="flex justify-center lg:justify-start">
            <div className="inline-flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-accent/30 to-secondary/20 border-2 border-accent">
              <ServingsScaler
                originalServings={recipe.servings}
                onScaleChange={setScale}
              />
            </div>
          </div>
        )}

        {/* Ingredients */}
        <IngredientList ingredients={recipe.ingredients} scale={scale} />
      </div>
      
      <div>
        <InstructionSteps instructions={recipe.instructions} />
      </div>
    </div>
  )
}
