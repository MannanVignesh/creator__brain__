'use client';

import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip
} from 'recharts';
import { Post, PostType } from '@/types';
import { postTypeColor, postTypeLabel } from '@/lib/utils';

export default function PostTypePieChart({ posts = [] }: { posts: Post[] }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="w-full h-[250px] flex items-center justify-center bg-white/5 rounded-xl border border-white/5 italic text-xs text-zinc-500">
                No format data available.
            </div>
        );
    }

    const counts = posts.reduce((acc, p) => {
        acc[p.type] = (acc[p.type] || 0) + 1;
        return acc;
    }, {} as Record<PostType, number>);

    const data = Object.entries(counts).map(([type, value]) => ({
        name: postTypeLabel(type as PostType),
        value,
        color: postTypeColor(type as PostType)
    }));

    return (
        <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0A0A0F',
                            border: '1px solid #ffffff10',
                            borderRadius: '8px'
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => <span className="text-xs text-zinc-400 font-medium">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
