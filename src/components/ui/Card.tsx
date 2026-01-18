import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'bordered'
    hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'glass', hover = true, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-2xl p-6 transition-all duration-300',
                    variant === 'glass' && 'glass border border-[var(--wat-glass-border)] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-xl',
                    variant === 'bordered' && 'border border-[var(--wat-glass-border)] bg-transparent',
                    variant === 'default' && 'bg-[var(--wat-surface)] border border-white/5',
                    hover && 'hover:border-[var(--wat-primary)]/50 hover:shadow-[0_0_30px_rgba(0,242,254,0.1)] hover:-translate-y-1',
                    className
                )}
                {...props}
            />
        )
    }
)
Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('mb-4', className)} {...props} />
    )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3 ref={ref} className={cn('text-xl font-semibold text-[var(--wat-secondary)]', className)} {...props} />
    )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={cn('text-sm text-[var(--wat-text-muted)]', className)} {...props} />
    )
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('', className)} {...props} />
    )
)
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
