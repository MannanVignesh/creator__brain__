'use client';

import React from 'react';
import { CompatibilityLevel } from '@/types';
import { cn } from '@/lib/utils';

export default function CompatibilityBadge({
    score,
    level
}: {
    score: number;
    level: CompatibilityLevel
}) {
    const styles = {
        high: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
        good: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
        moderate: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
        low: 'text-red-400 bg-red-400/10 border-red-400/20'
    };

    const emoji = {
        high: '🔥',
        good: '✅',
        moderate: '⚠️',
        low: '❌'
    };

    const label = {
        high: 'High Fit',
        good: 'Good Fit',
        moderate: 'Moderate Fit',
        low: 'Low Fit'
    };

    return (
        <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold",
            styles[level]
        )}>
            <span>{emoji[level]}</span>
            <span className="uppercase tracking-wider">{label[level]}</span>
            <span className="opacity-50">•</span>
            <span>{score}%</span>
        </div>
    );
}
