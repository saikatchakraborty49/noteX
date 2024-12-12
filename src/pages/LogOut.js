import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { log } from '../features/counter/logInSlice';
import { useDispatch, useSelector } from 'react-redux';

const LogOut = () => {
  const BASE_URL='https://notex-backend-k1fy.onrender.com';

  const dispatch=useDispatch();
  let isLogin=useSelector((state)=>state.login.isLogin);
  async function logOutHandler(event) {
    try {
      event.preventDefault();
    const response=await axios.post(`${BASE_URL}/api/v1/log-out`,
      {withCredentials: true,});
      dispatch(log(false));
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