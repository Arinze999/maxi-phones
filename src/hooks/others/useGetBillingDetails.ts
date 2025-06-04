// hooks/billing/useGetBillingDetails.ts
'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { createNewBillingDetails } from '@/redux/slices/billingDetailsSlice';
import { createClient } from '../../../utils/supabase/client';
import type { BillingDetailsDataType } from '@/models/BillingDetails.model';

interface UseGetBillingDetailsResult {
  fetchBillingDetails: (userId: string) => Promise<void>;
  loading: boolean;
}

/**
 * Hook to load the signed-in user's billing details from Supabase and sync to Redux.
 */
export function useGetBillingDetails(): UseGetBillingDetailsResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const fetchBillingDetails = useCallback(
    async (userId: string) => {
      if (!isUser) return;

      setLoading(true);
      try {
        const supabase = await createClient();
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('billing_details')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching billing details:', error);
          return;
        }

        const details = (profile?.billing_details ??
          {}) as BillingDetailsDataType;
        dispatch(createNewBillingDetails(details));
      } catch (err) {
        console.error('useGetBillingDetails error:', err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, isUser]
  );

  return { fetchBillingDetails, loading };
}
