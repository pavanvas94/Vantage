-- ===================================================================
-- Vantage Database Migration: Members & Notifications
-- ===================================================================

-- 1. Create vantage_members table to track registered collaborators
CREATE TABLE IF NOT EXISTS public.vantage_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    workspace_owner TEXT NOT NULL,          -- Owner's email address
    name TEXT NOT NULL,                     -- Participant name
    role TEXT NOT NULL,                     -- e.g. 'ops', 'rd', 'sales', 'marketing', 'finance'
    status TEXT NOT NULL DEFAULT 'active',   -- 'active' (registered) or 'invited' (pending click)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(workspace_owner, name)
);

-- 2. Create vantage_notifications table for real-time alerts
CREATE TABLE IF NOT EXISTS public.vantage_notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    workspace_owner TEXT NOT NULL,          -- Workspace creator
    recipient_email TEXT NOT NULL,          -- Target recipient
    sender_name TEXT NOT NULL,              -- Alert author
    type TEXT NOT NULL,                     -- 'mention', 'assign', 'alert', 'bundle'
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    card_id TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row-Level Security (RLS)
ALTER TABLE public.vantage_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vantage_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies (Tenant-separated checks mapping auth.jwt() ->> 'email')
CREATE POLICY "Allow select for members" ON public.vantage_members FOR SELECT USING (auth.jwt() ->> 'email' = workspace_owner);
CREATE POLICY "Allow insert for members" ON public.vantage_members FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = workspace_owner);
CREATE POLICY "Allow update for members" ON public.vantage_members FOR UPDATE USING (auth.jwt() ->> 'email' = workspace_owner);
CREATE POLICY "Allow delete for members" ON public.vantage_members FOR DELETE USING (auth.jwt() ->> 'email' = workspace_owner);

CREATE POLICY "Allow select for notifications" ON public.vantage_notifications FOR SELECT USING (auth.jwt() ->> 'email' = workspace_owner OR auth.jwt() ->> 'email' = recipient_email);
CREATE POLICY "Allow insert for notifications" ON public.vantage_notifications FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = workspace_owner);
CREATE POLICY "Allow update for notifications" ON public.vantage_notifications FOR UPDATE USING (auth.jwt() ->> 'email' = workspace_owner OR auth.jwt() ->> 'email' = recipient_email);
CREATE POLICY "Allow delete for notifications" ON public.vantage_notifications FOR DELETE USING (auth.jwt() ->> 'email' = workspace_owner);

-- Enable Realtime replication for notifications
-- Run this in your Supabase DB to stream updates directly to client browser:
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.vantage_notifications;

-- 3. Phase 7 Enterprise Readiness: Add permission_role column to vantage_members
ALTER TABLE public.vantage_members ADD COLUMN IF NOT EXISTS permission_role TEXT DEFAULT 'contributor';

-- 4. Create vantage_cards table to sync local card boards to cloud db
CREATE TABLE IF NOT EXISTS public.vantage_cards (
    id TEXT PRIMARY KEY,
    workspace_owner TEXT NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row-Level Security (RLS) on vantage_cards
ALTER TABLE public.vantage_cards ENABLE ROW LEVEL SECURITY;

-- Tenant-separated RLS policies for vantage_cards
CREATE POLICY "Allow select for cards" ON public.vantage_cards FOR SELECT USING (auth.jwt() ->> 'email' = workspace_owner);
CREATE POLICY "Allow insert for cards" ON public.vantage_cards FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = workspace_owner);
CREATE POLICY "Allow update for cards" ON public.vantage_cards FOR UPDATE USING (auth.jwt() ->> 'email' = workspace_owner);
CREATE POLICY "Allow delete for cards" ON public.vantage_cards FOR DELETE USING (auth.jwt() ->> 'email' = workspace_owner);

-- 5. Create vantage_audit_logs table to record immutable security operations
CREATE TABLE IF NOT EXISTS public.vantage_audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    workspace_owner TEXT NOT NULL,
    user_email TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row-Level Security (RLS) on vantage_audit_logs
ALTER TABLE public.vantage_audit_logs ENABLE ROW LEVEL SECURITY;

-- Immutable Append-Only RLS Policies (Select and Insert only, block Update and Delete)
CREATE POLICY "Allow select for audit logs" ON public.vantage_audit_logs FOR SELECT USING (auth.jwt() ->> 'email' = workspace_owner);
CREATE POLICY "Allow insert for audit logs" ON public.vantage_audit_logs FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = workspace_owner OR auth.jwt() ->> 'email' = user_email);
-- (NO UPDATE OR DELETE POLICIES CREATED FOR SECURITY COMPLIANCE)


-- ===================================================================
-- 6. Invite Handshake & Realtime Setup
-- ===================================================================

-- Add email and token columns if they do not exist
ALTER TABLE public.vantage_members ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.vantage_members ADD COLUMN IF NOT EXISTS invite_token UUID;
ALTER TABLE public.vantage_members ADD COLUMN IF NOT EXISTS invite_expires_at TIMESTAMP WITH TIME ZONE;

-- Add RLS policy for anonymous invite token validation
-- (Allows public/unauthenticated users to search for token details to unlock signup)
CREATE POLICY "Allow public select for invite validation" 
ON public.vantage_members 
FOR SELECT 
TO anon, authenticated
USING (invite_token IS NOT NULL);

-- Drop previous select policy and replace with tenant separation + email check
DROP POLICY IF EXISTS "Allow select for members" ON public.vantage_members;
CREATE POLICY "Allow select for members" 
ON public.vantage_members 
FOR SELECT 
USING (
    auth.jwt() ->> 'email' = workspace_owner 
    OR auth.jwt() ->> 'email' = email 
    OR invite_token IS NOT NULL
);

-- Drop previous update policy and allow members to self-update (status to active)
DROP POLICY IF EXISTS "Allow update for members" ON public.vantage_members;
CREATE POLICY "Allow update for members" 
ON public.vantage_members 
FOR UPDATE 
USING (
    auth.jwt() ->> 'email' = workspace_owner 
    OR auth.jwt() ->> 'email' = email
    OR invite_token IS NOT NULL
);

-- Enable Realtime replication for cards, members, and notifications
-- Ensure publication exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        CREATE PUBLICATION supabase_realtime;
    END IF;
END $$;

-- Enable replication for each table safely
DO $$
BEGIN
    -- Add vantage_notifications if not already added
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_rel pr 
        JOIN pg_class c ON pr.prrelid = c.oid 
        JOIN pg_publication p ON pr.prpubid = p.oid 
        WHERE p.pubname = 'supabase_realtime' AND c.relname = 'vantage_notifications'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.vantage_notifications;
    END IF;

    -- Add vantage_cards if not already added
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_rel pr 
        JOIN pg_class c ON pr.prrelid = c.oid 
        JOIN pg_publication p ON pr.prpubid = p.oid 
        WHERE p.pubname = 'supabase_realtime' AND c.relname = 'vantage_cards'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.vantage_cards;
    END IF;

    -- Add vantage_members if not already added
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_rel pr 
        JOIN pg_class c ON pr.prrelid = c.oid 
        JOIN pg_publication p ON pr.prpubid = p.oid 
        WHERE p.pubname = 'supabase_realtime' AND c.relname = 'vantage_members'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.vantage_members;
    END IF;
END $$;

-- ===================================================================
-- 7. Global Aggregated Realtime Stats Counter (Security Definer)
-- ===================================================================
CREATE OR REPLACE FUNCTION public.get_global_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER -- Bypasses RLS to sum table row aggregates securely
AS $$
DECLARE
    user_count INTEGER;
    card_count INTEGER;
    project_count INTEGER;
    agent_count INTEGER;
BEGIN
    -- 1. Count active registered users in vantage_members
    SELECT COUNT(*) INTO user_count 
    FROM public.vantage_members 
    WHERE status = 'active';

    -- 2. Count total tasks / cards across all synchronized workspaces
    SELECT COUNT(*) INTO card_count 
    FROM public.vantage_cards;

    -- 3. Count unique active workspace projects (using jsonb 'workspace_id')
    SELECT COUNT(DISTINCT (data->>'workspace_id')) INTO project_count 
    FROM public.vantage_cards 
    WHERE data->>'workspace_id' IS NOT NULL;

    -- 4. Count active cards assigned to the AI Agent
    SELECT COUNT(*) INTO agent_count 
    FROM public.vantage_cards 
    WHERE data->>'assignee' = 'AI Agent' 
       OR data->>'assignee' = 'agent@vantage-team.com';

    -- Return JSON object of aggregates
    RETURN json_build_object(
        'users', COALESCE(user_count, 0) + 1, -- Add at least 1 (the owner)
        'cards', COALESCE(card_count, 0),
        'projects', COALESCE(project_count, 0) + 3, -- Add the 3 default industry presets
        'agents', COALESCE(agent_count, 0)
    );
END;
$$;

-- Allow anonymous and authenticated public client users to invoke this RPC function
GRANT EXECUTE ON FUNCTION public.get_global_stats() TO anon, authenticated;

