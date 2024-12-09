import { configureStore } from '@reduxjs/toolkit'
import noteReducer from '../features/counter/noteSlice'

export const store = configureStore({
  reducer: {
    note: noteReducer,
  },
})