-- ============================================================================
-- UNDERDOG ESPORTS ACADEMY - SUPABASE DATABASE SCHEMA
-- Paste this entire script into your Supabase SQL Editor and click "Run"
-- ============================================================================

-- 1. Profiles Table (Stores player UID, IGN, clan tag, role, and avatar)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  ign TEXT NOT NULL DEFAULT 'Recruit',
  player_uid TEXT,
  clan_tag TEXT DEFAULT 'UDG',
  role TEXT DEFAULT 'Rusher',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. User Cloud Data Table (Stores custom sensitivities, HUD coordinates, scrim logs)
CREATE TABLE IF NOT EXISTS public.user_cloud_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  data_type TEXT NOT NULL, -- 'sensitivity', 'custom_hud', 'scrims', 'tactics_notes'
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, data_type)
);

-- 3. Scrim Lobbies Table (Stores 12-team leaderboard states for live broadcasting)
CREATE TABLE IF NOT EXISTS public.scrim_lobbies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lobby_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL DEFAULT 'EWC Scrims Lobby',
  stage TEXT DEFAULT 'Grand Finals',
  host_id UUID REFERENCES auth.users ON DELETE SET NULL,
  teams JSONB NOT NULL DEFAULT '[]'::jsonb,
  match_number INTEGER DEFAULT 1,
  total_matches INTEGER DEFAULT 6,
  is_live BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tactical Whiteboard Rooms Table (Stores live squad drawing, safe zone & token positions)
CREATE TABLE IF NOT EXISTS public.tactical_rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_code TEXT UNIQUE NOT NULL,
  room_name TEXT DEFAULT 'Squad Briefing',
  host_id UUID REFERENCES auth.users ON DELETE SET NULL,
  map_name TEXT DEFAULT 'bermuda',
  zone_phase INTEGER DEFAULT 1,
  safe_zone JSONB DEFAULT '{"cx": 0.5, "cy": 0.5, "r": 0.35}'::jsonb,
  blue_zone JSONB DEFAULT '{"cx": 0.5, "cy": 0.5, "r": 0.50}'::jsonb,
  tokens JSONB DEFAULT '[]'::jsonb,
  strokes JSONB DEFAULT '[]'::jsonb,
  last_action TEXT DEFAULT 'init',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_cloud_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scrim_lobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tactical_rooms ENABLE ROW LEVEL SECURITY;

-- Permissive public policies for Underdog Esports scrimmage & squad room access
CREATE POLICY "Public Profiles Access" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public User Cloud Data Access" ON public.user_cloud_data FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Scrim Lobbies Access" ON public.scrim_lobbies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Tactical Rooms Access" ON public.tactical_rooms FOR ALL USING (true) WITH CHECK (true);

-- Enable Realtime on Scrim Lobbies and Tactical Rooms
ALTER PUBLICATION supabase_realtime ADD TABLE public.scrim_lobbies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tactical_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_cloud_data;

-- Indexes for ultra-fast room lookups
CREATE INDEX IF NOT EXISTS idx_tactical_rooms_code ON public.tactical_rooms(room_code);
CREATE INDEX IF NOT EXISTS idx_scrim_lobbies_code ON public.scrim_lobbies(lobby_code);
