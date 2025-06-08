import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishListReducer from './slices/wishListSlice';
import billingDetailsReducer from './slices/billingDetailsSlice';
import orderReducer from './slices/orderSlice';
import accountReducer from './slices/accountSlice';

const appReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishList: wishListReducer,
  billingDetails: billingDetailsReducer,
  orders: orderReducer,
  account: accountReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
