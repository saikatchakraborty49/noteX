import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom';
import NewNote from '../pages/NewNote';
import Notes from '../pages/Notes'

const Navbar = () => {
  return (
    <div className='flex'>
        <NavLink className={({ isActive }) => 
          isActive ? 'w-1/2 bg-orange-500 text-white rounded-tl-lg py-2 text-center' : 'w-1/2 bg-slate-600 text-white py-2 text-center rounded-tl-lg '
        }  to="/">New Note</NavLink>
        <NavLink className={({ isActive }) => 
          isActive ? 'w-1/2 bg-orange-500 text-white rounded-tr-lg py-2 text-center' : 'w-1/2 bg-slate-600 text-white py-2 text-center rounded-tr-lg'
        } to="/notes">Notes</NavLink>
      </div>
    )
}

export default Navbar

// style={({ isActive }) => ({
//   color: isActive
//       ? "bg-orange-500"
//       : "bg-slate-500",
// })} 