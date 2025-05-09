// hooks/useSignin.ts
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDisPatch } from '@/redux/store'; // ← your typed dispatch hook
import { authActions } from '@/redux/slices/authSlice';
import { createClient } from '../../../utils/supabase/client';
import type { LoginDataType } from '@/models/auth/SignIn.model';
import { LoginInitialValues } from '@/models/auth/SignIn.model';

export function useSignin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDisPatch();

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
          actions.setFieldError('identifier', error.message);
        } else if (data.session) {
          dispatch(authActions.setSession(data.session));
          localStorage.setItem('sessionData', JSON.stringify(data.session));
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
