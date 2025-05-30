// hooks/cart/useAddMultipleToCart.ts
'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { cartActions } from '@/redux/slices/cartSlice';
import Swal from 'sweetalert2';
import { createClient } from '../../../utils/supabase/client';
import type { Product } from '@/db/products';

interface CartItemWithQty extends Product {
  quantity: number;
}

interface UseAddMultipleToCartResult {
  addMultipleToCart: (items: CartItemWithQty[]) => Promise<void>;
  loading: boolean;
}

/**
 * Hook to add multiple items at once to the signed-in user’s cart.
 * Items already in the cart are skipped.
 */
export function useAddMultipleToCart(): UseAddMultipleToCartResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((s) => s.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const addMultipleToCart = useCallback(
    async (items: CartItemWithQty[]) => {
      if (!isUser) {
        await Swal.fire({
          title: 'Please Sign In',
          text: 'Only signed-in users can bulk-add to cart.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
        return;
      }

      setLoading(true);
      try {
        const supabase = await createClient();
        const userId = session!.user.id;

        // 1) Fetch existing cart
        const { data: profile, error: fetchErr } = await supabase
          .from('profiles')
          .select('cart_items')
          .eq('id', userId)
          .single();
        if (fetchErr) throw fetchErr;

        const existing: Array<Product & { quantity: number }> = Array.isArray(
          profile?.cart_items
        )
          ? profile.cart_items
          : [];

        const existingTitles = new Set(existing.map((i) => i.title));

        // 2) Split incoming into toAdd vs already
        const toAdd: CartItemWithQty[] = [];
        const already: string[] = [];
        for (const itm of items) {
          if (existingTitles.has(itm.title)) {
            already.push(itm.title);
          } else {
            toAdd.push(itm);
          }
        }

        // 3) If there’s nothing new, notify and exit
        if (toAdd.length === 0) {
          await Swal.fire({
            title: 'Nothing Added',
            text: `All selected items are already in your cart.`,
            icon: 'info',
            confirmButtonText: 'OK',
          });
          return;
        }

        // 4) Build new cart array
        const newCart = [...existing, ...toAdd];

        // 5) Persist to Supabase
        const { error: updErr } = await supabase
          .from('profiles')
          .update({ cart_items: newCart, updated_at: new Date() })
          .eq('id', userId);
        if (updErr) throw updErr;

        // 6) Dispatch to Redux for each added
        toAdd.forEach((p) =>
          dispatch(cartActions.addToCart({ product: p, quantity: p.quantity }))
        );

        // 7) Build a concise message
        const addedList = toAdd.map((p) => p.title).join(', ');
        const alreadyMsg = already.length
          ? `\nNote: ${already.join(', ')} already in cart.`
          : '';

        await Swal.fire({
          title: 'Items Added',
          text: `Added: ${addedList}.${alreadyMsg}`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (err) {
        console.error('Bulk add to cart failed', err);
        await Swal.fire({
          title: 'Error',
          text: 'Could not add items. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading(false);
      }
    },
    [dispatch, isUser, session]
  );

  return { addMultipleToCart, loading };
}
