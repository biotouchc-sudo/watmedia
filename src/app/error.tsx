'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error)
    }, [error])

    return (
        <div className="min-h-screen bg-[var(--wat-background)] flex items-center justify-center px-6">
            <div className="text-center max-w-lg">
                {/* Error Icon */}
                <div className="text-8xl mb-6">⚠️</div>

                {/* Title */}
                <h1 className="text-4xl font-bold gradient-text mb-4">
                    حدث خطأ!
                </h1>

                {/* Message */}
                <p className="text-[var(--wat-text-muted)] mb-8">
                    عذراً، حدث خطأ غير متوقع. فريقنا يعمل على حله.
                    يمكنك المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
                </p>

                {/* Error Details (Development Only) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="glass p-4 rounded-xl mb-8 text-left">
                        <p className="text-xs text-red-400 font-mono break-all">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-xs text-[var(--wat-text-muted)] mt-2">
                                Digest: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-8 py-4 bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white font-medium rounded-full transition-all duration-300 glow"
                    >
                        حاول مرة أخرى
                    </button>
                    <Link
                        href="/"
                        className="px-8 py-4 glass rounded-full font-medium text-[var(--wat-text)] hover:border-[var(--wat-primary)] transition-all duration-300"
                    >
                        العودة للرئيسية
                    </Link>
                </div>
            </div>
        </div>
    )
}
