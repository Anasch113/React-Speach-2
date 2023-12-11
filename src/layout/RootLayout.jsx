// RootLayout.jsx

import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Navbar from "./Navbar";
import RightSidebar from "./RightSidebar";

function RootLayout() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
        <Sidebar />
        <MainContent />
        <RightSidebar />
      </div>
    </div>
  );
}

export default RootLayout;
