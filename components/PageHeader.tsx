'use client';

import React from 'react';
import { Search, Info, TrendingUp, Filter } from 'lucide-react';

export default function PageHeader({
    title,
    subtitle,
    description,
    actions
}: {
    title: string;
    subtitle?: string;
    description?: string;
    actions?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
                {subtitle && (
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-3 rounded-full bg-yellow-500" />
                        <span className="text-[10px] uppercase font-black tracking-widest text-yellow-400">{subtitle}</span>
                    </div>
                )}
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">{title}</h1>
                {description && (
                    <p className="text-zinc-500 text-sm max-w-2xl leading-relaxed">{description}</p>
                )}
            </div>
            {actions && (
                <div className="flex items-center gap-3">
                    {actions}
                </div>
            )}
        </div>
    );
}
