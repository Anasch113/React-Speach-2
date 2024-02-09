import { createSlice } from "@reduxjs/toolkit";

export const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audioFiles: [],
    transcriptFiles: [],
    typesTranscriptionFiles: [],
    videoStream: "",
    isRecording: false,
    summaryData: []
  },

  reducers: {

    AddAudio: (state, payload) => {
      state.audioFiles.push(payload.payload);
    },
    addTypesTranscriptionsFiles: (state, payload) => {
      state.typesTranscriptionFiles.push(payload.payload);
    },
    setVideoStream: (state, payload) => {
      state.videoStream.push(payload.payload);
    },
    addSummary: (state, payload) => {
      state.summaryData.push(payload.payload);
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
  stopRecordingRed, addTypesTranscriptionsFiles, setVideoStream, addSummary    } = audioSlice.actions;

export default audioSlice.reducer;
