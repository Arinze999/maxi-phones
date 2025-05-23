'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { cartActions } from '@/redux/slices/cartSlice';
import Swal from 'sweetalert2';
import { createClient } from '../../utils/supabase/client';

interface UseClearCartResult {
  clearCart: () => Promise<void>;
  loading: boolean;
}

/**
 * Hook to clear the entire cart via Redux and persist on Supabase for signed-in users.
 * Also clears sessionStorage for guest users.
 */
export function useClearCart(onSuccess?: () => void): UseClearCartResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const clearCart = useCallback(async () => {
    setLoading(true);
    try {
      if (isUser) {
        const supabase = await createClient();
        const userId = session!.user.id;

        // Clear the cart_items array in Supabase
        const { error } = await supabase
          .from('profiles')
          .update({ cart_items: [], updated_at: new Date() })
          .eq('id', userId);

        if (error) {
          console.error('Failed to clear cart on Supabase:', error);
          throw error;
        }
      } else {
        // Guest user: just remove from sessionStorage
        sessionStorage.removeItem('cartItems');
      }

      // Redux update
      dispatch(cartActions.clearCart());

      await Swal.fire({
        title: 'Cart Cleared',
        text: 'All items have been removed from your cart.',
        icon: 'success',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#db4444',
      });

      onSuccess?.();
    } catch (error) {
      console.error('Clear cart failed', error);
      await Swal.fire({
        title: 'Clear Failed',
        text: 'Could not clear the cart. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  }, [dispatch, isUser, session, onSuccess]);

  return { clearCart, loading };
}
