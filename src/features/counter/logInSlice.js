import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState:{
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  },
  reducers: {
    log:(state,action)=>{
      state.isLogin=action.payload;
    },
    setToken:(state,action)=>{
      state.token=action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { log,setToken } = loginSlice.actions

export default loginSlice.reducer