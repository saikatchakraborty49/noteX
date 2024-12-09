import { createSlice } from '@reduxjs/toolkit'


export const noteSlice = createSlice({
  name: 'note',
  initialState:[],
  reducers: {
    add:(state,action)=>{
      state.push(action.payload);
    },
    remove:(state,action)=>{
      state.splice(action.payload,1);
    }
  },
})

// Action creators are generated for each case reducer function
export const { add,remove } = noteSlice.actions

export default noteSlice.reducer