'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export default function GlassCard({
    children,
    className,
    title,
    subtitle,
    icon: Icon
}: {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
    icon?: any;
}) {
    return (
        <div className={cn("glass-card overflow-hidden", className)}>
            {(title || subtitle || Icon) && (
                <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center">
                    <div>
                        {title && <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">{title}</h3>}
                        {subtitle && <p className="text-[10px] text-zinc-500 font-medium">{subtitle}</p>}
                    </div>
                    {Icon && <Icon className="w-4 h-4 text-yellow-500" />}
                </div>
            )}
            <div className="p-5">
                {children}
            </div>
        </div>
    );
}
