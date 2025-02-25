import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { log } from '../features/counter/logInSlice';
import { useDispatch, useSelector } from 'react-redux';
import {apiConnector} from '../services/apiConnector'
import { setToken } from '../features/counter/userSlice';


const LogOut = () => {
  // const BASE_URL='https://notex-backend-k1fy.onrender.com';
  const BASE_URL=process.env.REACT_APP_BASE_URL;

  const dispatch=useDispatch();
  let isLogin=useSelector((state)=>state.login.isLogin);
  async function logOutHandler(event) {
    try {
      event.preventDefault();
      const response = await apiConnector("POST", `${BASE_URL}/api/v1/log-out`)
      // dispatch(log(false));
      dispatch(setToken(null));
      localStorage.removeItem("token")
      toast.success("Logged Out successfully");
    } catch (error) {
      console.log(error.response?.data.message);     
      console.log(error);
      toast.error('Error in Logging out')
    }
    
  }
  return (
    <div>
      <button className='p-3 text-white bg-red-700 rounded-xl mt-2'
      onClick={logOutHandler}
      >Log Out</button>
    </div>
  )
}

export default LogOut