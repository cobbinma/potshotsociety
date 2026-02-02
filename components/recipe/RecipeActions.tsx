'use client'

import { Button } from '@/components/ui/Button'
import { FavoriteButton } from '@/components/recipe/FavoriteButton'
import { Printer, Link2, Check, Facebook, Mail, MessageCircle } from 'lucide-react'
import { useState } from 'react'

interface RecipeActionsProps {
  recipeId?: string
}

export function RecipeActions({ recipeId }: RecipeActionsProps) {
  const [copied, setCopied] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out this delicious recipe from Pot Shot Society! 🍲\n\n${document.title}\n\n${window.location.href}`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    const quote = encodeURIComponent(`Check out this delicious recipe from Pot Shot Society! 🍲✨`)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`, '_blank', 'width=600,height=400')
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(document.title)
    const body = encodeURIComponent(`Check out this recipe: ${window.location.href}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <div className="space-y-4 no-print">
      {/* Primary Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handlePrint} variant="outline" size="default">
          <Printer className="h-4 w-4 mr-2" />
          Print Recipe
        </Button>
        <Button onClick={handleCopyLink} variant="outline" size="default">
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Link Copied!
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
        {recipeId && <FavoriteButton recipeId={recipeId} variant="detail" />}
      </div>

      {/* Social Share Section */}
      <div className="border-t-2 border-accent pt-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={shareToWhatsApp}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all duration-300 text-sm font-bold border-2 border-white hover:shadow-lg transform hover:scale-105"
            aria-label="Share on WhatsApp"
          >
            <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          <button
            onClick={shareToFacebook}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1877F2] hover:bg-[#0c5ccc] text-white transition-all duration-300 text-sm font-bold border-2 border-white hover:shadow-lg transform hover:scale-105"
            aria-label="Share on Facebook"
          >
            <Facebook className="h-4 w-4 group-hover:scale-110 transition-transform fill-current" />
            <span className="hidden sm:inline">Facebook</span>
          </button>

          <button
            onClick={shareViaEmail}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white transition-all duration-300 text-sm font-bold border-2 border-white hover:shadow-lg transform hover:scale-105"
            aria-label="Share via Email"
          >
            <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Email</span>
          </button>
        </div>
      </div>
    </div>
  )
}
