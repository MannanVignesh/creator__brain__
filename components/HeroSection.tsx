'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
    const [username, setUsername] = useState('');

    const handleAnalyze = () => {
        if (username) {
            window.location.href = `/analyze?username=${username.replace('@', '')}`;
        }
    };

    return (
        <section className="relative px-6 pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
            {/* Soft Cyan Radial Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] pointer-events-none z-0 opacity-50"
                style={{
                    background: 'radial-gradient(circle at center, rgba(6,182,212,0.15) 0%, transparent 70%)'
                }}
            />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-8">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI-Powered Creator Intelligence</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                    Know exactly what to post.<br />
                    <span className="text-cyan-400">Before you post it.</span>
                </h1>

                {/* Subtext */}
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                    Enter your Instagram handle and get a personalized content strategy built from your real data. No guesswork. No generic advice.
                </p>

                {/* Input Area */}
                <div className="max-w-md mx-auto">
                    <div className="relative flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1 group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-cyan-500 transition-colors">
                                <span className="text-lg font-bold">@</span>
                            </div>
                            <input
                                type="text"
                                placeholder="instagram_username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-[#12121A] border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all font-medium"
                                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                            />
                        </div>
                        <button
                            onClick={handleAnalyze}
                            className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-base"
                        >
                            Analyze <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
