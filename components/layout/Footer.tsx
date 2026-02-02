import { Container } from './Container'
import { SITE_NAME } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t-2 border-primary/20 bg-gradient-to-r from-accent/30 via-secondary/20 to-accent/30 no-print">
      <Container>
        <div className="flex flex-col items-center justify-center gap-4 py-12 md:flex-row md:justify-between">
          <p className="text-center text-sm leading-loose text-foreground/70 font-medium md:text-left">
            {SITE_NAME} © {new Date().getFullYear()} 🍲
          </p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-sm font-semibold text-primary">
              made with love for sharing delicious recipes ❤️
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
