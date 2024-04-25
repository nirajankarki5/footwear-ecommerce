import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/constants";

// const baseUrl = "http://localhost:5000/api/products";
// const baseUrl = "https://footwear-ecommerce-api.vercel.app/api/products";

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
      const response = await fetch(baseUrl + "products" + url);
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
      const response = await fetch(baseUrl + "products" + url);
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
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
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

export function addProduct(productDetails) {
  return async (dispatch, getState) => {
    try {
      console.log(productDetails);
      dispatch({ type: "product/setLoading", payload: true });
      const response = await fetch(baseUrl + "products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // This is required!!!
        },
        body: JSON.stringify(productDetails),
      });
      const data = await response.json();
      console.log(data);

      dispatch({ type: "product/setLoading", payload: false });
      return "success";
    } catch (error) {
      console.log(error);
      dispatch({ type: "product/setLoading", payload: false });
      return;
    }
  };
}

export function editProduct({ product, productId }) {
  return async (dispatch, getState) => {
    try {
      console.log(product, productId);
      dispatch({ type: "product/setLoading", payload: true });
      const response = await fetch(baseUrl + `products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // This is required!!!
        },
        body: JSON.stringify(product),
      });

      dispatch({ type: "product/setLoading", payload: false });
      if (response.status === 200) {
        return "success";
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "product/setLoading", payload: false });
      return;
    }
  };
}

export function deleteProduct(productID) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(baseUrl + `products/${productID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // This is required!!!
        },
      });
      const data = await response.json();
      console.log(data);
      // Fetch products again after deleting
      dispatch(fetchProducts("/"));
      return "success";
    } catch (error) {
      console.log(error);
      return;
    }
  };
}
export default productSlice.reducer;
