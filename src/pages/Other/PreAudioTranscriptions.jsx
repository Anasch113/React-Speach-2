import React from 'react'
import Sidebar from '../../layout/Sidebar'
import { MdCloudUpload, MdDelete } from "react-icons/md"
import { AiFillFileImage } from "react-icons/ai"
import { useState } from 'react'
import { set } from 'firebase/database'
import { AssemblyAI } from 'assemblyai'
import axios from 'axios'
import { FaRegFilePdf } from "react-icons/fa6";
import html2pdf from "html2pdf.js";
const PreAudioTranscriptions = () => {

    const [file, setFile] = useState(null)
    const [filename, setFileName] = useState("No File Selected")
    const [fileUrl, setFileUrl] = useState("")
    const [processing, setProcessing] = useState(false);
    const [transcribeText, setTranscribeText] = useState("");
    const [utterances, setUtterances] = useState([]);
    const [showModal, setShowModal] = useState(false);
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
                formData
            );
            const cloudinaryFileUrl = cloudinaryResponse.data.secure_url;

            const params = {
                audio: cloudinaryFileUrl,
                speaker_labels: true
            }


            const transcribe = await client.transcripts.transcribe(params);
            setTranscribeText(transcribe.text)
            console.log("Transcript text", transcribe.text)

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
rounded-3xl bg-bg-blue text-white text-lg font-roboto'>Transcribe</button>
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





                    <div className='w-full flex-col flex  py-5  px-5 mt-5  '>
                        <h2 className='text-text-color-blue text-3xl font-roboto font-semibold'>Files for Download</h2>
                        <div className='w-full my-5  border '>
                            
                        </div>



                    </div >

                    <div className="  w-full  p-5 mt-5">

                        <h1 className='text-3xl font-semibold font-roboto text-text-color-blue '>Transcription Text</h1>

                        <div className='w-full my-5  border '></div>
                        <div className='w-full p-5 min-h-[450px] mt-5'>
                            {
                                transcribeText && transcribeText
                            }
                        </div>

                    </div>

                </div>



            </div>
            {showModal && (
                <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg">
                        <p className="text-lg font-semibold text-center">Transcribing...</p>
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
