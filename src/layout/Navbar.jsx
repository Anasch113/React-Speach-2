// Navbar.jsx

import { useState, useEffect, useRef } from "react";
import React from "react";
import MeetingRecord from "../components/MeetingRecord";
import { AiOutlineAudio } from "react-icons/ai";
import toast from "react-hot-toast";
import { RxOpenInNewWindow } from "react-icons/rx";


const Navbar = ({isPurchase, minutes }) => {




  return (
    <nav className="bg-bg-color  p-4 ">
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
              className=" bg-blackGray px-3 py-2   rounded-md focus:outline-none "
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {/* Search icon (you can use an SVG or an icon library here) */}
              <svg
                className="h-5 w-5 text-white color: white;"
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
          <button className="   bg-bg-purple px-4 py-2 rounded-md focus:outline-none hover:bg-purple-500 hidden md:block lg:block xl:block 2xl:block">
            Import
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
