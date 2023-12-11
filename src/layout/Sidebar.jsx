// Sidebar.jsx

import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiConversation } from "react-icons/bi";
import { SiTheconversation } from "react-icons/si";
import { CgMoreVertical } from "react-icons/cg";

function Sidebar() {
  const user = {
    username: "John Doe",
    email: "john@example.com",
    profilePicture: "https://placekitten.com/200/200", // replace with your image source
  };

  return (
    <aside
      className="w-1/6 gray-200  h-full overflow-x-hidden overflow-y-scroll hidden md:hidden lg:block xl:block 2xl:block"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "transparent transparent",
      }}
    >
      {/* Add your sidebar content here */}
      <div className="m-2 p-4 flex bg-white  border border-gray-300 rounded-md">
        <div className="w-10 h-10 mr-4 bg-gray-300 rounded-full overflow-hidden">
          {/* You can use an <img> tag with the user's profile picture as the source */}
          <img
            src="https://placekitten.com/200/200" // replace with your image source
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col text-gray-700">
          <span className="text-sm font-bold">Nauman</span>
          <span className="text-xs font-bold">example@gmail.come</span>
        </div>
      </div>

      {/* Add your sidebar content here */}
      <div className="m-2 p-4 flex items-center justify-center bg-white border border-gray-300 rounded-md">
        <p className="font-bold text-blue-500">Create WorkSpace</p>
      </div>

      <div className="mx-2 p-4 flex bg-white border border-gray-300 rounded-md">
        <div className="mr-2 mt-1">
          <AiOutlineHome />
        </div>
        <div className="">
          <p className="">Home</p>
        </div>
      </div>

      <div className="mx-2 p-4 flex bg-white border border-gray-300 rounded-md">
        <div className="mr-2 mt-1">
          <SiTheconversation />
        </div>
        <p className="">My Convesation</p>
      </div>

      <div className="mx-2 p-4 flex bg-white border border-gray-300 rounded-md">
        <div className="mr-2 mt-1">
          <BiConversation />
        </div>
        <p className="">All Conversations</p>
      </div>

      <div className="mx-2 p-4 flex bg-white border border-gray-300 rounded-md">
        <div className="mr-2 mt-1">
          <CgMoreVertical />
        </div>
        <p className="">More</p>
      </div>
    </aside>
  );
}

export default Sidebar;
