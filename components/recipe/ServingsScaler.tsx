'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ServingsScalerProps {
  originalServings: number
  onScaleChange: (scale: number) => void
}

export function ServingsScaler({ originalServings, onScaleChange }: ServingsScalerProps) {
  const [currentServings, setCurrentServings] = useState(originalServings)

  const handleDecrease = () => {
    const newServings = Math.max(1, currentServings - 1)
    setCurrentServings(newServings)
    onScaleChange(newServings / originalServings)
  }

  const handleIncrease = () => {
    const maxServings = originalServings * 4
    const newServings = Math.min(maxServings, currentServings + 1)
    setCurrentServings(newServings)
    onScaleChange(newServings / originalServings)
  }

  const isScaled = currentServings !== originalServings

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
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

        <div className="flex flex-col items-center min-w-[120px]">
          <div className="text-2xl font-bold text-foreground">
            {currentServings}
          </div>
          <div className="text-sm text-foreground/60 font-medium">
            {currentServings === 1 ? 'serving' : 'servings'}
          </div>
        </div>

        <button
          onClick={handleIncrease}
          disabled={currentServings >= originalServings * 4}
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 border-2',
            currentServings >= originalServings * 4
              ? 'bg-foreground/5 border-foreground/20 text-foreground/30 cursor-not-allowed'
              : 'bg-white border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md transform hover:scale-110'
          )}
          aria-label="Increase servings"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {isScaled && (
        <div className="text-xs text-center px-3 py-1.5 bg-primary/10 text-primary rounded-full font-bold border-2 border-primary/20 animate-fade-in">
          Recipe scaled from {originalServings} {originalServings === 1 ? 'serving' : 'servings'} ✨
        </div>
      )}
    </div>
  )
}
