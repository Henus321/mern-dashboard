import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IOrder, IOrdersState } from "../../models/IOrder";
import ordersService from "./ordersService";

const initialState: IOrdersState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await ordersService.fetchOrders();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchOrders.fulfilled.type,
        (state, action: PayloadAction<IOrder[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.orders = action.payload;
        }
      )
      .addCase(
        fetchOrders.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.orders = [];
        }
      );
  },
});

export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;
