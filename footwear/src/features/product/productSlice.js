import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // getProducts(state, action) {
    //   state.products = action.payload;
    //   state.isLoading = false;
    // },
    // setLoading(state, action) {
    //   state.isLoading = action.payload;
    // },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getProducts, setLoading } = productSlice.actions;
export default productSlice.reducer;
