'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Brain,
    TrendingUp,
    Users,
    Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCreatorStore } from '@/lib/store';

const navItems = [
    { label: 'Home', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'DNA', icon: Brain, href: '/analyze' },
    { label: 'Settings', icon: Settings, href: '/settings' },
];

export default function BottomNav() {
    const pathname = usePathname();
    const { notifications } = useCreatorStore();
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#0A0A0F]/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-2 z-50">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl transition-all relative",
                            isActive ? "text-yellow-400" : "text-zinc-500"
                        )}
                    >
                        <item.icon className={cn("w-6 h-6", isActive && "animate-pulse-slow")} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                        {isActive && (
                            <div className="absolute -top-3 w-1 h-1 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                        )}
                    </Link>
                );
            })}
        </div>
    );
}
