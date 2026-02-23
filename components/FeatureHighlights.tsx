'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Zap } from 'lucide-react';

const features = [
    {
        title: 'Content DNA Analysis',
        description: 'Understand exactly what content formats your audience responds to',
        icon: Zap,
    },
    {
        title: 'Trend Matching',
        description: 'Get trends filtered specifically for your niche and content style',
        icon: TrendingUp,
    },
    {
        title: 'Growth Intelligence',
        description: 'Personalized posting strategy based on your real engagement patterns',
        icon: Brain,
    }
];

export default function FeatureHighlights() {
    return (
        <section id="features" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-6 flex flex-col items-start group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 border border-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
