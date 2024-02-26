// RootLayout.jsx

import React from "react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Navbar from "./Navbar";
import RightSidebar from "./RightSidebar";
import { useSelector } from "react-redux";
import RealTimeTranscriptions from "../components/RealTimeTranscriptions";
import "../App.css"

function RootLayout() {

  const newWindowRef = useRef(null)
  const recordingStatus = useSelector((state) => state.audio.isRecording);
  console.log("recording status in RTT", recordingStatus)

  useEffect(() => {
    if (recordingStatus) {
      // Open a new tab with the content
      newWindowRef.current = window.open('/realtimetranscriptions', '_blank', 'width=400,height=500');

      // Optionally, focus on the new window
      if (newWindowRef.current) {
        newWindowRef.current.focus();
      }
    } else {
      // Close the window when recordingStatus becomes false
      if (newWindowRef.current) {
        newWindowRef.current.close();
        newWindowRef.current = null;
      }
    }
  }, [recordingStatus]);
  return (
    <>

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
      {recordingStatus && (
        <div className="hidden" id="small-window-container" >
          <RealTimeTranscriptions />
        </div>
      )}


    </>
  );
}

export default RootLayout;
