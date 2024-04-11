/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/constants";

// const baseUrl = "http://localhost:5000/api/cart";
// const baseUrl = "https://footwear-ecommerce-api.vercel.app/api/cart";

const initialState = {
  isLoading: false,
  order: [],
  orders: [],
  networkError: null,
};

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (token) => {
    try {
      const response = await fetch(baseUrl + "orders/getAllOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      // Only show orders that are Pending
      const filteredOrders = data.filter((item) => item.status === "Pending");
      return filteredOrders;
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

export function createOrder({ orderDetails, token }) {
  return async (dispatch, getState) => {
    try {
      console.log(orderDetails);
      dispatch({ type: "order/setLoading", payload: true });
      const response = await fetch(baseUrl + "orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // This is required!!!
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails),
      });
      const data = await response.json();
      console.log(data);
      dispatch({ type: "order/setLoading", payload: false });
      return "success";
    } catch (error) {
      console.log(error);
      dispatch({ type: "order/setLoading", payload: false });
      return;
    }
  };
}

export function updateOrderStatus({ updatedStatus, orderId, token }) {
  return async (dispatch, getState) => {
    try {
      console.log(updatedStatus, orderId);
      dispatch({ type: "order/setLoading", payload: true });
      const response = await fetch(baseUrl + `orders/${orderId}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json", // This is required!!!
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: updatedStatus }),
      });

      dispatch({ type: "order/setLoading", payload: false });
      if (response.status === 200) {
        return "success";
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "order/setLoading", payload: false });
      return;
    }
  };
}

export default orderSlice.reducer;
