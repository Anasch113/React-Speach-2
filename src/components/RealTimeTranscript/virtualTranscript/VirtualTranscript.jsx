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


import { useSelector } from 'react-redux';
import EditControlsModal from '../EditControlsModal';
import { useLiveTranscript } from "../../../GlobalState/customHooks/useLiveTranscript"
const VirtualTranscript = () => {

  const [headerVanish, setHeaderVanish] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState("")
  const [isMeetingStart, setIsMeetingStart] = useState(false)
  const [meetingError, setMeetingError] = useState("")
  const [finalTranscript, setFinalTranscript] = useState([])
  const [liveTranscript, setLiveTranscript] = useState("")
  const [meetingStatus, setMeetingStatus] = useState("")
  const [transcriptType, setTranscriptType] = useState("")
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [lineSpacing, setLineSpacing] = useState('normal');
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState(80)
  const colorPickerRef = useRef(null);
  const bgColorPicker = useRef(null);
  const settingsRef = useRef(null);
  const texts = useRef({});


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
    handleLargeBgColorChange
  } = useLiveTranscript();


  // Pause functions
  const pauseTranscriptions = () => {

  }

  // Resume function
  const resumeTranscriptions = () => {


  }




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
      toast.success("Bot joining the meeting")
    } catch (error) {

      console.log("error while bot invite", error)
    }
  };


  // listen for transcript being sent from the server
  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_HOST_URL}/virtual-transcript/events`
    );

    eventSource.onmessage = (event) => {
      const meetingData = JSON.parse(event.data);
      console.log("meeting data", meetingData)

      if (meetingData.type === "final-transcript") {

        const transcript = meetingData.transcript
        setFinalTranscript(transcript)
        setTranscriptType(meetingData.type)
        setMeetingStatus("completed")
      }

      if (meetingData.type === "realtime") {
        const transcript = meetingData.liveData
        setLiveTranscript(transcript)
        setTranscriptType(meetingData.type)
        setMeetingStatus("realtime")
      }


      if (meetingData.error) {
        setMeetingError(meetingData.error);

      } else {
        setActionItems(meetingData);

        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      setMeetingError("Error receiving SSE");

    };

    return () => {
      eventSource.close();
    };
  }, []);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ui logics

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  // Clear Text


  const clearText = () => {
    setLiveTranscript('');
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


  return (
    <div className="w-full flex flex-col items-center gap-3 justify-center  min-h-screen ">



      {
        isMeetingStart === false ?
          //  first part >>>>>>>>>>>>>>>>>>>>>>>.
          <div
            className=' flex items-center justify-center flex-col w-2/3 h-full p-5 gap-5'
          >

            <span className=' w-full '>
              <p className=' font-poppins text-2xl font-semibold '>Enter your meeting link here</p>
            </span>



            <div className='flex gap-5 w-full'>


              <input
                type="text"
                value={meetingUrl}
                onChange={(e) => setMeetingUrl(e.target.value)}
                style={{

                  padding: "0.5em",
                  fontSize: "1em",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
                placeholder="Enter meeting URL"
                className='w-2/4 text-black'
              />

              <button

                style={{
                  padding: "0.5em 1em",
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
                    !isPaused ? (

                      <button className='cursor-pointer hover:text-white' title='pause' onClick={() => {
                        pauseTranscriptions();
                        window.opener.postMessage({ type: 'PAUSE' }, '*')
                      }
                      } ><FaPause size={20} /></button>

                    ) :
                      (
                        <button className='cursor-pointer hover:text-white' title='resume' onClick={() => {
                          resumeTranscriptions();
                          window.opener.postMessage({ type: 'RESUME' }, '*')
                        }
                        }
                        ><FaPlay size={20} /></button>

                      )
                  }


                  <button className='cursor-pointer hover:text-white' title='stop' onClick={() => window.opener.postMessage({ type: 'STOP' }, '*')} ><FaStop size={20} /></button>
                  <button className='cursor-pointer hover:text-white' title='restart' onClick={() => window.opener.postMessage({ type: 'RESTART' }, '*')} ><MdOutlineRestartAlt /></button>
                  <button onClick={clearText} className='cursor-pointer hover:text-white' title='clear text' ><GrClearOption size={22} /></button>

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
                        <div className="flex w-full border flex-wrap">
                          {/* Use flex-wrap to allow words to flow in the same line */}
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

                </div>

              </div>
            </div>

          </div>

      }



    </div>
  )
}

export default VirtualTranscript
