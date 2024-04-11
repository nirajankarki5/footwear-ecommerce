import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/constants";

// const baseUrl = "http://localhost:5000/api/user";
// const baseUrl = "https://footwear-ecommerce-api.vercel.app/api/user";

const initialState = {
  isLoading: false,
  isUser: false,
  user: {},
  networkError: "",
};

// fetch user details (token required)
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token, thunkAPI) => {
    try {
      thunkAPI.dispatch({ type: "user/setLoading", payload: true });
      const response = await fetch(baseUrl + "user/myaccount", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      thunkAPI.dispatch({ type: "user/setUserData", payload: data });
      // thunkAPI.dispatch({ type: "cart/setLoading", payload: false });
      return data;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
    },
    setUser(state, action) {
      state.isUser = action.payload;
    },
    login(state, action) {
      state.isUser = true;
      // save token to local storage
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setNetworkError(state, action) {
      state.networkError = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser, setLoading, setNetworkError } = userSlice.actions;

export function login({ email, password }) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(baseUrl + "user/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();

      if (response.status === 200) {
        dispatch({ type: "user/login", payload: data.token });
        dispatch(fetchUser(data.token));
      }

      if (response.status === 401 || response.status === 404) {
        dispatch({
          type: "user/setNetworkError",
          payload: "Invalid credentials",
        });
        return { status: "error" };
      }
      return { status: "success", userType: data?.userType };
    } catch (error) {
      console.log(error);
      return;
    }
  };
}

export function signup({ email, password, userType = "User" }) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(baseUrl + "user/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          userType: userType,
        }),
      });

      const data = await response.json();
      if (response.status === 422) {
        dispatch({
          type: "user/setNetworkError",
          payload: data.msg,
        });
        return;
      }

      return "success";
    } catch (error) {
      console.log(error);
      return;
    }
  };
}

export default userSlice.reducer;
