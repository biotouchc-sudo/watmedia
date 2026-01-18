'use client'

import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="dark"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        'group toast group-[.toaster]:bg-[var(--wat-surface)] group-[.toaster]:text-white group-[.toaster]:border-[var(--wat-glass-border)] group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl',
                    description: 'group-[.toast]:text-[var(--wat-text-muted)]',
                    actionButton:
                        'group-[.toast]:bg-[var(--wat-primary)] group-[.toast]:text-white',
                    cancelButton:
                        'group-[.toast]:bg-[var(--wat-surface)] group-[.toast]:text-[var(--wat-text-muted)]',
                    success: 'group-[.toaster]:border-green-500/30',
                    error: 'group-[.toaster]:border-red-500/30',
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
