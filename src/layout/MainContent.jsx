// MainContent.jsx

import React, { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import RecordingAudio from "../components/RecordingAudio";
import { useSelector } from "react-redux";
import LiveTranscription from "../components/LiveTranscription";

function MainContent() {
  const files = useSelector((state) => state.audio.transcriptFiles);
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-scroll bg-gray-200 lg:w-3/6">
      <div className="mx-4 my-6 p-4 bg-white border border-gray-300 rounded-md">
        <p className="text-2xl pb-1 font-semibold">Getting Started</p>
        <p>Learn the basics of using ... in just a few minutes! </p>
        <div className="my-4">
          <ProgressBar />
        </div>
      </div>

      <div className="mx-4">
        <p className="text-xl font-bold">Yesterday, 8pm, Dec 7</p>
      </div>

      <div className="mx-4 my-6 p-4 bg-white border border-gray-300 rounded-md">
        <div>
          <p className="text-xl font-semibold">
            Muhammad Nauman meeting's Notes
          </p>
          <span className="text-xs">1:26 am 20 min Muhammad Nauman</span>
        </div>

        <div>
          <p>hello how are You? hello how are You?hello how are You? </p>
        </div>
      </div>
      {/* live transcription */}

      <div className="mx-4">
        <p className="text-xl font-bold">Transcription Files</p>
      </div>

      <div className="mx-4 my-4 p-4 bg-white border border-gray-300 rounded-md">
        {/* list of audio files */}
        <div className="flex flex-col gap-2">
          {files.length > 0 ? (
            files.map((file, i) => (
              <div className="flex items-center gap-2">
                <span className="py-1 px-3 text-white bg-slate-400 rounded-md">
                  {i + 1}
                </span>
                <a
                  href={file.fileUrl}
                  key={i}
                  className="py-2 px-4 bg-blue-500 text-white rounded-full w-fit"
                >
                  Click to download File
                </a>
              </div>
            ))
          ) : (
            <p>No Transcription Files Yet</p>
          )}
        </div>
        {/* <div className="flex flex-col gap-2">
          {audioFiles &&
            audioFiles.map((audio, i) => (
              <div key={i} className="flex items-center gap-2">
                <p>Speaker {audio.speaker}: </p>
                <p>{audio.text}</p>
              </div>
            ))}
        </div> */}
        {/* <RecordingAudio /> */}
        <LiveTranscription />
      </div>
    </main>
  );
}

export default MainContent;
