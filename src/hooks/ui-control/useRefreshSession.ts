'use client';

import { useState, useCallback } from 'react';
import { createClient } from '../../../utils/supabase/client';
import { useAppDisPatch } from '@/redux/store';
import { authActions } from '@/redux/slices/authSlice';
import type { SupabaseSession } from '@/models/auth/SignIn.model';

/**
 * Returns:
 *  - onRefreshSession: call this to restore the Supabase session
 *  - loading: whether the restore is in progress
 *  - userId: the current user's ID, or null if not signed in
 */
export function useRefreshSession() {
  const dispatch = useAppDisPatch();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const onRefreshSession = useCallback(async () => {
    setLoading(true);
       console.log('refreshing session');
    try {
      // 1) Grab stored session (if any)
      const stored = localStorage.getItem('sessionData');
      if (!stored) {
        setUserId(null);
        return;
      }

      // 2) Parse it
      let session: SupabaseSession;
      try {
        session = JSON.parse(stored);
      } catch {
        localStorage.removeItem('sessionData');
        setUserId(null);
        return;
      }

      // 3) Rehydrate Supabase and restore session
      const supabase = await createClient();
      const { data: result, error } = await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });

      // 4) Handle result
      if (error || !result.session) {
        dispatch(authActions.clearSession());
        localStorage.removeItem('sessionData');
        setUserId(null);
      } else {
        dispatch(authActions.setSession(result.session));
        localStorage.setItem('sessionData', JSON.stringify(result.session));
        setUserId(result.session.user.id);
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return { onRefreshSession, loading, userId };
}
