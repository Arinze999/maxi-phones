'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { cartActions } from '@/redux/slices/cartSlice';
import Swal from 'sweetalert2';

interface UseRemoveFromCartResult {
  removeFromCart: (title: string) => Promise<void>;
  loading: boolean;
}

/**
 * Hook to remove items from the cart via Redux and handle sessionStorage for guest users.
 * Simulates an API call for signed-in users.
 * @param onSuccess Optional callback to run after successful removal.
 */
export function useRemoveFromCart(onSuccess?: () => void): UseRemoveFromCartResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const removeFromCart = useCallback(
    async (title: string) => {
      setLoading(true);
      try {
        if (isUser) {
          // Simulate server sync via axios
          // await axios.delete(`/api/cart/${encodeURIComponent(title)}`);
          alert('Simulating axios API call to remove item for user');
        } else {
          // Update sessionStorage for guest
          const raw = sessionStorage.getItem('cartItems') || '[]';
          const items: Array<{ title: string; quantity: number }> = JSON.parse(raw);
          const filtered = items.filter(item => item.title !== title);
          sessionStorage.setItem('cartItems', JSON.stringify(filtered));
        }

        // Dispatch Redux action
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
    [dispatch, isUser, onSuccess]
  );

  return { removeFromCart, loading };
}
