'use client';

import React from 'react';
import { Post } from '@/types';
import { formatNumber, cn } from '@/lib/utils';

export default function BestWorstPosts({ posts = [] }: { posts: Post[] }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="p-8 rounded-2xl bg-white/0.03 border border-white/5 text-center flex flex-col items-center justify-center min-h-[200px]">
                <p className="text-zinc-500 text-sm italic">No post data available for audit.</p>
            </div>
        );
    }

    const maxEngagement = Math.max(...posts.map(p => p.engagement_rate || 0), 0.1);

    // Sort and take top 3 and bottom 3 for a more compact list
    const sorted = [...posts].sort((a, b) => (b.engagement_rate || 0) - (a.engagement_rate || 0));
    const best = sorted.slice(0, 3);
    const worst = sorted.slice(-3).reverse();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Best Performing */}
            <div>
                <h4 className="text-[10px] font-bold uppercase text-cyan-400 mb-3 tracking-widest px-1">
                    Top Content Strategy
                </h4>
                <div className="space-y-3">
                    {best.map(post => (
                        <PostCard key={post.id} post={post} maxEngagement={maxEngagement} />
                    ))}
                </div>
            </div>

            {/* Needs Improvement */}
            <div>
                <h4 className="text-[10px] font-bold uppercase text-purple-400 mb-3 tracking-widest px-1">
                    Gap Analysis (Low Engagement)
                </h4>
                <div className="space-y-3">
                    {worst.map(post => (
                        <PostCard key={post.id} post={post} maxEngagement={maxEngagement} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function PostCard({ post, maxEngagement }: { post: Post, maxEngagement: number }) {
    const engagement = post.engagement_rate || 0;
    const performancePercentage = Math.min((engagement / maxEngagement) * 100, 100);
    const performanceLabel = performancePercentage > 70 ? 'Top' : performancePercentage > 40 ? 'Average' : 'Low';

    const formattedDate = post.timestamp ? new Date(post.timestamp).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
    }) : 'Recent';

    return (
        <div className="rounded-xl p-4 border border-cyan-900/30 bg-white/[0.03] hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all duration-200">
            {/* Top row: type badge + date */}
            <div className="flex justify-between items-center mb-3">
                <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {post.type === 'REEL' ? '🎬 Reel' :
                        post.type === 'CAROUSEL_ALBUM' ? '📸 Carousel' : '🖼 Photo'}
                </span>
                <span className="text-xs text-zinc-500">{formattedDate}</span>
            </div>

            {/* Caption preview */}
            <p className="text-sm text-zinc-300 line-clamp-2 mb-3">
                {post.caption || 'No caption'}
            </p>

            {/* Stats row */}
            <div className="flex gap-4 text-xs">
                <span className="text-pink-400">❤️ {formatNumber(post.likes)}</span>
                <span className="text-blue-400">💬 {formatNumber(post.comments)}</span>
                <span className="text-purple-400">▶️ {formatNumber(post.video_views || post.views || 0)}</span>
            </div>

            {/* Performance indicator */}
            <div className="mt-3 h-1 rounded-full bg-zinc-800">
                <div
                    className="h-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    style={{ width: `${performancePercentage}%` }}
                />
            </div>
            <p className="text-xs text-zinc-500 mt-1">
                {performanceLabel} performer
            </p>
        </div>
    );
}
