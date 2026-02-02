// Utility functions for Pot Shot Society

import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatTime(minutes?: number): string {
  if (!minutes) return ''
  
  if (minutes < 60) {
    return `${minutes}min`
  }
  
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (mins === 0) {
    return `${hours}hr`
  }
  
  return `${hours}hr ${mins}min`
}

export function getTotalTime(prepTime?: number, cookTime?: number): string {
  const total = (prepTime || 0) + (cookTime || 0)
  return formatTime(total)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export function getCategoryTitle(slug: string): string {
  const categoryMap: Record<string, string> = {
    'breakfast': 'Breakfast & Brunch',
    'appetizers': 'Appetizers & Snacks',
    'mains': 'Main Dishes',
    'sides': 'Side Dishes',
    'soups-salads': 'Soups & Salads',
    'desserts': 'Desserts',
    'breads': 'Breads & Baking',
    'drinks': 'Drinks & Beverages',
    'sauces': 'Sauces & Condiments',
    'quick-easy': 'Quick & Easy',
    'vegetarian': 'Vegetarian',
    'kid-friendly': 'Kid-Friendly'
  }
  
  return categoryMap[slug] || slug
}

// Fraction conversion helpers
const fractionMap: Record<string, number> = {
  '¼': 0.25, '1/4': 0.25,
  '½': 0.5, '1/2': 0.5,
  '¾': 0.75, '3/4': 0.75,
  '⅓': 0.333, '1/3': 0.333,
  '⅔': 0.667, '2/3': 0.667,
  '⅛': 0.125, '1/8': 0.125,
  '⅜': 0.375, '3/8': 0.375,
  '⅝': 0.625, '5/8': 0.625,
  '⅞': 0.875, '7/8': 0.875,
}

const decimalToFraction = (decimal: number): string => {
  const tolerance = 1.0E-6
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1
  let b = decimal
  
  do {
    const a = Math.floor(b)
    let aux = h1
    h1 = a * h1 + h2
    h2 = aux
    aux = k1
    k1 = a * k1 + k2
    k2 = aux
    b = 1 / (b - a)
  } while (Math.abs(decimal - h1 / k1) > decimal * tolerance)

  // Common fractions
  if (k1 === 2) return '½'
  if (k1 === 3 && h1 === 1) return '⅓'
  if (k1 === 3 && h1 === 2) return '⅔'
  if (k1 === 4 && h1 === 1) return '¼'
  if (k1 === 4 && h1 === 3) return '¾'
  if (k1 === 8 && h1 === 1) return '⅛'
  if (k1 === 8 && h1 === 3) return '⅜'
  if (k1 === 8 && h1 === 5) return '⅝'
  if (k1 === 8 && h1 === 7) return '⅞'
  
  return `${h1}/${k1}`
}

export function scaleIngredient(ingredient: string, scale: number): string {
  if (scale === 1) return ingredient

  const trimmed = ingredient.trim()
  
  // If it's just a header (no numbers or common measurement words), return as-is
  if (isLikelyHeader(trimmed)) {
    return ingredient
  }

  // Handle "to taste", "to serve", "to garnish" - don't scale these
  if (/,?\s*(to taste|to serve|to garnish|for serving|for garnish|optional)$/i.test(trimmed)) {
    return ingredient
  }

  // Handle "Juice of X lemon" pattern
  const juicePattern = /^(.*\bof\s+)(\d+)\s+(lemon|lime|orange)/i
  const juiceMatch = trimmed.match(juicePattern)
  if (juiceMatch) {
    const prefix = juiceMatch[1]
    const count = parseInt(juiceMatch[2])
    const fruit = juiceMatch[3]
    const scaledCount = count * scale
    const formatted = formatScaledNumber(scaledCount)
    return `${prefix}${formatted} ${fruit}`
  }

  // Handle ingredients with parenthetical alternatives like "1 large onion (or 2 small)"
  // We'll scale the main number and the parenthetical numbers separately
  const parentheticalPattern = /^(\d+(?:\.\d+)?)\s+([^(]+)\s*\(or\s+(\d+(?:\.\d+)?)\s+([^)]+)\)/i
  const parenMatch = trimmed.match(parentheticalPattern)
  if (parenMatch) {
    const mainCount = parseFloat(parenMatch[1])
    const mainDesc = parenMatch[2].trim()
    const altCount = parseFloat(parenMatch[3])
    const altDesc = parenMatch[4].trim()
    
    const scaledMain = formatScaledNumber(mainCount * scale)
    const scaledAlt = formatScaledNumber(altCount * scale)
    
    return `${scaledMain} ${mainDesc} (or ${scaledAlt} ${altDesc})`
  }

  // Pattern to match numbers at the start (with various formats)
  // Handles: "2 eggs", "½ cup", "1½ cups", "4-6 thighs", "4–6 thighs" (en-dash)
  // Also handles: "20 g butter", "500 g beef mince", "680 g passata"
  const startPattern = /^(\d+(?:[.,]\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞]|\d+\s*[¼½¾⅓⅔⅛⅜⅝⅞]|\d+\s*[\/]\s*\d+|\d+\s*[-–]\s*\d+)/
  
  const match = trimmed.match(startPattern)
  
  if (!match) {
    // No number at start, return as-is
    return ingredient
  }

  const originalNumber = match[1].trim()
  let scaledReplacement = ''

  // Handle ranges (4-6 or 4–6 with en-dash)
  if (/\d+\s*[-–]\s*\d+/.test(originalNumber)) {
    const parts = originalNumber.split(/[-–]/).map(p => parseFloat(p.trim()))
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const scaled1 = parts[0] * scale
      const scaled2 = parts[1] * scale
      const formatted1 = formatScaledNumber(scaled1)
      const formatted2 = formatScaledNumber(scaled2)
      scaledReplacement = `${formatted1}–${formatted2}` // Use en-dash
      return ingredient.replace(originalNumber, scaledReplacement)
    }
  }

  // Handle fractions like "1/2" or "3/4"
  if (/^\d+\s*[\/]\s*\d+$/.test(originalNumber)) {
    const parts = originalNumber.split('/').map(p => parseInt(p.trim()))
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const numericValue = parts[0] / parts[1]
      const scaledValue = numericValue * scale
      scaledReplacement = formatScaledNumber(scaledValue)
      return ingredient.replace(originalNumber, scaledReplacement)
    }
  }

  let numericValue = 0

  // Parse different number formats
  if (fractionMap[originalNumber]) {
    // Single unicode fraction like ½
    numericValue = fractionMap[originalNumber]
  } else if (/^\d+\s*[¼½¾⅓⅔⅛⅜⅝⅞]$/.test(originalNumber)) {
    // Mixed number like "1½"
    const wholeMatch = originalNumber.match(/^(\d+)\s*([¼½¾⅓⅔⅛⅜⅝⅞])/)
    if (wholeMatch) {
      const whole = parseInt(wholeMatch[1])
      const frac = fractionMap[wholeMatch[2]]
      numericValue = whole + frac
    }
  } else {
    // Regular decimal or whole number
    numericValue = parseFloat(originalNumber.replace(',', '.'))
  }

  if (isNaN(numericValue)) {
    return ingredient
  }

  const scaledValue = numericValue * scale
  scaledReplacement = formatScaledNumber(scaledValue)
  
  return ingredient.replace(originalNumber, scaledReplacement)
}

// Helper function to detect if a line is likely a section header
function isLikelyHeader(text: string): boolean {
  // Headers are typically:
  // - Short (< 30 chars)
  // - No numbers
  // - No measurement words
  // - Often single words or very short phrases
  
  if (text.length > 30) return false
  
  // Check if it has numbers
  if (/\d/.test(text)) return false
  
  // Check if it has measurement indicators
  const measurementWords = /\b(cup|cups|tsp|tbsp|teaspoon|tablespoon|oz|lb|g|kg|ml|l|pinch|handful)\b/i
  if (measurementWords.test(text)) return false
  
  // Check if it has comma (ingredients usually have commas)
  if (text.includes(',')) return false
  
  // If all checks pass, likely a header
  return true
}

function formatScaledNumber(value: number): string {
  // Round to 2 decimal places
  const rounded = Math.round(value * 100) / 100

  // If it's a whole number, return it without decimals
  if (Number.isInteger(rounded)) {
    return rounded.toString()
  }

  // Check if it's close to a common fraction
  const fractionalPart = rounded - Math.floor(rounded)
  
  if (fractionalPart > 0.001) {
    const wholePart = Math.floor(rounded)
    const fraction = decimalToFraction(fractionalPart)
    
    if (wholePart === 0) {
      return fraction
    }
    return `${wholePart} ${fraction}`
  }

  // Otherwise return as decimal
  return rounded.toString()
}

