'use client';

import React, { useEffect, useState } from 'react';
import AppShell from '@/components/AppShell';
import PageHeader from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import { useCreatorStore } from '@/lib/store';
import {
    TrendingUp,
    Users,
    Zap,
    Repeat,
    Sparkles,
    AlertCircle,
    LayoutDashboard,
    Clock
} from 'lucide-react';
import ThemeBarChart from '@/components/ThemeBarChart';
import EmptyState from '@/components/EmptyState';
import {
    calculateTotalReach,
    calculateConsistency,
    calculateEngagementRate,
    realEngagementRateFromPosts,
    bestPostingTimeSlotDetail,
    extractContentThemes,
    type ThemeWithCount
} from '@/lib/dna-engine';
import { formatNumber, cn } from '@/lib/utils';
import Link from 'next/link';
import { Post } from '@/types';

export default function DashboardPage() {
    const { profile, dna } = useCreatorStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    if (!profile) {
        return (
            <AppShell>
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <EmptyState
                        title="No Creator Account Connected"
                        description="Connect your Instagram account to view your intelligence dashboard."
                        actionLabel="Analyze Profile"
                        actionHref="/analyze"
                        icon={LayoutDashboard}
                    />
                </div>
            </AppShell>
        );
    }

    const posts = profile.posts;
    const totalReach = calculateTotalReach(posts);
    const { avgDays, score: consistencyScore } = calculateConsistency(posts);
    const postCount = posts.length;
    const followers = profile.follower_count || 0;

    // Real engagement rate: sum(likes+comments+views) / (posts * followers) * 100
    const realEngagement = realEngagementRateFromPosts(posts, followers);
    const engagementDisplay =
        postCount && followers && realEngagement != null
            ? `${realEngagement.toFixed(2)}%`
            : '—';

    // Best posting time from real timestamps
    const bestTimeDetail = bestPostingTimeSlotDetail(posts);
    const bestTimeLabel = bestTimeDetail
        ? `Your audience engages most on ${bestTimeDetail.label}`
        : 'Need more posts to determine best time';

    // Best format from real data
    const formatScores = posts.reduce((acc: Record<string, number>, p) => {
        const type = p.type === 'REEL' ? '🎬 Reel' : p.type === 'CAROUSEL_ALBUM' ? '📸 Carousel' : '🖼 Photo';
        const rate = p.engagement_rate ?? calculateEngagementRate(p, followers);
        acc[type] = (acc[type] || 0) + rate;
        return acc;
    }, {});
    const formatCounts = posts.reduce((acc: Record<string, number>, p) => {
        const type = p.type === 'REEL' ? '🎬 Reel' : p.type === 'CAROUSEL_ALBUM' ? '📸 Carousel' : '🖼 Photo';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});
    const bestFormatEntry = Object.entries(formatScores).sort((a, b) => b[1] - a[1])[0];
    const bestFormat = bestFormatEntry
        ? `${bestFormatEntry[0]} (avg ${(bestFormatEntry[1] / (formatCounts[bestFormatEntry[0]] || 1)).toFixed(1)}% eng.)`
        : '—';

    // FIX 3: Top and Low Performing Posts Sorting
    const postsWithPerformance = posts.slice(0, 50).map(p => ({
        ...p,
        total_perf: p.likes + (p.video_views ?? p.views ?? 0) + p.comments,
        date: new Date(p.timestamp).toLocaleDateString()
    }));
    const sortedByPerformance = [...postsWithPerformance].sort((a, b) => b.total_perf - a.total_perf);
    const top3 = sortedByPerformance.slice(0, 3);
    const low2 = [...postsWithPerformance].sort((a, b) => a.total_perf - b.total_perf).slice(0, 2);

    // FIX 2: Bar Chart Data Preparation (Post Performance Overview)
    const last10 = postsWithPerformance.slice(0, 10);
    const maxPerf = Math.max(...last10.map(p => p.total_perf), 1);
    const avgPerf = last10.reduce((acc, p) => acc + p.total_perf, 0) / (last10.length || 1);

    // Content themes from real captions only
    const themeData: ThemeWithCount[] = extractContentThemes(posts);

    return (
        <AppShell>
            <div className="max-w-7xl mx-auto px-6 py-6 transition-all">
                <PageHeader
                    title="Dashboard"
                    subtitle={`@${profile.username}`}
                    description="Deep intelligence across your content performance."
                    actions={
                        <Link href="/analyze">
                            <button className="bg-white/5 border border-yellow-500/20 hover:bg-white/10 px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all hover:border-yellow-500/40">
                                <Repeat className="w-4 h-4" /> Re-analyze
                            </button>
                        </Link>
                    }
                />

                <p className="text-[10px] text-zinc-500 mb-4">Based on {postCount} posts analyzed</p>

                {/* Row 1 - 4 metric cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <DashboardMetricCard
                        label="Engagement Rate"
                        value={engagementDisplay}
                        subValue={postCount && followers ? 'Real data' : ''}
                        icon={TrendingUp}
                    />
                    <DashboardMetricCard
                        label="Best Performing Format"
                        value={bestFormat}
                        icon={Zap}
                    />
                    <DashboardMetricCard
                        label="Posting Consistency"
                        value={postCount >= 2 ? `Every ${avgDays} days` : '—'}
                        subValue={postCount >= 2 ? `${consistencyScore} score` : ''}
                        icon={Repeat}
                    />
                    <DashboardMetricCard
                        label="Total Reach (from views + likes)"
                        value={postCount ? formatNumber(totalReach) : '—'}
                        icon={Users}
                    />
                </div>

                {/* FIX 3: Top Performing Posts (Grid of 3) */}
                {top3.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 mb-3 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-yellow-500" /> Top Content Strategy
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {top3.map(post => (
                            <div key={post.id} className="rounded-xl p-4 border border-white/[0.08] border-l-4 border-l-green-500 bg-green-500/[0.03] transition-all hover:bg-green-500/[0.06]">
                                <span className="text-xs text-green-400 mb-2 block font-bold">⬆ Top Performer</span>
                                <p className="text-sm text-zinc-300 line-clamp-3 mb-3 h-15">
                                    {post.caption || 'No caption'}
                                </p>
                                <div className="flex gap-3 text-xs">
                                    <span className="text-cyan-400">❤️ {formatNumber(post.likes)}</span>
                                    <span className="text-cyan-400">👁 {formatNumber(post.video_views ?? post.views ?? 0)}</span>
                                    <span className="text-cyan-400">💬 {formatNumber(post.comments)}</span>
                                </div>
                                <p className="text-xs text-zinc-500 mt-2">{post.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
                )}

                {/* FIX 3: Low Performing Posts (Grid of 2) */}
                {low2.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-3 h-3 text-red-500" /> Needs Improvement
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {low2.map(post => (
                            <div key={post.id} className="rounded-xl p-4 border border-white/[0.08] border-l-4 border-l-red-500 bg-red-500/[0.03] transition-all hover:bg-red-500/[0.06]">
                                <span className="text-xs text-red-400 mb-2 block font-bold">⬇ Low Performer</span>
                                <p className="text-sm text-zinc-300 line-clamp-3 mb-3 h-15">
                                    {post.caption || 'No caption'}
                                </p>
                                <div className="flex gap-3 text-xs">
                                    <span className="text-cyan-400">❤️ {formatNumber(post.likes)}</span>
                                    <span className="text-cyan-400">👁 {formatNumber(post.video_views ?? post.views ?? 0)}</span>
                                    <span className="text-cyan-400">💬 {formatNumber(post.comments)}</span>
                                </div>
                                <p className="text-xs text-zinc-500 mt-2">{post.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
                )}

                {/* FIX 2: Better Data Visualization – Post Performance Overview */}
                <div className="mb-8">
                    <GlassCard title="Post Performance Overview" icon={TrendingUp} subtitle="Last 10 posts vs your average">
                        <div className="space-y-3 py-2">
                            {last10.map(post => {
                                const percentage = (post.total_perf / maxPerf) * 100;
                                const isAboveAverage = post.total_perf >= avgPerf;
                                const label = (post.caption || `Reel ${post.date}`).slice(0, 32) || 'Untitled post';
                                return (
                                    <div key={post.id} className="flex items-center gap-3">
                                        <span className="text-[10px] text-zinc-400 w-32 truncate font-medium">
                                            {label}
                                        </span>
                                        <div className="flex-1 bg-zinc-800/50 rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-700"
                                                style={{
                                                    width: `${percentage}%`,
                                                    backgroundColor: isAboveAverage ? '#22C55E' : '#EF4444'
                                                }}
                                            />
                                        </div>
                                        <span className="text-[10px] text-zinc-500 w-12 text-right font-bold">
                                            {formatNumber(post.total_perf)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </GlassCard>
                </div>

                {/* Content themes - from real captions */}
                <div className="mb-8">
                    <GlassCard title="Content Themes" subtitle="From your captions (keyword frequency)" icon={LayoutDashboard}>
                        <ThemeBarChart themeData={themeData} />
                    </GlassCard>
                </div>
            </div>
        </AppShell>
    );
}

function DashboardMetricCard({ label, value, subValue, icon: Icon }: {
    label: string;
    value: string;
    subValue?: string;
    icon: any;
}) {
    return (
        <div className="rounded-xl p-5 border border-white/[0.08] bg-white/[0.02] flex flex-col justify-between group hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.08)] transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                    "bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20"
                )}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">{label}</p>
                <h3 className="text-xl font-bold font-jakarta text-cyan-400">{value}</h3>
                {subValue && <p className="text-[10px] text-zinc-500 mt-1">{subValue}</p>}
            </div>
        </div>
    );
}

