'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { cartActions } from '@/redux/slices/cartSlice';
import Swal from 'sweetalert2';
import { createClient } from '../../utils/supabase/client';
import { Product } from '@/db/products';

interface UseAddToCartResult {
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  loading: boolean;
}

/**
 * Hook to add items to the cart via Redux and persist on Supabase for signed-in users.
 * Also persists cart in sessionStorage for guest users.
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
          const supabase = await createClient();
          const userId = session!.user.id;

          // 1) Fetch current cart_items
          const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('cart_items')
            .eq('id', userId)
            .single();

          if (fetchError) {
            console.error('Failed to fetch existing cart:', fetchError);
            throw fetchError;
          }

          // 2) Merge new item
          const existing: (Product & { quantity: number })[] = Array.isArray(
            profile?.cart_items
          )
            ? profile.cart_items
            : [];
          const index = existing.findIndex((i) => i.title === product.title);

          let newCart;
          if (index !== -1) {
            // update quantity
            existing[index].quantity += quantity;
            newCart = existing;
          } else {
            newCart = [...existing, { ...product, quantity }];
          }

          // 3) Persist back to Supabase
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ cart_items: newCart, updated_at: new Date() })
            .eq('id', userId);

          if (updateError) {
            console.error('Failed to update cart on Supabase:', updateError);
            throw updateError;
          }

          // 4) Dispatch to Redux
          dispatch(cartActions.addToCart({ product, quantity }));

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
        await Swal.fire({
          title: 'Error',
          text: 'Could not add item to cart. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading(false);
      }
    },
    [dispatch, isUser, session, onSuccess]
  );

  return { addToCart, loading };
}
