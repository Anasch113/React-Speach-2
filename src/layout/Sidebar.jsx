/* eslint-disable no-unused-vars */
// Sidebar.jsx

import React from "react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";


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
import { FaBars } from 'react-icons/fa6';
import { MdClose } from "react-icons/md";
import { MdOutlineCases } from "react-icons/md";
import { MdOutlineSummarize } from "react-icons/md";
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Blog from "@/pages/Content/Blog/Blog";
function Sidebar({ isPurchase, minutes }) {
  const [openLegal, setOpenLegal] = useState(true);
  const [openCorporate, setOpenCorporate] = useState(true);
  const [openSupport, setOpenSupport] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openFaqs, setOpenFaqs] = useState(false);
  const [openResource, setOpenResource] = useState(false);

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
        }
        else if (event.data.type === 'RESTART') {

          stopLiveTranscript();
          setIsLiveTranscript(false);
          setShowPaymentModal(true)
          toast("Please pay again to restart the transcriptions")

        }

        else if (event.data.type === 'STOP') {
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
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false, // Hide confirm button
      denyButtonText: "In-person Meeting",
      customClass: {
        popup: 'custom-swal-popup',
        confirmButton: 'custom-confirm',
        denyButton: 'custom-deny',
        cancelButton: 'custom-cancel'
      }
    }).then((result) => {
      if (result.isDenied) {
        setShowPaymentModal(true);
      }
      // Optionally handle cancel
      // else if (result.isDismissed) {
      //   console.log("Cancelled");
      // }
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



  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <>
      {
        !isSidebarOpen ? <button onClick={toggleSidebar} className="lg:hidden xl:hidden 2xl:hidden fixed top-7 left-4 z-50">
          <FaBars size={24} />


        </button> :

          <button onClick={toggleSidebar} className="lg:hidden xl:hidden 2xl:hidden fixed top-4 left-64 z-50 hover:bg-gray-800 border p-2 rounded-sm">
            <MdClose size={18} />


          </button>
      }




      <aside
        className={`sticky top-5  element-class left-0 w-[350px] bg-blackGray  z-40 overflow-x-hidden  transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >


        {/* Add your sidebar content here */}
        <div className="flex flex-col mt-2 justify-between mx-2 p-4 border border-border-dark-color rounded-md">

          <div className="flex flex-col font-poppins">
            <span className="text-sm text-white font-bold flex items-center px-2 gap-1"><FaRegUser size={15} />  {user.displayName}</span>
            <span className="text-xs flex items-center p-2 gap-1 text-white font-semibold"><MdAlternateEmail size={15} /> {user.email}</span>
          </div>

          <div className="flex items-center cursor-pointer">
            <Link className="flex items-center gap-2 hover:text-white" to={"/user-profile"}><BiNavigation color="white" className="hover:text-white" size={18} /><p className="text-white">Visit</p></Link>
          </div>
        </div>
        <div className="flex gap-4 flex-col text-white mt-10 h-screen   element-class ">
          <Link to={"/"}>
            <div className={` p-4 flex rounded-md ${isActive("/") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
              <AiOutlineHome className="mr-2 mt-1" />
              <button>Home</button>
            </div>
          </Link>

          <Link to={"/home"}>
            <div className={` p-4 flex rounded-md ${isActive("/home") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
              <LuLayoutDashboard className="mr-2 mt-1" />
              <button>Dashboard</button>
            </div>
          </Link>

          {/* Legal Section */}
          <button onClick={() => setOpenLegal(!openLegal)} className=" p-4 flex justify-between items-center rounded-md hover:bg-white hover:text-black">
            <div className="flex items-center">
              <MdOutlineCases className="mr-2 mt-1" />
              <span>Legal</span>
            </div>
            {openLegal ? <AiOutlineUp /> : <AiOutlineDown />}
          </button>
          {openLegal && (
            <div className="ml-6">
              {/* <Link to={"/legal-videography"}>
                <div className={`p-2 flex rounded-md ${isActive("/legal-videography") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
                  <span>Legal Videography</span>
                </div>
              </Link> */}
              {/* <Link to={"/court-reporting"}>
                <div className={`p-2 flex rounded-md ${isActive("/court-reporting") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
                  <span>Court Reporting</span>
                </div>
              </Link> */}

              <Link to={"/summarization-deposition"}>
                <div className={`p-2 flex rounded-md ${isActive("/summarization-deposition") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
                  <span>Deposition Summary</span>
                </div>
              </Link>

              <Link to={"/note-case"}>
                <div className={`p-2 flex rounded-md ${isActive("/note-case") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
                  <span>Meeting Recording</span>
                </div>
              </Link>
              <Link to={"/pre-audio-transcriptions"}>
                <div className={`p-2 flex rounded-md ${isActive("/pre-audio-transcriptions") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
                  <span>Audio Transcription</span>
                </div>
              </Link>
              <Link to={"/ocr"}>
                <div className={`p-2 flex rounded-md ${isActive("/ocr") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
                  <span>Handwriting Converter</span>
                </div>
              </Link>
            </div>
          )}

          {/* Corporate & Government Section */}
          <button onClick={() => setOpenCorporate(!openCorporate)} className=" p-4 flex justify-between items-center rounded-md hover:bg-white hover:text-black">
            <div className="flex items-center">
              <GrSync className="mr-2 mt-1" />
              <span >Corporate & Government</span>
            </div>
            {openCorporate ? <AiOutlineUp /> : <AiOutlineDown />}
          </button>
          {openCorporate && (
            <div className="ml-6">
              {/* <Link to={"/human-live-stenocaptioning"}>
                <div className={`p-2 flex rounded-md ${isActive("/human-live-stenocaptioning") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
                  <span>Human Live Stenocaptioning</span>
                </div>
              </Link> */}

              {!isLiveTranscript ? (
                <Link onClick={startLiveTranscript}>
                  <div className={` p-2 flex rounded-md ${isActive("/notdefined") ? "bg-white text-black" : "hover:bg-white hover:text-text-black"}`}>
                    {/* <div className="mr-2 mt-1">
                      <AiOutlineAudio />
                    </div> */}
                    <button>Live Captioning (AI)</button>
                  </div>
                </Link>
              ) : (
                <div>
                  <div className={` p-2 border flex text-white justify-between items-center ${isPaused ? 'bg-green-500' : 'bg-red-500'} rounded-md`}>
                    {/* <div className="mr-2 mt-1">
                      {isPaused ? (<FaPause size={18} />) : (<AiOutlineAudio size={18} />)}
                    </div> */}
                    <div className="flex ">
                      {remainingTime > 0 && (
                        <div className="font-semibold gap-2 font-poppins text-white-500 flex items-center">
                          <MdOutlineTimer size={20} /> <p>{formatTime(remainingTime)}</p>
                        </div>
                      )}
                    </div>
                    <span onClick={handleNewWindow} className="hover:cursor-pointer p-2 rounded-full hover:bg-red-400">
                      <RxOpenInNewWindow size={20} />
                    </span>
                  </div>
                </div>
              )}

                <Link to={"/note-case"}>
                <div className={`p-2 flex rounded-md ${isActive("/note-case") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
                  <span>Meeting Recorder</span>
                </div>
              </Link>

              <Link to={"/pre-audio-transcriptions"}>
                <div className={`p-2 flex rounded-md ${isActive("/pre-audio-transcriptions") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
                  <span>Audio Transcription</span>
                </div>
              </Link>


              <Link to={"/resyncingAi"}>
                <div className={`p-2 flex rounded-md ${isActive("/resyncingAi") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
                  <span>Resync AI</span>
                </div>
              </Link>

              <Link to={"/corporate-transcript-summarization"}>
                <div className={`p-2 flex rounded-md ${isActive("/corporate-transcript-summarization") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
                  <span>Transcript Summary</span>
                </div>
              </Link>
            </div>
          )}

          {/* Support Section */}
          <button
            onClick={() => setOpenSupport(!openSupport)}
            className="p-4 flex justify-between items-center rounded-md hover:bg-white hover:text-black"
          >
            <div className="flex items-center">
              <AiOutlineAudio className="mr-2 mt-1" />
              <span>Online Support</span>
            </div>
            {openSupport ? <AiOutlineUp /> : <AiOutlineDown />}
          </button>

          {openSupport && (
            <div className="ml-6">
              {/* Contact Button */}
              <div>
                <button
                  onClick={() => setOpenContact(!openContact)}
                  className={`p-2 w-full flex justify-between items-center rounded-md ${isActive("/support/online") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}
                >
                  <span>Contact</span>
                  {openContact ? <AiOutlineUp /> : <AiOutlineDown />}
                </button>
                {openContact && (
                  <div className="ml-4">
                    <Link to={"/contact-us"}>
                      <div className="p-2  flex rounded-md hover:bg-white hover:text-black">
                        <span>Email Contact Info</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* FAQs Button */}
              <div>
                <button
                  onClick={() => setOpenFaqs(!openFaqs)}
                  className={`p-2 flex w-full justify-between items-center rounded-md ${isActive("/support/faqs") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}
                >
                  <span>FAQs</span>
                  {openFaqs ? <AiOutlineUp /> : <AiOutlineDown />}
                </button>
                {openFaqs && (
                  <div className="ml-4">
                    <Link to={"/support/faqs/questions"}>
                      <div className="p-2 flex rounded-md hover:bg-white hover:text-black">
                        <span>Questions/Answers</span>
                      </div>
                    </Link>

                  </div>
                )}
              </div>

              {/* Resources Button */}
              <div>
                <button
                  onClick={() => setOpenResource(!openResource)}
                  className={`p-2 flex w-full justify-between items-center rounded-md ${isActive("/support/Resource") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}
                >
                  <span>Resource</span>
                  {openResource ? <AiOutlineUp /> : <AiOutlineDown />}
                </button>
                {openResource && (
                  <div className="ml-4">
                    <Link to={"/support/Resource/questions"}>
                      <div className="p-2 flex rounded-md hover:bg-white hover:text-black">
                        <span>Documentation</span>
                      </div>
                    </Link>

                  </div>
                )}

              </div>

            </div>
          )}

          <Link to={"/blogs"}>
            <div className={`ml-5 p-2 flex rounded-md ${isActive("/corporate-transcript-summarization") ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>
              <span>Articles</span>
            </div>
          </Link>


          {/* Logout Button */}
          <button onClick={handleLogout} className=" p-4 flex rounded-md hover:bg-white hover:text-black">
            <CiLogout className="mr-2 mt-1" />
            <span>Logout</span>
          </button>
        </div>
        {/* <div className="flex gap-4 flex-col text-white mt-10 ">
          <Link to={"/"}>
            <div className={`mx-2 p-4 flex rounded-md ${isActive("/") ? "bg-white text-black" : "hover:bg-white hover:text-text-black"}`}>
              <div className="mr-2 mt-1">
                <AiOutlineHome />
              </div>
              <button>Home</button>
            </div>
          </Link>

          <Link to={"/home"}>
            <div className={`mx-2 p-4 flex rounded-md ${isActive("/home") ? "bg-white text-black" : "hover:bg-white hover:text-text-black"}`}>
              <div className="mr-2 mt-1">
                <LuLayoutDashboard />
              </div>
              <button>Dashboard</button>
            </div>
          </Link>

         {!isLiveTranscript ? (
            <Link onClick={startLiveTranscript}>
              <div className={`mx-2 p-4 flex rounded-md ${isActive("/notdefined") ? "bg-white text-black" : "hover:bg-white hover:text-text-black"}`}>
                <div className="mr-2 mt-1">
                  <AiOutlineAudio />
                </div>
                <button>Live Transcript</button>
              </div>
            </Link>
          ) : (
            <div>
              <div className={`mx-2 p-4 border flex text-white justify-between items-center ${isPaused ? 'bg-green-500' : 'bg-red-500'} rounded-md`}>
                <div className="mr-2 mt-1">
                  {isPaused ? (<FaPause size={18} />) : (<AiOutlineAudio size={18} />)}
                </div>
                <div className="flex gap-2">
                  {remainingTime > 0 && (
                    <div className="font-semibold gap-2 font-poppins text-white-500 flex items-center">
                      <MdOutlineTimer size={20} /> <p>{formatTime(remainingTime)}</p>
                    </div>
                  )}
                </div>
                <span onClick={handleNewWindow} className="hover:cursor-pointer p-2 rounded-full hover:bg-red-400">
                  <RxOpenInNewWindow size={20} />
                </span>
              </div>
            </div>
          )} 

          <Link to={"/pre-audio-transcriptions"}>
            <div className={`mx-2 p-4 flex rounded-md ${isActive("/pre-audio-transcriptions" || "pre-audio-transcriptions/view:id") ? "bg-white text-black" : "hover:bg-white hover:text-text-black"}`}>
              <div className="mr-2 mt-1">
                <MdOutlineTranscribe />
              </div>
              <button>Audio Transcription</button>
            </div>
          </Link>

          <Link to={"/resyncingAi"}>
            <div className={`mx-2 p-4 flex rounded-md ${isActive("/resyncingAi") ? "bg-white text-black" : "hover:bg-white hover:text-text-black"}`}>
              <div className="mr-2 mt-1">
                <GrSync />
              </div>
              <button>Resyncing Ai</button>
            </div>
          </Link>

          <Link to={"/note-case"}>
            <div className={`mx-2 p-4 flex rounded-md ${isActive("/note-case") ? "bg-white text-black" : "hover:bg-white hover:text-text-black"}`}>
              <div className="mr-2 mt-1">
              <MdOutlineCases />
              </div>
              <button> Case Note</button>
            </div>
          </Link>

          <Link to={"/summarization-deposition"}>
            <div className={`mx-2 border w-full py-4 px-2 flex rounded-md ${isActive("/note-case") ? "bg-white text-black" : "hover:bg-white hover:text-text-black"}`}>
              <div className="mr-2 mt-1">
              <MdOutlineSummarize />
              </div>
              <button>Deposition Summarization</button>
            </div>
          </Link>

          <button onClick={handleLogout}>
            <div className={`mx-2 p-4  flex rounded-md ${isActive("/more") ? "bg-white text-black" : "hover:bg-white hover:text-text-black"}`}>
              <div className="mr-2 mt-1">
                <CiLogout />
              </div>
              <button >Logout</button>
            </div>
          </button> 


        </div> */}
      </aside>


      {showPaymentModal && (
        <PaymentModal
          setShowPaymentModal={setShowPaymentModal}
          isPaymentDone={isPaymentDone}
        />
      )}
    </>
  );
}

export default Sidebar;
