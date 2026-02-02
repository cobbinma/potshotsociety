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
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border-2 shadow-sm',
        {
          'bg-primary/20 text-primary border-primary/30': variant === 'default',
          'bg-secondary/20 text-secondary border-secondary/30': variant === 'secondary',
        },
        className
      )}
    >
      {children}
    </span>
  )
}

export function CategoryBadge({ category }: { category: string }) {
  return <Badge className="hover:scale-110 transition-transform cursor-default">✨ {getCategoryTitle(category)}</Badge>
}
