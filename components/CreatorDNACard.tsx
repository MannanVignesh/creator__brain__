'use client';

import React from 'react';
import { CreatorDNA } from '@/types';
import { cn } from '@/lib/utils';

export default function CreatorDNACard({ dna }: { dna: CreatorDNA }) {
    if (!dna) return null;

    return (
        <div className="rounded-xl p-5 border border-white/[0.08] bg-gradient-to-br from-yellow-500/5 to-yellow-500/5 shadow-[0_0_30px_rgba(234,179,8,0.08)] relative overflow-hidden">
            {/* Background glow accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.3)] text-xl">
                    🧬
                </div>
                <div>
                    <p className="text-[10px] text-yellow-400 uppercase tracking-widest font-bold">
                        Creator Archetype
                    </p>
                    <h2 className="text-2xl font-bold text-white font-jakarta">
                        {dna.archetype}
                    </h2>
                </div>
            </div>

            {/* Niche badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-6 relative z-10">
                <span className="text-yellow-400 text-xs font-bold">
                    Detected Niche: {dna.detected_niche}
                </span>
                <div className="w-1 h-1 rounded-full bg-zinc-600" />
                <span className="text-[10px] text-zinc-500">
                    {dna.confidence}% confidence
                </span>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                <MetricBox label="Avg Engagement" value={`${dna.engagement_rate}%`} />
                <MetricBox label="Best Format" value={dna.best_post_type === 'REEL' ? '🎬 Reel' : dna.best_post_type === 'CAROUSEL_ALBUM' ? '📸 Carousel' : '🖼 Photo'} />
                <MetricBox label="Ideal Duration" value={dna.ideal_duration} />
                <MetricBox label="Best Time" value={dna.best_time} />
            </div>

            {/* Strengths */}
            <div className="mb-6 relative z-10">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-3">
                    Content Strengths
                </p>
                <div className="space-y-2">
                    {dna.strengths?.map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="text-green-500 text-xs">✦</span>
                            <span className="text-sm text-zinc-300">{s}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Growth areas */}
            <div className="relative z-10">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-3">
                    Growth Areas
                </p>
                <div className="space-y-2">
                    {dna.weaknesses?.map((w, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="text-red-400 text-xs">▲</span>
                            <span className="text-sm text-zinc-300">{w}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MetricBox({ label, value }: { label: string, value: string }) {
    return (
        <div className={cn(
            "p-3 rounded-xl border border-white/[0.08] bg-white/[0.02]"
        )}>
            <p className="text-[10px] text-zinc-500 font-bold mb-0.5">{label}</p>
            <p className="text-sm font-bold truncate font-jakarta text-cyan-400">{value}</p>
        </div>
    );
}
