
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    smallWindow: {
        fontSize: 26,
        fontFamily: "Arial",
        textColor: "#ffffff",
        bgColor: "#000000",
    },
    largeWindow: {
        fontSize: 26,
        fontFamily: "Arial",
        textColor: "#ffffff",
        bgColor: "#000000",
    },
    virtualTranscript: {
        liveTranscript: {},
        finalTranscript: [],
        url: "",
        transcriptType: null,
        meetingStatus: "",
        meetingError: null,
        zoomAccessToken: "",
        isToken: false,
        isVtPaused: false,
        isVtRecording: false,
        vtRemainingTime: 0,
        botId: "",
        isProcessing: false,
        
    },
    inPersonMeeting: {
        inPersonTranscript: '',
        isMeetingEnd: false
    }
};

const liveTranscriptUISlice = createSlice({
    name: "liveTranscript",
    initialState,
    reducers: {
        // Small window reducers
        setSmallFontSize: (state, action) => {
            state.smallWindow.fontSize = action.payload;
        },
        setSmallFontFamily: (state, action) => {
            state.smallWindow.fontFamily = action.payload;
        },
        setSmallTextColor: (state, action) => {
            state.smallWindow.textColor = action.payload;
        },
        setSmallBgColor: (state, action) => {
            state.smallWindow.bgColor = action.payload;
        },

        // Large window reducers
        setLargeFontSize: (state, action) => {
            state.largeWindow.fontSize = action.payload;
        },
        setLargeFontFamily: (state, action) => {
            state.largeWindow.fontFamily = action.payload;
        },
        setLargeTextColor: (state, action) => {
            state.largeWindow.textColor = action.payload;
        },
        setLargeBgColor: (state, action) => {
            state.largeWindow.bgColor = action.payload;
        },

        // Virtual Live Transcript 

        setLiveTranscript: (state, action) => {
            state.virtualTranscript.liveTranscript = action.payload;
        },
        setFinalTranscript: (state, action) => {
            state.virtualTranscript.finalTranscript = action.payload;
        },
        setTranscriptType: (state, action) => {
            state.virtualTranscript.transcriptType = action.payload;
        },
        setMeetingStatus: (state, action) => {
            state.virtualTranscript.meetingStatus = action.payload;
        },
        setMeetingError: (state, action) => {
            state.virtualTranscript.meetingError = action.payload;
        },
        setZoomAccessToken: (state, action) => {
            state.virtualTranscript.zoomAccessToken = action.payload
        },
        setIsToken: (state, action) => {
            state.virtualTranscript.isToken = action.payload
        },
        setUrl: (state, action) => {
            state.virtualTranscript.url = action.payload
        },
        setIsVtPaused: (state, action) => {
            state.virtualTranscript.isVtPaused = action.payload
        },
        setIsVtRecording: (state, action) => {
            state.virtualTranscript.isVtRecording = action.payload
        },
        setVtRemainingTime: (state, action) => {
            state.virtualTranscript.vtRemainingTime = action.payload
        },
        setBotId: (state, action) => {
            state.virtualTranscript.botId = action.payload
        },
        setIsProcessing: (state, action) => {
            state.virtualTranscript.isProcessing = action.payload
        },
        setInPersonMeetingTranscript: (state, action) => {
            state.inPersonMeeting.inPersonTranscript = action.payload
        },
        setIsMeetingEnd: (state, action) => {
            state.inPersonMeeting.isMeetingEnd = action.payload
        },
       


    },
});

// Exporting actions

export const {
    setSmallFontSize,
    setSmallFontFamily,
    setSmallTextColor,
    setSmallBgColor,
    setLargeFontSize,
    setLargeFontFamily,
    setLargeTextColor,
    setLargeBgColor,
    setLiveTranscript,
    setFinalTranscript,
    setTranscriptType,
    setMeetingStatus,
    setMeetingError,
    setZoomAccessToken,
    setIsToken,
    setUrl,
    setIsVtPaused,
    setIsVtRecording,
    setVtRemainingTime,
    setBotId,
    setIsProcessing,
    setInPersonMeetingTranscript,
    setIsMeetingEnd,
    
} = liveTranscriptUISlice.actions;

// Exporting the reducer
export default liveTranscriptUISlice.reducer;
