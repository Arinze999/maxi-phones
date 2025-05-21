import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Product shape matching flashsalesData
 */
export interface Product {
  src: string;
  title: string;
  slashedPrice: string;
  discountPercent?: string;
  price: string;
  rating: number;
}

/**
 * CartItem extends Product with quantity
 */
export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add a product to cart or update quantity
     * payload: { product, quantity }
     */
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find(item => item.title === product.title);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },

    /**
     * Remove a product from cart by title
     * payload: title string
     */
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.title !== action.payload);
    },

    /**
     * Clear all items from cart
     */
    clearCart(state) {
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
