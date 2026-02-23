'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import { Post } from '@/types';
import { formatDate } from '@/lib/utils';

export default function EngagementLineChart({ posts = [] }: { posts: Post[] }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="w-full h-[300px] flex items-center justify-center bg-white/5 rounded-xl border border-white/5 italic text-xs text-zinc-500">
                No performance data available.
            </div>
        );
    }

    const data = [...posts]
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map(p => ({
            date: formatDate(p.timestamp),
            rate: p.engagement_rate || 0,
        }));

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 10 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 10 }}
                        tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0A0A0F',
                            border: '1px solid #ffffff10',
                            borderRadius: '8px'
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="rate"
                        stroke="#7C3AED"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRate)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
