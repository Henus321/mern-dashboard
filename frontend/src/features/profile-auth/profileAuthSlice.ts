import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUserState, IUser } from "../../models";
import profileAuthService from "./profileAuthService";

const initialState: IUserState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "profile-auth/register",
  async (user: IUser, thunkAPI) => {
    try {
      return await profileAuthService.register(user);
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

export const login = createAsyncThunk(
  "profile-auth/login",
  async (user: IUser, thunkAPI) => {
    try {
      return await profileAuthService.login(user);
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

export const logout = createAsyncThunk(
  "profile-auth/logout",
  async (_: any, thunkAPI) => {
    try {
      return await profileAuthService.logout();
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

export const fetchUser = createAsyncThunk("auth/fetch", async (_, thunkAPI) => {
  try {
    return await profileAuthService.fetchUser();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const updateUser = createAsyncThunk(
  "profile-auth/update",
  async (userData: Partial<IUser> | FormData, thunkAPI) => {
    try {
      return await profileAuthService.updateUser(userData);
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

export const profileAuthSlice = createSlice({
  name: "profile-auth",
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        register.fulfilled.type,
        (state, action: PayloadAction<IUser>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        }
      )
      .addCase(
        register.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = null;
        }
      )
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled.type, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(logout.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchUser.fulfilled.type,
        (state, action: PayloadAction<IUser>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        }
      )
      .addCase(
        fetchUser.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUser.fulfilled.type,
        (state, action: PayloadAction<IUser>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        }
      )
      .addCase(
        updateUser.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});

export const { reset } = profileAuthSlice.actions;
export default profileAuthSlice.reducer;
