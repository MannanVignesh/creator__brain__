'use client';

import React from 'react';
import { Suggestion } from '@/types';
import { cn } from '@/lib/utils';

export default function SuggestionCard({ suggestion, onClick }: { suggestion: Suggestion, onClick?: () => void }) {
    const score = suggestion.compatibility_score;

    return (
        <div
            onClick={onClick}
            className="rounded-xl p-5 border border-white/[0.08] bg-[#0F0F1A] hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] transition-all duration-300 cursor-pointer flex flex-col h-full group"
        >
            {/* Score badge */}
            <div className="flex justify-between items-start mb-3">
                <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full border font-bold bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                )}>
                    {score}% Match
                </span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase">{suggestion.format}</span>
            </div>

            <h3 className="text-white font-bold mb-2 font-jakarta leading-tight group-hover:text-yellow-400 transition-colors">
                {suggestion.title}
            </h3>

            <p className="text-xs text-zinc-400 mb-4 line-clamp-2 leading-relaxed">{suggestion.concept}</p>

            {/* Hook */}
            <div className="rounded-lg bg-yellow-500/5 border border-yellow-500/10 p-3 mb-4">
                <p className="text-[10px] text-yellow-500/70 font-bold uppercase tracking-wider mb-1">Suggested Hook</p>
                <p className="text-sm text-yellow-300 italic leading-snug">&quot;{suggestion.hook}&quot;</p>
            </div>

            {/* Why it fits */}
            <p className="text-[10px] text-zinc-500 mb-4 italic line-clamp-2">{suggestion.why_it_fits}</p>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-1 mt-auto">
                {suggestion.hashtags?.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        #{tag.replace('#', '')}
                    </span>
                ))}
            </div>
        </div>
    );
}
