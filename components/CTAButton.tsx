'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function CTAButton({ children, className, ...props }: CTAButtonProps) {
    return (
        <button
            className={cn(
                "btn-primary",
                className
            )}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </button>
    );
}
