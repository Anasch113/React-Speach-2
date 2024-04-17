import React from 'react'
import { useLocation } from "react-router-dom";
import Sidebar from '../../layout/Sidebar';
import { FaRegFilePdf } from "react-icons/fa6";
import { BsFiletypeDocx } from "react-icons/bs";
import { BsFiletypeTxt } from "react-icons/bs";
import { LuSubtitles } from "react-icons/lu";
import html2pdf from "html2pdf.js";
import { useState, useRef } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import EditModal from './EditModal';
import { CiShare2 } from "react-icons/ci";
import ShareModal from './ShareModal';
import { RiShareForwardLine } from "react-icons/ri";
import axios from "axios"


import { Packer, Document, Paragraph } from "docx";
import CustomAudioPlayer from './CustomAudioPlayer';
const ViewTranscriptions = ({ transcriptions, filename, subtitle, setTranscriptions }) => {
  // const location = useLocation();
  // const transcriptionsState = location.state?.transcriptions;
  // const filename = location.state?.filename;
  console.log(transcriptions.utterances)
  console.log("transcriptions.sentiment_analysis_results", transcriptions.sentiment_analysis_results)

  console.log(subtitle)




  const contentRef = useRef(null)
  const srtRef = useRef(null)
  const updatedContentRef = useRef(null)
  const [isDownloadingtr, setIsDownloadingtr] = useState(false); // New state variable
  const [showSRT, setShowSRT] = useState(false);
  const [showSpeakerLables, setShowSpeakerLabels] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isAudioDownloading, setIsAudioDownloading] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  const [wordsIndex, setWordsIndex] = useState("");

  const [shareLink, setShareLink] = useState('');


  const downloadPdf = async () => {
    setIsDownloadingtr(true);

    const pdfOptions = {
      margin: 5,

      filename: `${filename}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },

    };
    try {
      await html2pdf(contentRef.current, pdfOptions);
    } catch (error) {
      console.log(error)
    }

    setIsDownloadingtr(false);

  };





  const downloadSrtFile = () => {
    // Check if subtitles are available
    if (!subtitle) {
      console.error("No subtitles available to download.");
      return;
    }
    setIsDownloadingtr(true);
    // Create a Blob object containing the subtitles
    const content = srtRef.current.text
    const srtBlob = new Blob([content], { type: "text/plain" });

    // Create a temporary URL for the Blob
    const srtUrl = URL.createObjectURL(srtBlob);

    // Create a link element
    const link = document.createElement("a");
    link.href = srtUrl;
    link.download = `${filename}.srt`; // Set the filename for the download

    // Append the link to the document body and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up: Remove the link and revoke the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(srtUrl);
    setIsDownloadingtr(false);
  };

  const handleToggleSRT = () => {
    console.log("Before toggle:", showSRT); // Log current state before toggle
    setShowSRT(!showSRT); // Toggle the value of showSRT
    console.log("After toggle:", showSRT); // Log current state after toggle
  };





  const handleModalClose = () => {
    setShowModal(false);
  };

  const downloadTxt = () => {
    const element = document.createElement("a");
    const content = contentRef.current.innerText; // Get text content of the div

    const file = new Blob([content], { type: "text/plain" }); // Create blob with text content
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.txt`;
    document.body.appendChild(element); // Required for Firefox
    element.click();
  };






  const downloadAudio = async () => {


    try {
      setIsAudioDownloading(true)
      const response = await fetch(transcriptions.audio_url)
      const blob = await response.blob();
      const link = document.createElement('a');

      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      link.target = ("_blank")

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link);
      setIsAudioDownloading(false)



    } catch (error) {
      console.log("Erro while downloading the audio", error)
    }


  }


  const calculateHighlightedIndex = (currentTime) => {
    currentTime *= 1000;
    console.log("currentTime", currentTime)
    // Get the segment analysis results from the transcriptions state
    // const segments = transcriptions.sentiment_analysis_results;

    if (transcriptions.utterances.length === 1) {
      const segments = transcriptions.sentiment_analysis_results;

      console.log(segments)
      // Iterate through each segment to find the one that matches the current time
      for (let i = 0; i < segments.length; i++) {
        // Extract start and end times of the current segment
        const { start, end } = segments[i];
        console.log("start", start)
        console.log("end", end)
        // Check if the current time falls within the duration of this segment
        if (currentTime >= start && currentTime <= end) {
          setWordsIndex(i)
          // If matched, return the index
          return i;
        }
      }

      // If no match found, return -1
      return -1;
    }
    else {
      const segments = transcriptions.utterances;
      console.log(segments)
      // Iterate through each segment to find the one that matches the current time
      for (let i = 0; i < segments.length; i++) {
        // Extract start and end times of the current segment
        const { start, end } = segments[i];
        console.log("start", start)
        console.log("end", end)
        // Check if the current time falls within the duration of this segment
        if (currentTime >= start && currentTime <= end) {
          setWordsIndex(i)
          // If matched, return the index
          return i;
        }
      }

      // If no match found, return -1
      return -1;
    }



  };
  console.log("wordsIndex", wordsIndex)




  const generateShareLink = () => {
    setIsOpenEditModal(true)
    const transcriptText = encodeURIComponent(transcriptions.text);
    const baseUrl = `${import.meta.env.VITE_HOST_URL}`; // Replace with your server base URL
    const shareEndpoint = '/share/transcript';

    axios.get(`${baseUrl}${shareEndpoint}?text=${transcriptText}`)
      .then(response => {
        const link = response.data; // Assuming your server sends back the generated link directly
        setShareLink(link);
      })
      .catch(error => {

      });
  };


  const handleTextClick = (text, index) => {

    setSelectedText({ text, index });
    setShowModal(true);
  };

  const handleUpdateText = (updatedText, index) => {

    const updatedUtterances = [...transcriptions.utterances]; // Copy the utterances array

    if (transcriptions.utterances.length === 1) {
      const sentences = updatedUtterances[0].text.split('.');

      sentences[index] = updatedText;
      updatedUtterances[0].text = sentences.join('.');
      setTranscriptions({ ...transcriptions, utterances: updatedUtterances });


    }
    else {
      updatedUtterances[index].text = updatedText;
      setTranscriptions({ ...transcriptions, utterances: updatedUtterances });
    }

    // Update the text of the specific utterance



    // Update the state with the new utterances array
    setShowModal(false); // Close the modal

    console.log("updated utterances", updatedUtterances)
    setUpdatedText(updatedText); // Set the updated text
  };


  return (




    <div className=' md:w-full px-5 flex flex-col   gap-5  '>


      <div className='w-full flex p-5  gap-8'>




        <span className='flex border p-5 w-2/3  shadow-md flex-col h-[430px] overflow-y-scroll  gap-5 py-5 rounded-md bg-white '>

          <span className='flex flex-row  gap-2'>

            <h1 className='text-3xl flex gap-3 font-bold font-poppins text-text-black'> {isEdit && <p>Edit</p>} {filename && filename}</h1>
          </span>
          {isEdit && <p className='text-sm flex items-center gap-1 text-gray-500'><TiPencil /> Double tap on text to edit</p>}
          <div className='text-gray-600 font-roboto'>

            {



              showSRT ? (subtitle.split('\n').map((subtitle, index) => (
                <p ref={contentRef} onClick={() => isEdit && handleTextClick(subtitle)} className='py-2' key={index}>{subtitle}</p>
              ))) :

              <div ref={contentRef}>
                {
                  transcriptions.utterances.map((files, i) => (

                    <div className={`w-full  py-3  `} key={i}>
{/* 
                      {
                        showSRT &&

                        <span ref={srtRef}>
                          <p>{i}</p>
                          <p className='my-5'>{`${files.start}`} -- {`${files.end}`}</p>
                        </span>
                      } */}

                      <span className='flex gap-2 flex-wrap'>
                        <span className='flex gap-1 text-gray-500 font-medium'>  <p >Speaker</p>  <p >{files.speaker}: </p> </span>

                        {transcriptions.utterances.length === 1 && i === 0 ? (
                          // If there is only one index, split the text into sentences
                          files.text.split('.').map((sentence, index) => (
                            <span className='flex flex-col'>
                              <p
                                style={{ color: index === wordsIndex ? '#f1b900' : 'black' }}
                                key={index}
                                className={` ${isEdit ? " hover:cursor-pointer hover:text-blue-500" : ""}`}
                                onClick={() => isEdit && handleTextClick(sentence.trim(), index)}
                              >
                                {sentence.trim()}
                              </p>
                            </span>
                          ))
                        ) : (
                          // If there are more than one index, display the text as is
                          <p
                            style={{ color: i === wordsIndex ? '#f1b900' : 'black' }}
                            className={` ${isEdit ? "hover:text-blue-500  hover:cursor-pointer" : ""}`}
                            onClick={() => isEdit && handleTextClick(files.text, i)}
                          >
                            {files.text}
                          </p>
                        )}

                      </span>
                    </div>
                  ))
                }
              </div>

            }
            {/* <div>
              {
                transcriptions.utterances.map((files, i) => (
                  <div className='p-2' key={i}>
                    <span className='flex gap-2'>
                      <span className='flex gap-1 text-gray-500 font-medium'> <p >Speaker</p>  <p >{files.speaker}: </p> </span>
                      <p>{files.text}</p>
                    </span>
                  </div>
                ))
              }
            </div> */}



          </div>


          {showModal && (
            <EditModal
              selectedText={selectedText}
              onClose={handleModalClose}
              onUpdateText={handleUpdateText}
            />
          )}

        </span>


        <div className='w-60 bg-white h-[430px] py-5  flex items-center justify-center shadow-md  border overflow-y-scroll rounded-md '>

          <div className='flex px-3  items-start h-full  w-full flex-col '>
            <h2 className='text-lg font-semibold text-text-black my-4 mt-5'>Export</h2>

            <div className='flex flex-col items-center justify-center gap-2'>

              <button onClick={downloadPdf} className=' hover:bg-bg-hover-color rounded-md p-4'>
                <span className='flex items-center text-text-black    gap-2'>
                  <FaRegFilePdf size={25} />
                  Download PDF
                </span>

              </button>
              <button onClick={downloadTxt} className=' hover:bg-bg-hover-color rounded-md p-4'>
                <span className='flex items-center text-text-black  gap-2 '>
                  <BsFiletypeTxt size={25} />
                  Download TXT
                </span>

              </button>
              <button className=' hover:bg-bg-hover-color rounded-md p-4'>
                <span className='flex items-center text-text-black  gap-2 '>
                  <BsFiletypeDocx size={25} />
                  Download DOCX
                </span>

              </button>
              <button onClick={downloadSrtFile} className=' hover:bg-bg-hover-color rounded-md p-4'>
                <span className='flex items-center text-text-black  gap-2 '>
                  <LuSubtitles size={25} />
                  Download SRT
                </span>

              </button>
              <div className='flex self-start'>
                <h2 className='text-lg font-semibold text-text-black'>More</h2>
              </div>

              <label className="inline-flex items-center my-2">
                <input
                  type="checkbox"
                  className="form-checkbox w-4 h-4"
                  checked={showSRT}
                  onChange={handleToggleSRT}
                />
                <span className="ml-2 font-medium">Show TimeStamps</span>
              </label>


              <span onClick={() => setIsEdit(!isEdit)} className=' flex items-center gap-2 cursor-pointer hover:bg-bg-hover-color rounded-md p-4'>
                <MdOutlineModeEditOutline size={25} /> {isEdit ? <p>Done Editing</p> : <p>Edit Transcript</p>}
              </span>

              <span onClick={downloadAudio} className='hover:bg-bg-hover-color rounded-md p-4 flex items-center gap-2 cursor-pointer'>
                <MdOutlineCloudUpload size={25} />  {!isAudioDownloading ? <p>Download Audio</p> : <p>Downloading...</p>}
              </span>

              <span onClick={generateShareLink} className='hover:bg-bg-hover-color rounded-md p-4 flex items-center gap-3 cursor-pointer mb-2'>
                <RiShareForwardLine size={25} /> Share Transcript
              </span>

              {
                isOpenEditModal && <ShareModal generateShareLink={generateShareLink} isOpenEditModal={isOpenEditModal} shareLink={shareLink} setIsOpenEditModal={setIsOpenEditModal} />
              }




            </div>
          </div>

        </div>
      </div>


      <div className='w-full bg-white p-5 items-center  mt-20 flex flex-col  gap-2 rounded-md'>
        <p className='text-center font-semibold text-text-black font-poppins'>{filename}</p>

        <div className='w-full flex items-center justify-center self-end'>
          <CustomAudioPlayer calculateHighlightedIndex={calculateHighlightedIndex} audioUrl={transcriptions.audio_url} transcriptions={transcriptions} />
        </div>


      </div>



    </div>

  )
}

export default ViewTranscriptions
