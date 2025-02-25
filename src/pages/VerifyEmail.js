import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import {setSignUpData} from '../features/counter/userSlice'
import {apiConnector} from '../services/apiConnector'
import {useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const BASE_URL=process.env.REACT_APP_BASE_URL;
  const [otp, setOtp] = useState('');
  const dispatch=useDispatch();
  const {signUpData}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signUpData) {
      navigate("/sign-up");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e){
    try{
      e.preventDefault();
      const {firstName,lastName,email,password}=signUpData;
      // signUpData.otp=otp
      dispatch(setSignUpData(signUpData))
      const response = await apiConnector("POST", `${BASE_URL}/api/v1/sign-up`, {
        firstName,lastName,email,password,otp
       })
       toast.success("User registered successfully");
       navigate('/log-in')
      // console.log('sahi');
    }catch(error){
      toast.error(error.response.data.message)
      console.log(error);
      // navigage('/signup')
    }
    
  }

  return (
    <div className="flex justify-center items-center bg-black/[.6] rounded-b-lg text-white p-1 w-[300px] md:w-[430px]">
    <form className='mt-2 flex flex-col justify-center items-center' onSubmit={handleSubmit}>

    <OtpInput
  value={otp}
  onChange={setOtp}
  numInputs={6}
  renderSeparator={<span>-</span>}
  renderInput={(props) => (
      <input
        {...props}
        placeholder="-"
        type="tel" // Restricts to numbers on mobile
        inputMode="numeric" // Opens numeric keypad
        pattern="[0-9]*" // Allows only numbers
        className="w-[64px] lg:w-[80px] h-[32px] lg:h-[40px] p-1 border-0 bg-black text-yellow-200 rounded-full text-center text-2xl"
      />
      )}
    />

      <button 
      className='bg-black p-2 mt-3 mb-2 mx-2 rounded-md hover:scale-105'
      type='submit'>
        Submit
      </button>
    </form>
    </div> 
  );
}

export default VerifyEmail
