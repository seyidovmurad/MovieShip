import { createSlice } from '@reduxjs/toolkit';

export const darkModeSlice = createSlice({
    name: 'darkmode',
    initialState: { mode: false },
    reducers: {
        changeMode: (state, action) => {
            state.mode = action.payload
        }, 
        toggle: (state, action) => {
            state.mode = !state.mode
        }
    },
});

export const selectMode = state => state.darkmode.mode;

export const {
    changeMode,
    toggle
} = darkModeSlice.actions;

export default darkModeSlice.reducer;