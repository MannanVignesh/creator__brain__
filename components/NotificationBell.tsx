'use client';

import React, { useState } from 'react';
import { Bell, X, TrendingUp, Sparkles, Layout } from 'lucide-react';
import { useCreatorStore } from '@/lib/store';
import { cn, daysAgo } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const { notifications, clearNotifications } = useCreatorStore();
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
            >
                <Bell className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-600 ring-2 ring-[#0A0A0F]" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-4 w-80 md:w-96 glass-card border border-purple-500/20 shadow-2xl z-50 overflow-hidden"
                        >
                            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <h3 className="font-bold text-sm">Notifications</h3>
                                <button
                                    onClick={clearNotifications}
                                    className="text-[10px] uppercase font-bold text-zinc-500 hover:text-purple-400 transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                {notifications.length === 0 ? (
                                    <div className="px-6 py-12 text-center">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                            <Bell className="w-5 h-5 text-zinc-600" />
                                        </div>
                                        <p className="text-sm text-zinc-500 font-medium">No new notifications</p>
                                    </div>
                                ) : (
                                    notifications.map((n, i) => (
                                        <div
                                            key={n.id}
                                            className={cn(
                                                "px-6 py-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors flex gap-4 cursor-pointer",
                                                !n.read && "bg-purple-600/[0.02]"
                                            )}
                                        >
                                            <div className="shrink-0 mt-1">
                                                {n.title.includes('Trend') ? <TrendingUp className="w-4 h-4 text-purple-400" /> :
                                                    n.title.includes('Report') ? <Layout className="w-4 h-4 text-cyan-400" /> :
                                                        <Sparkles className="w-4 h-4 text-amber-400" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-white mb-1">{n.title}</p>
                                                <p className="text-xs text-zinc-400 leading-relaxed mb-2">{n.message}</p>
                                                <p className="text-[10px] text-zinc-600 font-bold">{daysAgo(n.timestamp)}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="px-6 py-3 border-t border-white/5 bg-white/[0.02] text-center">
                                <button className="text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest">
                                    View full history
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
