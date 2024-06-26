// Navbar.jsx

import { useState, useEffect, useRef } from "react";
import React from "react";
import MeetingRecord from "../components/MeetingRecord";
import { AiOutlineAudio } from "react-icons/ai";
import toast from "react-hot-toast";
import { RxOpenInNewWindow } from "react-icons/rx";


const Navbar = ({isPurchase, minutes }) => {

  // const [showLiveBtn, setShowLiveBtn] = useState(false)
  // const [isTriggered, setIsTriggered] = useState(false)
  // const [remainingTime, setRemainingTime] = useState(minutes * 60); // initial time in seconds
  const newWindowRef = useRef(null)


  console.log("minutes in the navbar", minutes)

  // useEffect(() => {
  //   if (isPurchase === "completed" && minutes) {
  //     setShowLiveBtn(true);
  //     setRemainingTime(minutes * 60); // Reset remaining time

  //     const timer = setTimeout(() => {
  //       setShowLiveBtn(false);
  //       newWindowRef.current.close();
  //       newWindowRef.current = null;
  //     }, minutes * 60 * 1000);

  //     return () => {
  //       clearTimeout(timer);
  //       if (newWindowRef.current && isTriggered) {
  //         toast.success("Live transcriptions time ended from navbar");
  //         newWindowRef.current.close();
  //       }
  //     };
  //   }
  // }, [isPurchase, minutes]);

  // useEffect(() => {
  //   if (remainingTime > 0) {
  //     const interval = setInterval(() => {
  //       setRemainingTime(prevTime => prevTime - 1);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [remainingTime]);

  // const openLiveTranscriptWindow = () => {
  //   setIsTriggered(true);
  //   newWindowRef.current = window.open('/realtimetranscriptions', '_blank', 'width=400,height=500');
  //   if (newWindowRef.current) {
  //     newWindowRef.current.focus();
  //   }
  // };

  // const formatTime = (timeInSeconds) => {
  //   const minutes = Math.floor(timeInSeconds / 60);
  //   const seconds = timeInSeconds % 60;
  //   return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  // };



  return (
    <nav className="bg-white border border-border-dark-color p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <div className="md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold ">
        Getting Started
        </div>

        {/* Search Input */}
        <div className="flex items-center space-x-4">
          {/* {
            showLiveBtn && <div className="flex items-center gap-2">

              <div className="font-semibold mx-2 font-poppins text-gray-500">
                {remainingTime > 0 && (
                  <p>Remaining Time: {formatTime(remainingTime)}</p>
                )}
              </div>

              <button onClick={openLiveTranscriptWindow} className='text-center p-2 w-10 h-10 
                            rounded-full bg-blue-500 text-white text-xl font-medium font-roboto hover:bg-blue-400 '><span className='flex items-center text-center justify-center '>
                  <RxOpenInNewWindow size={17} />
                </span></button>
            </div>
          } */}



          <div className="relative hidden md:block lg:block xl:block 2xl:block">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-2 border border-border-dark-color rounded-md focus:outline-none "
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {/* Search icon (you can use an SVG or an icon library here) */}
              <svg
                className="h-5 w-5 text-text-gray-official"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          {/* Meeting URL Input */}
          <MeetingRecord />

          {/* Import Button */}
          <button className="bg-white text-text-blue border border-blue-500 px-4 py-2 rounded-md focus:outline-none hover:bg-blue-50 hidden md:block lg:block xl:block 2xl:block">
            Import
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
