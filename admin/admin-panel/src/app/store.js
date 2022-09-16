import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import darkModeReducer from '../features/darkMode/darkModeSlice';
import { apiSlice } from './api/apiSlice';



export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        darkmode: darkModeReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    
})
