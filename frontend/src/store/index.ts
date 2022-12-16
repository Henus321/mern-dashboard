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
import authSlice from "../features/profile-auth/profileAuthSlice";
import productsSlice from "../features/products/productsSlice";
import customersSlice from "../features/customers/customersSlice";
import ordersSlice from "../features/orders/ordersSlice";

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

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
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
