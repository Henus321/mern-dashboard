import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "@/store/profile-auth/profileAuthSlice";
import productsSlice from "@/store/products/productsSlice";
import customersSlice from "@/store/customers/customersSlice";
import ordersSlice from "@/store/orders/ordersSlice";

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authSlice),
  customers: customersSlice,
  products: productsSlice,
  orders: ordersSlice,
});

export const setupStore = (initialState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
