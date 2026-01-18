'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
    text: string
    className?: string
    size?: number
}

export function CopyButton({ text, className, size = 16 }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    return (
        <button
            onClick={handleCopy}
            className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-[var(--wat-primary)]/50",
                className
            )}
            aria-label={copied ? 'تم النسخ' : 'نسخ'}
            title={copied ? 'تم النسخ!' : 'نسخ للحافظة'}
        >
            {copied ? (
                <Check size={size} className="text-green-500" />
            ) : (
                <Copy size={size} className="text-[var(--wat-text-muted)]" />
            )}
        </button>
    )
}
