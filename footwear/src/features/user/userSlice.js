import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const baseUrl = "http://localhost:5000/api/user";

const initialState = {
  isLoading: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
