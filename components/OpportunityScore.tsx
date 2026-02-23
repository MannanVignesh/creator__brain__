'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function OpportunityScore({ score }: { score: number }) {
    return (
        <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Background Ring */}
            <svg className="w-full h-full -rotate-90">
                <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-white/5"
                />
                {/* Progress Ring */}
                <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={440}
                    initial={{ strokeDashoffset: 440 }}
                    animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-purple-600 drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]"
                    strokeLinecap="round"
                />
            </svg>

            <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black">{score}</span>
                <span className="text-[10px] uppercase font-bold text-zinc-500">SCORE</span>
            </div>

            {/* Glow Effects */}
            <div className="absolute inset-4 rounded-full border border-purple-500/20 pointer-events-none" />
            <div className="absolute inset-0 bg-purple-600/5 blur-2xl rounded-full pointer-events-none" />
        </div>
    );
}
