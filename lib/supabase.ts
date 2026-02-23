import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Client-side Supabase client (anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (bypasses RLS)
export const supabaseAdmin = createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// ─────────────────────────────────────────────────────────────────────────────
// Database Schema (run in Supabase SQL editor):
//
// CREATE TABLE creator_profiles (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   user_id TEXT NOT NULL,
//   instagram_id TEXT,
//   username TEXT NOT NULL,
//   niche TEXT NOT NULL,
//   follower_count INTEGER DEFAULT 0,
//   bio TEXT,
//   is_demo BOOLEAN DEFAULT false,
//   bharat_mode BOOLEAN DEFAULT false,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   last_analyzed TIMESTAMPTZ
// );
//
// CREATE TABLE posts (
//   id TEXT PRIMARY KEY,
//   creator_id UUID REFERENCES creator_profiles(id),
//   type TEXT NOT NULL,
//   timestamp TIMESTAMPTZ NOT NULL,
//   likes INTEGER DEFAULT 0,
//   comments INTEGER DEFAULT 0,
//   views INTEGER,
//   saves INTEGER,
//   reach INTEGER,
//   impressions INTEGER,
//   caption TEXT,
//   duration INTEGER,
//   thumbnail TEXT,
//   engagement_rate NUMERIC
// );
//
// CREATE TABLE creator_dna (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   creator_id UUID REFERENCES creator_profiles(id),
//   archetype TEXT NOT NULL,
//   strengths TEXT[] NOT NULL,
//   weaknesses TEXT[] NOT NULL,
//   ideal_duration TEXT NOT NULL,
//   best_time TEXT NOT NULL,
//   engagement_rate NUMERIC NOT NULL,
//   niche_avg_engagement NUMERIC NOT NULL,
//   radar_scores JSONB NOT NULL,
//   top_themes TEXT[],
//   consistency_score INTEGER,
//   best_post_type TEXT,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// CREATE TABLE suggestions (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   creator_id UUID REFERENCES creator_profiles(id),
//   title TEXT NOT NULL,
//   concept TEXT,
//   hook TEXT,
//   format TEXT,
//   duration TEXT,
//   compatibility_score INTEGER,
//   compatibility_level TEXT,
//   compatibility_breakdown JSONB,
//   hashtags TEXT[],
//   boost_prediction TEXT,
//   trend_reference TEXT,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
// ─────────────────────────────────────────────────────────────────────────────

export async function isSupabaseConfigured(): Promise<boolean> {
    return !!(supabaseUrl && supabaseAnonKey);
}
