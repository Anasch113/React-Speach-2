// RootLayout.jsx

import React from "react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Navbar from "./Navbar";
import RightSidebar from "./RightSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "../App.css"

function RootLayout() {

  const [minutes, setMinutes] = useState(0)
  const [isPurchase, setIsPurchase] = useState("")


  const location = useLocation();
  const navigate = useNavigate();

 

  const isPurchaseFromLocation = location.state?.isPurchase;
  const minutesFromLocation = location.state?.minutes;


  useEffect(() => {
    if (isPurchaseFromLocation === "completed" && minutesFromLocation) {
      setIsPurchase(isPurchaseFromLocation)
      setMinutes(minutesFromLocation)


    }
    // Clear the state from the URL
    navigate(location.pathname, { replace: true });
  }, [isPurchaseFromLocation, minutesFromLocation])






  return (
    <>

      <div className="w-full flex lg:flex-row min-h-screen bg-black overflow-x-hidden relative">

        <Sidebar isPurchase={isPurchase} minutes={minutes} />


        <div className="flex flex-col  w-full">

          <Navbar isPurchase={isPurchase} minutes={minutes} />

          <div className="flex w-full md:flex-row flex-col px-4 md:pr-40">
            <MainContent  />
            {/* <RightSidebar /> */}
          </div>
        </div>
      </div>



    </>
  );
}

export default RootLayout;
