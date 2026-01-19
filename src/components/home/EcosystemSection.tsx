"use client";

import { Kinetic } from "@/components/ui/Kinetic";
import { SmartLink } from "@/components/ui/SmartLink";
import { GlassCard } from "@/components/ui/GlassCard";

const features = [
    {
        title: "Adaptive Architecture",
        description: "Systems that scale automatically with your traffic.",
        metric: "99.99%",
        label: "Uptime"
    },
    {
        title: "Neural Search",
        description: "AI-driven content discovery engine.",
        metric: "12ms",
        label: "Latency"
    },
    {
        title: "Fluid Design",
        description: "Interfaces that feel biological, not mechanical.",
        metric: "60fps",
        label: "Motion"
    },
    {
        title: "Edge Security",
        description: "Government-grade encryption at the edge.",
        metric: "Zero",
        label: "Breaches"
    }
];

export function EcosystemSection() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <Kinetic.Root stagger={0.15} className="flex flex-col gap-16">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-[var(--wat-glass-border)] pb-8">
                    <div className="max-w-2xl">
                        <Kinetic.Block standard="confident">
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">
                                OPERATION <span className="text-[var(--wat-primary)]">ECLIPSE</span>
                            </h2>
                        </Kinetic.Block>
                        <Kinetic.Block standard="subtle">
                            <p className="text-xl text-[var(--wat-text-muted)]">
                                An integrated ecosystem of high-performance modules designed to overshadow the competition.
                            </p>
                        </Kinetic.Block>
                    </div>
                    <Kinetic.Block direction="left">
                        <SmartLink href="/services" className="text-lg underline underline-offset-8 decoration-[var(--wat-primary)] hover:text-[var(--wat-primary)] transition-colors">
                            Explore The System
                        </SmartLink>
                    </Kinetic.Block>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, i) => (
                        <Kinetic.Block key={i} standard="subtle">
                            <GlassCard
                                className="p-8 h-64 flex flex-col justify-between group hover:border-[var(--wat-primary)]/50 transition-colors duration-500"
                                spotlightColor="rgba(230, 213, 172, 0.2)"
                            >
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-[var(--wat-primary)] transition-colors">{item.title}</h3>
                                    <p className="text-[var(--wat-text-muted)] text-sm">{item.description}</p>
                                </div>
                                <div className="flex flex-col relative z-10">
                                    <span className="text-4xl font-mono text-[var(--wat-primary)]">{item.metric}</span>
                                    <span className="text-xs uppercase tracking-widest text-[var(--wat-text-muted)]">{item.label}</span>
                                </div>
                            </GlassCard>
                        </Kinetic.Block>
                    ))}
                </div>

            </Kinetic.Root>
        </section>
    );
}
