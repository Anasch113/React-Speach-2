// Navbar.jsx

import React from "react";
import MeetingRecord from "../components/MeetingRecord";

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <div className="text-xl font-bold text-blue-500">Your Logo</div>

        {/* Search Input */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {/* Search icon (you can use an SVG or an icon library here) */}
              <svg
                className="h-5 w-5 text-gray-500"
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
          <button className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-md focus:outline-none hover:bg-blue-50">
            Import
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
