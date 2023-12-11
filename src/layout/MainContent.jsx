// MainContent.jsx

import React, { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import RecordingAudio from "../components/RecordingAudio";
import { useSelector } from "react-redux";

function MainContent() {
  const audioFiles = useSelector((state) => state.audio.audioFiles);
  const [file, setFile] = useState();
  // const [fileContent, setFileContent] = useState([]);
  console.log(audioFiles);

  let fileContent = [];
  const UploadFile = async () => {
    console.log(starteds);
    for (let audio of audioFiles) {
      const content = `${audio.speaker}: ${audio.text}`;
      console.log(audio);
      fileContent.push(content);
    }

    console.log(fileContent);
    let file;
    if (fileContent.length > 0)
      file = new Blob([fileContent], { type: "text/plain" });
    // const url = URL.createObjectURL(file);
    // console.log(url);
    console.log(starteds);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "xguxdutu");
    data.append("cloud_name", "dgpwe8xy6");
    data.append("folder", "Transcription");
    data.append("quality", "auto:good"); // Set the desired quality level
    console.log(starteds);
    try {
      console.log(uploading);
      let response;
      response = await fetch(
        "https://api.cloudinary.com/v1_1/dgpwe8xy6/upload",
        {
          method: "post",
          body: data,
        }
      );
      const fileDate = await response.json();
      setFile(fileDate.secure_url);
      console.log(uploaded);
    } catch (err) {
      console.log(err);
    }
    console.log(file);
  };

  useEffect(() => {
    fileContent.length > 0 && UploadFile();
  }, []);
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-scroll bg-gray-200 lg:w-3/6">
      <div className="mx-12 my-6 p-4 bg-white border border-gray-300 rounded-md">
        <p className="text-2xl pb-1 font-semibold">Getting Started</p>
        <p>Learn the basics of using ... in just a few minutes! </p>
        <div className="my-4">
          <ProgressBar />
        </div>
      </div>

      <div className="mx-12">
        <p className="text-xl font-bold">Yesterday, 8pm, Dec 7</p>
      </div>

      <div className="mx-12 my-6 p-4 bg-white border border-gray-300 rounded-md">
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

      <div className="mx-12">
        <p className="text-xl font-bold">Live Transcription</p>
      </div>

      <div className="mx-12 my-4 p-4 bg-white border border-gray-300 rounded-md">
        {/* list of audio files */}
        <div className="flex flex-col gap-2">
          {audioFiles &&
            audioFiles.map((audio, i) => (
              <div key={i} className="flex items-center gap-2">
                <p>Speaker {audio.speaker}: </p>
                <p>{audio.text}</p>
              </div>
            ))}
        </div>
        {/* <RecordingAudio /> */}
      </div>
    </main>
  );
}

export default MainContent;
