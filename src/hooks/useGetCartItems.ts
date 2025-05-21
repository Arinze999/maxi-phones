// hooks/useGetCartItems.ts
'use client';

import { useState, useEffect } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { cartActions, CartItem, Product } from '@/redux/slices/cartSlice';
import { useRefreshSession } from './ui-control/useRefreshSession';

interface UseGetCartItemsResult {
  loading: boolean;
}

/**
 * Hook to initialize cart state on page load:
 * - waits for session‐rehydration to finish
 * - if signed in, placeholder for API sync
 * - if guest, loads from sessionStorage
 */
export function useGetCartItems(): UseGetCartItemsResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);

  // NEW: wait until our session‐rehydration hook is done
  const { loading: sessionLoading } = useRefreshSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) don’t touch anything while the session is still loading
    if (sessionLoading) return;

    (async function initCart() {
      if (isUser) {
        // signed-in user: sync from server
        // const { data } = await axios.get<CartItem[]>('/api/cart')
        // data.forEach(item => dispatch(cartActions.addToCart({ product: item, quantity: item.quantity })))
        alert('Simulating fetch cart from API for signed-in user');
      } else {
        // guest: load from sessionStorage
        const raw = sessionStorage.getItem('cartItems') ?? '[]';
        let items: CartItem[];
        try {
          items = JSON.parse(raw);
        } catch {
          items = [];
        }
        dispatch(cartActions.clearCart());
        items.forEach((item) => {
          const { quantity, ...prod } = item;
          dispatch(
            cartActions.addToCart({ product: prod as Product, quantity })
          );
        });
      }
      setLoading(false);
    })();
  }, [dispatch, isUser, sessionLoading]);

  return { loading };
}
