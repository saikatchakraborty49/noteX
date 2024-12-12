import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState:{
    isLogin:false
  },
  reducers: {
    log:(state,action)=>{
      state.isLogin=action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { log } = loginSlice.actions

export default loginSlice.reducer