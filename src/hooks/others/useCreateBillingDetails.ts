// hooks/billing/useCreateBillingDetails.ts
'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { createNewBillingDetails } from '@/redux/slices/billingDetailsSlice';
import { createClient } from '../../../utils/supabase/client';
import type { BillingDetailsDataType } from '@/models/BillingDetails.model';
import Swal from 'sweetalert2';

interface UseCreateBillingDetailsResult {
  createBillingDetails: (
    userId: string,
    details: BillingDetailsDataType
  ) => Promise<void>;
  loading: boolean;
}

/**
 * Hook to save (overwrite) a user's billing details in Supabase and Redux.
 */
export function useCreateBillingDetails(): UseCreateBillingDetailsResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const createBillingDetails = useCallback(
    async (userId: string, details: BillingDetailsDataType) => {
      if (!isUser) return;

      setLoading(true);
      try {
        const supabase = await createClient();
        const { error } = await supabase
          .from('profiles')
          .update({ billing_details: details, updated_at: new Date() })
          .eq('id', userId);

        if (error) {
          console.error('Error saving billing details:', error);
          await Swal.fire({
            title: 'Save Failed',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }

        dispatch(createNewBillingDetails(details));
        await Swal.fire({
          title: 'Details Saved',
          text: 'Your billing details have been updated successfully.',
          icon: 'success',
          confirmButtonText: 'Continue',
        });
      } catch (err) {
        console.error('useCreateBillingDetails error:', err);
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

  return { createBillingDetails, loading };
}
