// Sidebar.jsx

import React from "react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";


import { CiLogout } from "react-icons/ci";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

import { AiOutlineAudio } from "react-icons/ai";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"

import { MdOutlineTranscribe } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { BiNavigation } from "react-icons/bi";
import { CgTranscript } from "react-icons/cg";
import { GrSync } from "react-icons/gr";
import PaymentModal from "../components/RealTimeTranscript/PaymentModal";
import toast from "react-hot-toast";
import { RxOpenInNewWindow } from "react-icons/rx"
import { MdOutlineTimer } from "react-icons/md";
import { FaPause } from "react-icons/fa";

function Sidebar({ isPurchase, minutes }) {
  const user1 = {
    username: "John Doe",
    email: "john@example.com",
    profilePicture: "https://placekitten.com/200/200", // replace with your image source
  };
  const [isLiveTranscript, setIsLiveTranscript] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState();


  const location = useLocation();
  const newWindowRef = useRef(null)
  const timerRef = useRef(null);

  console.log("is purchase & minutes", isPurchase, minutes)



  // Function to check if the given path matches the current path
  const isActive = (path) => location.pathname === path;


  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();





  //>>>>>>>>>>>>>>>>>>> Use Effects >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



  console.log("is purchase ", isPurchase)

  // useEffect(() => {



  //   const handleMessage = (event) => {
  //     if (event.origin !== window.location.origin) {
  //       // Ignore messages from unknown origins for security
  //       return;
  //     }

  //     console.log("event data", event.data);

  //     if (event.data.type === 'PAUSE') {
  //       setIsPaused(true);
  //       clearTimeout(timerRef.current);
  //     } else if (event.data.type === 'RESUME') {
  //       setIsPaused(false);
  //     } else if (event.data.type === 'STOP') {
  //       stopLiveTranscript();
  //       toast.success("Live Transcriptions End");
  //     }
  //   };

  //   window.addEventListener('message', handleMessage);

  //   // Cleanup function to clear the timer if the component unmounts or the effect runs again
  //   return () => {
  //     clearTimeout(timerRef.current);

  //     window.removeEventListener('message', handleMessage);
  //   };




  // }, [])







  useEffect(() => {
    if (isPurchase === "completed") {
      setRemainingTime(minutes * 60)
      setIsLiveTranscript(true);
      setIsPaymentDone(true);

      newWindowRef.current = window.open('/realtimetranscriptions', '_blank', 'width=400,height=500');
      if (newWindowRef.current) {
        newWindowRef.current.focus();
      }

      const handleMessage = (event) => {
        if (event.origin !== window.location.origin) {
          // Ignore messages from unknown origins for security
          return;
        }

        console.log("event data", event.data);

        if (event.data.type === 'PAUSE') {
          setIsPaused(true);
          clearTimeout(timerRef.current);
        } else if (event.data.type === 'RESUME') {
          setIsPaused(false);
        } else if (event.data.type === 'STOP') {
          stopLiveTranscript();
          toast.success("Live Transcriptions End");
        }
      };

      window.addEventListener('message', handleMessage);

      // Cleanup function to clear the timer if the component unmounts or the effect runs again
      return () => {
        clearTimeout(timerRef.current);
        if (newWindowRef.current) {
          newWindowRef.current.close();
        }
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [isPurchase]);

  useEffect(() => {
    if (!isPaused && isLiveTranscript && remainingTime > 0) {
      timerRef.current = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerRef.current);
    } else if (remainingTime === 0) {
      stopLiveTranscript();
      toast.success("Live Transcriptions End");
    }
  }, [isPaused, isLiveTranscript, remainingTime]);


  console.log("remaining time", remainingTime)




  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };



  // Intital step >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const startLiveTranscript = () => {
    Swal.fire({
      title: "Transcribe my",

      showCancelButton: true,
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Virtual Meeting",
      denyButtonText: "In-person Meeting",
      customClass: {
        confirmButton: 'custom-confirm',
        denyButton: 'custom-deny',
        cancelButton: 'custom-cancel'
      }
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setShowPaymentModal(true)

      } else if (result.isDenied) {
        setShowPaymentModal(true) 

       


      }
    });
  };





  const stopLiveTranscript = () => {
    setIsLiveTranscript(false)
    if (newWindowRef.current) {
      newWindowRef.current.close();
      newWindowRef.current = null;
    }
    clearTimeout(timerRef.current);
  }

  const handleNewWindow = () => {

    newWindowRef.current = window.open('/realtimetranscriptions', '_blank', 'width=400,height=500');
    if (newWindowRef.current) {
      newWindowRef.current.focus();
    }

  }



  const handleLogout = async () => {
    await logOut()
    navigate('/')
  }

  return (
    <aside
      className="w-96 px-3   max-[700px]:hidden  gray-200 bg-bg-left-bar h-full overflow-x-hidden   md:hidden lg:block xl:block 2xl:block"

    >
      <div className=" p-4 py-10 text-text-blue    md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold ">
        <p>Captify</p>
      </div>


      {/* Add your sidebar content here */}
      <div className="flex flex-col  justify-between mx-2 p-4  bg-white  border border-border-dark-color rounded-md">
        {/* You can use an <img> tag with the user's profile picture as the source */}
        {/* <div className="w-10 h-10  mr-4  rounded-full overflow-hidden">
    
          <img
            src="https://placekitten.com/200/200" // replace with your image source
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div> */}

        <div className="flex  flex-col   font-poppins ">
          <span className="text-sm text-gray-700 font-bold flex items-center px-2 gap-1"><FaRegUser size={15} />  {user.displayName} </span>
          <span className="text-xs flex items-center p-2 gap-1  text-gray-600 font-semibold"> <MdAlternateEmail size={15} /> {user.email}</span>
        </div>
        <div className="flex items-center cursor-pointer">
          <Link className="flex items-center gap-2 hover:text-gray-600" to={"/user-profile"}> <BiNavigation className="hover:text-gray-600" size={18} /><p className="">Visit</p> </Link>

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

            <div >

              <div className={`mx-2 p-4 border flex text-white justify-between items-center ${isPaused ? 'bg-green-500' : 'bg-red-500'}   rounded-md `}>

                <div className="mr-2 mt-1 ">


                  {isPaused ? (<FaPause size={18} />) : (<AiOutlineAudio size={18} />)}




                </div>

                <div className="flex  gap-2">
                  {remainingTime > 0 && (
                    <div className="font-semibold gap-2 font-poppins text-white-500 flex items-center">
                      <MdOutlineTimer size={20} />    <p>{formatTime(remainingTime)}</p>
                    </div>

                  )}


                </div>

                <span onClick={handleNewWindow} className="hover:cursor-pointer  p-2 rounded-full hover:bg-red-400">
                  <RxOpenInNewWindow size={20} />
                </span>

              </div>


            </div>
          )
        }

        <Link to={"/pre-audio-transcriptions"}>
          <div className={`mx-2 p-4 flex rounded-md ${isActive("/pre-audio-transcriptions" || "pre-audio-transcriptions/view:id") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
            <div className="mr-2 mt-1">
              <MdOutlineTranscribe />
            </div>

            <button>Audio Transcription</button>

          </div>
        </Link>


        <Link to={"/resyncingAi"}>
          <div className={`mx-2 p-4 flex rounded-md ${isActive("/resyncingAi") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
            <div className="mr-2 mt-1">
              <GrSync />
            </div>

            <button>Resyncing Ai</button>

          </div>
        </Link>








        <button onClick={handleLogout}>
          <div className={`mx-2 p-4 flex rounded-md ${isActive("/more") ? "bg-bg-blue text-white" : "hover:bg-blue-100 "}`}>
            <div className="mr-2 mt-1">
              <CiLogout />
            </div>

            <button>Logout</button>

          </div>
        </button>

        {
          showPaymentModal && (
            <PaymentModal

              setShowPaymentModal={setShowPaymentModal}
              isPaymentDone={isPaymentDone}


            />
          )
        }

      </div>
    </aside>
  );
}

export default Sidebar;
