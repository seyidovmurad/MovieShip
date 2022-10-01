import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
        }
    }
})


export const selectCurrentUser = state => state.auth?.user;
export const selectCurrentToken = state => state.auth?.token;

export const {
    setCredentials,
    logOut
} = authSlice.actions;

export default authSlice.reducer