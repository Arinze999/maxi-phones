import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/db/products';

/**
 * CartItem extends Product with quantity
 */
export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add a product to cart or update quantity
     * payload: { product, quantity }
     */
    addToCart(
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.title === product.title);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      // Recalculate total
      state.total = state.items.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
      );
    },

    /**
     * Remove a product from cart by title
     * payload: title string
     */
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.title !== action.payload);
      // Recalculate total
      state.total = state.items.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
      );
    },

    /**
     * Clear all items from cart
     */
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
