import React from 'react'
import '../../../css/realtimetranscriptions.css';
import { useRef, useState, useEffect } from 'react';
import RecordRTC from 'recordrtc';
import { BsBoxArrowInDownLeft } from "react-icons/bs";;
import { IoIosSettings } from "react-icons/io";
import { IoIosHome } from "react-icons/io";
import { BiSolidWidget } from "react-icons/bi";
import { MdCloseFullscreen } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { RxLetterCaseUppercase } from "react-icons/rx";
import { RxLetterCaseLowercase } from "react-icons/rx";
import { IoDocumentOutline } from "react-icons/io5";
import { Link } from "react-router-dom"
import Modal from 'react-modal';
import { FaPlay, FaPause, FaStop, FaTrash, FaCheck } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { MdOutlineRestartAlt } from "react-icons/md";
import toast from 'react-hot-toast';
import axios from 'axios';
import { Client } from "@gradio/client";

import { useNavigate, useLocation } from 'react-router-dom';


import { useSelector, useDispatch } from 'react-redux';
import EditControlsModal from '../EditControlsModal';
import { useLiveTranscript } from "../../../GlobalState/customHooks/useLiveTranscript"
import {


  setIsToken,
  setTranscriptType,
  setZoomAccessToken,

} from "../../../GlobalState/features/liveTranscriptUISlice";
import ZoomAuthorization from './ZoomAuthorization';
const VirtualTranscript = () => {

  const [headerVanish, setHeaderVanish] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState("")
  const [isMeetingStart, setIsMeetingStart] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [lineSpacing, setLineSpacing] = useState('normal');

  const [showLineNumbers, setShowLineNumbers] = useState(false);

  const [dynamicHeight, setDynamicHeight] = useState(80)
  const colorPickerRef = useRef(null);
  const bgColorPicker = useRef(null);
  const settingsRef = useRef(null);
  const texts = useRef({});

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fontFamilies = [" Open Sans ", "Open Dyslexic", "Arial", "Arial Black", "Calibri", "Courier New"]
  const startSize = 12;
  const endSize = 88;
  const gap = 2;
  const fontSizes = [];
  const {
    smallFontSettings,
    handleSmallFontSizeChange,
    handleSmallFontFamilyChange,
    handleSmallTextColorChange,
    handleSmallBgColorChange,
    largeFontSettings,
    handleLargeFontSizeChange,
    handleLargeFontFamilyChange,
    handleLargeTextColorChange,
    handleLargeBgColorChange,
    pauseVirtualTranscriptions,
    resumeVirtualTranscriptions,
    stopVirtualTranscriptions
  } = useLiveTranscript();

  const { liveTranscript, finalTranscript, transcriptType, meetingStatus, meetingError, zoomAccessToken, isToken, isVtPaused, isVtRecording, vtRemainingTime, } = useSelector((state) => state.liveTranscript.virtualTranscript)





  const sendMeetingUrl = async () => {
    // basic url validation
    try {
      new URL(meetingUrl);
    } catch (error) {
      toast.error("Please enter a valid Zoom meeting URL.");
      return;
    }

    try {

      await axios.post(`${import.meta.env.VITE_HOST_URL}/virtual-transcript/invite_bot`, {
        meetingUrl: meetingUrl,
      });
      setIsMeetingStart(true)
      dispatch(setTranscriptType("start"));
      toast.success("Bot joining the meeting")
    } catch (error) {

      console.log("error while bot invite", error)
    }
  };





  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ui logics

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  // Clear Text


  const clearText = () => {

    texts.current = {};
  };

  // variables adjustments
  let fontSize = largeFontSettings.fontSize
  let fontFamily = largeFontSettings.fontFamily
  let bgColor = largeFontSettings.bgColor
  let textColor = largeFontSettings.textColor

  let fontSize2 = smallFontSettings.fontSize
  let fontFamily2 = smallFontSettings.fontFamily
  let bgColor2 = smallFontSettings.bgColor
  let textColor2 = smallFontSettings.textColor



  const containerRef = useRef(null);
  const pRef = useRef(null);
  const pRefLarge = useRef(null);

  // for small window
  useEffect(() => {
    if (pRef.current) {
      pRef.current.scrollTop = pRef.current.scrollHeight;
    }
  }, [liveTranscript, dynamicHeight]);


  // for large window
  useEffect(() => {
    if (pRefLarge.current) {
      pRefLarge.current.scrollTop = pRefLarge.current.scrollHeight;
    }
  }, [liveTranscript]);


  useEffect(() => {

    setDynamicHeight(fontSize2 * 3)

  }, [fontSize2])

  const handleZoomAuthorization = () => {
    window.location.href = `${import.meta.env.VITE_HOST_URL}/virtual-transcript/zoom-login`;
  }


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');

    if (status === "zoom-connected") {
      dispatch(setZoomAccessToken(status))
      dispatch(setIsToken(true))
      localStorage.removeItem('navigateUrl');
      
    }


    console.log("status", status)


  }, [location, navigate]);


  const downloadVirtualTranscript = () => {

    const doc = new jsPDF();
    const fontSize = 12;
    doc.setFontSize(fontSize);
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxWidth = pageWidth - 20;
    let yPosition = 10; // Initial vertical position on the page

    finalTranscript.forEach((data, i) => {

      doc.text(`Speaker ${i + 1}: ${data.speaker}`, 10, yPosition)
      yPosition += 8

      const wordText = data.words.map(word => word.text).join(' ')
      const textLines = doc.splitTextToSize(wordText, maxWidth)

      textLines.forEach(line => {
        doc.text(line, 10, yPosition)
        yPosition += 8
      })

      yPosition += 8
    })
    doc.save(`virtualTranscript.pdf`)
  }
  console.log("live virtual transcripttt:", liveTranscript)



  return (
    <div className="w-full flex flex-col items-center gap-3 justify-center  min-h-screen ">
      {/* <span className='flex items-center my-10 gap-1'>

        <p className='text-2xl'>Disclaimer: This feature is not currently available publicly. </p>
        <button onClick={() => {
          navigate("/user-guide-to-add/remove-app-from-zoom-account")
        }} className='underline text-gray-300 text-2xl hover:text-gray-300/50'> Read more</button>
      </span> */}



      {
        isMeetingStart === false && transcriptType === null ?
          //  first part >>>>>>>>>>>>>>>>>>>>>>>.
          <div
            className='border flex items-center justify-center flex-col w-2/3 h-full p-5 gap-5'
          >

            <span className=' w-full '>
              {
                zoomAccessToken === "" ? <p className=' font-poppins text-2xl font-semibold '>Please connect Zoom with captify First</p> : <p className=' font-poppins text-2xl font-semibold '>Enter your meeting link here</p>
              }

            </span>




            <div className='flex flex-col gap-5 w-full  h-full p-2'>

              {
                isToken === true &&

                <div className='flex gap-5 w-full '>
                  <input
                    type="text"
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                    style={{

                      padding: "15px 5px",
                      fontSize: "1em",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    placeholder="Enter meeting URL"
                    className='w-2/4 text-black'
                  />

                  <button

                    style={{
                      padding: "15px 10px",
                      fontSize: "1em",
                      cursor: "pointer",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                    className='bg-bg-purple-2'
                    onClick={sendMeetingUrl}
                  >
                    Add Bot to Meeting
                  </button>
                </div>
              }

              {/* <button

                style={{
                  padding: "15px 5px",
                  fontSize: "1em",
                  cursor: "pointer",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}

                className={` w-52 ${zoomAccessToken === "" ? "bg-bg-purple-2" : "bg-green-600"}`}
                onClick={handleZoomAuthorization}
              >
                {zoomAccessToken === "" ? "Connect Zoom" : "Zoom Connected"}
              </button> */}
              <ZoomAuthorization

                buttonName={zoomAccessToken === "" ? "Connect Zoom" : "Zoom Connected"}

                handleZoomAuthorization={handleZoomAuthorization}

                navigateUrl="virtual-transcript"



              />


            </div>

          </div> :

          // second part >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


          <div className='w-full'>
            {/* Header */}

            {headerVanish ? null : (
              <div style={{}} className='flex flex-row justify-between p-4 text-white bg-[#333333] w-full '>
                <p className='text-text-blue'>
                  Captify
                </p>

                <div className='flex flex-row gap-6 items-center justify-center text-gray-500 list-none text-3xl '>
                  {
                    !isVtPaused ? (

                      <button className='cursor-pointer hover:text-white' title='pause' onClick={() => {
                        pauseVirtualTranscriptions();

                      }
                      } ><FaPause size={20} /></button>

                    ) :
                      (
                        <button className='cursor-pointer hover:text-white' title='resume' onClick={() => {
                          resumeVirtualTranscriptions();

                        }
                        }
                        ><FaPlay size={20} /></button>

                      )
                  }


                  <button className='cursor-pointer hover:text-white' title='stop' onClick={stopVirtualTranscriptions} ><FaStop size={20} /></button>
                  <button className='cursor-pointer hover:text-white' title='restart' ><MdOutlineRestartAlt /></button>
                  <button className='cursor-pointer hover:text-white' title='clear text' ><GrClearOption size={22} /></button>

                  <button className='cursor-pointer hover:text-white' title='settings' onClick={handleSettingsClick}><IoIosSettings /></button>

                  <button className='cursor-pointer hover:text-white' title='widgets'><BiSolidWidget /></button>
                </div>


              </div>
            )}





            <div className='w-full px-5  '>
              {/* Modal for settings */}
              {isSettingsModalOpen && (
                <EditControlsModal

                  handleSettingsClick={handleSettingsClick}
                  showLineNumbers={showLineNumbers}

                  fontSize={fontSize}
                  textColor={textColor}
                  fontFamily={fontFamily}
                  bgColor={bgColor}
                  handleFontSizeChange={handleLargeFontSizeChange}
                  handleTextColorChange={handleLargeTextColorChange}
                  handleFontFamilyChange={handleLargeFontFamilyChange}
                  handleBgColorChange={handleLargeBgColorChange}



                  fontFamilies={fontFamilies}
                  fontSizes={fontSizes}

                  fontFamily2={fontFamily2}
                  fontSize2={fontSize2}
                  textColor2={textColor2}
                  bgColor2={bgColor2}
                  handleFontSizeChange2={handleSmallFontSizeChange}
                  handleFontFamilyChange2={handleSmallFontFamilyChange}
                  handleTextColorChange2={handleSmallTextColorChange}
                  handleBgColorChange2={handleSmallBgColorChange}



                />
              )}


              {/* <p className='font-semibold text-2xl'> Meeting Status : {meetingStatus}</p> */}
              {/* small window */}

              <div
                id="container-id"
                className={`border shadow-sm w-full text-black flex  font-sans px-2 my-2 relative`}
                style={{
                  fontSize: `${fontSize2}px`,
                  fontFamily: fontFamily2, // Fixed fontFamily issue here
                  color: textColor2,
                  backgroundColor: bgColor2,
                  height: `${dynamicHeight}px`,
                }}
              >
                <p className="text-white text-lg text-center w-40 my-2 font-bold mr-5">Events Display:</p>

                <div className="w-full overflow-hidden" ref={containerRef}>
                  <div
                    ref={pRef}
                    style={{
                      height: "100%",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div>
                      {transcriptType === "realtime" && (
                        <div className="flex w-full px-2  flex-wrap">
                          {/* Use flex-wrap to allow words to flow in the same line */}
                          {liveTranscript.fullTranscript.map((word, i) => (
                            <p key={i} className="mr-2">
                              {word.text}
                            </p>
                          ))}
                          {liveTranscript.words.map((word, i) => (
                            <p key={i} className="mr-2">
                              {word.text}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>


              {/* next section */}
              <div className='w-full flex   flex-col  '>


                {/* large window */}

                <div
                  id="container-id"
                  className="border bg-bg-gray-new shadow-sm h-[500px] w-full flex font-sans px-2 my-2 relative"
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily,
                    color: textColor,
                    backgroundColor: bgColor,
                  }}
                >
                  <div className="w-full overflow-y-auto">
                    {transcriptType === "final-transcript" ? (
                      finalTranscript.map((data, i) => (
                        <div className="p-5 w-full gap-5" key={i}>
                          <p>{data.speaker}</p>
                          <div className="flex flex-wrap">
                            {data.words.map((word, j) => (
                              <p key={j} className="mr-2">
                                {word.text}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      transcriptType === "realtime" &&
                      <div className="flex flex-wrap">
                        {liveTranscript.fullTranscript.map((word, i) => (
                          <p key={i} className="mr-2">
                            {word.text}
                          </p>
                        ))}
                        {liveTranscript.words.map((word, i) => (
                          <p key={i} className="mr-2">
                            {word.text}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>


                {/* bottom editor */}

                <div className='p-2 flex   border text-sm font-bold font-roboto'>

                  <div className='flex items-end text-end gap-3 text-xl '>

                    <button title='lowercase' className=''><RxLetterCaseLowercase /></button>
                    <button title='uppercase' className=''><RxLetterCaseUppercase /></button>


                    <span className='flex flex-col-reverse'>

                      <button title='colors' id="colorPickerButton" >
                        <FaPencilAlt className='' />
                      </button>

                      <input
                        ref={colorPickerRef}
                        className='outline-none  w-3 h-4  rounded'
                        type="color"
                        value={textColor}

                        id="colorPickerInput"
                        name="colorPickerInput"
                      />
                    </span>

                    <span className='flex flex-col-reverse'>

                      <button title='Bgcolors' id="BgcolorPickerButton" >
                        <IoDocumentOutline />
                      </button>

                      <input
                        ref={bgColorPicker}
                        className='outline-none  w-3 h-4  rounded-md'
                        type="color"
                        value={bgColor}

                        id="BgcolorPickerInput"
                        name="BgcolorPickerInput"
                      />
                    </span>


                  </div>

                  {
                    transcriptType === "final-transcript" && <Button className="w-52" onClick={downloadVirtualTranscript} variant={"customPurple"}>Download Transcript</Button>
                  }

                </div>

              </div>
            </div>

          </div>

      }



    </div>
  )
}

export default VirtualTranscript
