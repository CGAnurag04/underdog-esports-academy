-- ============================================================================
-- UNDERDOG ESPORTS ACADEMY - OFFICIAL SUPABASE DATABASE SCHEMA (v3.2)
-- Multi-Channel Authentication: Phone SMS OTP, Google OAuth & Profiles Storage
-- Copy and paste this script into your Supabase Dashboard SQL Editor and click "Run"
-- Dashboard Link: https://supabase.com/dashboard/project/iwggpixdxhdetncnossa/sql
-- ============================================================================

-- 1. PROFILES TABLE
-- Stores player IGN, combat role, player UID, clan tag, phone, avatar, and auth provider
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  phone_verified BOOLEAN DEFAULT false,
  ign TEXT NOT NULL DEFAULT 'Recruit',
  player_uid TEXT,
  clan_tag TEXT DEFAULT 'UDG',
  role TEXT DEFAULT 'Rusher',
  avatar_url TEXT,
  auth_provider TEXT DEFAULT 'email', -- 'phone', 'google', 'discord', 'email', 'guest'
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Backwards-compatible migrations for existing deployments
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS auth_provider TEXT DEFAULT 'email';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Automated Trigger: Auto-create player profile on Supabase Auth signup (Phone, Google, Email)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_ign TEXT;
  v_phone TEXT;
  v_provider TEXT;
BEGIN
  -- Determine provider (google, phone, email, etc.)
  v_provider := COALESCE(new.raw_app_meta_data->>'provider', 'email');
  IF new.phone IS NOT NULL AND new.phone != '' THEN
    v_provider := 'phone';
  END IF;

  -- Determine IGN: try user_metadata ign, then full_name, then name, then email prefix, then phone
  v_ign := COALESCE(
    new.raw_user_meta_data->>'ign',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'name',
    CASE 
      WHEN new.email IS NOT NULL AND new.email != '' THEN split_part(new.email, '@', 1)
      WHEN new.phone IS NOT NULL AND new.phone != '' THEN 'Player_' || right(new.phone, 4)
      ELSE 'Recruit'
    END
  );

  v_phone := COALESCE(new.phone, new.raw_user_meta_data->>'phone');

  INSERT INTO public.profiles (id, email, phone, phone_verified, ign, role, clan_tag, avatar_url, auth_provider, metadata)
  VALUES (
    new.id,
    new.email,
    v_phone,
    CASE WHEN new.phone IS NOT NULL AND new.phone != '' THEN true ELSE false END,
    v_ign,
    COALESCE(new.raw_user_meta_data->>'role', 'Rusher'),
    COALESCE(new.raw_user_meta_data->>'clan_tag', 'UDG'),
    COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', ''),
    v_provider,
    COALESCE(new.raw_user_meta_data, '{}'::jsonb)
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
    phone_verified = COALESCE(EXCLUDED.phone_verified, public.profiles.phone_verified),
    ign = CASE WHEN public.profiles.ign = 'Recruit' THEN EXCLUDED.ign ELSE public.profiles.ign END,
    avatar_url = COALESCE(NULLIF(EXCLUDED.avatar_url, ''), public.profiles.avatar_url),
    auth_provider = COALESCE(EXCLUDED.auth_provider, public.profiles.auth_provider),
    updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. SCRIM MATCHES TABLE
-- Stores individual match records, placements, kills, points & mistake debriefs
CREATE TABLE IF NOT EXISTS public.scrim_matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  match_num INTEGER NOT NULL DEFAULT 1,
  map TEXT NOT NULL DEFAULT 'Bermuda',
  placement INTEGER NOT NULL DEFAULT 1,
  kills INTEGER NOT NULL DEFAULT 0,
  placement_pts INTEGER NOT NULL DEFAULT 12,
  total_pts INTEGER NOT NULL DEFAULT 12,
  mistake_id TEXT DEFAULT 'clean',
  fatal_mistake TEXT DEFAULT 'None (Clean Booyah / Flawless Fight)',
  vod_url TEXT DEFAULT '',
  debrief_notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. USER CLOUD DATA TABLE
-- Generic JSONB storage for custom sensitivities, HUD coordinates, and loadouts
CREATE TABLE IF NOT EXISTS public.user_cloud_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  data_type TEXT NOT NULL, -- 'sensitivity', 'custom_hud', 'scrims', 'tactics_notes'
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, data_type)
);

-- 4. SCRIM LOBBIES TABLE
-- Stores 12-team tournament leaderboards for live broadcasts & PointCalc exports
CREATE TABLE IF NOT EXISTS public.scrim_lobbies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lobby_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Free Fire Max Tier-1 Scrims',
  stage TEXT DEFAULT 'Grand Finals',
  host_id UUID REFERENCES auth.users ON DELETE SET NULL,
  teams JSONB NOT NULL DEFAULT '[]'::jsonb,
  match_number INTEGER DEFAULT 1,
  total_matches INTEGER DEFAULT 6,
  is_live BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TACTICAL WHITEBOARD ROOMS TABLE
-- Stores live multiplayer whiteboard drawing strokes, safe zones & token positions
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

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scrim_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_cloud_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scrim_lobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tactical_rooms ENABLE ROW LEVEL SECURITY;

-- Permissive public policies for fast squad room and match sharing
DROP POLICY IF EXISTS "Public Profiles Access" ON public.profiles;
CREATE POLICY "Public Profiles Access" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Scrim Matches Access" ON public.scrim_matches;
CREATE POLICY "Public Scrim Matches Access" ON public.scrim_matches FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public User Cloud Data Access" ON public.user_cloud_data;
CREATE POLICY "Public User Cloud Data Access" ON public.user_cloud_data FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Scrim Lobbies Access" ON public.scrim_lobbies;
CREATE POLICY "Public Scrim Lobbies Access" ON public.scrim_lobbies FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Tactical Rooms Access" ON public.tactical_rooms;
CREATE POLICY "Public Tactical Rooms Access" ON public.tactical_rooms FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- REALTIME REPLICATION CONFIGURATION
-- ============================================================================
-- Safely add tables to publication if publication exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.scrim_matches;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.scrim_lobbies;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.tactical_rooms;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.user_cloud_data;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- High-speed indexes for query performance
CREATE INDEX IF NOT EXISTS idx_tactical_rooms_code ON public.tactical_rooms(room_code);
CREATE INDEX IF NOT EXISTS idx_scrim_lobbies_code ON public.scrim_lobbies(lobby_code);
CREATE INDEX IF NOT EXISTS idx_scrim_matches_user ON public.scrim_matches(user_id);
CREATE INDEX IF NOT EXISTS idx_user_cloud_data_lookup ON public.user_cloud_data(user_id, data_type);
