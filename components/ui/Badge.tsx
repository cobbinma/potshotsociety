import { cn } from '@/lib/utils'
import { getCategoryTitle } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'secondary'
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-primary/10 text-primary': variant === 'default',
          'bg-secondary/10 text-secondary': variant === 'secondary',
        },
        className
      )}
    >
      {children}
    </span>
  )
}

export function CategoryBadge({ category }: { category: string }) {
  return <Badge>{getCategoryTitle(category)}</Badge>
}
