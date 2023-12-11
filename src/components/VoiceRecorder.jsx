import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStop, FaTrash, FaCheck } from "react-icons/fa";
import { BsRecordCircle } from "react-icons/bs";
import axios from "axios";

const VoiceRecorder = (
  {
    isRecording,
    setIsRecording,
    isPlaying,
    setIsPlaying,
    stopRecording,
    deleteAudio,
    startRecording,
    recordingTime,
    setRecordingTime,
    recordedAudios,
    togglePlayback,
    setRecordedAudios,
    transcription,
    setTranscriptionResult,
    mediaRecorder,  
    audioRef,
    submitAudio
  }
) => {
 

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 shadow-md rounded-md min-h-[50vh]">
      <div className="flex justify-center">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className="bg-blue-200 items-center hover:bg-blue-300 text-gray-800 space-x-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline flex"
        >
          <BsRecordCircle
            className={`${isRecording ? "text-red-500" : "text-black"}`}
          />
          <p>{isRecording ? "Recording" : "Start"}</p>
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="bg-red-200 flex items-center space-x-2 hover:bg-red-300 text-gray-800 py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
        >
          <FaStop />
          <p>Stop</p>
        </button>
        <button
          onClick={togglePlayback}
          disabled={!audioRef?.current?.src}
          className="bg-green-200 flex space-x-2 items-center hover:bg-green-300 text-gray-800 py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
          <p>{isPlaying ? "Pause" : "Play"}</p>
        </button>
      </div>

      <div className="mt-4 border-b-2">
        <span className="text-gray-600">{`Recording Time: ${recordingTime}s`}</span>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2 text-gray-800">
          Recorded Audios
        </h2>
        <ul>
          {recordedAudios.map((audio, index) => (
            <li key={index} className="mb-4">
              <div className="flex items-center">
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VoiceRecorder;
