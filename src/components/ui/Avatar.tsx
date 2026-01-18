import { cn } from '@/lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string
    alt?: string
    fallback?: string
    size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
}

function Avatar({ src, alt, fallback, size = 'md', className, ...props }: AvatarProps) {
    const initials = fallback || alt?.charAt(0)?.toUpperCase() || '?'

    return (
        <div
            className={cn(
                'relative flex shrink-0 overflow-hidden rounded-full bg-[var(--wat-surface)]',
                sizeClasses[size],
                className
            )}
            {...props}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt || 'Avatar'}
                    className="aspect-square h-full w-full object-cover"
                />
            ) : (
                <span className="flex h-full w-full items-center justify-center bg-[var(--wat-primary)] text-white font-medium">
                    {initials}
                </span>
            )}
        </div>
    )
}

export { Avatar }
