'use client';

import React from 'react';
import {
    Layout,
    Lightbulb,
    CheckCircle2,
    TrendingUp,
    Target
} from 'lucide-react';
import OpportunityScore from './OpportunityScore';

export default function GapAnalysisCard({ analysis }: { analysis: any }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card p-8">
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                        <Layout className="w-6 h-6 text-purple-600" />
                        Content Gap Results
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section>
                            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                                <Target className="w-3.5 h-3.5" /> Missing Formats
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {analysis.missing_formats.map((f: string) => (
                                    <span key={f} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-3.5 h-3.5" /> Competitor Strengths
                            </h4>
                            <ul className="space-y-2">
                                {analysis.competitor_strengths.map((s: string, i: number) => (
                                    <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                                        <div className="w-1 h-1 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5">
                        <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                            <Lightbulb className="w-3.5 h-3.5" /> Top Recommendation
                        </h4>
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-sm font-bold leading-relaxed">
                            "{analysis.top_recommendation}"
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
                        <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6">Market Opportunity</h4>
                        <OpportunityScore score={analysis.opportunity_score} />
                        <p className="mt-6 text-[10px] text-zinc-500 max-w-[180px]">
                            A higher score indicates a larger gap between your content and the competitor reference, suggesting high growth potential for new formats.
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Underused Themes</h4>
                        <div className="space-y-2">
                            {analysis.underused_themes.map((t: string, i: number) => (
                                <div key={i} className="text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-zinc-300">
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
