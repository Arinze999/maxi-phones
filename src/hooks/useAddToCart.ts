'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { cartActions, Product } from '@/redux/slices/cartSlice';
import Swal from 'sweetalert2';

interface UseAddToCartResult {
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  loading: boolean;
}

/**
 * Hook to add items to the cart via Redux and simulate an API call for signed-in users.
 * Also persists cart in sessionStorage for guest users.
 * @param onSuccess Optional callback to run after a successful add.
 */
export function useAddToCart(onSuccess?: () => void): UseAddToCartResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const addToCart = useCallback(
    async (product: Product, quantity: number = 1) => {
      setLoading(true);
      try {
        if (isUser) {
          // Signed-in user: simulate API call only
          alert('Simulating axios API call for user');

          // Dispatch to Redux
        //   dispatch(cartActions.addToCart({ product, quantity }));

          await Swal.fire({
            title: 'Added to Cart!',
            text: product.title,
            icon: 'success',
            confirmButtonText: 'Continue',
            confirmButtonColor: '#db4444',
          });

          onSuccess?.();
          return;
        }

        // Guest user: persist to sessionStorage
        const raw = sessionStorage.getItem('cartItems') || '[]';
        const items: (Product & { quantity: number })[] = JSON.parse(raw);
        const existing = items.find((item) => item.title === product.title);
        if (existing) {
          existing.quantity += quantity;
        } else {
          items.push({ ...product, quantity });
        }
        sessionStorage.setItem('cartItems', JSON.stringify(items));

        // Dispatch to Redux for guest
        dispatch(cartActions.addToCart({ product, quantity }));

        await Swal.fire({
          title: 'Added to Cart!',
          text: product.title,
          icon: 'success',
          confirmButtonText: 'Continue',
          confirmButtonColor: '#db4444',
        });

        onSuccess?.();
      } catch (error) {
        console.error('Add to cart failed', error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, isUser, onSuccess]
  );

  return { addToCart, loading };
}
