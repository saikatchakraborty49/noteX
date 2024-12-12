import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import LogIn from '../pages/LogIn'

const AuthNavbar = () => {
  const [isSignIn,setSignIn]=useState(true);
  return (    
  <div className='flex flex-col'>
    <div className='flex'>
      <button onClick={()=>{
        setSignIn(false);
      }} className={isSignIn?'w-1/2 bg-slate-600 text-white py-2 text-center rounded-tl-lg':'w-1/2 bg-orange-500 text-white rounded-tl-lg py-2 text-center'}>Sign UP</button>
      <button onClick={()=>{
        setSignIn(true);
      }} className={isSignIn?'w-1/2 bg-orange-500 text-white rounded-tr-lg py-2 text-center':'w-1/2 bg-slate-600 text-white py-2 text-center rounded-tr-lg'}>Log In</button>
    </div>
    {isSignIn?<LogIn/>:<SignUp/>}

        {/* <NavLink className={({ isActive }) => 
          isActive ? 'w-1/2 bg-orange-500 text-white rounded-tl-lg py-2 text-center' : 'w-1/2 bg-slate-600 text-white py-2 text-center rounded-tl-lg '
        }  to="/signup">Sign Up</NavLink>
        <NavLink className={({ isActive }) => 
          isActive ? 'w-1/2 bg-orange-500 text-white rounded-tr-lg py-2 text-center' : 'w-1/2 bg-slate-600 text-white py-2 text-center rounded-tr-lg'
        } to="/login">Log In</NavLink> */}
  </div>
    )
}

export default AuthNavbar