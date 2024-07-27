import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStop, FaTrash, FaCheck } from "react-icons/fa";
import { BsRecordCircle } from "react-icons/bs";
import { CiTimer } from "react-icons/ci";

import axios from "axios";

const VoiceRecorder = (
  {
    isRecording,

    isPlaying,

    stopRecording,
    deleteAudio,
    startRecording,
    recordingTime,

    recordedAudios,
    togglePlayback,

    transcription,

    mediaRecorder,
    audioRef,
    submitAudio,
    handleNavigate,
    showProcessingText,
    isPaused,
    pauseRecording,
    resumeRecording,
    requestData

  }



) => {



  return (
    <div className="w-full  p-4 bg-bg-color-light border border-border-dark-color  min-h-[20vh]">


      <div className="flex w-full items-center justify-center  gap-5 rounded-md">
        <div className="flex w-2/3 bg-bg-color rounded-md py-5 border border-border-dark-color shadow-sm  self-center items-center justify-center">


          <div className="flex items-center justify-center">
            <button
              onClick={startRecording}
              disabled={isRecording}
              className=" items-center  text-gray-800 space-x-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline flex"
              title="Start"
            >
              <BsRecordCircle
                className={`${isRecording ? "text-red-500" : "text-black"}`}
              />

            </button>
            <button
              onClick={stopRecording}
              disabled={!isRecording}
              className=" flex items-center space-x-2 text-gray-800 py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
              title="Stop "
            >
              <FaStop />

            </button>

            <button
              onClick={isPaused ? resumeRecording : pauseRecording}

              className=" flex space-x-2 items-cente text-gray-800 py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
            >
              {isPaused ? <FaPlay   title="Resume"/> : <FaPause  title="Pause" />}

            </button>

          </div>
          {
            isRecording ? (
              <div className="flex items-center gap-1">
              {/* <CiTimer className="text-text-color-blue text-center"/> */}
                <span className="text-text-color-blue text-left"> {` ${recordingTime}s`}</span>
              </div>
            ):(
<p></p>
            )
          }
         
        </div>




      </div>


      <div className=" flex flex-col gap-5 mt-4 p-8">
        <h2 className="text-2xl font-semibold  text-text-color-blue">
          Recorded Audios
        </h2>
        <ul >


          {recordedAudios.length > 0 ? (

            recordedAudios.map((audio, index) => (
              <li key={index} className=" w-2/5 flex flex-col gap-5">
                <div className="flex items-center ">
                  <audio controls className="mr-2">
                    <source src={audio.url} type="audio/wav" />
                    Your browser does not support the audio tag.
                  </audio>
                  {!audio.isSubmitted && (
                    <div className="flex">
                      <button
                        onClick={() => submitAudio(index)}
                        className="bg-gray-100 text-green-500 hover:text-green-300 outline-white outline p-2 rounded mr-2 focus:outline-none focus:shadow-outline flex items-center space-x-2"
                      >
                        <FaCheck className="mr-1" />
                      </button>
                      <button
                        onClick={() => deleteAudio(index)}
                        className="bg-gray-200  text-red-500 hover:text-red-400 outline-white outline p-2 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
                      >
                        <FaTrash />
                      </button>
                    
                    </div>

                  )}


                </div>
                <button className="py-2 px-2 w-2/6 text-sm  text-text-white bg-bg-blue rounded-md hover:bg-blue-300 " onClick={handleNavigate} > Visit Recordings  </button>
              </li>
            ))
          )

            : (
              <p>No Recordings Yet</p>
            )

          }

        </ul>




      </div>
    </div>
  );
};

export default VoiceRecorder;
