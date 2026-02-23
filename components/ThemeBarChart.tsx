'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

export interface ThemeWithCount { name: string; value: number }

export default function ThemeBarChart({ themeData = [] }: { themeData: ThemeWithCount[] }) {
    if (!themeData || themeData.length === 0) {
        return (
            <div className="w-full h-[250px] flex items-center justify-center bg-white/5 rounded-xl border border-white/5 italic text-xs text-zinc-500">
                No themes identified from captions.
            </div>
        );
    }

    const maxVal = Math.max(...themeData.map(d => d.value));
    const data = themeData.map(d => ({
        name: d.name,
        value: d.value,
        pct: maxVal > 0 ? Math.round((d.value / maxVal) * 100) : 0
    }));

    const COLORS = ['#EAB308', '#CA8A04', '#A16207', '#854D0E', '#713F12'];

    return (
        <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }}
                        width={80}
                    />
                    <Tooltip
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{
                            backgroundColor: '#0A0A0F',
                            border: '1px solid #ffffff10',
                            borderRadius: '8px'
                        }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={24}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
