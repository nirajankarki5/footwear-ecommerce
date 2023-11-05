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

    setLoadingFalse(state) {
      state.isLoading = false;
    },
  },
});

export const { getProducts, setLoadingFalse } = productSlice.actions;
export default productSlice.reducer;
