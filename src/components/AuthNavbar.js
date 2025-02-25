import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const AuthNavbar = () => {
  const navigate=useNavigate();
  const location=useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/log-in"); // Redirect to log-in by default
    }
  }, [location, navigate]);
  return (
    <div className="flex flex-col">
      <div className="flex">
        {/* Sign Up Button */}
        <NavLink
          to="/sign-up"
          className={({ isActive }) =>
            `w-1/2 border-r-2 border-neutral-300 py-2 text-white text-center rounded-tl-lg ${
              isActive ? 'bg-orange-500' : 'bg-slate-600'
            }`
          }
        >
          Sign Up
        </NavLink>

        {/* Log In Button */}
        <NavLink
          to="/log-in"
          className={({ isActive }) =>
            `w-1/2 py-2 text-white text-center rounded-tr-lg ${
              isActive ? 'bg-orange-500' : 'bg-slate-600'
            }`
          }
        >
          Log In
        </NavLink>
      </div>
    </div>
  );
};

export default AuthNavbar;
