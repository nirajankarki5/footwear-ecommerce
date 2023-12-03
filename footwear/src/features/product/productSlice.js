import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:5000/api/products";

const initialState = {
  isLoading: false,
  products: [],
  singleProduct: {},
  // productSearchTerm: "",
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (url) => {
    try {
      const response = await fetch(baseUrl + url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
);

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (url) => {
    try {
      const response = await fetch(baseUrl + url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return {};
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
    // getProductSearchTerm(state, action) {
    //   state.productSearchTerm = action.payload;
    // },
  },
  // extraReducers: {
  //   [fetchProducts.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [fetchProducts.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.products = action.payload;
  //   },
  //   [fetchProducts.rejected]: (state) => {
  //     state.isLoading = false;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { getProducts, setLoading, getProductSearchTerm } =
  productSlice.actions;
export default productSlice.reducer;
