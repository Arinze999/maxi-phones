// hooks/wishlist/useGetWishList.ts
'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { wishListActions } from '@/redux/slices/wishListSlice';
import { createClient } from '../../../utils/supabase/client';
import type { Product } from '@/db/products';

interface UseGetWishListResult {
  fetchWishList: (userId: string) => Promise<void>;
  loading: boolean;
}

/**
 * Hook to load the signed-in user's wishlist from Supabase and sync to Redux.
 */
export function useGetWishList(): UseGetWishListResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const fetchWishList = useCallback(
    async (userId: string) => {
      if (!isUser) return;

      setLoading(true);
      try {
        const supabase = await createClient();
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('wishlist')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching wishlist:', error);
          return;
        }

        // Clear any existing items in Redux
        dispatch(wishListActions.clearWishList());

        // Add each product from Supabase into Redux
        (profile?.wishlist ?? []).forEach((p: Product) => {
          dispatch(wishListActions.addToWishList(p));
        });
      } catch (err) {
        console.error('useGetWishList error:', err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, isUser]
  );

  return { fetchWishList, loading };
}
