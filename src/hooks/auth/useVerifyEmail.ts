import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import { createClient } from '../../../utils/supabase/client';
import type { EmailOtpType } from '@supabase/supabase-js';

/**
 * Hook to verify email OTP on page load:
 * - reads `token_hash`, `type`, `next` from URL
 * - calls Supabase verifyOtp
 * - shows SweetAlert2 dialogs on success/error
 * - redirects accordingly
 * - exposes a `loading` flag
 */
export function useVerifyEmail() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    async function handleVerify() {
      const token_hash = params.get('token_hash');
      const type = params.get('type') as EmailOtpType | null;
      const nextUrl = params.get('next') ?? '/';

      if (!token_hash || !type) {
        setLoading(false);
        await Swal.fire({
          title: 'Invalid Link',
          text: 'Missing or invalid verification parameters.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        router.push('/error');
        return;
      }

      const supabase = await createClient();
      const { error } = await supabase.auth.verifyOtp({ type, token_hash });
      setLoading(false);

      if (error) {
        await Swal.fire({
          title: 'Verification Failed',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
        router.push('/error');
      } else {
        await Swal.fire({
          title: 'Email Confirmed',
          text: 'Your email has been verified. You can now log in.',
          icon: 'success',
          confirmButtonText: 'Go to Login',
        });
        router.push('/signin');
      }
    }
    handleVerify();
  }, [params, router]);

  return { loading };
}
