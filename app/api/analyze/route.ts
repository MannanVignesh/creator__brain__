import { NextRequest, NextResponse } from 'next/server';
import {
    detectNicheWithGroq,
    buildCreatorDNAWithGroq,
    generateSuggestionsWithGroq
} from '@/lib/groq';
import { buildLocalDNA } from '@/lib/dna-engine';
import { CreatorProfile, CreatorDNA, Post } from '@/types';

// API Timeout Config
export const maxDuration = 60;

export async function POST(request: NextRequest) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000); // 55s timeout

    try {
        const body = await request.json();
        const { username: rawUsername } = body;
        const username = rawUsername?.replace('@', '').trim();

        if (!username) {
            return NextResponse.json({ error: 'Username required' }, { status: 400 });
        }

        if (!process.env.APIFY_TOKEN) {
            return NextResponse.json({ error: 'APIFY_TOKEN missing' }, { status: 500 });
        }

        console.log(`[Groq AI] Starting analysis for @${username}...`);

        // Step 1: Fetch via Apify
        const apifyUrl = `https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`;

        const apifyResponse = await fetch(apifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usernames: [username],
                resultsLimit: 20
            }),
            signal: controller.signal
        });

        if (!apifyResponse.ok) {
            if (apifyResponse.status === 408) throw new Error('TIMEOUT');
            throw new Error(`Apify failed: ${apifyResponse.statusText}`);
        }

        const items = await apifyResponse.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Profile not found or is private' }, { status: 404 });
        }

        const profileData = items[0] as any;

        const posts: Post[] = (profileData.latestPosts || []).map((post: any) => ({
            id: post.id || post.shortCode,
            type: post.type === 'Video' ? 'REEL' : (post.type === 'Sidecar' ? 'CAROUSEL_ALBUM' : 'IMAGE'),
            likes: post.likesCount || 0,
            comments: post.commentsCount || 0,
            video_views: post.videoViewCount || 0,
            caption: post.caption || '',
            timestamp: post.timestamp,
            date: post.timestamp,
            is_video: post.type === 'Video',
            hashtags: post.hashtags || [],
            duration: post.videoDuration || null,
            thumbnail: post.displayUrl // Keep in type, but will hide in UI
        }));

        const profile: CreatorProfile = {
            id: profileData.id,
            username: profileData.username,
            follower_count: profileData.followersCount || 0,
            following_count: profileData.followingCount || 0,
            bio: profileData.biography || '',
            profile_picture: profileData.profilePicUrl,
            niche: 'pending',
            posts: posts,
            is_demo: false,
            bharat_mode: false,
            created_at: new Date().toISOString(),
        };

        // Step 2: Niche Detection
        const nicheData = await detectNicheWithGroq(posts);
        profile.niche = nicheData.detected_niche as any;

        // Step 3: Local DNA Engine (for stats)
        const localDNA = buildLocalDNA(profile);

        // Step 4: Groq AI DNA Building
        let finalDNA: CreatorDNA;
        if (process.env.GROQ_API_KEY) {
            const groqDNA = await buildCreatorDNAWithGroq(profile, localDNA, nicheData);
            finalDNA = {
                ...localDNA,
                ...groqDNA,
                detected_niche: nicheData.detected_niche,
                confidence: nicheData.confidence,
                ideal_duration: localDNA.ideal_duration!,
                best_time: localDNA.best_time!,
                engagement_rate: localDNA.engagement_rate!,
                niche_avg_engagement: localDNA.niche_avg_engagement!,
                consistency_score: localDNA.consistency_score!,
                best_post_type: localDNA.best_post_type!,
            } as CreatorDNA;
        } else {
            throw new Error('GROQ_API_KEY missing');
        }

        // Step 5: Suggestions via Groq (Niche-locked)
        const suggestions = await generateSuggestionsWithGroq(profile, finalDNA, nicheData);

        clearTimeout(timeoutId);
        return NextResponse.json({ profile, dna: finalDNA, suggestions });

    } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError' || error.message === 'TIMEOUT') {
            return NextResponse.json({ error: 'Analysis timed out. Please try again.' }, { status: 408 });
        }
        console.error('[Analyze Error]:', error);
        return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 });
    }
}
