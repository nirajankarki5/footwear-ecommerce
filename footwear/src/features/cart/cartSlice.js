import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:5000/api/cart";

const initialState = {
  isLoading: false,
  cart: [],
};

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (url) => {
    try {
      const response = await fetch(baseUrl + url);
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
  reducers: {},
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

export default cartSlice.reducer;
