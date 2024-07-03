import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import Headers from '../DesignLayouts/Headers';

const UserProfileLayout = ({ children }) => {

  const location = useLocation();
  const isAccountActive = location.pathname === "/user-profile"
  const isSecurity = location.pathname === "/user-security-setting"
  const isPayment = location.pathname === "/user-payment-info"
  return (

    <>


      <div className="flex md:flex-row flex-col min-h-screen w-full   overflow-x-hidden">

        <div className=" flex flex-col gap-2  border-r border-[#777]/30 md:min-h-screen py-20 px-2 overflow-x-hidden">
          <NavLink to='/user-profile'
            className={` ${isAccountActive ? 'font-bold text-text-purple' : ''} py-3 px-6 rounded-md `}
          >
            Account
          </NavLink>
          <NavLink to='/user-security-setting'
            className={` py-3 px-4 rounded-md  ${isSecurity ? 'font-bold text-text-purple' : ''} `}
          >
            Security Settings
          </NavLink>
          <NavLink to='/user-payment-info'
            className={` py-3 px-6 rounded-md  ${isPayment ? 'font-bold text-text-purple' : ''} `}
          >
            Payment & Billing Info
          </NavLink>

        </div>

        <div className="flex px-5 py-10 flex-col w-full bg-bg-color-light">

          <h1 className='text-3xl font-bold font-poppins'>User Profile</h1>
          <div className='w-full my-5  border '></div>
          {children}
        </div>

      </div>
    </>
  )
}

export default UserProfileLayout
