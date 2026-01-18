import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
    max?: number
}

function Progress({ value = 0, max = 100, className, ...props }: ProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
        <div
            className={cn(
                'relative h-2 w-full overflow-hidden rounded-full bg-[var(--wat-surface)]',
                className
            )}
            {...props}
        >
            <div
                className="h-full w-full flex-1 bg-[var(--wat-primary)] transition-all duration-300"
                style={{ transform: `translateX(-${100 - percentage}%)` }}
            />
        </div>
    )
}

export { Progress }
