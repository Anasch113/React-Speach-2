import { createSlice } from "@reduxjs/toolkit";

export const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audioFiles: [],
    transcriptFiles: [],
    typesTranscriptionFiles: [],
  
    isRecording: false,
  },

  reducers: {

    AddAudio: (state, payload) => {
      state.audioFiles.push(payload.payload);
    },
    addTypesTranscriptionsFiles: (state, payload) => {
      state.typesTranscriptionFiles.push(payload.payload);
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
  stopRecordingRed, addTypesTranscriptionsFiles    } = audioSlice.actions;

export default audioSlice.reducer;
