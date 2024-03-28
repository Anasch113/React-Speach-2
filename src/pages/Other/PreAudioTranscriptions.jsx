import React from 'react'
import Sidebar from '../../layout/Sidebar'
import { MdCloudUpload, MdDelete } from "react-icons/md"
import { AiFillFileImage } from "react-icons/ai"
import { useState, useRef } from 'react'
import { set } from 'firebase/database'
import { AssemblyAI } from 'assemblyai'
import axios from 'axios'
import { FaRegFilePdf } from "react-icons/fa6";
import html2pdf from "html2pdf.js";
import { FaExchangeAlt } from "react-icons/fa";
import FormatModal from '../../SmallComponents/FormatModal'
import { IoCloudDownloadSharp } from "react-icons/io5";
const PreAudioTranscriptions = () => {

    const [file, setFile] = useState(null)
    const [filename, setFileName] = useState("No File Selected")
    const [fileUrl, setFileUrl] = useState("")
    const [processing, setProcessing] = useState(false);
    const [transcribeText, setTranscribeText] = useState("");
    const [utterances, setUtterances] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isDownloadingtr, setIsDownloadingtr] = useState(false); // New state variable
    const [subtitle, setSubtitle] = useState([]); // New state variable

    const [showFormatModal, setShowFormatModal] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState('standard');
    const [selectedFormat2, setSelectedFormat2] = useState('standard');
    const [isDefault, setIsDefault] = useState(false);

    const contentRef = useRef(null)
    const client = new AssemblyAI({
        apiKey: import.meta.env.VITE_ASSEMBLYAI_KEY
    })

    const cloudinaryBaseUrl = "https://api.cloudinary.com/v1_1/dgpwe8xy6";






    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const fileURL = URL.createObjectURL(selectedFile);
        console.log(fileURL)
        setFile(selectedFile)
        setFileName(selectedFile.name)
        setFileUrl(fileURL)
        console.log('Selected Insurance Card File:', selectedFile);
    };
    const handleFormClick = () => {
        document.querySelector(".input-field").click();
    };

    const handleTranscriptions = async (event) => {
        event.preventDefault();
        setProcessing(true)
        setShowModal(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "xguxdutu");
            formData.append("cloud_name", "dgpwe8xy6");
            formData.append("folder", "Audio");
            formData.append("quality", "auto:good"); // Set the desired quality level

            const cloudinaryResponse = await axios.post(
                `${cloudinaryBaseUrl}/upload`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        // Calculate and update upload progress
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        console.log(`Upload Progress: ${progress}%`);
                        // Here, you can update your UI to reflect upload progress
                    }
                }
            );
            const cloudinaryFileUrl = cloudinaryResponse.data.secure_url;

            const params = {
                audio: cloudinaryFileUrl,
                speaker_labels: true
            }


            const transcribe = await client.transcripts.transcribe(params);
            const subtitle = await getSubtitleFile(transcribe.id, 'srt')
            setSubtitle(subtitle)
            console.log("subtitles:", subtitle)
            setTranscribeText(transcribe.text)
            console.log("Transcript text", transcribe)

            for (let utterance of transcribe.utterances) {
                console.log("utterances:", utterance)
            }
            setUtterances(utterances)

        } catch (error) {
            console.log("Error in Transcription", error)
            throw new Error("Error while transcribing the audio file")

        }
        setProcessing(false)
        setShowModal(false);
    }

    const downloadPdf = async () => {
        setIsDownloadingtr(true);

        const pdfOptions = {
            margin: 10,

            filename: "transcriptions.pdf",
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

    const getSubtitleFile = async (transcriptId, format) => {
        console.log(transcriptId, format)
        const url = `https://api.assemblyai.com/v2/transcript/${transcriptId}/${format}`
        try {
            const response = await axios.get(url, {
                headers: {
                    authorization: import.meta.env.VITE_ASSEMBLYAI_KEY,
                    "Content-Type": "application/json"
                }

            })

            return response.data
        } catch (error) {
            console.log("Error in the SRT Response", error);
        }

    }


    const toggleModal = () => {
        setShowFormatModal(!showFormatModal);
    };

    const handleFormatChange = (format) => {

        setSelectedFormat(format);
        console.log("format:", format)



    };
    const handleSetDefaultChange = () => {
        setIsDefault(!isDefault)

    };
    const handleContinue = () => {
        setSelectedFormat2(selectedFormat);
        setShowFormatModal(!showFormatModal)
    }



    const downloadSrtFile = () => {
        // Check if subtitles are available
        if (!subtitle) {
            console.error("No subtitles available to download.");
            return;
        }
        setIsDownloadingtr(true);
        // Create a Blob object containing the subtitles
        const srtBlob = new Blob([subtitle], { type: "text/plain" });
    
        // Create a temporary URL for the Blob
        const srtUrl = URL.createObjectURL(srtBlob);
    
        // Create a link element
        const link = document.createElement("a");
        link.href = srtUrl;
        link.download = "subtitles.srt"; // Set the filename for the download
    
        // Append the link to the document body and trigger the download
        document.body.appendChild(link);
        link.click();
    
        // Clean up: Remove the link and revoke the URL
        document.body.removeChild(link);
        URL.revokeObjectURL(srtUrl);
        setIsDownloadingtr(false);
    };

    return (
        <div className='w-full min-h-screen'>

            <div className='flex w-full'>

                <Sidebar />

                <div className='flex flex-col w-full py-5 px-5 bg-bg-color-light min-h-screen overflow-x-hidden '>
                    {
                        !transcribeText &&
                        <div className='border mt-5 bg-white rounded-md flex items-center flex-col  min-h-[600px] py-5 gap-5 justify-center'>

                            {
                                !file ? (

                                    <form onClick={handleFormClick} className='flex flex-col items-center justify-center border-2 border-dashed border-blue-500 h-80  cursor-pointer rounded-md md:w-[500px] w-72'>
                                        <h1 className='text-3xl py-2 text-text-color-blue font-medium font-roboto'>Upload Audio File</h1>

                                        <div className='py-2'>
                                            <input
                                                accept='.m4a, .mp3'
                                                onChange={handleFileChange}
                                                className='input-field'
                                                type="file"
                                                hidden
                                            />
                                            {file ? <p></p> : <MdCloudUpload color='#1475cf' size={70} />}
                                        </div>

                                    </form>
                                ) : (

                                    <div className='border min-h-80 md:w-[500px] shadow-md p-5 flex flex-col items-center gap-8'>
                                        <img className='w-16 h-16' src="/checked.png" alt="img" />
                                        <h1 className='text-2xl text-center font-poppins text-gray-500'>Your Audio Files are ready for Transcriptions</h1>
                                        <audio controls >
                                            <source src={fileUrl} type={file.type} />
                                            Your browser does not support the audio
                                        </audio>

                                        <button onClick={handleTranscriptions} className=' px-5 py-3 w-48
rounded-3xl bg-bg-blue text-white text-lg font-roboto hover:bg-blue-500'>Transcribe</button>
                                        {/* <p className='text-xl text-gray-500 font-poppins'>Your Audio</p> */}
                                    </div>
                                )
                            }






                            <section className='mx-2 md:w-[500px] w-72 flex justify-between items-center px-4 py-5 rounded-md bg-[#e9f0ff]'>
                                <AiFillFileImage color='#1475cf' />
                                <span className='flex items-center'>
                                    {filename}
                                    <MdDelete cursor="pointer"
                                        onClick={() => {
                                            setFileName("No Selected Files")
                                            setFile(null)
                                        }}
                                    />
                                </span>


                            </section>

                        </div>
                    }






                    <div className="  w-full  p-5 mt-5">

                        <h1 className='text-3xl font-semibold font-roboto text-text-color-blue '>Transcription Text</h1>

                        <div className='w-full my-5  border '></div>

                        <div className='flex justify-end gap-7'>
                            {
                                transcribeText && <button disabled={isDownloadingtr} className=" hover:bg-blue-500 text-white bg-bg-blue py-4 px-5 rounded-full w-fit" onClick={() => {
                                    if (selectedFormat === "SRT") {
                                        downloadSrtFile();
                                    } else {
                                        downloadPdf();
                                    }
                                }}>

                                    <span className="flex items-center gap-1 font-poppins">
                                        {
                                            !isDownloadingtr ? (<IoCloudDownloadSharp size={25} />) : (<div className='spinner'></div>)
                                        }
                                    </span>
                                </button>
                            }
                            {
                                transcribeText && <button className=" hover:bg-blue-500 text-white bg-bg-blue py-4 px-5 rounded-full w-fit" onClick={toggleModal}>

                                    <span className="flex items-center gap-1 font-poppins "> <FaExchangeAlt size={25} />  </span>
                                </button>
                            }
                        </div>

                        {
                            showFormatModal && <FormatModal

                                showFormatModal={showFormatModal}
                                selectedFormat={selectedFormat}
                                isDefault={isDefault}
                                toggleModal={toggleModal}
                                handleFormatChange={handleFormatChange}
                                handleSetDefaultChange={handleSetDefaultChange}
                                handleContinue={handleContinue}
                            />
                        }

                        <div ref={contentRef} className='w-full p-5 min-h-[450px] mt-5'>
                            {
                                transcribeText && selectedFormat2 === "standard" ? (transcribeText) :
                                transcribeText && (subtitle.split('\n').map((subtitle, index)=>(
                                    <p className='py-2' key={index}>{subtitle}</p>
                                )))
                                   
                            }
                            
                        </div>

                    </div>

                </div>



            </div>
            {showModal && (
                <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg">
                        <p className="text-lg font-semibold text-gray-500 text-center font-poppins">Transcribing...</p>
                        <div className="mt-3 flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default PreAudioTranscriptions
