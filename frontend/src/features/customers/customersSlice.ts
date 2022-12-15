import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ICustomer, ICustomerState } from "../../models/customers";
import customersService from "./customersService";

const initialState: ICustomerState = {
  customers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetchCustomers = createAsyncThunk(
  "customers/fetch",
  async (_, thunkAPI) => {
    try {
      return await customersService.fetchCustomers();
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

export const createCustomer = createAsyncThunk(
  "customers/create",
  async (customer: ICustomer, thunkAPI) => {
    try {
      return await customersService.createCustomer(customer);
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

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async (customer: ICustomer, thunkAPI) => {
    try {
      return await customersService.updateCustomer(customer);
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

export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id: string, thunkAPI) => {
    try {
      return await customersService.deleteCustomer(id);
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

export const customersSlice = createSlice({
  name: "customers",
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
      .addCase(fetchCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCustomers.fulfilled.type,
        (state, action: PayloadAction<ICustomer[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.customers = action.payload;
        }
      )
      .addCase(
        fetchCustomers.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.customers = [];
        }
      )
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomer.fulfilled.type, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(
        createCustomer.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomer.fulfilled.type, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(
        updateCustomer.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomer.fulfilled.type, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(
        deleteCustomer.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});

export const { reset } = customersSlice.actions;
export default customersSlice.reducer;
