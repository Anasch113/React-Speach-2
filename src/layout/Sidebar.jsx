// Sidebar.jsx

import React from "react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiConversation } from "react-icons/bi";
import { SiTheconversation } from "react-icons/si"
import { CgMoreVertical } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { IoPricetagsOutline } from "react-icons/io5";
import { AiOutlineAudio } from "react-icons/ai";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"
import { FaCaretDown } from "react-icons/fa";
import { MdOutlineTranscribe } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { BiNavigation } from "react-icons/bi";
import { CgTranscript } from "react-icons/cg";
import { GrSync } from "react-icons/gr";

function Sidebar() {
  const user1 = {
    username: "John Doe",
    email: "john@example.com",
    profilePicture: "https://placekitten.com/200/200", // replace with your image source
  };
  const [isLiveTranscript, setIsLiveTranscript] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const newWindowRef = useRef(null)
  const recordingStatus = useSelector((state) => state.audio.isRecording);


  // Function to check if the given path matches the current path
  const isActive = (path) => location.pathname === path;


  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();

  const handleLogout = async () => {
    await logOut()
    navigate('/')
  }











  const startLiveTranscript = () => {
    Swal.fire({
      title: "You want Live Transcript for",

      showCancelButton: true,
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Online Meeting",
      denyButtonText: "Physical Meeting"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {


        // Start transcript when the user chooses "Online Meeting"
        setIsLiveTranscript(true);

        newWindowRef.current = window.open('/realtimetranscriptions', '_blank', 'width=400,height=500');
        if (newWindowRef.current) {
          newWindowRef.current.focus();
        }

      } else if (result.isDenied) {
        setIsLiveTranscript(true);
        newWindowRef.current = window.open('/realtimetranscriptions', '_blank', 'width=400,height=500');
        if (newWindowRef.current) {
          newWindowRef.current.focus();
        }

      }
    });
  };


  const stopLiveTranscript = () => {
    setIsLiveTranscript(false)
    if (newWindowRef.current) {
      newWindowRef.current.close();
      newWindowRef.current = null;
    }
  }



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };
  return (
    <aside
      className="w-96 px-3   max-[700px]:hidden  gray-200 bg-bg-left-bar h-full overflow-x-hidden   md:hidden lg:block xl:block 2xl:block"

    >
      <div className=" p-4 py-10 text-text-blue    md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold ">
        <p>Captify</p>
      </div>


      {/* Add your sidebar content here */}
      <div  className="flex flex-col  justify-between mx-2 p-4  bg-white  border border-border-dark-color rounded-md">
      {/* You can use an <img> tag with the user's profile picture as the source */}
        {/* <div className="w-10 h-10  mr-4  rounded-full overflow-hidden">
    
          <img
            src="https://placekitten.com/200/200" // replace with your image source
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div> */}

        <div  className="flex  flex-col   font-poppins ">
          <span className="text-sm text-gray-700 font-bold flex items-center px-2 gap-1"><FaRegUser size={15}/>  {user.displayName} </span>
          <span className="text-xs flex items-center p-2 gap-1  text-gray-600 font-semibold"> <MdAlternateEmail size={15}/> {user.email}</span>
        </div>
        <div className="flex items-center cursor-pointer">
         <Link className="flex items-center gap-2 hover:text-gray-600" to={"/user-profile"}> <BiNavigation className="hover:text-gray-600" size={18}  /><p className="">Visit</p> </Link>

        </div>
      

       

      </div>


      <div className="flex gap-4 flex-col text-text-color-blue mt-10">



        <Link to={"/"}>
          <div className={`mx-2 p-4 flex rounded-md ${isActive("/") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
            <div className="mr-2 mt-1">
              <AiOutlineHome />
            </div>
            <button>Home</button>
          </div>
        </Link>


        <Link to={"/home"}>
          <div className={`mx-2 p-4 flex rounded-md ${isActive("/home") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
            <div className="mr-2 mt-1">
              <LuLayoutDashboard />
            </div>
            <button>Dashboard</button>
          </div>
        </Link>

        {
          !isLiveTranscript ? (
            <Link onClick={startLiveTranscript}>
              <div className={`mx-2 p-4 flex rounded-md ${isActive("/notdefined") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
                <div className="mr-2 mt-1">
                  <AiOutlineAudio />
                </div>

                <button>Live Transcript</button>

              </div>
            </Link>) : (
            <Link onClick={stopLiveTranscript}>
              <div className={`mx-2 p-4 flex text-white bg-red-500 rounded-md ${isActive("/notdefined") ? "bg-red-500 " : "hover:bg-red-600 "}`}>
                <div className="mr-2 mt-1">
                  <AiOutlineAudioMuted />
                </div>

                <button>Stop Live Transcript</button>

              </div>
            </Link>
          )
        }

        <Link to={"/pre-audio-transcriptions"}>
          <div className={`mx-2 p-4 flex rounded-md ${isActive("/pre-audio-transcriptions" || "pre-audio-transcriptions/view:id" ) ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
            <div className="mr-2 mt-1">
              <MdOutlineTranscribe />
            </div>

            <button>Audio Transcription</button>

          </div>
        </Link>


        <Link to={"/resyncingAi"}>
          <div className={`mx-2 p-4 flex rounded-md ${isActive("/resyncingAi") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
            <div className="mr-2 mt-1">
              <GrSync  />
            </div>

            <button>Resyncing Ai</button>

          </div>
        </Link>
{/* 
        <Link to={"/transcription"}>
          <div className={`mx-2 p-4 flex rounded-md ${isActive("/transcription") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
            <div className="mr-2 mt-1">
              <BiConversation />
            </div>

            <button>My Conversations</button>

          </div>
        </Link> */}




        {/* <Link to={"/pricing"}>
          <div className={`mx-2 p-4 flex rounded-md ${isActive("/allconversation") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
            <div className="mr-2 mt-1">
              <IoPricetagsOutline />
            </div>

            <button>Pricing</button>

          </div>
        </Link> */}












        <button onClick={handleLogout}>
          <div className={`mx-2 p-4 flex rounded-md ${isActive("/more") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
            <div className="mr-2 mt-1">
              <CiLogout />
            </div>

            <button>Logout</button>

          </div>
        </button>

      </div>
    </aside>
  );
}

export default Sidebar;
