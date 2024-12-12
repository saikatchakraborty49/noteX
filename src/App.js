import './App.css';
import Navbar from './components/Navbar';
import { NavLink, Route, Routes } from 'react-router-dom';
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

function App() { 
  const BASE_URL=process.env.BASE_URL;
  const dispatch=useDispatch();
  let isLogin=useSelector((state)=>state.login.isLogin);
  // let isLogin=true;
  const {user}=useSelector((state)=>state)
  async function loginUpdate(){
    try{
      const response=await axios.get(`${BASE_URL}/api/v1/auth`,{withCredentials: true,})
      dispatch(log(true));
      isLogin=true;
    }catch(error){
      console.log(error)
      dispatch(log(false));
      isLogin=false;
    }
  }
  useEffect(() => {
    loginUpdate();
  }, [Cookies.get('token')]); 
    const fetchData=async()=>{
      try{
          const response=await axios.get(`${BASE_URL}/api/v1/fetch-note`,
          {withCredentials: true,});
          dispatch(update(response.data.data));
      }catch(error){
          console.error(error.response?.data?.message)
      }
    }
    useEffect(() => {
        fetchData();
    }, [useLocation().pathname,user]); 
  return (
    <div className="bg-[url('./image/notepad-3297994_1280.jpg')] bg-cover w-screen h-screen App flex justify-center flex-col items-center gap-4">
      <NavLink to='/'><img className='w-[140px]' src={logo}/></NavLink>
      <div className='p-4 rounded-lg bg-slate-400/[.6] w-[430px]'>
        {isLogin?
        <>
          <Navbar/>
          <div className='w-full flex justify-center'>
            <LogOut/>
          </div>
        </>:
          <AuthNavbar/>
        }
        
      </div>
    </div>
  );
}

export default App;
