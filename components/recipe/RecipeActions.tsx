'use client'

import { Button } from '@/components/ui/Button'
import { Printer, Share2, Check } from 'lucide-react'
import { useState } from 'react'

export function RecipeActions() {
  const [copied, setCopied] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex gap-3 no-print">
      <Button onClick={handlePrint} variant="outline" size="default">
        <Printer className="h-4 w-4 mr-2" />
        Print
      </Button>
      <Button onClick={handleShare} variant="outline" size="default">
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </>
        )}
      </Button>
    </div>
  )
}
