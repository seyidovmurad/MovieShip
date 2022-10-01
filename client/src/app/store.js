import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import menuReducer from "../features/menu/menuSlice";

const persistConfig = {
  key: "root",
  storage,
};


//const persistReducer = persistReducer(persistConfig, )

export const store = configureStore({
  reducer: {
    menu: menuReducer
  },
  //middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

export const persistor = persistStore(store);