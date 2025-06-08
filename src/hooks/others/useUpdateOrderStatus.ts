'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { orderActions, OrderStatus, Order } from '@/redux/slices/orderSlice';
import { createClient } from '../../../utils/supabase/client';
import Swal from 'sweetalert2';

interface UseUpdateOrderStatusResult {
  updateOrderStatus: (
    userId: string,
    orderId: string,
    status: OrderStatus
  ) => Promise<void>;
  loading: boolean;
}

export function useUpdateOrderStatus(): UseUpdateOrderStatusResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const updateOrderStatus = useCallback(
    async (userId: string, orderId: string, status: OrderStatus) => {
      if (!isUser) return;

      setLoading(true);
      try {
        const supabase = await createClient();

        // Get current orders from Supabase
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('orders')
          .eq('id', userId)
          .single();

        if (fetchError) {
          console.error('Error fetching orders:', fetchError);
          await Swal.fire({
            title: 'Fetch Failed',
            text: fetchError.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }

        let orders: Order[] = Array.isArray(data.orders) ? data.orders : [];

        // Update the order status
        orders = orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        );

        // Save updated orders to Supabase
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ orders, updated_at: new Date() })
          .eq('id', userId);

        if (updateError) {
          console.error('Error updating order status:', updateError);
          await Swal.fire({
            title: 'Update Failed',
            text: updateError.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }

        // Update Redux state
        dispatch(orderActions.updateOrderStatus({ id: orderId, status }));

        await Swal.fire({
          title: 'Status Updated',
          text: 'Order status has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (err) {
        console.error('useUpdateOrderStatus error:', err);
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

  return { updateOrderStatus, loading };
}
