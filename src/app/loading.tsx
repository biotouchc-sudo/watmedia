export default function Loading() {
    return (
        <div className="min-h-screen bg-[var(--wat-background)] flex items-center justify-center">
            <div className="text-center">
                {/* Animated Logo */}
                <div className="relative inline-block mb-8">
                    <div className="text-4xl font-bold gradient-text animate-pulse">
                        WATMEDIA
                    </div>
                    <div className="absolute -inset-4 bg-[var(--wat-primary)] opacity-20 blur-3xl rounded-full animate-pulse" />
                </div>

                {/* Loading Spinner */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-[var(--wat-glass-border)]" />
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--wat-primary)] animate-spin" />
                    </div>
                </div>

                {/* Loading Text */}
                <p className="text-[var(--wat-text-muted)] text-sm animate-pulse">
                    جاري التحميل...
                </p>
            </div>
        </div>
    )
}
