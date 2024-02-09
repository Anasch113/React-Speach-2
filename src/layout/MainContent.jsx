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
import { MdOndemandVideo } from "react-icons/md";
import { IoVideocamOffSharp } from "react-icons/io5";


function MainContent() {

  const [pdfContent, setPdfContent] = useState("");
  const [isDownloading, setIsDownloading] = useState(false); // New state variable
  const [isDownloadingtr, setIsDownloadingtr] = useState(false); // New state variable
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
 


  const myAudioFiles = useSelector((state) => state.audio.audioFiles);
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
      const pdfContent = generatePdfContent(); // Call a function to generate the PDF content
      await html2pdf(pdfContent, pdfOptions);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setIsDownloadingtr(false);
    }
  };
  const generatePdfContent = () => {
    return `
      <div class="py-20">
        ${transcriptionFiles.map((files, i) => `
          <div class="py-10" key=${i}>
            <div class="py-2">
              <p>Speaker A: ${files.speakerAUtterances.map((utterance) => utterance.text).join(" ")}</p>
              <p>Speaker B: ${files.speakerBUtterances.map((utterance) => utterance.text).join(" ")}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  };



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

  // Function to generate the PDF content dynamically


  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleString('en-US', options);
  };

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  };


  return (
    <main className="flex-1 overflow-x-hidden overflow-y-scroll bg-bg-color-light min-h-screen ">
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

          <div key={i} className="flex items-center justify-between bg-bg-color border border-border-dark-color my-2 px-7 p-5  rounded-md mx-4 gap-3">


            <div className="flex items-center text-text-color-blue flex-col gap-2">

              <div className="  flex items-center gap-3">
             
                <p className="text-2xl"> Notes</p>
                
               </div>
              


            </div>



            <button disabled={isDownloadingtr} className=" hover:bg-gray-200  bg-offWhite p-4 text-text-color-blue rounded-md w-fit" onClick={downloadPdf}>

              <span className="flex items-center gap-1"> <FaRegFilePdf /> {isDownloadingtr ? "Downloading..." : "Download File"}</span>
            </button>



          </div>
        ))
      ) : (
        <p></p>
      )}


      {/* live transcription */}

      <div className=" flex   flex-col gap-7 mx-4 my-4 p-5 px-7 bg-white border border-gray-300 rounded-md">
        <div className="flex flex-col gap-2">
          {myAudioFiles.length > 0 ? (
            myAudioFiles.map((audio, i) => (
              <div key={i} className="flex   flex-row justify-between gap-5">
                <div className="text-xl  flex items-center gap-5">
                  <p className="text-2xl"> Notes</p>
                </div>
               

                <button disabled={isDownloading} className="  bg-offWhite hover:bg-gray-200 p-4 text-text-color-blue rounded-md w-fit" onClick={() => downloadAudio(audio.text.cloudinaryFileUrl, `video_${i}.mp4`)}>

                  <span className="flex items-center gap-1"> <p>{isDownloading ? "Downloading..." : "Download Video"}</p>  <p><IoVideocamOffSharp /></p> </span>
                </button>

              </div>
            ))
          ) : (
            <p>No Audio & Video Files Yet</p>
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
