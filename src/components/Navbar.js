import React, { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom';
import NewNote from '../pages/NewNote';
import Notes from '../pages/Notes'
import LogOut from '../pages/LogOut';

const Navbar = () => {
  const [isNotes,setNotes]=useState(true);
  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <button onClick={()=>{
          setNotes(false);
        }} className={isNotes?'w-1/2 bg-slate-600 text-white py-2 text-center rounded-tl-lg':'w-1/2 bg-orange-500 text-white rounded-tl-lg py-2 text-center'}>New Note</button>
        <button onClick={()=>{
          setNotes(true);
        }} className={isNotes?'w-1/2 bg-orange-500 text-white rounded-tr-lg py-2 text-center':'w-1/2 bg-slate-600 text-white py-2 text-center rounded-tr-lg'}>Notes</button>
      </div>
      
      {isNotes?<Notes/>:<NewNote/>}
        {/* <NavLink className={({ isActive }) => 
          isActive ? 'w-1/2 bg-orange-500 text-white rounded-tl-lg py-2 text-center' : 'w-1/2 bg-slate-600 text-white py-2 text-center rounded-tl-lg '
        }  to="/">New Note</NavLink>
        <NavLink className={({ isActive }) => 
          isActive ? 'w-1/2 bg-orange-500 text-white rounded-tr-lg py-2 text-center' : 'w-1/2 bg-slate-600 text-white py-2 text-center rounded-tr-lg'
        } to="/notes">Notes</NavLink> */}
      </div>
    )
}

export default Navbar
