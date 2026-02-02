import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-accent bg-white shadow-sm transition-shadow hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}
