'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { cartActions } from '@/redux/slices/cartSlice';
import Swal from 'sweetalert2';
import { createClient } from '../../../utils/supabase/client';

interface UseRemoveFromCartResult {
  removeFromCart: (title: string) => Promise<void>;
  loading: boolean;
}

/**
 * Hook to remove items from the cart via Redux and persist on Supabase for signed-in users.
 * Also updates sessionStorage for guest users.
 */
export function useRemoveFromCart(
  onSuccess?: () => void
): UseRemoveFromCartResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const removeFromCart = useCallback(
    async (title: string) => {
      setLoading(true);
      try {
        if (isUser) {
          const supabase = await createClient();
          const userId = session!.user.id;

          // 1) Fetch current cart_items
          const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('cart_items')
            .eq('id', userId)
            .single();

          if (fetchError) {
            console.error('Failed to fetch cart for removal:', fetchError);
            throw fetchError;
          }

          // 2) Filter out the item by title
          const existing: Array<{
            title: string;
            quantity: number;
            [key: string]: any;
          }> = Array.isArray(profile?.cart_items) ? profile.cart_items : [];
          const updatedCart = existing.filter((item) => item.title !== title);

          // 3) Persist the filtered array back to Supabase
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ cart_items: updatedCart, updated_at: new Date() })
            .eq('id', userId);

          if (updateError) {
            console.error('Failed to update cart on Supabase:', updateError);
            throw updateError;
          }
        } else {
          // Guest user: update sessionStorage
          const raw = sessionStorage.getItem('cartItems') || '[]';
          let items: Array<{ title: string; quantity: number }> = [];
          try {
            items = JSON.parse(raw);
          } catch {
            console.warn('Invalid cart JSON in sessionStorage');
          }
          const filtered = items.filter((item) => item.title !== title);
          sessionStorage.setItem('cartItems', JSON.stringify(filtered));
        }

        // 4) Dispatch Redux action
        dispatch(cartActions.removeFromCart(title));

        await Swal.fire({
          title: 'Removed from Cart',
          text: title,
          icon: 'success',
          confirmButtonText: 'Continue',
          confirmButtonColor: '#db4444',
        });

        onSuccess?.();
      } catch (error) {
        console.error('Remove from cart failed', error);
        await Swal.fire({
          title: 'Removal Failed',
          text: 'Could not remove item. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading(false);
      }
    },
    [dispatch, isUser, session, onSuccess]
  );

  return { removeFromCart, loading };
}
