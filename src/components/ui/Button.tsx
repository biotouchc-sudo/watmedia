import * as React from "react"
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200",
    {
        variants: {
            variant: {
                default: "bg-[var(--wat-primary)] text-primary-foreground hover:bg-[var(--wat-primary)]/90 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-[var(--wat-glass-border)] bg-background hover:bg-[var(--wat-glass-highlight)] hover:text-accent-foreground backdrop-blur-sm",
                secondary:
                    "bg-[var(--wat-secondary)] text-secondary-foreground hover:bg-[var(--wat-secondary)]/80 shadow-[0_0_20px_rgba(0,242,254,0.3)]",
                ghost: "hover:bg-accent hover:text-accent-foreground hover:bg-[var(--wat-glass-highlight)]",
                link: "text-primary underline-offset-4 hover:underline",
                supreme: "bg-gradient-to-r from-[var(--wat-primary)] to-[var(--wat-secondary)] text-black font-bold shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(0,242,254,0.6)] hover:scale-105 border border-white/20",
                glass: "glass border border-[var(--wat-glass-border)] hover:bg-[var(--wat-glass-highlight)] text-white hover:border-[var(--wat-primary)]",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-12 rounded-lg px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

