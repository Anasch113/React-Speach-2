import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./features/audioSlice";
import paymentReducer from "./features/paymentSlice";
import liveTranscriptReducer from "./features/liveTranscriptUISlice";
import authReducer from "./features/authSlice";



export const store = configureStore({
  reducer: {
    audio: audioReducer,
    payment: paymentReducer,
    liveTranscript: liveTranscriptReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
