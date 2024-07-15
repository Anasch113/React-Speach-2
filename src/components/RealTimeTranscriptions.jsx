import '../css/realtimetranscriptions.css';
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


import { useSelector } from 'react-redux';
import EditControlsModal from './RealTimeTranscript/EditControlsModal';

function RealTimeTranscriptions() {
  const socket = useRef(null)
  const recorder = useRef(null)
  const [cleared, setCleared] = useState(false);
  const [isRecordingAuto, setIsRecordingAuto] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // large window
  const [fontSize, setFontSize] = useState(26);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#000000');

  // small window
  const [fontSize2, setFontSize2] = useState(26);
  const [fontFamily2, setFontFamily2] = useState('Arial');
  const [textColor2, setTextColor2] = useState('#ffffff');
  const [bgColor2, setBgColor2] = useState('#000000');

  const [headerVanish, setHeaderVanish] = useState(false);
  const [lineSpacing, setLineSpacing] = useState('normal');
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState(80)
  const colorPickerRef = useRef(null);
  const bgColorPicker = useRef(null);
  const settingsRef = useRef(null);
  const texts = useRef({});


  // Stream controls state 

  const [isPasue, setIsPause] = useState(false)
  const [isPaused, setIsPaused] = useState(false);


  const recordingStatus = useSelector((state) => state.audio.isRecording);
  console.log("recording status in RTT", recordingStatus)

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };









  const handleOpenInNewTab = (e) => {
    // Specify the width and height for the new window
    const newWindow = window.open("/realtimetranscriptions", '_blank', 'width=600,height=400');

    // Optionally, you can focus on the new window
    if (newWindow) {
      newWindow.focus();
    }
  };





  const startSize = 12;
  const endSize = 88;
  const gap = 2;
  const fontSizes = [];

  for (let i = startSize; i <= endSize; i += gap) {
    fontSizes.push(`${i}`);
  }

  const fontFamilies = [" Open Sans ", "Open Dyslexic", "Arial", "Arial Black", "Calibri", "Courier New"]


  // Handler functions to update settings
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const handleBgColorChange = (e) => {
    setBgColor(e.target.value);
  };
  const handleFontSizeChange2 = (e) => {
    setFontSize2(e.target.value);
  };

  const handleFontFamilyChange2 = (e) => {
    setFontFamily2(e.target.value);
  };

  const handleTextColorChange2 = (e) => {
    setTextColor2(e.target.value);
  };

  const handleBgColorChange2 = (e) => {
    setBgColor2(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    setHeaderVanish(event.target.checked);
  };
  const handleLineSpacingChange = (event) => {
    setLineSpacing(event.target.value);

  };
  const handleDecreaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize - 2);
  };

  const handleIncreaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 2);
  };

  const handleColorPickerButtonClick = (e) => {
    colorPickerRef.current.click();
    setTextColor(e.target.value)
  };
  const handleBgColorPickerButtonClick = (e) => {
    bgColorPicker.current.click();
    setBgColor(e.target.value)
  };




  //>>>>>>>>>>>>>>>>>>>>>> Trancriptions Code Start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




  useEffect(() => {

    setIsRecordingAuto(true) 

    const handleMessage = (event) => {


      if (event.data.type === 'STOP') {
        endTranscription()
      }

    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }


  }, []);



  useEffect(() => {



    if (isRecordingAuto) {
      // If recordingStatus becomes true, start recording
      generateTranscript();

    } else {
      // If recordingStatus becomes false, end transcription
      endTranscription({ preventDefault: () => { } });
    }
  }, [isRecordingAuto]);



  const generateTranscript = async () => {
    const response = await fetch(`${import.meta.env.VITE_HOST_URL}/token`);
    const data = await response.json();

    if (data.error) {
      alert(data.error)
    }

    const { token } = data;

    socket.current = await new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`);



    socket.current.onmessage = (voicePrompt) => {


      if (isPaused) return;



      let msg = '';
      const res = JSON.parse(voicePrompt.data);
      texts.current[res.audio_start] = res.text;
      const keys = Object.keys(texts.current);
      keys.sort((a, b) => a - b);
      for (const key of keys) {
        if (texts.current[key]) {
          msg += ` ${texts.current[key]}`;
          console.log(msg)
        }
      }

      setTranscript(msg)
    };

    socket.current.onerror = (event) => {
      console.error(event);
      socket.current.close();
    }

    socket.current.onclose = event => {
      console.log(event);
      socket.current = null;
    }

    socket.current.onopen = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          recorder.current = new RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/webm;codecs=pcm',
            recorderType: RecordRTC.StereoAudioRecorder,
            timeSlice: 250,
            desiredSampRate: 16000,
            numberOfAudioChannels: 1,
            bufferSize: 4096,
            audioBitsPerSecond: 128000,
            ondataavailable: (blob) => {
              if (isPaused) return;
              const reader = new FileReader();
              reader.onload = () => {
                const base64data = reader.result;
                if (socket.current) {
                  socket.current.send(JSON.stringify({ audio_data: base64data.split('base64,')[1] }));
                }
              };
              reader.readAsDataURL(blob);
            },
          });
          recorder.current.startRecording();
        })
        .catch((err) => console.error(err));
    };


  }

  const endTranscription = async (event) => {
    event.preventDefault();


    socket.current.send(JSON.stringify({ terminate_session: true }));
    socket.current.close();
    console.log(prompt)
    socket.current = null;

    recorder.current.pauseRecording();
    recorder.current = null;
  }



  // Pause function
  const pauseTranscriptions = () => {

    setIsPaused(true);
    if (recorder.current) {
      recorder.current.pauseRecording();
    }




  }

  // Resume function
  const resumeTranscriptions = () => {

    setIsPaused(false);
    if (recorder.current) {
      recorder.current.resumeRecording();
    }


  }

  // Clear Text


  const clearText = () => {
    setTranscript('');
    texts.current = {};
  };


  const containerRef = useRef(null);
  const pRef = useRef(null);
  const pRefLarge = useRef(null);

  // for small window
  useEffect(() => {
    if (pRef.current) {
      pRef.current.scrollTop = pRef.current.scrollHeight;
    }
  }, [transcript, dynamicHeight]);


  // for large window
  useEffect(() => {
    if (pRefLarge.current) {
      pRefLarge.current.scrollTop = pRefLarge.current.scrollHeight;
    }
  }, [transcript]);


  useEffect(() => {

    setDynamicHeight(fontSize2 * 3)

  }, [fontSize2])

  console.log("dynamic height", dynamicHeight)


  return (
    <div className="w-full flex flex-col items-center gap-3  min-h-screen ">

      {/* Header */}
      {headerVanish ? null : (
        <div style={{}} className='flex flex-row justify-between p-4 text-white bg-[#333333] w-full '>
          <p className='text-text-blue'>
            Captify
          </p>
          {/* Header Control Buttons */}
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
            settingsRef={settingsRef}
            showLineNumbers={showLineNumbers}
            setShowLineNumbers={setShowLineNumbers}
            fontFamily={fontFamily}

            handleFontFamilyChange={handleFontFamilyChange}
            fontSize={fontSize}

            handleFontSizeChange={handleFontSizeChange}
            handleLineSpacingChange={handleLineSpacingChange}
            lineSpacing={lineSpacing}
            textColor={textColor}
            handleTextColorChange={handleTextColorChange}
            bgColor={bgColor}
            handleBgColorChange={handleBgColorChange}
            handleCheckboxChange={handleCheckboxChange}
            handleSettingsClick={handleSettingsClick}
            fontFamilies={fontFamilies}
            fontSizes={fontSizes}
            fontFamily2={fontFamily2}
            fontSize2={fontSize2}
            textColor2={textColor2}
            bgColor2={bgColor2}
            handleFontSizeChange2={handleFontSizeChange2}
            handleFontFamilyChange2={handleFontFamilyChange2}
            handleTextColorChange2={handleTextColorChange2}
            handleBgColorChange2={handleBgColorChange2}



          />
        )}

        {/* small window */}

        <div
          id="container-id"
          className={`border shadow-sm w-full text-black flex  font-sans px-2 my-2 relative`}
          style={{
            fontSize: `${fontSize2}px`,
            fontFamily2,
            color: textColor2,
            backgroundColor: bgColor2,
            height: `${dynamicHeight}px`

          }}
        >
          <p className='text-white text-lg  text-center w-40 my-2  font-bold mr-5'>Events Display:</p>

          <div className=" w-full overflow-hidden" ref={containerRef}>
            <div
              ref={pRef}
              style={{
                height: '100%',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <p>
                {showLineNumbers
                  ? transcript.split('\n').map((line, index) => (
                    <span key={index}>
                      {index + 1}. {line}
                      <br />
                    </span>
                  ))
                  : transcript}
              </p>
            </div>
          </div>
        </div>




        {/* next section */}
        <div className='w-full flex   flex-col  '>

          {/* <div className='p-2 flex items-center justify-between border text-sm font-bold font-roboto'>
            <p>StreamBox</p>

            <div className='flex gap-3 text-lg '>
              <BsBoxArrowInDownLeft className='hover:text-gray-400 w-full    hover:rounded-md  cursor-pointer' title='Open in new window' onClick={handleOpenInNewTab} />
              <MdCloseFullscreen className='hover:text-gray-400 w-full    hover:rounded-md  cursor-pointer' title='fullscreen' />
            </div>
          </div> */}

          {/* large window */}

          <div
            id="container-id"
            className="border shadow-sm h-[500px]  w-full  flex  font-sans px-2 my-2 relative"
            style={{
              fontSize: `${fontSize}px`,
              fontFamily,
              color: textColor,
              backgroundColor: bgColor,

            }}
          >

            <div className=" w-full overflow-hidden" ref={containerRef}>
              <div
                ref={pRefLarge}
                style={{
                  height: '100%',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              >
                <p>
                  {showLineNumbers
                    ? transcript.split('\n').map((line, index) => (
                      <span key={index}>
                        {index + 1}. {line}
                        <br />
                      </span>
                    ))
                    : transcript}
                </p>
              </div>
            </div>
          </div>


          <div className='p-2 flex   border text-sm font-bold font-roboto'>

            <div className='flex items-end text-end gap-3 text-xl '>

              <button title='lowercase' onClick={handleDecreaseFontSize} className=''><RxLetterCaseLowercase /></button>
              <button title='uppercase' onClick={handleIncreaseFontSize} className=''><RxLetterCaseUppercase /></button>


              <span className='flex flex-col-reverse'>

                <button title='colors' id="colorPickerButton" onClick={handleColorPickerButtonClick}>
                  <FaPencilAlt className='' />
                </button>

                <input
                  ref={colorPickerRef}
                  className='outline-none  w-3 h-4  rounded'
                  type="color"
                  value={textColor}
                  onChange={handleColorPickerButtonClick}
                  id="colorPickerInput"
                  name="colorPickerInput"
                />
              </span>

              <span className='flex flex-col-reverse'>

                <button title='Bgcolors' id="BgcolorPickerButton" onClick={handleBgColorPickerButtonClick}>
                  <IoDocumentOutline />
                </button>

                <input
                  ref={bgColorPicker}
                  className='outline-none  w-3 h-4  rounded-md'
                  type="color"
                  value={bgColor}
                  onChange={handleBgColorPickerButtonClick}
                  id="BgcolorPickerInput"
                  name="BgcolorPickerInput"
                />
              </span>


            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default RealTimeTranscriptions;

