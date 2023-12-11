// RightSidebar.jsx

import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiConversation } from "react-icons/bi";
import { SiTheconversation } from "react-icons/si";
import { CgMoreVertical } from "react-icons/cg";

function RightSidebar() {
  const user = {
    username: "John Doe",
    email: "john@example.com",
    profilePicture: "https://placekitten.com/200/200", // replace with your image source
  };

  return (
    <aside
      className="w-1/5 gray-200  h-full overflow-x-hidden overflow-y-scroll"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "transparent transparent",
      }}
    >
      {/* Add your sidebar content here */}
      <div className="m-2 pt-4 flex">
        <p className="text-xl font-semibold">Summary</p>
      </div>
      <div className="m-2 p-4 flex bg-white  border border-gray-300 rounded-md">
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum." "Lorem ipsum
            dolor sit amet,
          </p>
        </div>
      </div>

      <div className="m-2 p-4 flex items-center justify-center bg-white border border-gray-300 rounded-md">
        <p className="font-bold text-blue-500">Google calender</p>
      </div>

      <div className="m-2 p-4 flex items-center justify-center bg-white border border-gray-300 rounded-md">
        <p className="font-bold text-blue-500">Zoom Meeting</p>
      </div>
    </aside>
  );
}

export default RightSidebar;
