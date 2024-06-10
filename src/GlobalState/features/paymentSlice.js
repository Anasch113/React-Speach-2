// paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    sessionId: '',
    cloudUrl: '',
    amount: 0,
    paymentSuccess: false,
  },
  reducers: {
    setPaymentData: (state, action) => {
      state.sessionId = action.payload.sessionId;
      state.cloudUrl = action.payload.cloudUrl;
      state.amount = action.payload.amount;
      state.paymentSuccess = true;
    },
    clearPaymentData: (state) => {
      state.sessionId = '';
      state.cloudUrl = '';
      state.amount = 0;
      state.paymentSuccess = false;
    }
  },
});

export const { setPaymentData, clearPaymentData } = paymentSlice.actions;

export default paymentSlice.reducer;
