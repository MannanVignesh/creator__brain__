'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Search, Target, Layout, Sparkles, CheckCircle2 } from 'lucide-react';

const steps = [
    { id: 1, label: 'Reading your content patterns...', icon: Brain },
    { id: 2, label: 'Scanning trend database...', icon: Search },
    { id: 3, label: 'Calculating compatibility scores...', icon: Target },
    { id: 4, label: 'Building your Creator DNA...', icon: Layout },
    { id: 5, label: 'Generating personalized strategy...', icon: Sparkles },
];

export default function AnalysisLoader({ step }: { step: number }) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        setCurrentStep(step);
    }, [step]);

    return (
        <div className="max-w-md mx-auto w-full py-12 px-6">
            <div className="text-center mb-12">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                >
                    <Brain className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Analyzing Profile</h2>
                <p className="text-zinc-500 text-sm">One moment while we process your data...</p>
            </div>

            <div className="space-y-4">
                {steps.map((s, idx) => {
                    const isDone = currentStep > s.id;
                    const isCurrent = currentStep === s.id;
                    const isPending = currentStep < s.id;

                    return (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${isCurrent ? 'bg-purple-600/10 border-purple-600/30 ring-1 ring-purple-600/20' :
                                    isDone ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/5 border-white/5 opacity-50'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500 ${isCurrent ? 'bg-purple-600 text-white' :
                                    isDone ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-500'
                                }`}>
                                {isDone ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`text-sm font-semibold transition-colors duration-500 ${isCurrent ? 'text-white' : isDone ? 'text-emerald-400' : 'text-zinc-500'
                                        }`}>
                                        {s.label}
                                    </span>
                                    {isCurrent && (
                                        <span className="text-[10px] uppercase tracking-wider text-purple-400 font-bold animate-pulse">Running</span>
                                    )}
                                </div>

                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: isDone ? '100%' : isCurrent ? '60%' : '0%' }}
                                        transition={{ duration: isCurrent ? 1.5 : 0.5, ease: "easeInOut" }}
                                        className={`h-full rounded-full ${isDone ? 'bg-emerald-500' : 'bg-purple-600'}`}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
