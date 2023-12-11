import { createSlice } from "@reduxjs/toolkit";

export const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audioFiles: [],
    transcriptFiles: [],
  },
  reducers: {
    AddAudio: (state, payload) => {
      state.audioFiles.push(payload.payload);
    },
    AddtranscriptFile: (state, payload) => {
      state.transcriptFiles.push(payload.payload);
    },
  },
});

export const { AddAudio, AddtranscriptFile } = audioSlice.actions;

export default audioSlice.reducer;
