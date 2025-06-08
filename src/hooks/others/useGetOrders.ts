'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { orderActions, Order, OrderStatus } from '@/redux/slices/orderSlice';
import { createClient } from '../../../utils/supabase/client';
import Swal from 'sweetalert2';

interface UseGetOrdersResult {
  getOrders: (userId: string, status?: OrderStatus) => Promise<void>;
  loading: boolean;
}

export function useGetOrders(): UseGetOrdersResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const getOrders = useCallback(
    async (userId: string, status?: OrderStatus) => {
      if (!isUser) return;

      setLoading(true);
      try {
        const supabase = await createClient();

        const { data, error } = await supabase
          .from('profiles')
          .select('orders')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching orders:', error);
          await Swal.fire({
            title: 'Fetch Failed',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }

        let orders: Order[] = Array.isArray(data.orders) ? data.orders : [];

        // Filter if status is provided
        if (status) {
          orders = orders.filter((o) => o.status === status);
        }

        // Dispatch fetched orders to Redux store
        dispatch(orderActions.setOrders(orders));
      } catch (err) {
        console.error('useGetOrders error:', err);
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

  return { getOrders, loading };
}
