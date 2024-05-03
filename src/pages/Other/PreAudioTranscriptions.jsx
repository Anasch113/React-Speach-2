import React from 'react'
import Sidebar from '../../layout/Sidebar'
import { MdCloudUpload, MdDelete } from "react-icons/md"
import { AiFillFileImage } from "react-icons/ai"
import { useState, useRef, useEffect } from 'react'
import { set } from 'firebase/database'
import { AssemblyAI } from 'assemblyai'
import axios from 'axios'


import { FaCloudUploadAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineCloudUpload } from "react-icons/md";
import { MdClose } from "react-icons/md";
import Transcripted from '../../components/PreAudio/Transcripted'
import { useUserAuth } from '../../context/UserAuthContext'
import Spinner from "../../components/PreAudio/Spinner"
import toast from 'react-hot-toast'





const PreAudioTranscriptions = () => {

    const [file, setFile] = useState(null)
    const [filename, setFileName] = useState("No File Selected")
    const [cloudUrl, setCloudUrl] = useState("")
    const [progress, setProgress] = useState(0)
    const [isUpload, setIsUpload] = useState(false)
    const [runUseEffect, setRunUseEffect] = useState(false)
    const [reloadLoading, setReloadLoading] = useState(false)


    const [processing, setProcessing] = useState(false);
    const [transcribeText, setTranscribeText] = useState("");
    const [transcriptions, setTranscriptions] = useState("");
    const [utterances, setUtterances] = useState([]);

    const [showFormModal, setShowFormModal] = useState(false);
    const [isTextFiles, setIsTextFiles] = useState(false);
    const [isTranscriptions, setIsTranscriptions] = useState(false);
    const [dbData, setDbData] = useState("");

    const [subtitle, setSubtitle] = useState([]); // New state variable

    const { user } = useUserAuth();

   

    const client = new AssemblyAI({
        apiKey: import.meta.env.VITE_ASSEMBLYAI_KEY
    })

    const cloudinaryBaseUrl = "https://api.cloudinary.com/v1_1/dgpwe8xy6";





    const handleFileChange = async (event) => {
        setIsUpload(true);

        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile.name);
        console.log('Selected File:', selectedFile);


        try {
            // Initialize FFmpeg
        

            const formData = new FormData();
            formData.append("file", new Blob([processedFile.buffer]),);
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
                        setProgress(progress);
                        console.log(`Upload Progress: ${progress}%`);


                    }
                }
            );
            const cloudinaryFileUrl = cloudinaryResponse.data.secure_url;
            setCloudUrl(cloudinaryFileUrl);
        } catch (error) {
            alert(error.message)
            console.error("Error in uploading file", error.message);

        }

        setIsUpload(false);
    };


    const handleFormClick = () => {
        document.querySelector(".input-field").click();
    };


    const handleTranscriptions = async (event) => {
        event.preventDefault();
        setProcessing(true);
        setRunUseEffect(false);
        setIsTranscriptions(true);
        setShowFormModal(false);

        try {
            const params = {
                audio: cloudUrl,
                speaker_labels: true,
                sentiment_analysis: true
            };

            const transcribe = await client.transcripts.transcribe(params);
            const subtitle = await getSubtitleFile(transcribe.id, 'srt');
            setSubtitle(subtitle);
            setTranscribeText(transcribe.text);
            setTranscriptions(transcribe);

            const chunkSize = 1024 * 1024; // 1MB chunks
            const chunks = [];
            const utterancesChunks = [];
            // Split transcribe and utterances data into smaller chunks
            for (let i = 0; i < transcribe.text.length; i += chunkSize) {
                chunks.push(transcribe.text.substring(i, i + chunkSize));
            }
            for (let i = 0; i < transcribe.utterances.length; i += chunkSize) {
                utterancesChunks.push(transcribe.utterances.slice(i, i + chunkSize));
            }

            // Send each chunk to the server sequentially
            for (let i = 0; i < chunks.length; i++) {
                const body = {
                    id: transcribe.id,
                    text: chunks[i],
                    audio_url: transcribe.audio_url,
                    status: transcribe.status,
                    audio_duration: transcribe.audio_duration,
                    utterances: utterancesChunks[i],
                    sentimentAnalysisResults: transcribe.sentiment_analysis_results.slice(i * chunkSize, (i + 1) * chunkSize),
                    userId: user.uid,
                    filename: filename
                };
                await axios.post(`${import.meta.env.VITE_HOST_URL}/api/save/savePreAudio`, body, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            }

            console.log("Transcription data sent successfully in chunks");

        } catch (error) {
            console.log("Error in Transcription", error);
            throw new Error("Error while transcribing the audio file");
        }

        setRunUseEffect(true);
        setProcessing(false);
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

    useEffect(() => {

        const fetchTranscriptions = async () => {

            try {
                setReloadLoading(true)
                const fetch = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/save/fetchPreAduio`, {
                    userId: user.uid
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((res) => {

                    setDbData(res.data)
                    setReloadLoading(false)
                }).catch((error) => {
                    console.log("error in response from database")
                })

            } catch (error) {
                console.log("error while fetching the transcriptions in transcript component")
            }
            finally {
                setReloadLoading(false); // Set loading to false after API call is completed
            }
        }

        fetchTranscriptions()

    }, [user, runUseEffect])

    console.log("dbData", dbData)
    console.log("isTranscriptions", isTranscriptions)

    return (
        <div className='w-full min-h-screen'>

            <div className='flex w-full'>

                <Sidebar />

                <div className='flex flex-col w-full py-5 px-10 bg-[#F7F7F7] min-h-screen overflow-x-hidden '>

                    {
                        reloadLoading ? <Spinner /> :



                            dbData.length === 0 && isTranscriptions == false ?
                                <div className='   rounded-md flex items-center flex-col  min-h-screen py-5 gap-5'>


                                    <div className='border min-h-80 md:w-full shadow-md p-5 flex flex-col  gap-8 h-[300px] bg-white'>
                                        <span className='flex flex-row items-center gap-2 py-5'>
                                            <RxDashboard className='text-3xl' />
                                            <h1 className='text-3xl font-bold font-poppins text-text-black'> Recent Files</h1>
                                        </span>

                                        <h1 className='text-2xl text-center font-roboto text-text-gray-other'>Welcome to Captify!</h1>

                                        <div className='flex items-center justify-center'>

                                            <button onClick={() => setShowFormModal(!showFormModal)} className='text-center px-5 py-4 w-2/5 h-20
rounded-md bg-bg-blue text-white text-xl font-medium font-roboto hover:bg-blue-500 '><span className='flex items-center text-center justify-center gap-2'>
                                                    <FaCloudUploadAlt size={25} /> <p>Transcribe Your File</p>
                                                </span></button>
                                        </div>

                                    </div>

                                </div> :

                                <Transcripted

                                    transcribeText={transcribeText}
                                    subtitle={subtitle}
                                    transcriptions={transcriptions}
                                    filename={filename}
                                    processing={processing}
                                    setTranscriptions={setTranscriptions}
                                    dbData={dbData}
                                    showFormModal={showFormModal}
                                    setShowFormModal={setShowFormModal}


                                />

                    }





                </div>

            </div>




            {showFormModal && (
                <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 ">
                    <div className="bg-white h-[550px] p-5 rounded-lg overflow-y-scroll">

                        <div className='w-full  flex flex-row items-center justify-end  gap-10 px-5 py-5'>

                            <span className='flex  flex-row items-center gap-2'>
                                <MdOutlineCloudUpload className='text-2xl' />
                                <h1 className='text-2xl font-bold font-poppins text-text-black'> Transcribe Files</h1>
                            </span>

                            <MdClose onClick={() => setShowFormModal(!showFormModal)} className='text-end w-10 h-10 cursor-pointer hover:bg-gray-300 p-2 rounded-full ' size={25} />

                        </div>



                        <form onClick={handleFormClick} className='flex flex-col items-center justify-center border-2  border-blue-500 h-64 bg-[#DBDBDB]  cursor-pointer rounded-md md:w-[400px] w-72'>
                            {
                                !file && <h1 className='text-2xl py-2 text-text-black font-medium font-roboto'>Upload Audio File</h1>

                            }

                            {
                                cloudUrl && <section className='mx-2  flex flex-col justify-between items-center px-4 py-5 rounded-md gap-2'>

                                    <span className='flex items-center gap-2'>
                                        <AiFillFileImage color='#1475cf' />
                                        {filename}
                                        <MdDelete className='hover:z-50' cursor="pointer"
                                            onClick={() => {
                                                setFileName("No Selected Files")
                                                setFile(null)
                                            }}
                                        />
                                    </span>

                                    <img className='w-6 h-6 my-3' src="/checked.png" alt="img" />
                                </section>
                            }
                            {
                                isUpload && <div className='flex  items-center flex-col'>

                                    <p className='py-1'>{filename}</p>
                                    <p className='py-1'>{`${progress}%`}</p>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>

                            }

                            <div className='py-2'>
                                <input
                                    accept='.m4a, .mp3 , .mp4, .mov, .wav, .ogg, .wmv, .mpeg, .wma, .pdf ,.txt, .srt'
                                    onChange={handleFileChange}
                                    className='input-field'
                                    type="file"
                                    hidden
                                />
                                {file ? <p></p> : <MdCloudUpload color='#1475cf' size={70} />}
                            </div>

                        </form>
                        <span className="flex flex-col gap-2 p-3 my-2">
                            <label className="text-sm text-text-black"> Audio Language</label>
                            <select className="border border-gray-300 py-3 px-4 text-sm rounded-md outline-none" name="language" id="language">
                                <option disabled>Select Language</option>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="arabic">Arabic</option>
                            </select>

                        </span>
                        <button disabled={isUpload} onClick={handleTranscriptions} className='text-center px-5 py-4 w-full h-16
rounded-md bg-bg-blue text-white text-xl font-medium font-roboto hover:bg-blue-500 '><span className='flex items-center text-center justify-center gap-2'>
                                <FaCloudUploadAlt size={25} /> <p>Transcribe </p>
                            </span></button>
                    </div>
                </div>
            )}
            {/* {showModal && (
                <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg">
                        <p className="text-lg font-semibold text-gray-500 text-center font-poppins">Transcribing...</p>
                        <div className="mt-3 flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    </div>
                </div>
            )} */}


        </div>
    )
}

export default PreAudioTranscriptions
