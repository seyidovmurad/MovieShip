import { createSlice } from '@reduxjs/toolkit'


export const menuSlice = createSlice({
    name: "menu",
    initialState: { display: false },
    reducers: {
        toggle: (state, action) => {
            state.display = !state.display;
        }
    }
});

export const selectDisplay = state => state.menu.display;

export const {
    toggle
} = menuSlice.actions;

export default menuSlice.reducer;