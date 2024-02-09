// RootLayout.jsx

import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Navbar from "./Navbar";
import RightSidebar from "./RightSidebar";

function RootLayout() {
  return (


    <div className="w-full flex lg:flex-row h-screen bg-gray-100">

      <Sidebar />





      <div className="flex flex-col  w-full">



        <Navbar />


        <div className="flex w-full">


          <MainContent />


          <RightSidebar />


        </div>

      </div>

    </div>

  );
}

export default RootLayout;
