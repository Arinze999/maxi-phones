// hooks/useAddToWishList.ts
'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { wishListActions } from '@/redux/slices/wishListSlice';
import Swal from 'sweetalert2';
import { createClient } from '../../../utils/supabase/client';
import { Product } from '@/db/products';

interface UseAddToWishListResult {
  addToWishList: (product: Product) => Promise<void>;
  loading: boolean;
}

export function useAddToWishList(): UseAddToWishListResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const wishItems = useAppSelector((state) => state.wishList.items);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const addToWishList = useCallback(
    async (product: Product) => {
      if (!isUser) {
        await Swal.fire({
          title: 'Please Sign In',
          text: 'You must be signed in to add items to your wishlist.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
        return;
      }

      // don't add duplicates
      if (wishItems.some((item) => item.title === product.title)) {
        return;
      }

      setLoading(true);
      try {
        const supabase = await createClient();
        const userId = session!.user.id;

        // fetch existing wishlist
        const { data: profile, error: fetchError } = await supabase
          .from('profiles')
          .select('wishlist')
          .eq('id', userId)
          .single();
        if (fetchError) {
          console.error('Error fetching wishlist:', fetchError);
          throw fetchError;
        }

        const existing: Product[] = Array.isArray(profile?.wishlist)
          ? profile.wishlist
          : [];

        const newList = [...existing, product];

        // update supabase
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ wishlist: newList, updated_at: new Date() })
          .eq('id', userId);
        if (updateError) {
          console.error('Error updating wishlist:', updateError);
          throw updateError;
        }

        // update redux
        dispatch(wishListActions.addToWishList(product));

        await Swal.fire({
          title: 'Added to Wishlist',
          text: product.title,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (err) {
        console.error('Add to wishlist failed:', err);
        await Swal.fire({
          title: 'Error',
          text: 'Could not add to wishlist. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading(false);
      }
    },
    [dispatch, isUser, session, wishItems]
  );

  return { addToWishList, loading };
}
