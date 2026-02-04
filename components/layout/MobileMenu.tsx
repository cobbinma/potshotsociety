'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Heart, Instagram, Home, Sparkles } from 'lucide-react'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-all duration-300 border-2 border-primary/20 hover:border-primary hover:shadow-lg hover:scale-105 active:scale-95"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-5 w-5 transition-transform" />
        ) : (
          <Menu className="h-5 w-5 transition-transform" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="fixed top-20 right-4 w-72 bg-background rounded-2xl border-2 border-primary/20 shadow-2xl z-50 md:hidden animate-slide-in overflow-hidden">
            {/* Gradient background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10 pointer-events-none" />
            
            <nav className="relative flex flex-col p-5 space-y-3">
              {/* All Recipes */}
              <Link
                href="/"
                onClick={closeMenu}
                className="group flex items-center gap-3 px-5 py-3.5 rounded-xl bg-primary/10 hover:bg-primary hover:text-white transition-all duration-300 text-sm font-semibold border-2 border-primary/20 hover:border-primary hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <Home className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>All Recipes</span>
              </Link>

              {/* Favorites */}
              <Link
                href="/favorites"
                onClick={closeMenu}
                className="group flex items-center gap-3 px-5 py-3.5 rounded-xl bg-accent/20 hover:bg-primary hover:text-white transition-all duration-300 text-sm font-semibold border-2 border-accent/40 hover:border-primary hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <Heart className="h-5 w-5 group-hover:fill-current transition-all" />
                <span>Favorites</span>
              </Link>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/potshotsociety"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="group flex items-center gap-3 px-5 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border-2 border-white/20"
              >
                <Instagram className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Follow on Instagram</span>
              </a>

              {/* Divider */}
              <div className="border-t-2 border-primary/10 my-2" />

              {/* Made with Love */}
              <div className="flex items-center justify-center gap-2 px-4 py-2 text-foreground/60 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span>Made with love</span>
              </div>
            </nav>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
