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
    name: "users",
    initialState,
    reducers: {
        
    }
})