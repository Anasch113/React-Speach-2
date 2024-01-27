// MainContent.jsx

import React, { useEffect, useState, useRef } from "react";
import ProgressBar from "../components/ProgressBar";

import { useSelector } from "react-redux";
import LiveTranscription from "../components/LiveTranscription";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { CiCalendar } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { PiNewspaperClippingBold } from "react-icons/pi";
import { FaRegFilePdf } from "react-icons/fa6";

function MainContent() {

  const [pdfContent, setPdfContent] = useState("");
  const [isDownloading, setIsDownloading] = useState(false); // New state variable
  const [isDownloadingtr, setIsDownloadingtr] = useState(false); // New state variable
  const [currentDateTime, setCurrentDateTime] = useState(new Date());


  const myAudioFiles = useSelector((state) => state.audio.audioFiles)
  const transcriptionFiles = useSelector((state) => state.audio.typesTranscriptionFiles);


  const pdfContainer = useRef(null);

  const downloadPdf = async () => {
    setIsDownloadingtr(true);

    const pdfOptions = {
      margin: 10,
      filename: "combined_transcription.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    try {
      await html2pdf(pdfContainer.current, pdfOptions);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setIsDownloadingtr(false);
    }
  }

  const downloadAudio = async (url, filename) => {
    setIsDownloading(true);

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");

      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.target = "_blank"; // Add this line to open in a new tab or window

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading audio:", error);
    } finally {
      setIsDownloading(false);
    }
  };



  useEffect(() => {
    // Update the current date and time every second (1000 milliseconds)
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount



  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleString('en-US', options);
  };

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  };


  return (
    <main className="flex-1 overflow-x-hidden overflow-y-scroll bg-bg-color-light ">
      <div className="flex flex-col gap-3 mx-4 my-6 p-10 text-text-color-blue bg-white border border-border-dark-color rounded-md">
        <p className="text-2xl pb-1 text-text-color-blue font-semibold">Getting Started</p>
        <p>Learn the basics of using ... in just a few minutes! </p>
        <div className="my-4">
          <ProgressBar />
        </div>
      </div>

      <div className="flex px-7 py-4  gap-4 text-text-gray-official   max-[500px]:gap-1 max-[500px]:flex-col max-[500px]:items-start">
        <span className="flex gap-2 items-center text-2xl font-semibold ">

          <p>{formatDate(currentDateTime)}</p>
        </span>

      </div>




      {transcriptionFiles.length > 0 ? (
            transcriptionFiles.map((files, i) => (
      <div className="flex items-cente flex-col bg-bg-color border border-border-dark-color p-5  rounded-md mx-4 gap-3">

<div className="flex text-text-color-blue flex-col gap-1">
<p className="text-xl">Notes</p>
<p>27, Jan 2024</p>
</div>
        
       

        <div  ref={pdfContainer} className="hidden py-2 flex-col ">
                  <p>Speaker A: {files.speakerAUtterances.map((utterance) => utterance.text).join(" ")}{" "}</p>
                  <p>Speaker B:  {files.speakerBUtterances.map((utterance) => utterance.text).join(" ")}{" "}</p>
                </div>
       
         
          <button disabled={isDownloadingtr} className="  bg-offWhite p-4 text-text-color-blue rounded-md w-fit" onClick={downloadPdf}>

          <span className="flex items-center gap-1"> <FaRegFilePdf /> {isDownloadingtr ? "Downloading..." : "Download File"}</span>  
          </button>
       


      </div>
     ))
          ) : (
            <p></p>
          )} 


      {/* live transcription */}




      <div className=" flex  flex-col gap-7 mx-4 my-4 p-4 bg-white border border-gray-300 rounded-md">
        <div className="flex flex-col gap-2">
          {myAudioFiles.length > 0 ? (
            myAudioFiles.map((audio, i) => (
              <div key={i} className="flex   flex-col gap-5">
                <div className="flex items-center gap-2">

                  <audio controls type="audio/webm" src={audio.text.cloudinaryFileUrl}></audio>
                </div>




                <button
                  className="ml-16 self-start py-2 px-4 bg-blue-500 text-white rounded-full w-fit"
                  onClick={() => downloadAudio(audio.text.cloudinaryFileUrl, `video_${i}.mp4`)}
                  disabled={isDownloading}
                >
                  {isDownloading ? "Downloading..." : "Download Video"}
                </button>

              </div>
            ))
          ) : (
            <p>No Audio Files Yet</p>
          )}
        </div>
        {/* list of audio files */}
        <div className="flex flex-col gap-2">
          {transcriptionFiles.length > 0 ? (
            transcriptionFiles.map((file, i) => (
              <div className="flex items-center gap-2">
                <span className="py-1 px-3 text-white bg-slate-400 rounded-md">
                  {i + 1}
                </span>


              </div>
            ))
          ) : (
            <p>No Transcription Files Yet</p>
          )}
        </div>
        {/* list of audio files */}




        {/* <RecordingAudio /> */}
        {/* <LiveTranscription /> */}

      </div>
    </main>
  );
}

export default MainContent;
