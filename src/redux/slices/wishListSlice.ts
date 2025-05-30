import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/db/products';

interface WishState {
  items: Product[];
}

const initialState: WishState = {
  items: [],
};

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishList(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const exists = state.items.some((item) => item.title === product.title);
      if (!exists) {
        state.items.push(product);
      }
    },

    removeFromWishList(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.title !== action.payload);
    },

    clearWishList(state) {
      state.items = [];
    },
  },
});

export const wishListActions = wishListSlice.actions;
export default wishListSlice.reducer;
