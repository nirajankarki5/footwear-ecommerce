import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/constants";

// const baseUrl = "http://localhost:5000/api/cart";
// const baseUrl = "https://footwear-ecommerce-api.vercel.app/api/cart";

const initialState = {
  isLoading: false,
  order: {},
  orders: [],
  networkError: null,
};

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (token) => {
    try {
      const response = await fetch(baseUrl + "getAllOrders");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
);

export const fetchUserOrder = createAsyncThunk(
  "order/fetchUserOrder",
  //   if we use thunkAPI, it we can only use one parameter
  //   thunkAPI is used to use dispatch
  async (token, thunkAPI) => {
    try {
      const response = await fetch(baseUrl + "orders/getOrderByUserId", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 500) {
        thunkAPI.dispatch({
          type: "order/setNetworkError",
          payload: "Something went wrong",
        });
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
    setNetworkError(state, action) {
      state.isLoading = false;
      state.networkError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchUserOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchUserOrder.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setNetworkError, setCart } = orderSlice.actions;
export default orderSlice.reducer;
