import { createSlice } from "@reduxjs/toolkit";

export const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audioFiles: [],
    transcriptFiles: [],
    isRecording: false,
  },

  reducers: {
    AddAudio: (state, payload) => {
      state.audioFiles.push(payload.payload);
    },
    AddtranscriptFile: (state, payload) => {
      state.transcriptFiles.push(payload.payload);
    },
    startRecordingRed: (state, payload) => {
      state.isRecording = true;
    },
    stopRecordingRed: (state, payload) => {
      state.isRecording = false
    }

  },
});

export const { AddAudio, AddtranscriptFile, startRecordingRed,
  stopRecordingRed, } = audioSlice.actions;

export default audioSlice.reducer;
