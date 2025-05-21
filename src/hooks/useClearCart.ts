'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { cartActions } from '@/redux/slices/cartSlice';
import Swal from 'sweetalert2';

interface UseClearCartResult {
  clearCart: () => Promise<void>;
  loading: boolean;
}

/**
 * Hook to clear the entire cart via Redux and handle sessionStorage for guest users.
 * Simulates an API call for signed-in users.
 * @param onSuccess Optional callback to run after successful clear.
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
        // Simulate server sync via axios
        // await axios.delete('/api/cart');
        alert('Simulating axios API call to clear cart for user');
      } else {
        // Remove from sessionStorage for guest
        sessionStorage.removeItem('cartItems');
      }

      // Dispatch Redux clear action
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
  }, [dispatch, isUser, onSuccess]);

  return { clearCart, loading };
}
