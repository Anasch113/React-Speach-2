// Sidebar.jsx

import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiConversation } from "react-icons/bi";
import { SiTheconversation } from "react-icons/si";
import { CgMoreVertical } from "react-icons/cg";

import { Link, useLocation } from "react-router-dom";
function Sidebar() {
  const user = {
    username: "John Doe",
    email: "john@example.com",
    profilePicture: "https://placekitten.com/200/200", // replace with your image source
  };

  const location = useLocation();

  // Function to check if the given path matches the current path
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className="w-96 px-3   max-[700px]:hidden  gray-200 bg-bg-left-bar h-full overflow-x-hidden   md:hidden lg:block xl:block 2xl:block"
     
    >
<div className=" p-4 py-10 text-text-blue    md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold ">
         <p>Logo</p>
        </div>


      {/* Add your sidebar content here */}
      <div className="mx-2 p-4 flex bg-white  border border-border-dark-color rounded-md">
      
        <div className="w-10 h-10  mr-4  rounded-full overflow-hidden">
          {/* You can use an <img> tag with the user's profile picture as the source */}
          <img
            src="https://placekitten.com/200/200" // replace with your image source
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col text-text-color-blue ">
          <span className="text-sm font-bold">Nauman</span>
          <span className="text-xs font-bold">example@gmail.come</span>
        </div>
      </div>

      {/* Add your sidebar content here */}
      <div className="mx-2 mb-5 p-4 flex bg-white items-center justify-center border border-border-dark-color rounded-md">
        <p className="font-bold  text-text-blue">Create WorkSpace</p>
      </div>

<div className="flex gap-4 flex-col text-text-color-blue">

<Link to={"/"}>
        <div className={`mx-2 p-4 flex rounded-md ${isActive("/") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
          <div className="mr-2 mt-1">
            <AiOutlineHome />
          </div>
          <button>Home</button>
        </div>
      </Link>

      <Link to={"/transcription"}>
      <div className={`mx-2 p-4 flex rounded-md ${isActive("/transcription") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
        <div className="mr-2 mt-1">
          <SiTheconversation />
        </div>
       
          <button>My Conversation</button>

      </div>
      </Link>

      <Link to={"/allconversations"}>
      <div className={`mx-2 p-4 flex rounded-md ${isActive("/allconversation") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
        <div className="mr-2 mt-1">
          <BiConversation />
        </div>
       
          <button>All Conversation</button>

      </div>
      </Link>

      <Link to={"/myconversations"}>
      <div className={`mx-2 p-4 flex rounded-md ${isActive("/more") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
        <div className="mr-2 mt-1">
          <CgMoreVertical />
        </div>
       
          <button>More</button>

      </div>
      </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
