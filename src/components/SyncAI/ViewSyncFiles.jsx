import React from 'react'
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from '../../layout/Sidebar';
import { FaRegFilePdf } from "react-icons/fa6";
import { BsFiletypeDocx } from "react-icons/bs";
import { BsFiletypeTxt } from "react-icons/bs";
import { LuSubtitles } from "react-icons/lu";
import html2pdf from "html2pdf.js";
import { useState, useRef, useEffect } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { TiPencil } from "react-icons/ti";

import { CiShare2 } from "react-icons/ci";

import { RiShareForwardLine } from "react-icons/ri";
import axios from "axios"
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomAudioPlayer from "../PreAudio/CustomAudioPlayer"
import toast from 'react-hot-toast';

import { useLocation } from 'react-router-dom';
const ViewSyncFiles = () => {
  const location = useLocation();
  // const transcriptionsState = location.state?.transcriptions;
  // const filename = location.state?.filename;
  // console.log(transcriptions.utterances)
  // console.log(transcriptions.sentiment_analysis_results)
  // console.log(transcriptions)

  const { data, file, cloudUrl } = location.state || {}

  console.log("file in viewSync", file)
  console.log("cloud urls in viewSync", cloudUrl)

  console.log("Sync file data: ", data.monologues)
  const contentRef = useRef(null)

  const [isDownloadingtr, setIsDownloadingtr] = useState(false); // New state variable
  const [showSRT, setShowSRT] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const [wordsIndex, setWordsIndex] = useState("");
  const [transcriptions, setTranscriptions] = useState("");

  const navigate = useNavigate();






  const downloadSrtFile = () => {

    const element = document.createElement("a");
    const content = contentRef.current.innerText; // Get text content of the div

    const file = new Blob([content], { type: "text/plain" }); // Create blob with text content
    element.href = URL.createObjectURL(file);
    element.download = `${transcriptions.filename}.srt`;
    document.body.appendChild(element); // Required for Firefox
    element.click();

  };

  const generateSrtContent = () => {
    let content = '';

    data.monologues.forEach((files, i) => {

      files.elements.forEach((files, i) => {
        content += `
        ${i}
        ${files.ts} --> ${files.end_ts}
        ${files.value}
      `;
      })

    });

    return content;
  };

  const handleToggleSRT = () => {
    console.log("Before toggle:", showSRT); // Log current state before toggle
    setShowSRT(!showSRT); // Toggle the value of showSRT
    console.log("After toggle:", showSRT); // Log current state after toggle
  };

  const calculateHighlightedIndex = (currentTime) => {
    console.log("currentTime", currentTime);

    const segments = data.monologues.map((data) => data.elements);

    // Iterate through each segment array
    for (let i = 0; i < segments.length; i++) {
      const segmentArray = segments[i];

      // Iterate through each segment object in the array
      for (let j = 0; j < segmentArray.length; j++) {
        const segment = segmentArray[j];

        // Extract start and end times of the current segment
        const { ts, end_ts } = segment;
        console.log("start", ts);
        console.log("end", end_ts);

        // Check if the current time falls within the duration of this segment
        if (currentTime >= ts && currentTime <= end_ts) {
          setWordsIndex(j);
          // If matched, return the index
          return i;
        }
      }
    }

    // If no match found, return -1
    return -1;
  };


  console.log("wordsIndex", wordsIndex)


  const handleTextClick = (text, index) => {

    setSelectedText({ text, index });
    setShowModal(true);
  };

  return (

    <>
      <div className='w-full min-h-screen'>
        <div className='flex w-full'>

          <Sidebar />


          <div className=' md:w-full px-5 flex flex-col   gap-5  '>


            <div className='w-full flex p-5  gap-8'>




              <span className='flex border p-5 w-2/3  shadow-md flex-col h-[430px] overflow-y-scroll  gap-5 py-5 rounded-md bg-white '>

                <span className='flex flex-row  gap-2'>

                  <span className='text-2xl flex gap-3 font-bold font-poppins text-text-black'> ReSyncing <p>{file && file.audio.name}</p>  + <p>{file && file.transcript.name}</p>  </span>
                </span>

                <div className='text-gray-600 font-roboto'>

                  {
                    <div className='w-full' ref={contentRef}>

                      {
                        data && data.monologues.map((data, i) => (

                          // Render the sentiment along with the speaker label if found

                          <div className="w-full py-2" key={i}>
                            <p>speaker: {data.speaker}</p>
                            {
                              data.elements.map((words, i) => (
                                // Check if words.value is not an empty string
                                words.value.trim() !== "" && (
                                  <div className='flex flex-col gap-2 w-80' key={i}>
                                    <p>{words.ts} -- {words.end_ts}</p>
                                    <p style={{ color: i === wordsIndex ? '#f1b900' : 'black' }}>{words.value}</p>
                                  </div>
                                )
                              ))
                            }

                            {/* <span className="flex gap-2">
                              
                                <p
                                  style={{ color: i === wordsIndex ? '#f1b900' : 'black' }}
                                  className={`${isEdit ? "hover:text-blue-500 hover:cursor-pointer" : ""}`}
                                  onClick={() => isEdit && handleTextClick(sentiment.text, i)}
                                >
                                  {sentiment.text}
                                </p>

                              </span> */}
                          </div>

                        ))
                      }
                    </div>

                  }

                </div>



              </span>


              <div className='w-60 bg-white h-[430px] py-5  flex items-center justify-center shadow-md  border overflow-y-scroll rounded-md '>

                <div className='flex px-3  items-start h-full  w-full flex-col '>
                  <h2 className='text-lg font-semibold text-text-black my-4 mt-5'>Export</h2>

                  <div className='flex flex-col items-center justify-center gap-2'>




                    <button onClick={downloadSrtFile} className=' hover:bg-bg-hover-color rounded-md p-4'>
                      <span className='flex items-center text-text-black  gap-2 '>
                        <LuSubtitles size={25} />
                        Download SRT
                      </span>

                    </button>


                    {/* <label className="inline-flex items-center my-2">
                      <input
                        type="checkbox"
                        className="form-checkbox w-4 h-4"
                        checked={showSRT}
                        onChange={handleToggleSRT}
                      />
                      <span className="ml-2 font-medium">Show TimeStamps</span>
                    </label> */}

                  </div>
                </div>

              </div>
            </div>


            <div className='w-full bg-white p-5 items-center  mt-20 flex flex-col  gap-2 rounded-md'>
              <p className='text-center font-semibold text-text-black font-poppins'>{file && file.audio.name}</p>
              {
                data && <div className='w-full flex items-center justify-center self-end'>

                  <CustomAudioPlayer calculateHighlightedIndex={calculateHighlightedIndex} audioUrl={cloudUrl.audio} data={data} />
                </div>
              }



            </div>



          </div>
        </div>
      </div>
    </>
  )
}

export default ViewSyncFiles
