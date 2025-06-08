// src/redux/slices/accountSlice.ts
import { AccountDataType, AccountInitialValues } from '@/models/auth/Account.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AccountState = AccountDataType;

const initialState: AccountState = AccountInitialValues;

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<AccountDataType>) => {
      return action.payload;
    },
    clearAccount: () => {
      return AccountInitialValues;
    },
  },
});

export const accountActions = accountSlice.actions;
export default accountSlice.reducer;
