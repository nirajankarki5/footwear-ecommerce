import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:5000/api/cart";

const initialState = {
  isLoading: false,
  cart: [],
  networkError: null,
};

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  //   if we use thunkAPI, it we can only use one parameter
  //   thunkAPI is used to use dispatch
  async ({ url, token }, thunkAPI) => {
    try {
      const response = await fetch(baseUrl + url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 500) {
        thunkAPI.dispatch({
          type: "cart/setNetworkError",
          payload: "Something went wrong",
        });
      }

      const data = await response.json();
      return data.products;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setNetworkError(state, action) {
      state.isLoading = false;
      state.networkError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload; // because we already returned data.products from createAsyncThunk
      })
      .addCase(fetchUserCart.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setNetworkError } = cartSlice.actions;
export default cartSlice.reducer;