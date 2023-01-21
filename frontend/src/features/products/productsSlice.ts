import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProductState } from "../../models";
import productsService from "./productsService";

const initialState: IProductState = {
  products: [],
  product: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (brand: string, thunkAPI) => {
    try {
      return await productsService.fetchProducts(brand);
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

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: () => initialState,
    setProduct: (state, action: PayloadAction<string>) => {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProducts.fulfilled.type,
        (state, action: PayloadAction<IProduct[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.products = action.payload.reverse();
        }
      )
      .addCase(
        fetchProducts.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.products = [];
        }
      );
  },
});

export const { reset, setProduct } = productsSlice.actions;
export default productsSlice.reducer;
