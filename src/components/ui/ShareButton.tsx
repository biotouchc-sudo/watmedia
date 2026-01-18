'use client'

import { Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonProps {
    title: string
    text?: string
    url: string
    className?: string
    size?: number
}

export function ShareButton({ title, text, url, className, size = 16 }: ShareButtonProps) {
    const handleShare = async () => {
        const shareData = { title, text, url }

        if (navigator.share && navigator.canShare?.(shareData)) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                // User cancelled or error
                if ((err as Error).name !== 'AbortError') {
                    console.error('Share failed:', err)
                }
            }
        } else {
            // Fallback: copy URL to clipboard
            try {
                await navigator.clipboard.writeText(url)
                alert('تم نسخ الرابط!')
            } catch {
                // Last resort: prompt
                prompt('انسخ هذا الرابط:', url)
            }
        }
    }

    return (
        <button
            onClick={handleShare}
            className={cn(
                "p-2 hover:bg-white/10 rounded-lg transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-[var(--wat-primary)]/50",
                className
            )}
            aria-label="مشاركة"
            title="مشاركة"
        >
            <Share2 size={size} className="text-[var(--wat-text-muted)]" />
        </button>
    )
}
