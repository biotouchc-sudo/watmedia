import { SkeletonCard } from "@/components/skeletons/SkeletonCard";

export default function Loading() {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="space-y-4">
                <div className="h-10 w-48 bg-[var(--wat-glass-border)]/50 rounded-lg animate-pulse" />
                <div className="h-4 w-96 bg-[var(--wat-glass-border)]/50 rounded-lg animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}
