'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch } from '@/redux/store';
import { cartActions, CartItem, Product } from '@/redux/slices/cartSlice';
import { createClient } from '../../utils/supabase/client';

interface UseGetCartItemsResult {
  fetchCartItems: (userId?: string) => Promise<void>;
  loading: boolean;
}

export function useGetCartItems(): UseGetCartItemsResult {
  const dispatch = useAppDisPatch();
  const [loading, setLoading] = useState(false);

  const fetchCartItems = useCallback(
    async (userId?: string) => {
      setLoading(true);
      try {
        if (userId) {
           console.log('running user cart');
          // signed-in: load from Supabase
          const supabase = await createClient();
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('cart_items')
            .eq('id', userId)
            .single();

          if (error) {
            console.error('Error fetching cart items:', error);
          } else if (profile?.cart_items) {
            dispatch(cartActions.clearCart());
            (profile.cart_items as CartItem[]).forEach((item) => {
              const { quantity, ...prod } = item;
              dispatch(
                cartActions.addToCart({ product: prod as Product, quantity })
              );
            });
          }
        } else {
          // guest: load from sessionStorage
          console.log('running guest cart');
          const raw = sessionStorage.getItem('cartItems') ?? '[]';
          let items: CartItem[] = [];
          try {
            items = JSON.parse(raw);
          } catch {
            console.warn('Invalid cart JSON in sessionStorage');
          }

          dispatch(cartActions.clearCart());
          items.forEach((item) => {
            const { quantity, ...prod } = item;
            dispatch(
              cartActions.addToCart({ product: prod as Product, quantity })
            );
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return { fetchCartItems, loading };
}
