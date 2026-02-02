import Link from 'next/link'
import { Container } from './Container'
import { SITE_NAME } from '@/lib/constants'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-accent no-print">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">{SITE_NAME}</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-primary text-foreground"
            >
              Recipes
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  )
}
