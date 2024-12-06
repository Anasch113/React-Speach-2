import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isMfaActive: false
        
    },

    reducers: {

        setIsMfaActive: (state, action) => {
            state.isMfaActive = action.payload;
        },


    },
});

export const { setIsMfaActive } = authSlice.actions;

export default authSlice.reducer;
