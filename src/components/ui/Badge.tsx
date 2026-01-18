import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-[var(--wat-primary)] text-white',
                secondary: 'bg-[var(--wat-secondary)] text-black',
                outline: 'border border-[var(--wat-glass-border)] text-[var(--wat-text)]',
                success: 'bg-green-500/20 text-green-400 border border-green-500/30',
                warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
                error: 'bg-red-500/20 text-red-400 border border-red-500/30',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <span className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
