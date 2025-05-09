import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDisPatch } from '@/redux/store';
import { authActions } from '@/redux/slices/authSlice';
import { createClient } from '../../../utils/supabase/client';

/**
 * Custom hook to log the user out:
 * - calls Supabase signOut
 * - clears Redux and localStorage
 * - redirects to /signin
 * - exposes a loading state
 */
export function useLogout() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDisPatch();
  const router = useRouter();

  const logoutUser = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
      dispatch(authActions.clearSession());
      localStorage.removeItem('sessionData');
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, router]);

  return { logoutUser, loading };
}
