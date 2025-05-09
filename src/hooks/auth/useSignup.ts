import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import type { SignupDataType } from '@/models/auth/SignUp.model';
import { SignupInitialValues } from '@/models/auth/SignUp.model';

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signupUser = useCallback(
    async (values: SignupDataType, actions: any) => {
      setLoading(true);
      try {
        const supabase = await createClient();
        const { identifier, password } = values;
        const creds = identifier.includes('@')
          ? { email: identifier }
          : { phone: identifier };

        const { error } = await supabase.auth.signUp({
          ...creds,
          password,
        });

        if (error) {
          actions.setFieldError('identifier', error.message);
        } else {
          alert('account created');
          router.push('/signin');
        }

        actions.resetForm({ values: SignupInitialValues });
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  return { signupUser, loading };
}
