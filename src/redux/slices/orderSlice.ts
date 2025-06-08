// redux/slices/orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

export type OrderStatus = 'pending' | 'successful' | 'cancelled';

export interface Order {
  id: string;
  cart: CartItem[];
  date: string; // ISO date format, e.g., '2025-06-07'
  time: string; // e.g., '14:35'
  total: number;
  status: OrderStatus;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    updateOrderStatus(
      state,
      action: PayloadAction<{ id: string; status: OrderStatus }>
    ) {
      const order = state.orders.find(
        (order) => order.id === action.payload.id
      );
      if (order) order.status = action.payload.status;
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
