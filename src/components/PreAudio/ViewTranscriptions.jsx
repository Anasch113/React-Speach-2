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
import EditModal from './EditModal';
import { CiShare2 } from "react-icons/ci";
import ShareModal from './ShareModal';
import { RiShareForwardLine } from "react-icons/ri";
import axios from "axios"
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomAudioPlayer from './CustomAudioPlayer';
import toast from 'react-hot-toast';
import DeleteModal from './DeleteModal';
const ViewTranscriptions = ({ filename }) => {
  // const location = useLocation();
  // const transcriptionsState = location.state?.transcriptions;
  // const filename = location.state?.filename;
  // console.log(transcriptions.utterances)
  // console.log(transcriptions.sentiment_analysis_results)
  // console.log(transcriptions)


  const { id } = useParams();
  console.log("id in view transcriptions", id)





  const contentRef = useRef(null)
  const srtRef = useRef(null)
  const updatedContentRef = useRef(null)
  const [isDownloadingtr, setIsDownloadingtr] = useState(false); // New state variable
  const [showSRT, setShowSRT] = useState(false);
  const [showSpeakerLables, setShowSpeakerLabels] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isAudioDownloading, setIsAudioDownloading] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  const [wordsIndex, setWordsIndex] = useState("");
  const [transcriptions, setTranscriptions] = useState("");
  const [shareLink, setShareLink] = useState('');
const navigate = useNavigate();




  useEffect(() => {

    const fetchSingleTranscription = async () => {

      const fetch = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/save/fetchSingleTranscription`, { id: id }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).catch((err) => {
        console.log("Error while fetching the transcription in view transcriptions", err)
      })
      setTranscriptions(fetch.data)


    }



    fetchSingleTranscription()

  }, [id])


  const downloadPdf = async () => {
    setShowSRT(false)
    setIsDownloadingtr(true);

    const pdfOptions = {
      margin: 5,

      filename: `${transcriptions.filename}.pdf`,
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

    const element = document.createElement("a");
    const content = generateSrtContent(); // Get text content of the div

    const file = new Blob([content], { type: "text/plain" }); // Create blob with text content
    element.href = URL.createObjectURL(file);
    element.download = `${transcriptions.filename}.srt`;
    document.body.appendChild(element); // Required for Firefox
    element.click();

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
    setShowSRT(false)
    const element = document.createElement("a");
    const content = contentRef.current.innerText; // Get text content of the div

    const file = new Blob([content], { type: "text/plain" }); // Create blob with text content
    element.href = URL.createObjectURL(file);
    element.download = `${transcriptions.filename}.txt`;
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
      link.download = transcriptions.filename
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



    const segments = transcriptions.sentimentAnalysisResults;

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

  const handleUpdateText = async (updatedText, index) => {

    const updatedSentiments = [...transcriptions.sentimentAnalysisResults]; // Copy the utterances array

    updatedSentiments[index].text = updatedText;
    setTranscriptions({ ...transcriptions, sentimentAnalysisResults: updatedSentiments });


    // Update the text in database
    await axios.put(`${import.meta.env.VITE_HOST_URL}/api/save/updatePreAudio`, { updatedSentimentAnalysisResults: updatedSentiments, id: transcriptions.id }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    toast.success("Text Updated Successfully")


    // Update the state with the new utterances array
    setShowModal(false); // Close the modal


    setUpdatedText(updatedText); // Set the updated text
  };

  const generateSrtContent = () => {
    let content = '';

    transcriptions.sentimentAnalysisResults.forEach((files, i) => {
      content += `
        ${i}
        ${files.start} --> ${files.end}
        ${files.text}
      `;
    });

    return content;
  };


  const deleteTranscription = async () => {

    try {
      await axios.delete(`${import.meta.env.VITE_HOST_URL}/api/save/deleteTranscription`, { data : {
        id: id
      } }
       
      )
      toast.success("File deleted")
      navigate("/pre-audio-transcriptions")
    } catch (error) {
      console.log("Error while deleting the transcription", error)
    }


  }


  return (

    <>
      <div className='w-full min-h-screen'>
        <div className='flex w-full'>

          <Sidebar />


          <div className=' md:w-full px-5 flex flex-col   gap-5  '>


            <div className='w-full flex p-5  gap-8'>




              <span className='flex border p-5 w-2/3  shadow-md flex-col h-[430px] overflow-y-scroll  gap-5 py-5 rounded-md bg-white '>

                <span className='flex flex-row  gap-2'>

                  <h1 className='text-3xl flex gap-3 font-bold font-poppins text-text-black'> {isEdit && <p>Edit</p>} {transcriptions && transcriptions.filename}</h1>
                </span>
                {isEdit && <p className='text-sm flex items-center gap-1 text-gray-500'><TiPencil /> Double tap on text to edit</p>}
                <div className='text-gray-600 font-roboto'>

                  {
                    <div ref={contentRef}>

                      {
                        transcriptions && transcriptions.sentimentAnalysisResults.map((sentiment, i) => {
                          // Find the utterance that corresponds to the current sentiment
                          const utterance = transcriptions.utterances.find(u =>
                            u.start <= sentiment.start && u.end >= sentiment.end
                          );

                          // Render the sentiment along with the speaker label if found
                          return (
                            <div className="w-full py-2" key={i}>
                              {showSRT && (
                                <div>
                                  <p>{i}</p>
                                  <p>{sentiment.start} -- {sentiment.end}</p>
                                </div>
                              )}
                              <span className="flex gap-2">
                                {utterance && <p className=''>{`Speaker: ${utterance.speaker}`}</p>}
                                <p
                                  style={{ color: i === wordsIndex ? '#f1b900' : 'black' }}
                                  className={`${isEdit ? "hover:text-blue-500 hover:cursor-pointer" : ""}`}
                                  onClick={() => isEdit && handleTextClick(sentiment.text, i)}
                                >
                                  {sentiment.text}
                                </p>

                              </span>
                            </div>
                          );
                        })
                      }
                    </div>

                  }

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

                    <span onClick={() => setShowDeleteModal(true)} className='hover:bg-bg-hover-color rounded-md p-4 flex items-center gap-3 cursor-pointer mb-2'>
                      <RiDeleteBin6Line size={25} /> Delete File
                    </span>

                    {
                      isOpenEditModal && <ShareModal generateShareLink={generateShareLink} isOpenEditModal={isOpenEditModal} shareLink={shareLink} setIsOpenEditModal={setIsOpenEditModal} />
                    }

                    {
                      showDeleteModal && <DeleteModal deleteTranscript={deleteTranscription} setShowDeleteModal={setShowDeleteModal} filename ={transcriptions.filename}/>
                    }




                  </div>
                </div>

              </div>
            </div>


            <div className='w-full bg-white p-5 items-center  mt-20 flex flex-col  gap-2 rounded-md'>
              <p className='text-center font-semibold text-text-black font-poppins'>{transcriptions.filename}</p>
              {
                transcriptions && <div className='w-full flex items-center justify-center self-end'>

                  <CustomAudioPlayer calculateHighlightedIndex={calculateHighlightedIndex} audioUrl={transcriptions.audio_url} transcriptions={transcriptions} />
                </div>
              }



            </div>



          </div>
        </div>
      </div>
    </>
  )
}

export default ViewTranscriptions
