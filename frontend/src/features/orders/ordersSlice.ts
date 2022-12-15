import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IOrder, IOrdersState } from "../../models/orders";
import ordersService from "./ordersService";

const initialState: IOrdersState = {
  orders: null,
  order: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isModified: false,
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

export const createOrder = createAsyncThunk(
  "orders/create",
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
  "orders/fetch",
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
  "orders/update",
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

export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (id: string, thunkAPI) => {
    try {
      return await ordersService.deleteOrder(id);
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
    reset: () => initialState,
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
          state.isModified = false;
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
        }
      )
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
      )
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteOrder.fulfilled.type,
        (state, action: PayloadAction<null>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isModified = true;
          state.order = action.payload;
        }
      )
      .addCase(
        deleteOrder.rejected.type,
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
