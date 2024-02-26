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
import { Link } from "react-router-dom"

import { useSelector } from 'react-redux';

function RealTimeTranscriptions() {
  const socket = useRef(null)
  const recorder = useRef(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isRecordingAuto, setIsRecordingAuto] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);




  const recordingStatus = useSelector((state)=> state.audio.isRecording);
  console.log("recording status in RTT", recordingStatus)

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };


  const generateTranscript = async () => {
    const response = await fetch(`${import.meta.env.VITE_HOST_URL}/token`);
    const data = await response.json();

    if (data.error) {
      alert(data.error)
    }

    const { token } = data;

    socket.current = await new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`);

    const texts = {};
    socket.current.onmessage = (voicePrompt) => {
      let msg = '';
      const res = JSON.parse(voicePrompt.data);
      texts[res.audio_start] = res.text;
      const keys = Object.keys(texts);
      keys.sort((a, b) => a - b);
      for (const key of keys) {
        if (texts[key]) {
          msg += ` ${texts[key]}`
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

    setIsRecording(true)
  }

  const endTranscription = async (event) => {
    event.preventDefault();
    setIsRecording(false)

    socket.current.send(JSON.stringify({ terminate_session: true }));
    socket.current.close();
    console.log(prompt)
    socket.current = null;

    recorder.current.pauseRecording();
    recorder.current = null;
  }

  const handleOpenInNewTab = (e) => {
    // Specify the width and height for the new window
    const newWindow = window.open("/realtimetranscriptions", '_blank', 'width=600,height=400');
  
    // Optionally, you can focus on the new window
    if (newWindow) {
      newWindow.focus();
    }
  };


  useEffect(()=>{
    
setIsRecordingAuto(true)
  }, []);


  useEffect(() => {

   

    if (isRecordingAuto) {
      // If recordingStatus becomes true, start recording
      generateTranscript();
     
    } else {
      // If recordingStatus becomes false, end transcription
      endTranscription({ preventDefault: () => {} });
    }
  }, [isRecordingAuto]);


  
  




  return (
    <div className="w-full flex flex-col items-center gap-3  min-h-screen ">

      <div className='flex flex-row justify-between p-4 text-white bg-[#333333] w-full '>

        <p className='text-text-blue'>
          Captify
        </p>

        <div className='flex flex-row gap-6 items-center justify-center text-gray-500 list-none text-3xl '>
          <button className='cursor-pointer hover:text-white' title='settings' onClick={handleSettingsClick}><IoIosSettings /></button>
          <Link to={"/home"}>
            <button className='cursor-pointer hover:text-white' title='Home'><IoIosHome /></button>
          </Link>
          <button className='cursor-pointer hover:text-white' title='widgets'><BiSolidWidget /></button>
        </div>

      </div>





      <div className='w-full px-5  '>
        {/* Modal for settings */}
        {isSettingsModalOpen && (
          <div className="fixed px-14  -top-20 left-0 w-full h-full  z-20 flex justify-center items-center">
            {/* Add your settings content here */}
            <div className="bg-white w-full h-2/3 p-4 items-center rounded-md shadow-md ">

              <div>
                <p>Main Settings</p>
              </div>
              {/* main div */}
              <div className='flex  justify-between w-full flex-row p-5'>
                {/* 1st div */}
                <div className='flex  flex-col gap-3 w-2/5'>

                  <h1 className='text-xl font-medium font-sans'>StreamBox Settings</h1>

                  <span className='  w-full'>
                    <span className='flex justify-between w-2/3'>
                      <p className='text-sm font-sans'>Show Time</p>
                      <input type="checkbox" />
                    </span>

                  </span>



                  <span className='flex justify-between  w-2/3'>
                    <p className='text-sm font-sans'>Line Numbers</p>
                    <input type="checkbox" />
                  </span>


                </div>
                {/* 2nd div */}
                <div className='flex   flex-col gap-3 w-2/5 '>

                  <h1 className='text-xl font-sans font-medium'>Appearence </h1>

                  <span className='flex items-center justify-between w-2/3'>

                    <p className='text-sm font-sans'>Font</p>
                    <select className='py-3 w-2/3 px-7 rounded-sm border border-gray-400' name="font" id="font">
                      <option value="open-sans">Open Sans</option>
                      <option value="poppins">Poppins</option>
                      <option value="roboto">Roboto</option>
                    </select>

                  </span>

                  <span className='flex items-center justify-between w-2/3'>

                    <p className='text-sm font-sans'>Font Size</p>
                    <select className='py-3 w-2/3 rounded-sm px-7 border border-gray-400' name="font-size" id="font-size">
                      <option value="12px">12px</option>
                      <option value="14px">14px</option>
                      <option value="16px">16px</option>
                    </select>

                  </span>

                </div>
                {/* 3rd div */}
                <div className='flex  flex-col gap-3 w-2/5  '>

                  <h1 className='font-medium text-xl font-sans '>Interface Settings</h1>

                  <span className='flex justify-between w-2/3'>
                    <p className='text-sm font-sans'>Hide Header</p>
                    <input type="checkbox" />
                  </span>
                  <h1 className='font-medium text-xl font-sans '>Haptic Settings</h1>


                  <span className='flex  justify-between w-full'>
                    <p className='text-sm font-sans'>Pattern(s) Search</p>
                    <input className='w-2/4 text-end p-1 border border-gray-300 shadow-sm rounded-sm' type="search" />
                  </span>

                  <span className='flex justify-between w-2/3'>
                    <p className='text-sm font-sans'>Enbale Pushes</p>
                    <input type="checkbox" />
                  </span>

                </div>

              </div>
              <span className='flex items-end  w-full justify-center'>
                <button className="text-white px-4 py-1 rounded-md w-56 bg-red-600" onClick={handleSettingsClick}>
                  Close
                </button>
              </span>


            </div>
          </div>
        )}




        {/* next section */}
        <div className='w-full flex   flex-col  '>

          <div className='p-2 flex items-center justify-between border text-sm font-bold font-roboto'>
            <p>StreamBox</p>

            <div className='flex gap-3 text-lg '>
              <BsBoxArrowInDownLeft className='hover:text-gray-400 w-full    hover:rounded-md  cursor-pointer' title='Open in new window' onClick={handleOpenInNewTab} />
              <MdCloseFullscreen className='hover:text-gray-400 w-full    hover:rounded-md  cursor-pointer' title='fullscreen' />
            </div>
          </div>

          <div className=" border shadow-sm min-h-500  w-full text-black flex font-sans   p-3    ">
            <p className='space-x-2'> &gt;&gt; </p> {transcript}

          </div>
          <div className='p-2 flex   border text-sm font-bold font-roboto'>

            <div className='flex items-end text-end gap-3 text-xl '>

              <button title='lowercase' className=''><RxLetterCaseLowercase /></button>
              <button title='uppercase' className=''><RxLetterCaseUppercase /></button>
              <button title='colors'><FaPencilAlt className='' /></button>

            </div>
          </div>

        </div>
      </div>

      {/* <div className="flex items-center w-full flex-col p-5">

        {isRecording ? (
          <button className="p-4 bg-red-600 w-2/6 text-white rounded-md" onClick={endTranscription}>Stop recording</button>
        ) : (
          <button className="p-4 bg-bg-blue w-2/6 text-white rounded-md" onClick={generateTranscript}>Record</button>
        )}
      </div> */}
    </div>
  );
}

export default RealTimeTranscriptions;