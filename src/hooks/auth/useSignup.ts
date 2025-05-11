import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import type { SignupDataType } from '@/models/auth/SignUp.model';
import { SignupInitialValues } from '@/models/auth/SignUp.model';
import Swal from 'sweetalert2';

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
          await Swal.fire({
            title: 'Process Failed',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Try Again',
          });
          actions.setFieldError('identifier', error.message);
        } else {
          await Swal.fire({
            title: 'Account Created',
            text: 'Redirect to Sign in...?',
            icon: 'success',
            confirmButtonText: 'OK',

            confirmButtonColor: '#db4444',
          });
          router.refresh();
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

// <h2>Confirm your signup</h2>

// <p>Follow this link to confirm your user:</p>
// <p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>
