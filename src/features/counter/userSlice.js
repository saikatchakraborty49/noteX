import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState:{},
  reducers: {
    update:(state,action)=>{
      Object.assign(state, action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { update } = userSlice.actions

export default userSlice.reducer