// hooks/orders/useSaveOrder.ts
'use client';

import { useState, useCallback } from 'react';
import { useAppDisPatch, useAppSelector } from '@/redux/store';
import { orderActions, type Order } from '@/redux/slices/orderSlice';
import { createClient } from '../../../utils/supabase/client';
import { useClearCart } from '../cart/useClearCart';
import Swal from 'sweetalert2';

interface UseSaveOrderResult {
  saveOrder: (userId: string, order: Order) => Promise<void>;
  loading: boolean;
}

/**
 * Hook to save a user's order details in Supabase and Redux.
 */
export function useSaveOrder(): UseSaveOrderResult {
  const dispatch = useAppDisPatch();
  const session = useAppSelector((state) => state.auth.session);
  const isUser = Boolean(session);
  const [loading, setLoading] = useState(false);

  const { clearCart } = useClearCart(() => console.log('Cart cleared'), false);

  const saveOrder = useCallback(
    async (userId: string, order: Order) => {
      if (!isUser) return;

      setLoading(true);
      try {
        const supabase = await createClient();

        // Get current orders
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('orders')
          .eq('id', userId)
          .single();

        if (fetchError) {
          console.error('Error fetching current orders:', fetchError);
          await Swal.fire({
            title: 'Fetch Failed',
            text: fetchError.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }

        const currentOrders = data.orders || [];

        // Update orders with the new order appended
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ orders: [...currentOrders, order], updated_at: new Date() })
          .eq('id', userId);

        if (updateError) {
          console.error('Error saving order:', updateError);
          await Swal.fire({
            title: 'Save Failed',
            text: updateError.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }

        // Update Redux
        dispatch(orderActions.addOrder(order));
        await Swal.fire({
          title: 'Order Saved',
          text: 'Your order has been placed successfully.',
          icon: 'success',
          confirmButtonText: 'Continue',
        });
        clearCart();
      } catch (err) {
        console.error('useSaveOrder error:', err);
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
    // eslint-disable-next-line
    [dispatch, isUser]
  );

  return { saveOrder, loading };
}
