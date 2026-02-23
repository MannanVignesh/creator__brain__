'use client';

import React from 'react';
import { LucideIcon, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import CTAButton from './CTAButton';
import Link from 'next/link';

export default function EmptyState({
    title,
    description,
    icon: Icon = HelpCircle,
    actionLabel,
    actionHref,
    className
}: {
    title: string;
    description: string;
    icon?: LucideIcon;
    actionLabel?: string;
    actionHref?: string;
    className?: string;
}) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center text-center p-12 glass-card border-dashed border-white/10",
            className
        )}>
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 text-zinc-500">
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-zinc-500 max-w-sm mb-8 leading-relaxed">
                {description}
            </p>
            {actionLabel && actionHref && (
                <Link href={actionHref}>
                    <CTAButton className="px-8">{actionLabel}</CTAButton>
                </Link>
            )}
        </div>
    );
}
