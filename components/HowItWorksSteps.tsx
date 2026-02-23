'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'Enter Username',
        description: 'Type in your public handle to start the analysis process.'
    },
    {
        number: '02',
        title: 'AI Analyzes Content',
        description: 'Our engine patterns your engagement and style from past posts.'
    },
    {
        number: '03',
        title: 'Get Your Strategy',
        description: 'Receive personalized suggestions matched to current market trends.'
    }
];

export default function HowItWorksSteps() {
    return (
        <section id="how-it-works" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    {/* Dotted Line Connection (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-transparent border-t-2 border-dashed border-cyan-500/20 hidden md:block -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center text-center bg-[#0A0A0F] px-4"
                            >
                                <div className="text-4xl font-black text-cyan-500/20 mb-4 tracking-tighter">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-zinc-500 text-sm max-w-[200px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
