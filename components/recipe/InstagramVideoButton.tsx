'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { InstagramVideoModal } from './InstagramVideoModal'

interface InstagramVideoButtonProps {
  instagramUrl: string
  recipeName: string
}

export function InstagramVideoButton({
  instagramUrl,
  recipeName,
}: InstagramVideoButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:from-[#9D4EBF] hover:via-[#F1407C] hover:to-[#FF8847] shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        aria-label="Watch recipe video tutorial on Instagram"
        title="Watch video tutorial"
      >
        {/* Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="h-6 w-6 text-white fill-white group-hover:scale-110 transition-transform" />
        </div>

        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-30 transition-opacity" />
      </button>

      <InstagramVideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        instagramUrl={instagramUrl}
        recipeName={recipeName}
      />
    </>
  )
}
