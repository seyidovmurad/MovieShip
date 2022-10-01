import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import darkModeReducer from '../features/darkMode/darkModeSlice';
import { persistStore, persistReducer } from "redux-persist";
import { apiSlice } from './api/apiSlice';
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
  };
  
  
const persistedReducer = persistReducer(persistConfig, authReducer);
  

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        darkmode: darkModeReducer,
        auth: persistedReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    
})

export const persistor = persistStore(store);