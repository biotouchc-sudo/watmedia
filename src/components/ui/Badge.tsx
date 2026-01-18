import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-[var(--wat-primary)] text-white hover:bg-[var(--wat-primary)]/80',
                secondary: 'bg-[var(--wat-secondary)] text-black hover:bg-[var(--wat-secondary)]/80',
                outline: 'border border-[var(--wat-glass-border)] text-[var(--wat-text)]',
                success: 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]',
                warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_10px_rgba(250,204,21,0.1)]',
                error: 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(248,113,113,0.1)]',
                supreme: 'bg-gradient-to-r from-[var(--wat-primary)] to-[var(--wat-secondary)] text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] border border-white/20 animate-pulse-slow',
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
