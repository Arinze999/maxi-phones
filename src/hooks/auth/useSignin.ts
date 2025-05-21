// hooks/useSignin.ts
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDisPatch } from '@/redux/store';
import { authActions } from '@/redux/slices/authSlice';
import { createClient } from '../../../utils/supabase/client';
import Swal from 'sweetalert2';
import type { LoginDataType } from '@/models/auth/SignIn.model';
import { LoginInitialValues } from '@/models/auth/SignIn.model';
import { useClearCart } from '../useClearCart';

export function useSignin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDisPatch();
  const { clearCart } = useClearCart();

  const signinUser = useCallback(
    async (values: LoginDataType, actions: any) => {
      setLoading(true);
      try {
        const supabase = await createClient();
        const { identifier, password } = values;
        const creds = identifier.includes('@')
          ? { email: identifier }
          : { phone: identifier };

        const { data, error } = await supabase.auth.signInWithPassword({
          ...creds,
          password,
        });

        if (error) {
          await Swal.fire({
            title: 'Sign-in Failed',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Try Again',

            confirmButtonColor: '#db4444',
          });
          actions.setFieldError('identifier', error.message);
        } else if (data.session) {
          clearCart();
          dispatch(authActions.setSession(data.session));
          localStorage.setItem('sessionData', JSON.stringify(data.session));

          await Swal.fire({
            title: 'Logged in!',
            text: 'You have successfully signed in.',
            icon: 'success',
            confirmButtonText: 'Continue',

            confirmButtonColor: '#db4444',
          });

          router.refresh();
          router.push('/');
        }

        actions.resetForm({ values: LoginInitialValues });
      } finally {
        setLoading(false);
      }
    },
    [dispatch, router]
  );

  return { signinUser, loading };
}
