import { createSlice } from "@reduxjs/toolkit";

export const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audioFiles: [],
    transcriptFiles: [],
    speakerTranscriptFiles: [],
    microphoneTranscriptFiles: [],
    isRecording: false,
  },

  reducers: {

    AddAudio: (state, payload) => {
      state.audioFiles.push(payload.payload);
    },
    AddtranscriptFile: (state, payload) => {
      state.transcriptFiles.push(payload.payload);
    },
    addSpeakerTranscripts: (state, payload) => {
      state.speakerTranscriptFiles.push(payload.payload);
    },
    addMicrophoneTranscripts: (state, payload) => {
      state.microphoneTranscriptFiles.push(payload.payload);
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
  stopRecordingRed, addSpeakerTranscripts,  addMicrophoneTranscripts  } = audioSlice.actions;

export default audioSlice.reducer;
