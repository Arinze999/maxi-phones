import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDisPatch } from '@/redux/store';
import { authActions } from '@/redux/slices/authSlice';
import { createClient } from '../../../utils/supabase/client';
import Swal from 'sweetalert2';

/**
 * Custom hook to log the user out:
 * - prompts confirmation via SweetAlert2
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
    // 1. Show confirmation dialog
    const result = await Swal.fire({
      title: 'Confirm Logout?',
      text: 'Do you really want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',

      // ← custom colors!
      confirmButtonColor: '#db4444', // blue
    });

    if (!result.isConfirmed) {
      return; // user cancelled
    }

    setLoading(true);
    try {
      // 2. Perform logout
      const supabase = await createClient();
      await supabase.auth.signOut();
      // 3. Clear state
      dispatch(authActions.clearSession());
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('sessionData');
      // 4. Redirect
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed', error);
      // show error alert
      await Swal.fire({
        title: 'Logout Failed',
        text: 'Unable to log out. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  }, [dispatch, router]);

  return { logoutUser, loading };
}
