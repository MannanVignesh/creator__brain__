'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export default function LoadingSkeleton({
    className,
    variant = 'rect'
}: {
    className?: string;
    variant?: 'rect' | 'circle' | 'text'
}) {
    return (
        <div className={cn(
            "skeleton",
            variant === 'circle' && "rounded-full",
            variant === 'text' && "h-4 rounded-sm",
            className
        )} />
    );
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <LoadingSkeleton className="h-8 w-48" variant="text" />
                    <LoadingSkeleton className="h-4 w-64" variant="text" />
                </div>
                <LoadingSkeleton className="h-10 w-32 rounded-xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <LoadingSkeleton key={i} className="h-24 rounded-2xl" />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <LoadingSkeleton className="h-[400px] rounded-2xl" />
                <LoadingSkeleton className="h-[400px] rounded-2xl" />
            </div>
        </div>
    );
}
