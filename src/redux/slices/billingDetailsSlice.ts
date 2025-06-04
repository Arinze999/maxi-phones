// redux/slices/billingDetailsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BillingDetailsDataType } from '@/models/BillingDetails.model';

// eslint-disable-next-line
interface BillingDetailsState extends BillingDetailsDataType {}

const initialState: BillingDetailsState = {
  fullname: '',
  streetAddress: '',
  city: '',
  state: '',
  phone: '',
  email: '',
};

const billingDetailsSlice = createSlice({
  name: 'billingDetails',
  initialState,
  reducers: {
    createNewBillingDetails(
      state,
      action: PayloadAction<BillingDetailsDataType>
    ) {
      return { ...action.payload };
    },
  },
});

export const { createNewBillingDetails } = billingDetailsSlice.actions;
export default billingDetailsSlice.reducer;
