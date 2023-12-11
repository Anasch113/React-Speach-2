import { createSlice } from "@reduxjs/toolkit";

export const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audioFiles: [],
  },
  reducers: {
    AddAudio: (state, payload) => {
      state.audioFiles.push(payload.payload);
    },
  },
});

export const { AddAudio } = audioSlice.actions;

export default audioSlice.reducer;
