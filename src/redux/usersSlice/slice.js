import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  access_token: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user; 
      state.access_token = action.payload.access_token; 
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.access_token = null;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.access_token = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = userSlice.actions;
export const usersReducer = userSlice.reducer;
