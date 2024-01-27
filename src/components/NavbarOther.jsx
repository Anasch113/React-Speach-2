// Navbar.jsx

import React from "react";
import avatar from "/avatarimg.png"

const NavbarOther = () => {
  return (
    <nav className="bg-white border border-border-dark-color p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <div className="md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold ">
          Transcriptions
        </div>

        {/* Search Input */}
        <div className="flex items-center space-x-4">
          

          {/* Meeting URL Input */}
        

          {/* Import Button */}
         <div className="flex gap-1">
          <img className="w-12" src={avatar} alt="img" />
         
         </div>
         <button className="bg-bg-blue text-white   px-4 py-2 rounded-md focus:outline-none hover:bg-blue-300 hidden md:block lg:block xl:block 2xl:block">
           Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarOther;
