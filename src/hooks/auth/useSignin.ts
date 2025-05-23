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

        // 1) Sign in
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
          return;
        }
        if (!data.session) {
          // unlikely, but guard
          throw new Error('No session returned');
        }

        // 2) Check for a guest cart in sessionStorage
        const guestCartJson = sessionStorage.getItem('cartItems') ?? '[]';
        const guestCart: { productId: string; qty: number }[] =
          JSON.parse(guestCartJson);

        if (guestCart.length > 0) {
          const { isConfirmed } = await Swal.fire({
            title: 'Items Found in Cart',
            text: 'We found some items in your cart before you signed in. Would you like us to add these to your account cart?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, add them',
            cancelButtonText: 'No, thanks',
            confirmButtonColor: '#3085d6',
          });

          if (isConfirmed) {
            // 3) Fetch existing cart_items from Supabase
            const userId = data.session.user.id;
            const { data: profile, error: fetchError } = await supabase
              .from('profiles')
              .select('cart_items')
              .eq('id', userId)
              .single();

            if (fetchError) {
              console.error('Error fetching existing cart:', fetchError);
            } else {
              // 4) Merge and write back
              const mergedCart = [...profile.cart_items, ...guestCart];
              const { error: updateError } = await supabase
                .from('profiles')
                .update({ cart_items: mergedCart, updated_at: new Date() })
                .eq('id', userId);
              if (updateError) {
                console.error('Error updating cart_items:', updateError);
              }
            }
          }

          // 5) Clean up the guest cart
          sessionStorage.removeItem('cartItems');
        }

        // 6) Now clear Redux & set session
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
        actions.resetForm({ values: LoginInitialValues });
      } finally {
        setLoading(false);
      }
    },
    [dispatch, router, clearCart]
  );

  return { signinUser, loading };
}
