import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./features/audioSlice";
import paymentReducer from "./features/paymentSlice";
import liveTranscriptReducer from "./features/liveTranscriptUISlice";


export const store = configureStore({
  reducer: {
    audio: audioReducer,
    payment: paymentReducer,
    liveTranscript: liveTranscriptReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
