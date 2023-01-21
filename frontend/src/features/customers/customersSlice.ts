import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ICustomer, ICustomerState } from "../../models";
import customersService from "./customersService";

const initialState: ICustomerState = {
  customers: [],
  customer: null,
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
      state.customer = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    setCustomer: (state, action: PayloadAction<ICustomer>) => {
      state.customer = action.payload;
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
          state.isError = false;
          state.customers = action.payload.reverse();
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
      .addCase(
        createCustomer.fulfilled.type,
        (state, action: PayloadAction<ICustomer>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.customers = [action.payload].concat(state.customers);
        }
      )
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
      .addCase(
        updateCustomer.fulfilled.type,
        (state, action: PayloadAction<ICustomer>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.customers = state.customers.map((customer) =>
            customer._id === action.payload._id ? action.payload : customer
          );
        }
      )
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
      .addCase(
        deleteCustomer.fulfilled,
        (state, action: PayloadAction<ICustomer>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.customers = state.customers.filter(
            (customer) => customer._id !== action.payload._id
          );
        }
      )
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

export const { reset, setCustomer } = customersSlice.actions;
export default customersSlice.reducer;
