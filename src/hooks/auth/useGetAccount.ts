// src/hooks/account/useGetAccount.ts
'use client';

import { useCallback, useState } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { accountActions } from '@/redux/slices/accountSlice';
import { createClient } from '../../../utils/supabase/client';
import { AccountDataType } from '@/models/auth/Account.model';

export function useGetAccount() {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const getAccount = useCallback(
    async (userId: string) => {
      if (!isUser) return;

      setLoading(true);
      try {
        const supabase = await createClient();
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('account')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching account data:', error);
          return;
        }

        const accountData = (profile?.account ?? {}) as AccountDataType;
        dispatch(accountActions.setAccount(accountData));
      } catch (err) {
        console.error('useGetAccount error:', err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, isUser]
  );

  return { getAccount, loading };
}
