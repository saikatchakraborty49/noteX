import './App.css';
import Navbar from './components/Navbar';
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import NewNote from './pages/NewNote';
import Notes from './pages/Notes';
import logo from './image/logo.png'
import AuthNavbar from './components/AuthNavbar';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Cookies from 'js-cookie';
import { useDispatch,useSelector } from 'react-redux';
import { update } from './features/counter/userSlice';
import { log } from './features/counter/logInSlice';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import LogOut from './pages/LogOut';
import VerifyEmail from './pages/VerifyEmail';

function App() { 
  // const BASE_URL='https://notex-backend-k1fy.onrender.com';
  const BASE_URL=process.env.REACT_APP_BASE_URL;

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {token}=useSelector((state)=>state.user)
  
  const {user}=useSelector((state)=>state)

  //fetch all notes of user
    // const fetchData=async()=>{
    //   try{
    //       const response=await axios.get(`${BASE_URL}/api/v1/fetch-note`,
    //       {withCredentials: true,});
    //       dispatch(update(response.data.data));
    //   }catch(error){
    //       console.error(error.response?.data?.message)
    //   }
    // }
    // useEffect(() => {
    //     fetchData();
    // }, [useLocation().pathname,user]); 

    // useEffect(() => {
    //   if(!token){
    //     navigate('/log-in')
    //   }
    // }, [third])
    
    
  return (
    <div className="bg-[url('./image/notepad-3297994_1280.jpg')] bg-cover min-w-screen min-h-screen App flex justify-center flex-col items-center ">
      <NavLink to='/'><img className='w-[140px]' src={logo}/></NavLink>
      <div className='p-4 rounded-t-lg bg-slate-400/[.6] w-[430px]'>
        {token?
        <>
          <Navbar/>
          <div className='w-full flex justify-center'>
            <LogOut/>
          </div>
        </>:
          <AuthNavbar/>
          // navigate('/log-in')
        }
      </div>
     <Routes>
        {/* <Route path='/' element={`${token?<Notes/>:<Navigate to="/log-in" />}`}/> */}
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/log-in' element={<LogIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        
      </Routes>
    </div>
  );
}
export default App;
