// hooks/wishlist/useRemoveFromWishList.ts
'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { wishListActions } from '@/redux/slices/wishListSlice';
import Swal from 'sweetalert2';
import { createClient } from '../../../utils/supabase/client';

interface UseRemoveFromWishListResult {
  removeFromWishList: (title: string) => Promise<void>;
  loading: boolean;
}

/**
 * Hook to remove an item from the signed-in user's wishlist
 * in Supabase and sync to Redux.
 */
export function useRemoveFromWishList(): UseRemoveFromWishListResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const removeFromWishList = useCallback(
    async (title: string) => {
      if (!isUser) {
        await Swal.fire({
          title: 'Please Sign In',
          text: 'You must be signed in to remove items from your wishlist.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
        return;
      }

      setLoading(true);
      try {
        const supabase = await createClient();
        const userId = session!.user.id;

        // 1) Fetch current wishlist
        const { data: profile, error: fetchError } = await supabase
          .from('profiles')
          .select('wishlist')
          .eq('id', userId)
          .single();
        if (fetchError) {
          console.error('Failed to fetch wishlist:', fetchError);
          throw fetchError;
        }

        // 2) Remove the item
        const existing: any[] = Array.isArray(profile?.wishlist)
          ? profile.wishlist
          : [];
        const newList = existing.filter((p) => p.title !== title);

        // 3) Persist back to Supabase
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ wishlist: newList, updated_at: new Date() })
          .eq('id', userId);
        if (updateError) {
          console.error('Failed to update wishlist:', updateError);
          throw updateError;
        }

        // 4) Dispatch removal to Redux
        dispatch(wishListActions.removeFromWishList(title));

        await Swal.fire({
          title: 'Removed from Wishlist',
          text: title,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (err) {
        console.error('Remove from wishlist failed:', err);
        await Swal.fire({
          title: 'Error',
          text: 'Could not remove item. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading(false);
      }
    },
    [dispatch, isUser, session]
  );

  return { removeFromWishList, loading };
}
