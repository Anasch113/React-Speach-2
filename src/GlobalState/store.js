import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./features/audioSlice";
import paymentReducer from "./features/paymentSlice"

export const store = configureStore({
  reducer: {
    audio: audioReducer,
    payment: paymentReducer

  },
  
});
