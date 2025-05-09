'use client'
import { useEffect, useState } from 'react';
import { createClient } from '../../../utils/supabase/client';
import { useAppDisPatch } from '@/redux/store';
import { authActions } from '@/redux/slices/authSlice';
import type { SupabaseSession } from '@/models/auth/SignIn.model';

/**
 * On app load or refresh, restore Supabase session from localStorage,
 * rehydrate Supabase client, dispatch to Redux, and keep localStorage in sync.
 * Returns a loading flag for UI handling.
 */
export function useRefreshSession() {
  const dispatch = useAppDisPatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restore() {
      // 1. Grab stored session (if any)
      const stored = localStorage.getItem('sessionData');
      if (!stored) {
        setLoading(false);
        return;
      }

      let session: SupabaseSession;
      try {
        session = JSON.parse(stored);
      } catch {
        localStorage.removeItem('sessionData');
        setLoading(false);
        return;
      }

      const supabase = await createClient();
      // 2. Re-set the session on the client
      const { data: result, error } = await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });

      if (error || !result.session) {
        // clear out bad session
        dispatch(authActions.clearSession());
        localStorage.removeItem('sessionData');
      } else {
        // 3. dispatch into Redux
        dispatch(authActions.setSession(result.session));
        // 4. update localStorage with any refreshed tokens
        localStorage.setItem('sessionData', JSON.stringify(result.session));
      }

      setLoading(false);
    }

    restore();
  }, [dispatch]);

  return { loading };
}
