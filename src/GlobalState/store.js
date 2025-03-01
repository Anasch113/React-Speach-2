import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./features/audioSlice";
import paymentReducer from "./features/paymentSlice";
import liveTranscriptReducer from "./features/liveTranscriptUISlice";
import authReducer from "./features/authSlice";
import uxReducer from "./features/UXSlice"


export const store = configureStore({
  reducer: {
    audio: audioReducer,
    payment: paymentReducer,
    liveTranscript: liveTranscriptReducer,
    ux: uxReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
