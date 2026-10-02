'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLandingPage = pathname === '/';

    if (isLandingPage) {
        return <main>{children}</main>;
    }

    return (
        <div className="theme-inside flex h-screen bg-[#050505] text-white overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Background Decor */}
                <div className="page-glow" />
                <div className="ambient-blob-1" />
                <div className="ambient-blob-2" />
                <div className="absolute inset-0 grid-overlay opacity-20" />

                <main className="flex-1 overflow-y-auto pb-24 md:pb-8 relative z-10">
                    <AnimatePresence mode="wait">
                        <PageTransition key={pathname}>
                            {children}
                        </PageTransition>
                    </AnimatePresence>
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden">
                <BottomNav />
            </div>
        </div>
    );
}
