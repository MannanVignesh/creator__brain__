'use client';

import React from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer
} from 'recharts';
import { RadarScores } from '@/types';

export default function CreatorRadarChart({ scores }: { scores: RadarScores }) {
    const data = [
        { subject: 'Entertainment', A: scores.entertainment, fullMark: 100 },
        { subject: 'Education', A: scores.education, fullMark: 100 },
        { subject: 'Inspiration', A: scores.inspiration, fullMark: 100 },
        { subject: 'Relatability', A: scores.relatability, fullMark: 100 },
    ];

    return (
        <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#ffffff10" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                    />
                    <Radar
                        name="Creator DNA"
                        dataKey="A"
                        stroke="#7C3AED"
                        fill="#7C3AED"
                        fillOpacity={0.5}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
