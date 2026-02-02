import Link from 'next/link'
import { Container } from './Container'
import { SITE_NAME } from '@/lib/constants'
import { ChefHat, Sparkles, Instagram, Heart } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b-2 border-primary/20 no-print shadow-sm relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/20 pointer-events-none" />
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link 
            href="/" 
            className="group flex items-center space-x-3"
          >
            {/* Fun emoji logo */}
            <div className="relative">
              <span className="text-4xl transition-transform group-hover:rotate-12 inline-block">
                🍲
              </span>
              <span className="absolute -top-1 -right-1 text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                ✨
              </span>
            </div>
            
            {/* Site name with gradient */}
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {SITE_NAME}
              </span>
              <span className="text-xs text-foreground/60 font-medium tracking-wide hidden sm:block">
                Recipes to come back to again and again!
              </span>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-3 md:space-x-4">
            <Link
              href="/"
              className="group hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-all duration-300 text-sm font-semibold border border-primary/20 hover:border-primary hover:shadow-md"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">🍽️</span>
              <span>All Recipes</span>
            </Link>
            
            {/* Favorites Button */}
            <Link
              href="/favorites"
              className="group flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-accent/30 hover:bg-primary hover:text-white transition-all duration-300 text-sm font-semibold border border-accent hover:border-primary hover:shadow-md"
            >
              <Heart className="h-4 w-4 group-hover:fill-current transition-all" />
              <span className="hidden sm:inline">Favorites</span>
            </Link>
            
            {/* Instagram Button */}
            <a
              href="https://www.instagram.com/potshotsociety"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white transition-all duration-300 border-2 border-white hover:shadow-lg transform hover:scale-105"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
            
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 text-foreground/70 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span>Made with love</span>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  )
}
