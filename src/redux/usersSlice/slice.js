import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
      id: null,
      name: '',
      email: '',
      email_verified_at: null,
      password: '',
      role: 'user',
      profile_photo: null,
      phone_number: null,
      description: null,
      experience: null,
    },
    status: 'idle', 
    error: null,
  };
const usersSlice = createSlice({    
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
          },
          updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
          },
          clearUser: (state) => {
            state.user = initialState.user;
          },
          setStatus: (state, action) => {
            state.status = action.payload;
          },
          setError: (state, action) => {
            state.error = action.payload;
          },
    }
})

export const { setUser, updateUser, clearUser, setStatus, setError } = usersSlice.actions;

export default usersSlice.reducer;