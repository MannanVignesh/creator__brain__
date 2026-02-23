'use client';

import React from 'react';
import { NicheType } from '@/types';
import { NICHE_LABELS } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function NicheSelector({
    selected,
    onSelect
}: {
    selected: NicheType;
    onSelect: (n: NicheType) => void
}) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {(Object.keys(NICHE_LABELS) as NicheType[]).map((niche) => (
                <button
                    key={niche}
                    onClick={() => onSelect(niche)}
                    className={cn(
                        "px-4 py-2 rounded-full text-sm font-semibold border transition-all whitespace-nowrap",
                        selected === niche
                            ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/20"
                            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                    )}
                >
                    {NICHE_LABELS[niche]}
                </button>
            ))}
        </div>
    );
}
