import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-bold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95',
        {
          'bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary shadow-lg hover:shadow-xl': variant === 'default',
          'border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg': variant === 'outline',
          'hover:bg-accent/50 text-foreground': variant === 'ghost',
          'h-11 px-6 py-2 text-base': size === 'default',
          'h-9 px-4 text-sm': size === 'sm',
          'h-14 px-10 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  )
}
