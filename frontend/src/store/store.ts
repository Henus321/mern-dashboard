import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import productsSlice from "../features/products/productsSlice";
import customersSlice from "../features/customers/customersSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  customers: customersSlice,
  products: productsSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
