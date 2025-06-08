import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import type { SignupDataType } from '@/models/auth/SignUp.model';
import { SignupInitialValues } from '@/models/auth/SignUp.model';
import Swal from 'sweetalert2';
import { FormikHelpers } from 'formik';

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signupUser = useCallback(
    async (values: SignupDataType, actions: FormikHelpers<SignupDataType>) => {
      setLoading(true);
      try {
        const supabase = await createClient();
        const { identifier, password } = values;
        const creds = identifier.includes('@')
          ? { email: identifier }
          : { phone: identifier };

        // 1) Sign up
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            ...creds,
            password,
          });

        if (signUpError) {
          await Swal.fire({
            title: 'Process Failed',
            text: signUpError.message,
            icon: 'error',
            confirmButtonText: 'Try Again',
          });
          actions.setFieldError('identifier', signUpError.message);
        } else {
          // 2) Grab the new user's ID
          const userId = signUpData.user?.id;
          if (!userId) throw new Error('Could not get new user ID');

          // 3) Insert a blank profile row
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: userId,
                avatar_url: '',
                cart_items: [],
                wishlist: [],
                billing_details: {},
                orders: [],
                cancellations: [],
                account: [],
              },
            ]);

          if (profileError) {
            console.error('Failed to create profile row:', profileError);
            // you might choose to alert the user or retry here
          }

          // 4) Let the user know and redirect
          await Swal.fire({
            title: 'Account Created',
            text: 'Redirecting to Sign in…',
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
