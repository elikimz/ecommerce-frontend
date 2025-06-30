



import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { registerAPI } from "../features/Register/registerAPI";
import { loginAPI } from "../features/login/loginAPI";
import { categoryAPI } from "../features/Category/categoryAPI";
import { productAPI } from "../features/Products/productsAPI";
import { orderAPI } from "../features/Orders/orderAPI";
import { cartAPI } from "../features/Cart&CartItems/cartitemsAPI";
import {mpesaAPI} from "../features/Empesa/EmpesaAPI"

// Redux Persist configuration with blacklist for API slices
const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    registerAPI.reducerPath,
    loginAPI.reducerPath,
    categoryAPI.reducerPath,
    productAPI.reducerPath,
    orderAPI.reducerPath,
    cartAPI.reducerPath,
    mpesaAPI.reducerPath,
  ],
};

// Combine reducers here
const rootReducer = combineReducers({
  [registerAPI.reducerPath]: registerAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  [categoryAPI.reducerPath]: categoryAPI.reducer,
  [productAPI.reducerPath]: productAPI.reducer,
  [orderAPI.reducerPath]: orderAPI.reducer,
  [cartAPI.reducerPath]:cartAPI.reducer,
  [mpesaAPI.reducerPath]:mpesaAPI.reducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      registerAPI.middleware,
      loginAPI.middleware,
      categoryAPI.middleware,
      productAPI.middleware,
      orderAPI.middleware,
      cartAPI.middleware,
      mpesaAPI.middleware
    ),
});

// Create persistor for Redux Persist
export const persistor = persistStore(store);

// Define types for state and dispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
