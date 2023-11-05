import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload;
      state.isLoading = false;
    },

    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { getProducts, setLoading } = productSlice.actions;
export default productSlice.reducer;
