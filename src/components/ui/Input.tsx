import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, type = 'text', ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="block text-sm font-medium text-[var(--wat-text)]">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={cn(
                        'flex h-12 w-full rounded-xl border bg-[var(--wat-surface)]/50 px-4 py-2 text-base text-[var(--wat-text)] placeholder:text-[var(--wat-text-muted)] transition-all duration-300',
                        'border-white/10 focus:border-[var(--wat-primary)] focus:bg-[var(--wat-surface)] focus:ring-4 focus:ring-[var(--wat-primary)]/10 focus:outline-none focus:shadow-[0_0_20px_rgba(245,158,11,0.1)]',
                        'disabled:cursor-not-allowed disabled:opacity-50 hover:border-[var(--wat-primary)]/50',
                        error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="block text-sm font-medium text-[var(--wat-text)]">
                        {label}
                    </label>
                )}
                <textarea
                    className={cn(
                        'flex min-h-[120px] w-full rounded-xl border bg-[var(--wat-surface)] px-4 py-3 text-base text-[var(--wat-text)] placeholder:text-[var(--wat-text-muted)] transition-all duration-200 resize-none',
                        'border-[var(--wat-glass-border)] focus:border-[var(--wat-primary)] focus:ring-2 focus:ring-[var(--wat-primary)]/20 focus:outline-none',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}
            </div>
        )
    }
)
Textarea.displayName = 'Textarea'

export { Input, Textarea }
