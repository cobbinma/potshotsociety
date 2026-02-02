'use client'

import { Clock, Users, ChefHat, Minus, Plus } from 'lucide-react'
import { formatTime, cn } from '@/lib/utils'

interface RecipeMetadataProps {
  prepTime?: number
  cookTime?: number
  servings?: number
  onScaleChange?: (scale: number) => void
}

export function RecipeMetadata({ prepTime, cookTime, servings, onScaleChange }: RecipeMetadataProps) {
  const [currentServings, setCurrentServings] = React.useState(servings || 1)

  const handleDecrease = () => {
    if (!servings || !onScaleChange) return
    const newServings = Math.max(1, currentServings - 1)
    setCurrentServings(newServings)
    onScaleChange(newServings / servings)
  }

  const handleIncrease = () => {
    if (!servings || !onScaleChange) return
    const maxServings = servings * 4
    const newServings = Math.min(maxServings, currentServings + 1)
    setCurrentServings(newServings)
    onScaleChange(newServings / servings)
  }

  const isScaled = servings && currentServings !== servings

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
  ].filter(Boolean)

  if (items.length === 0 && !servings) return null

  return (
    <div className="space-y-3">
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

        {/* Servings Scaler Card */}
        {servings && (
          <div className="flex flex-col gap-2 rounded-lg border-2 border-primary/30 bg-gradient-to-br from-accent/30 to-secondary/20 p-4">
            <div className="flex items-center gap-2 text-xs text-foreground/60 mb-1">
              <Users className="h-4 w-4 text-primary" />
              <span>Servings</span>
            </div>
            
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={handleDecrease}
                disabled={currentServings <= 1}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 border-2',
                  currentServings <= 1
                    ? 'bg-foreground/5 border-foreground/20 text-foreground/30 cursor-not-allowed'
                    : 'bg-white border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md transform hover:scale-110'
                )}
                aria-label="Decrease servings"
              >
                <Minus className="h-4 w-4" />
              </button>

              <div className="flex flex-col items-center min-w-[60px]">
                <div className="text-2xl font-bold text-foreground">
                  {currentServings}
                </div>
              </div>

              <button
                onClick={handleIncrease}
                disabled={currentServings >= servings * 4}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 border-2',
                  currentServings >= servings * 4
                    ? 'bg-foreground/5 border-foreground/20 text-foreground/30 cursor-not-allowed'
                    : 'bg-white border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md transform hover:scale-110'
                )}
                aria-label="Increase servings"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scaled indicator */}
      {isScaled && (
        <div className="text-xs text-center px-3 py-1.5 bg-primary/10 text-primary rounded-full font-bold border-2 border-primary/20 animate-fade-in">
          Recipe scaled from {servings} {servings === 1 ? 'serving' : 'servings'} ✨
        </div>
      )}
    </div>
  )
}

// Add React import
import React from 'react'
