import React from 'react'
import { NavLink, useLocation } from "react-router-dom";

const UserProfileLayout = ({children}) => {
  return (
    
    <div className="flex flex-row min-h-screen w-full  text-text-color-blue overflow-x-hidden">
    <div className="hidden md:flex flex-col gap-2 border-r border-[#777]/30 min-h-screen py-5 px-2">
        <NavLink to='/admin'
            className={`text-text-color-blue py-3 px-6 rounded-md `}
            >
            Profile
        </NavLink>
        <NavLink to='/admin'
            className={`text-text-color-blue py-3 px-6 rounded-md `}
            >
            Payment & Billing Info
        </NavLink>
       
    </div>

    <div className="flex p-5 flex-col w-full">
        <h1>User Profile</h1>
        {children}
    </div>

</div>
  )
}

export default UserProfileLayout
