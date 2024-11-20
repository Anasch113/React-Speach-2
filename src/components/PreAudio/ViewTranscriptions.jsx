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
import { Button } from '../ui/button';
import ConfirmationBox from './HumanTranscription/ConfirmationBox';
import { useUserAuth } from '@/context/UserAuthContext';
import { MdOutlinePendingActions } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import NotificationPage from './HumanTranscription/NotificationPage';
import { ref, onValue, update } from "firebase/database"
import { database } from '../../firebase'
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
const ViewTranscriptions = ({ filename }) => {
  // const location = useLocation();
  // const transcriptionsState = location.state?.transcriptions;
  // const filename = location.state?.filename;
  // console.log(transcriptions.utterances)
  // console.log(transcriptions.sentiment_analysis_results)
  // console.log(transcriptions)


  const { id } = useParams();
  const { user, userBalance } = useUserAuth()
  console.log("id in view transcriptions", id)





  const contentRef = useRef(null)



  const [showSRT, setShowSRT] = useState(false);
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
  const [isHtSend, setIsHtSend] = useState(false)
  const [htStatus, setHtStatus] = useState('')
  const [humanTranscript, setHumanTranscript] = useState({})
  const [reloadLoading, setReloadLoading] = useState(false)
  const [cost, setCost] = useState(0)
  const [transcriptDuration, setTranscriptDuration] = useState(0)


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
      const transcription = fetch.data;
      setTranscriptions(fetch.data)

      const duration = transcription.audio_duration
      const roundedDuration = (duration / 60).toFixed(1);
      setTranscriptDuration(roundedDuration)
      const cost = (roundedDuration * 0.5).toFixed(2);
      setCost(cost)

    }



    fetchSingleTranscription()

  }, [id])
  console.log("cost and duration of human transcript:", cost, transcriptDuration)


  const downloadPdf = async () => {
    if (!transcriptions || !transcriptions.sentimentAnalysisResults) {
      alert("No data available to download!");
      return;
    }

    const doc = new jsPDF();
    const fontSize = 12;
    doc.setFontSize(fontSize);

    // Add a title
    doc.text("Transcription Sentiment Analysis", 10, 10);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);

    let y = 20; // Vertical position for text
    const pageHeight = doc.internal.pageSize.height - 10; // Leave some margin

    transcriptions.sentimentAnalysisResults.forEach((sentiment, i) => {
   
      const sentimentText = sentiment.text;

      // Add speaker text
      doc.setFont("Helvetica", "bold");
     

      y += 4; // Increment vertical position

      // Add sentiment text
      doc.setFont("Helvetica", "normal");
      const textLines = doc.splitTextToSize(sentimentText, 180); // Wrap text to fit the page width
      textLines.forEach((line) => {
        if (y > pageHeight) {
          doc.addPage();
          y = 10; // Reset vertical position for new page
        }
        doc.text(line, 10, y);
        y += 7;
      });

      y += 2; // Add extra spacing between entries
    });

    // Save the PDF with a dynamic filename
    doc.save(`${transcriptions.filename || "transcriptions"}_sentiment_analysis.pdf`);



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

  const downloadTranscriptionsDOCX = () => {
    if (!transcriptions || !transcriptions.sentimentAnalysisResults) {
      alert("No data available to download!");
      return;
    }
  
    // Create a title paragraph
    const title = new Paragraph({
      children: [
        new TextRun({
          text: "Transcription Sentiment Analysis",
          bold: true,
          size: 28, // Font size (14pt)
        }),
      ],
      spacing: { after: 300 }, // Space after the title
    });
  
    // Map transcription results into paragraphs
    const content = transcriptions.sentimentAnalysisResults.map((sentiment, i) => {
      // Speaker label
      // const speaker = new Paragraph({
      //   children: [
      //     new TextRun({
      //       text: `Speaker ${i + 1}:`,
      //       bold: true,
      //       size: 24,
      //     }),
      //   ],
      //   spacing: { after: 200 }, // Space after the speaker
      // });
  
      // Sentiment text
      const text = new Paragraph({
        children: [
          new TextRun({
            text: sentiment.text,
            size: 22,
          }),
        ],
        spacing: { after: 300 }, // Space after the sentiment
      });
  
      return [ text];
    });
  
    // Flatten the array of paragraphs
    const paragraphs = [title, ...content.flat()];
  
    // Create a document with the correctly structured sections
    const doc = new Document({
      creator: "YourAppName", // Optional metadata
      title: "Transcription Sentiment Analysis",
      description: "Generated transcription with sentiment analysis results",
      sections: [
        {
          properties: {}, // Section properties (e.g., margins) can be defined here
          children: paragraphs, // Add paragraphs to this section
        },
      ],
    });
  
    // Generate the DOCX file and trigger the download
    Packer.toBlob(doc).then((blob) => {
      saveAs(
        blob,
        `${transcriptions.filename || "transcriptions"}_sentiment_analysis.docx`
      );
    });
  };

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

  // function to generate the srt content
  const generateSrtContent = () => {
    let content = '';

    transcriptions.sentimentAnalysisResults.forEach((file, i) => {
      content += `${i + 1}\n${convertToSrtTime(file.start)} --> ${convertToSrtTime(file.end)}\n${file.text}\n\n`;
    });

    return content;
  };

  // function to convert timestamps into correct srt format timestamps
  const convertToSrtTime = (milliseconds) => {
    const pad = (num, size) => ('000' + num).slice(size * -1);
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millis = milliseconds % 1000;
    return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)},${pad(millis, 3)}`;
  };




  const deleteTranscription = async () => {

    try {
      await axios.delete(`${import.meta.env.VITE_HOST_URL}/api/save/deleteTranscription`, {
        data: {
          id: id
        }
      }

      )
      toast.success("File deleted")
      navigate("/pre-audio-transcriptions")
    } catch (error) {
      console.log("Error while deleting the transcription", error)
    }


  }
  console.log("transcriptions:", transcriptions)


  // >>>>>>>>>>>>>>>>>>>>> Human Transcript code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  const handleHumanTranscript = async (event) => {





    event.preventDefault();



    try {

      if (cost > 0 && cost > userBalance) {
        toast.error("Insufficient credit, Please buy more credit ")


        return
      }
      const chunkSize = 1024 * 1024; // 1MB chunks
      const chunks = [];

      // Send each chunk to the server sequentially

      const body = {
        id: transcriptions.id,
        audio_url: transcriptions.audio_url,
        status: "Pending",
        audio_duration: transcriptions.audio_duration,

        sentimentAnalysisResults: transcriptions.sentimentAnalysisResults,

        userId: user.uid,
        filename: filename,
        userName: user.displayName,
        email: user.email
      };
      await axios.post(`${import.meta.env.VITE_HOST_URL}/ht/send`, body, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Update user balance in Firebase
      const newBalance = userBalance - cost; // Assuming `cost` is the transcription cost in state
      await update(ref(database, `users/${user.uid}/credit-payment`), {
        balance: newBalance
      });

      toast.success("Transcriptions send for Human Transcribing")

      setIsHtSend(true)
      console.log("Transcription data sent successfully in chunks for human transcription");
      window.location.reload()


    } catch (error) {
      console.log("Error in Human Transcription", error);
      throw new Error("Error while human transcriptions");
    }
  };


  useEffect(() => {

    const fetchTranscriptions = async () => {


      try {
        setReloadLoading(true)


        const body = {
          id: id
        }


        const response = await axios.post
          (`${import.meta.env.VITE_HOST_URL}/ht/fetch`, body

            , {
              headers: {
                "Content-Type": "application/json"
              }
            })

        console.log("ht data:", response)
        const data = response.data
        setHumanTranscript(data.transcript)

        setReloadLoading(false)
        setHtStatus(data.transcript.status)


      } catch (error) {
        console.log("error while fetching the human transcriptions", error)
      }

    }

    fetchTranscriptions()

  }, [])
  console.log("human transcript:", humanTranscript)
  return (

    <>
      <div className='w-full min-h-screen overflow-x-hidden'>
        <div className='flex w-full'>

          <Sidebar />


          <div className=' md:w-full w-full md:px-5 flex flex-col   gap-5  '>


            <div className='w-full flex p-5  gap-8 md:flex-row flex-col items-center justify-center'>




              <span className='flex w-full  p-5 md:w-2/3   shadow-md flex-col h-[430px] overflow-y-scroll  gap-5 py-5 rounded-md bg-bg-navy-blue '>

                <span className='flex md:flex-row flex-col  justify-between items-center md:gap-2 gap-4'>

                  <h1 className='md:text-3xl text-2xl flex gap-3 font-bold font-poppins '> {isEdit && <p>Edit</p>} {transcriptions && transcriptions.filename}</h1>

                  {
                    humanTranscript.status ? (
                      <div className='border md:p-4 p-2 flex gap-2 flex-col rounded-lg'>
                        <p className='md:text-lg text-sm font-semibold font-poppins'>Human Transcript</p>
                        {
                          humanTranscript.status === "completed" ? (<span className='flex gap-2'>


                            <span className='flex items-center gap-1'><IoCheckmarkDone className='text-lg' /> {humanTranscript.status}</span>
                            <NotificationPage
                              humanTranscript={humanTranscript}
                            />
                          </span>)
                            :
                            (<span className='flex gap-2'>


                              <span className='flex items-center gap-1'><MdOutlinePendingActions className='text-lg' /> {humanTranscript.status}</span>
                            </span>)
                        }


                      </div>

                    ) : (
                      <ConfirmationBox
                        handleHumanTranscript={handleHumanTranscript}
                        isHtSend={isHtSend}
                        humanTranscript={humanTranscript}
                        cost={cost}
                        transcriptDuration={transcriptDuration}

                      />)
                  }

                </span>

                {isEdit && <p className='text-sm flex items-center gap-1 '><TiPencil /> Double tap on text to edit</p>}
                <div className=' font-roboto'>

                  {
                    <div ref={contentRef}>

                      {
                        transcriptions && transcriptions.sentimentAnalysisResults.map((sentiment, i) => {


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
                                {/* {utterance && <p className='font-lg font-bold'>{`Speaker ${utterance.speaker} :`}</p>} */}
                                <p
                                  style={{ color: i === wordsIndex ? '#f1b900' : 'white' }}
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


              <div className='w-60 bg-bg-navy-blue h-[430px] py-5  flex items-center justify-center shadow-md   overflow-y-scroll rounded-md '>

                <div className='flex px-3  items-start h-full  w-full flex-col '>
                  <h2 className='text-lg font-semibold  my-4 mt-5'>Export</h2>

                  <div className='flex flex-col items-center justify-center gap-2'>

                    <button onClick={downloadPdf} className=' hover:bg-bg-hover-color hover:text-black rounded-md p-4'>
                      <span className='flex items-center     gap-2'>
                        <FaRegFilePdf size={25} />
                        Download PDF
                      </span>

                    </button>
                    <button onClick={downloadTxt} className=' hover:bg-bg-hover-color hover:text-black rounded-md p-4'>
                      <span className='flex items-center   gap-2 '>
                        <BsFiletypeTxt size={25} />
                        Download TXT
                      </span>

                    </button>
                    <button onClick={downloadTranscriptionsDOCX} className=' hover:bg-bg-hover-color hover:text-black rounded-md p-4'>
                      <span className='flex items-center   gap-2 '>
                        <BsFiletypeDocx size={25} />
                        Download DOCX
                      </span>

                    </button>
                    <button onClick={downloadSrtFile} className=' hover:bg-bg-hover-color hover:text-black rounded-md p-4'>
                      <span className='flex items-center   gap-2 '>
                        <LuSubtitles size={25} />
                        Download SRT
                      </span>

                    </button>
                    <div className='flex self-start'>
                      <h2 className='text-lg font-semibold '>More</h2>
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


                    <span onClick={() => setIsEdit(!isEdit)} className=' flex items-center gap-2 cursor-pointer hover:bg-bg-hover-color hover:text-black rounded-md p-4'>
                      <MdOutlineModeEditOutline size={25} /> {isEdit ? <p>Done Editing</p> : <p>Edit Transcript</p>}
                    </span>

                    <span onClick={downloadAudio} className='hover:bg-bg-hover-color hover:text-black rounded-md p-4 flex items-center gap-2 cursor-pointer'>
                      <MdOutlineCloudUpload size={25} />  {!isAudioDownloading ? <p>Download Audio</p> : <p>Downloading...</p>}
                    </span>

                    <span onClick={generateShareLink} className='hover:bg-bg-hover-color hover:text-black rounded-md p-4 flex items-center gap-3 cursor-pointer mb-2'>
                      <RiShareForwardLine size={25} /> Share Transcript
                    </span>

                    <span onClick={() => setShowDeleteModal(true)} className='hover:bg-bg-hover-color hover:text-black rounded-md p-4 flex items-center gap-3 cursor-pointer mb-2'>
                      <RiDeleteBin6Line size={25} /> Delete File
                    </span>

                    {
                      isOpenEditModal && <ShareModal generateShareLink={generateShareLink} isOpenEditModal={isOpenEditModal} shareLink={shareLink} setIsOpenEditModal={setIsOpenEditModal} />
                    }

                    {
                      showDeleteModal && <DeleteModal deleteTranscript={deleteTranscription} setShowDeleteModal={setShowDeleteModal} filename={transcriptions.filename} />
                    }




                  </div>
                </div>

              </div>
            </div>


            <div className='w-full bg-bg-navy-blue p-5 items-center  mt-20 flex flex-col  gap-2 rounded-md'>
              <p className='text-center font-semibold  font-poppins'>{transcriptions.filename}</p>
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
