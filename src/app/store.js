import { configureStore } from '@reduxjs/toolkit'
import noteReducer from '../features/counter/noteSlice'
import userReducer from '../features/counter/userSlice'
import loginReducer from '../features/counter/logInSlice'

export const store = configureStore({
  reducer: {
    note: noteReducer,
    login:loginReducer,
    user: userReducer
  },
})