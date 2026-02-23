'use client';

import React, { useState } from 'react';
import { Suggestion } from '@/types';
import SuggestionCard from './SuggestionCard';
import { motion } from 'framer-motion';

export default function SuggestionsGrid({ suggestions }: { suggestions: Suggestion[] }) {
    const [selected, setSelected] = useState<Suggestion | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions?.map((s, i) => (
                    <motion.div
                        key={s.id || i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelected(s)}
                    >
                        <SuggestionCard suggestion={s} onClick={() => setSelected(s)} />
                    </motion.div>
                )) || <div className="col-span-full py-10 text-center text-zinc-500 italic">No suggestions available at this time.</div>}
            </div>

            {selected && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="bg-[#0F0F1A] border border-white/[0.08] rounded-xl p-5 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-[0_0_40px_rgba(234,179,8,0.1)]"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Score + format */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-yellow-400 font-bold text-lg">
                                {selected.compatibility_score}% Match
                            </span>
                            <span className="text-xs text-zinc-400 px-2 py-1 rounded-full border border-zinc-700">
                                {selected.format}
                            </span>
                        </div>

                        {/* Full title */}
                        <h2 className="text-white text-xl font-bold mb-3">{selected.title}</h2>

                        {/* Full concept - no truncation */}
                        <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                            {selected.concept}
                        </p>

                        {/* Hook */}
                        <div className="rounded-xl bg-yellow-500/5 border border-yellow-500/20 p-4 mb-4">
                            <p className="text-xs text-yellow-500/70 mb-1 uppercase tracking-wider">
                                Caption Hook
                            </p>
                            <p className="text-yellow-300 italic">&quot;{selected.hook}&quot;</p>
                        </div>

                        {/* Why it fits */}
                        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 mb-4">
                            <p className="text-xs text-green-500/70 mb-1 uppercase tracking-wider">
                                Why This Works For You
                            </p>
                            <p className="text-green-300 text-sm">{selected.why_it_fits}</p>
                        </div>

                        {/* Posting tips */}
                        <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4 mb-4">
                            <p className="text-xs text-cyan-500/70 mb-1 uppercase tracking-wider">
                                Execution Tips
                            </p>
                            <p className="text-cyan-300 text-sm">{selected.execution_tips || 'Not enough data'}</p>
                        </div>

                        {/* Hashtags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {(selected.hashtags || []).map((tag, i) => (
                                <span key={i} className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    #{tag.replace('#', '')}
                                </span>
                            ))}
                        </div>

                        {/* Close */}
                        <button
                            onClick={() => setSelected(null)}
                            className="w-full py-2 rounded-xl border border-zinc-700 text-zinc-400 hover:border-yellow-500/50 hover:text-yellow-400 transition-all duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
