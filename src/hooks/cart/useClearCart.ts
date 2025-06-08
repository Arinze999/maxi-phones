'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { cartActions } from '@/redux/slices/cartSlice';
import Swal from 'sweetalert2';
import { createClient } from '../../../utils/supabase/client';

interface UseClearCartResult {
  clearCart: () => Promise<void>;
  loading: boolean;
}

/**
 * Hook to clear the entire cart via Redux and persist on Supabase for signed-in users.
 * Also clears sessionStorage for guest users.
 * @param onSuccess Optional callback to run after successful clear.
 * @param confirm If true, uses SweetAlert for confirm/success/error. If false, runs silently.
 */
export function useClearCart(
  onSuccess?: () => void,
  confirm: boolean = true
): UseClearCartResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const clearCart = useCallback(async () => {
    setLoading(true);
    try {
      // 1) Show confirmation only if confirm === true
      if (confirm) {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'This will remove all items from your cart.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, clear it',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#d33',
          reverseButtons: true,
        });

        if (!result.isConfirmed) {
          setLoading(false);
          return;
        }
      }

      // 2) Clear Supabase or sessionStorage
      if (isUser) {
        const supabase = await createClient();
        const userId = session!.user.id;

        const { error } = await supabase
          .from('profiles')
          .update({ cart_items: [], updated_at: new Date() })
          .eq('id', userId);

        if (error) {
          console.error('Failed to clear cart on Supabase:', error);
          if (confirm) {
            await Swal.fire({
              title: 'Clear Failed',
              text: 'Could not clear the cart. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
          return;
        }
      } else {
        sessionStorage.removeItem('cartItems');
      }

      // 3) Redux update
      dispatch(cartActions.clearCart());

      // 4) Show success only if confirm === true
      if (confirm) {
        await Swal.fire({
          title: 'Cart Cleared',
          text: 'All items have been removed from your cart.',
          icon: 'success',
          confirmButtonText: 'Continue',
          confirmButtonColor: '#db4444',
        });
      }

      onSuccess?.();
    } catch (error) {
      console.error('Clear cart failed', error);
      if (confirm) {
        await Swal.fire({
          title: 'Clear Failed',
          text: 'An unexpected error occurred.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, isUser, session, onSuccess, confirm]);

  return { clearCart, loading };
}
