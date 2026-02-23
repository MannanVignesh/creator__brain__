'use client';

import React from 'react';
import { heatmapColor } from '@/lib/utils';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = ['00', '03', '06', '09', '12', '15', '18', '21'];

export default function HeatmapGrid({ data }: { data: number[][] }) {
    // Find max rate for scaling colors
    const maxRate = Math.max(...data.flat(), 1);

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[600px]">
                <div className="flex mb-4">
                    <div className="w-12 shrink-0" />
                    <div className="flex-1 flex justify-between px-2">
                        {HOURS.map(h => (
                            <span key={h} className="text-[10px] text-zinc-500 font-bold">{h}:00</span>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    {data.map((dayRow, d) => (
                        <div key={d} className="flex items-center gap-2">
                            <span className="w-12 text-[10px] text-zinc-500 font-bold uppercase">{DAYS[d]}</span>
                            <div className="flex-1 flex gap-1 h-8">
                                {dayRow.map((rate, h) => (
                                    <div
                                        key={h}
                                        className="flex-1 rounded-sm transition-all hover:ring-1 hover:ring-purple-400 group relative"
                                        style={{ backgroundColor: heatmapColor(rate, maxRate) }}
                                    >
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-zinc-900 border border-white/10 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                                            {rate}% engagement
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
