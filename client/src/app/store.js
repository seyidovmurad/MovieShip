import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import menuReducer from "../features/menu/menuSlice";
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';

const persistConfig = {
  key: "root",
  storage,
};


const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    menu: menuReducer,
    auth: persistedReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

export const persistor = persistStore(store);