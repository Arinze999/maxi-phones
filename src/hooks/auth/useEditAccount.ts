'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { accountActions } from '@/redux/slices/accountSlice';
import { createClient } from '../../../utils/supabase/client';
import Swal from 'sweetalert2';
import { AccountDataType } from '@/models/auth/Account.model';

export function useEditAccount() {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const editAccount = useCallback(
    async (userId: string, updatedAccount: AccountDataType) => {
      if (!isUser) return;

      setLoading(true);
      try {
        const supabase = await createClient();
        const { error } = await supabase
          .from('profiles')
          .update({ account: updatedAccount, updated_at: new Date() })
          .eq('id', userId);

        if (error) {
          console.error('Error updating account:', error);
          await Swal.fire({
            title: 'Update Failed',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }

        dispatch(accountActions.setAccount(updatedAccount));
        await Swal.fire({
          title: 'Account Updated',
          text: 'Your account info has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'Continue',
        });
      } catch (err) {
        console.error('useEditAccount error:', err);
        await Swal.fire({
          title: 'Error',
          text: 'An unexpected error occurred. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading(false);
      }
    },
    [dispatch, isUser]
  );

  return { editAccount, loading };
}
