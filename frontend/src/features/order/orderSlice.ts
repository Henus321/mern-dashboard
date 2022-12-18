import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IOrder, IOrderState } from "../../models";
import ordersService from "./orderService";

const initialState: IOrderState = {
  order: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isModified: false,
  message: "",
};

export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData: IOrder, thunkAPI) => {
    try {
      return await ordersService.createOrder(orderData);
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

export const fetchOrder = createAsyncThunk(
  "order/fetch",
  async (id: string, thunkAPI) => {
    try {
      return await ordersService.fetchOrder(id);
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

export const updateOrder = createAsyncThunk(
  "order/update",
  async (orderData: IOrder, thunkAPI) => {
    try {
      return await ordersService.updateOrder(orderData);
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
  name: "order",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createOrder.fulfilled.type,
        (state, action: PayloadAction<IOrder>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.order = action.payload;
        }
      )
      .addCase(
        createOrder.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchOrder.fulfilled.type,
        (state, action: PayloadAction<IOrder>) => {
          state.isLoading = false;
          state.isModified = false;
          state.isSuccess = true;
          state.order = action.payload;
        }
      )
      .addCase(
        fetchOrder.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateOrder.fulfilled.type,
        (state, action: PayloadAction<IOrder>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isModified = true;
          state.order = action.payload;
        }
      )
      .addCase(
        updateOrder.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});

export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;
