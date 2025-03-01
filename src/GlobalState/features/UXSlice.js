
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    summaryDeposition: {
        activeSection: "",

    },

};

const uxSlice = createSlice({
    name: "ux",
    initialState,
    reducers: {
        // summary deposition reducers
        setActiveSection: (state, action) => {
            state.summaryDeposition.activeSection = action.payload;
        },

    },
});

// Exporting actions

export const {
    setActiveSection,

} = uxSlice.actions;

// Exporting the reducer
export default uxSlice.reducer;
