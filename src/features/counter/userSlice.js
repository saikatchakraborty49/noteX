import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    signUpData:null
  },
  reducers: {
    update:(state,action)=>{
      Object.assign(state, action.payload);
    },
    setToken:(state,action)=>{
      state.token=action.payload;
    },
    setSignUpData:(state,action)=>{
      state.signUpData=action.payload;
    }
  },
})
// Action creators are generated for each case reducer function
export const { update,setSignUpData,setToken } = userSlice.actions

export default userSlice.reducer