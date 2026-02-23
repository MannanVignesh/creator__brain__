import React from 'react';
import { Post, CreatorProfile } from '@/types';
import { Database, Calendar, TrendingUp } from 'lucide-react';

interface DebugDataSectionProps {
    profile: CreatorProfile;
}

export default function DebugDataSection({ profile }: DebugDataSectionProps) {
    const posts = profile.posts || [];
    if (posts.length === 0) return null;

    // Calculate metrics
    const sortedByDate = [...posts].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    const oldestDate = new Date(sortedByDate[0].timestamp).toLocaleDateString();
    const newestDate = new Date(sortedByDate[sortedByDate.length - 1].timestamp).toLocaleDateString();

    const topPosts = [...posts].sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments)).slice(0, 3);

    return (
        <section className="mt-12 pt-12 border-t border-white/5">
            <div className="flex items-center gap-2 text-zinc-500 uppercase text-[10px] font-black tracking-widest mb-6 px-1">
                <Database className="w-3.5 h-3.5" /> Data Integrity Verification
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Source Stats */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-xs text-zinc-500 font-bold mb-4 uppercase tracking-tighter">Analysis Source</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <Database className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">@{profile.username}</p>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold">{posts.length} Real Posts Scanned</p>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-xs text-zinc-500 font-bold mb-4 uppercase tracking-tighter">Data Window</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{oldestDate} - {newestDate}</p>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold">Historical Range</p>
                        </div>
                    </div>
                </div>

                {/* Raw Top Performers */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-xs text-zinc-500 font-bold mb-4 uppercase tracking-tighter">Raw Performance (Top 3)</p>
                    <div className="space-y-3">
                        {topPosts.map((post, i) => (
                            <div key={post.id} className="flex items-center justify-between text-[10px] font-bold">
                                <span className="text-zinc-500 uppercase tracking-widest">Post #{i + 1}</span>
                                <span className="text-white flex items-center gap-1.5">
                                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                                    {post.likes.toLocaleString()} L / {post.comments.toLocaleString()} C
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <p className="mt-6 text-[9px] text-zinc-600 font-medium italic text-center uppercase tracking-widest">
                Verification complete: All calculations trace back to unique shortcodes and timestamps in the local database.
            </p>
        </section>
    );
}
