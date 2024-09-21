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
} = liveTranscriptUISlice.actions;

// Exporting the reducer
export default liveTranscriptUISlice.reducer;
