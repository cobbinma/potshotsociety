import { Container } from './Container'
import { SITE_NAME } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-accent bg-accent/30 no-print">
      <Container>
        <div className="flex flex-col items-center justify-center gap-4 py-10 md:flex-row md:justify-between">
          <p className="text-center text-sm leading-loose text-foreground/60 md:text-left">
            {SITE_NAME} © {new Date().getFullYear()}
          </p>
          <p className="text-center text-sm text-foreground/60">
            Made with love for sharing delicious recipes ❤️
          </p>
        </div>
      </Container>
    </footer>
  )
}
