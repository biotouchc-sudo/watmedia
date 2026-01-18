import { Skeleton } from "@/components/ui/Skeleton"

export function SkeletonCard() {
    return (
        <div className="rounded-xl border border-[var(--wat-glass-border)] bg-[var(--wat-glass-bg)] p-6 space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2 pt-4">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
            </div>
        </div>
    )
}
