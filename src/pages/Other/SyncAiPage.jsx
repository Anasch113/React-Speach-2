import React from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineCloudUpload } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdCloudUpload, MdDelete } from "react-icons/md"
import { AiFillFileImage } from "react-icons/ai"
import { useState, useRef, useEffect } from 'react'
import Sidebar from '../../layout/Sidebar';
import { MdPayment } from "react-icons/md";
import axios from "axios"
import { GrSync } from "react-icons/gr";
import { BsDatabaseDown } from "react-icons/bs";
import { LuUploadCloud } from "react-icons/lu";
import Transcripted from '../../components/SyncAI/Transcripted';
import { FiFileText } from "react-icons/fi";
import { LuFileAudio } from "react-icons/lu";
import { useUserAuth } from '../../context/UserAuthContext';
import Spinner from '../../components/PreAudio/Spinner';
import { reload } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentOptions from '../../components/PreAudio/PaymentOptions';

import { ref, onValue, update } from "firebase/database"
import { database } from '../../firebase'





const SyncAiPage = () => {
    const socket = new WebSocket(`wss://${import.meta.env.VITE_WSS_URL}`);

    const { user, userBalance } = useUserAuth();

    socket.addEventListener('open', () => {
        console.log('WebSocket connected');
    });

    socket.addEventListener('message', (data) => {
        handleMessage(data)
        console.log("first render data from webhook", data)
    });



    const [file, setFile] = useState({
        audio: "",
        transcript: ""
        // Add more keys if needed for other types of files
    });
    const [progress, setProgress] = useState({
        audio: 0,
        transcript: 0
    });
    const [cloudUrl, setCloudUrl] = useState({
        audio: "",
        transcript: ""
        // Add more keys if needed for other types of files
    });

    const [filename, setFileName] = useState("No File Selected")
    const [isTranscriptions, setIsTranscriptions] = useState(false);

    const [showFormModal, setShowFormModal] = useState(false);
    const [dbData, setDbData] = useState("")
    const [isUploadAudio, setIsUploadAudio] = useState(false);
    const [isUploadTranscript, setIsUploadTranscript] = useState(false);
    const [data, setData] = useState(false)
    const [isjobCompleted, setIsJobCompleted] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [runUseEffect, setRunUseEffect] = useState(false)
    const [reloadLoading, setReloadLoading] = useState(false)
    const [chunksLoading, setChunksLOading] = useState(false)
    const [webHookData, setWebHookData] = useState("")
    const [useEffectTriggered, setUseEffectTriggered] = useState(false);




    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [isPaymentInProgress, setIsPaymentInProgress] = useState(false)
    const [fileDuration, setFileDuration] = useState(0);
    const [cost, setCost] = useState(0);


    const cloudinaryBaseUrl = "https://api.cloudinary.com/v1_1/dqtscpu75";

    const CLOUD_NAME = 'dqtscpu75';
    const UPLOAD_PRESET = 'brd5uhci';



    // >>>>>>>>>>>>>>>>>>>>>> Payment related code start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const location = useLocation();
    const navigate = useNavigate();
    const paidCloudUrl = location.state?.paidCloudUrl;
    const transcriptUrl = location.state?.transcriptUrl;
    const paidFilename = location.state?.paidFilename;
    const paidFileDuration = location.state?.paidFileDuration;

    console.log("cloudurl and filename from location ", paidCloudUrl, transcriptUrl)

    console.log("users balance in pre audio", userBalance)


    useEffect(() => {
        if (paidCloudUrl && transcriptUrl) {

            toast.success("Continue your transcriptions")
            setCloudUrl({
                audio: paidCloudUrl,
                transcript: transcriptUrl
            }
            )
            setFile({
                audio: paidFileDuration
            })
            setFileDuration(paidFileDuration)
            setIsPaymentInProgress(false)
            setShowFormModal(true)



        }
        // Clear the state from the URL
        navigate(location.pathname, { replace: true });
    }, [paidCloudUrl])

    console.log("urls", cloudUrl.audio, cloudUrl.transcript)


    // Function to create Stripe session
    const createStripeSession = async (total, method) => {


        try {
            const userId = user.uid;
            const audioUrl = cloudUrl.audio;
            const transcriptUrl = cloudUrl.transcript;
            const fileName = file.audio

            const body = {
                cost: cost,
                cloudUrl: audioUrl,
                userId: userId,
                filename: fileName,
                fileDuration: fileDuration,
                transcriptUrl: transcriptUrl
            }

            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/payment-system/create-stripe-session`, body);


            return response.data;


        } catch (error) {
            console.error("Error creating Stripe session", error);
            return null;
        }
    };

    const handlePaymentOptions = async (total, method) => {
        setShowPaymentModal(false)
        try {
            if (total && method === "credit-method") {

                // For credit method

                const stripeSession = await createStripeSession(total, method);

                if (stripeSession && stripeSession.url) {
                    // Redirect the user to Stripe Checkout
                    window.location.href = stripeSession.url;
                } else {
                    alert("Failed to create Stripe session. Please try again.");
                }
            }
            // For direct method
            const stripeSession = await createStripeSession();

            if (stripeSession && stripeSession.url) {
                // Redirect the user to Stripe Checkout
                window.location.href = stripeSession.url;
            } else {
                alert("Failed to create Stripe session. Please try again.");
            }

        } catch (error) {
            console.log("error", error)
        }
    }


    useEffect(() => {

        if (cloudUrl.audio && cloudUrl.transcript) {
            setShowFormModal(false)
            setShowPaymentModal(true)
            setIsPaymentInProgress(true)
        }

    }, [cloudUrl.audio, cloudUrl.transcript])
    console.log("cost", cost)
    console.log("duration", fileDuration)
    console.log("showpaymentmodal", showPaymentModal)
    console.log("paymentinprogress", isPaymentInProgress)



    // >>>>>>>>>>>>>>>>>>>>>> Payment related code End >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



    // >>>>>>>>>>>>>>> Form related code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const handleInputClick = () => {
        if (!cloudUrl.transcript) {
            toast("Please upload text file first!")
            return
        }
        document.querySelector(".input-field").click()
    }
    const handleInputClick2 = () => {
        document.querySelector(".input-field-2").click()
    }


    const handleFileChange = async (event, stateKey) => {

        setFileDuration("")
        setCost("")
        setCloudUrl((prevUrls) => ({
            ...prevUrls,
            [stateKey]: ''
        }));

        setProgress(prevProgress => ({
            ...prevProgress,
            [stateKey]: 0
        }));

        if (stateKey === 'audio') {
            setIsUploadAudio(true);
        } else if (stateKey === 'transcript') {
            setIsUploadTranscript(true);
        }

        const selectedFile = event.target.files[0];

        setFile((prevFiles) => ({
            ...prevFiles,
            [stateKey]: selectedFile.name
        }));

        try {
            const chunkSize = 5 * 1024 * 1024; // 5MB
            const isLargeFile = selectedFile.size > 20 * 1024 * 1024; // 20MB
            if (isLargeFile) {
                // Use chunked upload for large files
                await uploadFile(selectedFile, stateKey);
            } else {
                // Use regular upload for smaller files
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("upload_preset", "brd5uhci");
                formData.append("cloud_name", "dqtscpu75");
                formData.append("folder", "Audio");
                formData.append("quality", "auto:good");

                const cloudinaryResponse = await axios.post(
                    `${cloudinaryBaseUrl}/upload`,
                    formData,
                    {
                        onUploadProgress: (progressEvent) => {
                            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                            setProgress(prevProgress => ({
                                ...prevProgress,
                                [stateKey]: progress
                            }));
                        },
                        timeout: 10000000
                    }
                );

                const cloudinaryFileUrl = cloudinaryResponse.data.secure_url;

                console.log("Cloudinary file shortttttt urlllll", cloudUrl)
                setCloudUrl((prevUrls) => ({
                    ...prevUrls,
                    [stateKey]: cloudinaryFileUrl
                }));

                // Only proceed with duration and cost calculation for audio files

                const duration = cloudinaryResponse.data.duration;

                const roundedDuration = (duration / 60).toFixed(1);
                setFileDuration(roundedDuration);

                toast.success("File Uploaded");

                // Calculate the cost
                const costPrice = (roundedDuration * 0.5).toFixed(2);

                if (stateKey === 'audio' && duration > 0) {

                    setCost(costPrice)
                }






            }
        } catch (error) {
            alert(error);
            console.error(`Error in uploading ${stateKey} file`, error);
        }

        if (stateKey === 'audio') {
            setIsUploadAudio(false);
        } else if (stateKey === 'transcript') {
            setIsUploadTranscript(false);
        }
    };



    const uploadFile = async (file, stateKey) => {
        if (!file) {
            console.error('Please select a file.');
            return;
        }


        setChunksLOading(true)
        const uniqueUploadId = generateUniqueUploadId();
        const chunkSize = 5 * 1024 * 1024;
        const totalChunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;

        console.log("total chunks", totalChunks)



        const uploadChunk = async (start, end) => {
            const formData = new FormData();
            formData.append('file', file.slice(start, end));
            formData.append('cloud_name', CLOUD_NAME);
            formData.append('upload_preset', UPLOAD_PRESET);
            const contentRange = `bytes ${start}-${end - 1}/${file.size}`;

            console.log(

                `Uploading chunk for uniqueUploadId: ${uniqueUploadId}; start: ${start}, end: ${end - 1
                }`
            );





            try {
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
                    {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'X-Unique-Upload-Id': uniqueUploadId,
                            'Content-Range': contentRange,
                        },

                    }

                );

                if (!response.ok) {
                    throw new Error('Chunk upload failed.');
                }


                currentChunk++;



                if (currentChunk < totalChunks) {
                    console.log("current chunk", currentChunk)
                    const nextStart = currentChunk * chunkSize;
                    const nextEnd = Math.min(nextStart + chunkSize, file.size);
                    console.log("next end", nextEnd)

                    // Update the progress percentage
                    const progress = Math.round((currentChunk / totalChunks) * 100);
                    console.log("progress during chunk file upload", progress)
                    toast(`In progress, ${progress}% completed `, {
                        icon: '👏',
                    });

                    uploadChunk(nextStart, nextEnd);
                } else {
                    ;


                    const fetchResponse = await response.json();

                    const cloudinaryFileUrl = fetchResponse.secure_url
                    setCloudUrl((prevUrls) => ({
                        ...prevUrls,
                        [stateKey]: cloudinaryFileUrl
                    }));
                    // Only proceed with duration and cost calculation for audio files

                    const duration = fetchResponse.duration;

                    const roundedDuration = (duration / 60).toFixed(1);
                    setFileDuration(roundedDuration);

                    toast.success("File Uploaded");

                    // Calculate the cost
                    const costPrice = (roundedDuration * 0.5).toFixed(2);

                   

                        setCost(costPrice)
                    
                    toast.success("Audio file uploaded")
                    console.log("fetchResponseeeee url", cloudinaryFileUrl)
                    console.info('File upload complete.');

                    setChunksLOading(false)
                }
            } catch (error) {
                console.error('Error uploading chunk:', error);

            }
        };

        const start = 0;
        const end = Math.min(chunkSize, file.size);
        uploadChunk(start, end);
    };

    const generateUniqueUploadId = () => {
        return `uqid-${Date.now()}`;
    };








    // >>>>>>>>>>>>>>>> Transcript related code >>>>>>>>>>>>>>>>>>>>>>>>>>

    const hanldeSync = async () => {
        setShowFormModal(false);
        setIsTranscriptions(true);
        setProcessing(true);
        setRunUseEffect(false);
        setUseEffectTriggered(false);
        setIsJobCompleted(false);

        if (cost > 0 && cost > userBalance) {
            toast.error("Insufficient credit, Please buy more credit ")
            return
        }


        toast.success("Progress Started")

        try {


            const requestBody = {
                source_config: {
                    url: cloudUrl.audio
                },
                source_transcript_config: {
                    url: cloudUrl.transcript
                },
                metaData: "This is forced alignment test"
            };

            console.log("requestBody", requestBody);


            // First API
            const firstStepRes = await fetch(`${import.meta.env.VITE_HOST_URL}/sync/submit-alignment-job`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    audioUrl: cloudUrl.audio,
                    transcriptUrl: cloudUrl.transcript
                })
            });

            const responseData = await firstStepRes.json();
            console.log("responseData", responseData);

            // Function to check job status


            const checkJobStatus = async (jobId) => {
                try {
                    const secondResponse = await fetch(`${import.meta.env.VITE_HOST_URL}/sync/submit-alignment-job-second`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: jobId
                        })
                    });

                    const responseDataSecond = await secondResponse.json();
                    console.log("responseDataSecond", responseDataSecond);

                    if (responseDataSecond.status === "completed") {
                        setIsJobCompleted(true);
                        setWebHookData(responseDataSecond);
                    } else if (responseDataSecond.status === "in_progress") {
                        if (!useEffectTriggered) {
                            setTimeout(() => checkJobStatus(jobId), 380000); // 380000
                            toast('In progress, Please wait your file is large', {

                            });
                        }

                    }
                    else if (responseDataSecond.status === "failed") {
                        toast.error("Failed to process file")
                        window.location.reload()
                    }
                } catch (error) {
                    console.error("Error in second API", error);
                    toast.error("Failed", error)
                }
            };



            // Wait for 3 minutes (180000 milliseconds) before making the second API call
            setTimeout(() => {
                if (!useEffectTriggered) {
                    checkJobStatus(responseData.id); // Pass the job ID to the recursive function
                }
            }, 150000); // 150000 milliseconds = 2.5 minutes

        } catch (error) {
            if (error.response) {
                console.error('Server responded with status:', error.response.status);
                console.error('Response data:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    };




    console.log("Is Job Completed? :", isjobCompleted)

    // Define a function to handle the message event
    const handleMessage = (data) => {
        // Parse the received data
        const parseData = JSON.parse(data.data);
        console.log("Webhook data in hanldeMessage", parseData);

        // Update state or perform other actions with the received data
        setWebHookData(parseData);
        setIsJobCompleted(true)


        // Remove the event listener after handling the first message
        socket.removeEventListener('message', handleMessage);
    };
    console.log("data from webhook in state", webHookData)


    // Add event listeners for WebSocket events




    useEffect(() => {

        if (!useEffectTriggered && isjobCompleted) {
            const finalSync = async () => {

                setUseEffectTriggered(true)

                try {
                    const thirdStepRes = await fetch(`${import.meta.env.VITE_HOST_URL}/sync/submit-alignment-job-third`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: webHookData.id
                        })
                    });
                    const responseDatathird = await thirdStepRes.json();
                    setData(responseDatathird)
                    console.log("responseDataThird", responseDatathird.monologues)




                    const bodyData = {

                        syncData: responseDatathird,
                        userId: user.uid,
                        audio: file.audio,
                        transcript: file.transcript,
                        cloudUrl: cloudUrl


                    }

                    const handleSave = await axios.post(`${import.meta.env.VITE_HOST_URL}/sync/saveData`, bodyData, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                    ).then((res) => {

                        console.log("res:", res.data)
                    }).catch((error) => {
                        console.log("Error occurred while in pre audio upload", error)
                    })

                    // Update user balance in Firebase
                    const newBalance = userBalance - cost; // Assuming `cost` is the transcription cost in state
                    await update(ref(database, `users/${user.uid}/credit-payment`), {
                        balance: newBalance
                    });
                    setIsPaymentInProgress(false)


                    console.log("User balance updated successfully");

                    toast.success("Resyncing completed")

                } catch (error) {
                    console.log("Erro in finalsync", error)
                }


                setRunUseEffect(true)
                setProcessing(false)
            }

            finalSync()

        }


    }, [webHookData, useEffectTriggered, isjobCompleted])












    useEffect(() => {

        setIsTranscriptions(false)
        const fetchTranscriptions = async () => {
            if (user) { // Check if user is truthy
                try {
                    setReloadLoading(true)
                    const fetch = await axios.post(`${import.meta.env.VITE_HOST_URL}/sync/fetch-data`, {
                        userId: user.uid
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    setDbData(fetch.data);
                    setReloadLoading(false)
                } catch (error) {
                    console.log("Error while fetching the transcriptions in transcript component", error);
                } finally {
                    setReloadLoading(false); // Set loading to false after API call is completed
                }
            }
        };

        fetchTranscriptions();
    }, [user, runUseEffect]);










    return (
        <>
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
                                            {
                            isPaymentInProgress && <button onClick={() => setShowPaymentModal(!showPaymentModal)} className='text-center p-2 w-20 h-16 
                            rounded-3xl bg-purple-500 text-white text-xl font-medium font-roboto hover:bg-purple-400 '><span className='flex items-center text-center justify-center '>
                                    <MdPayment size={25} />
                                </span></button>
                        }

                                                <button onClick={() => setShowFormModal(!showFormModal)} className='text-center px-5 py-4 w-2/5 h-20
rounded-md bg-bg-blue text-white text-xl font-medium font-roboto hover:bg-blue-500 '><span className='flex items-center text-center justify-center gap-2'>
                                                        <GrSync size={20} /> <p>Resyncing Ai</p>
                                                    </span></button>
                                            </div>

                                        </div>

                                    </div>

                                    : <Transcripted
                                        processing={processing}
                                        data={data} file={file}
                                        showFormModal={showFormModal}
                                        setShowFormModal={setShowFormModal}
                                        dbData={dbData}
                                        isTranscriptions={isTranscriptions}
                                        isPaymentInProgress={isPaymentInProgress}
                                        setShowPaymentModal={setShowPaymentModal}
                                        showPaymentModal={showFormModal}
                                    />

                        }

                    </div>

                </div>



            </div>




            {showFormModal && (
                <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 ">


                    <div className=" flex items-center flex-col bg-white min-h-[500px] max-h-[600px] p-5 rounded-lg  md:w-[700px] gap-5">

                        <div className='w-full justify-between  flex flex-row  px-5   py-5'>


                            <span className='flex flex-1  flex-row items-center justify-center gap-2'>
                                <MdOutlineCloudUpload className='text-2xl' />
                                <h1 className='text-2xl font-bold font-poppins text-text-black'> Upload Files</h1>
                            </span>
                            <div className='ml-auto'>

                                <MdClose onClick={() => setShowFormModal(!showFormModal)} className='text-end w-10 h-10 cursor-pointer hover:bg-gray-300 p-2 rounded-full ' size={25} />
                            </div>

                        </div>



                        <div className='flex w-full p-5 flex-row items-center justify-center gap-5'>



                            {/* <p className='text-center text-lg text-gray-500'>Or</p> */}
                            {/* 2nd Form */}



                            <form onClick={handleInputClick2} className='flex flex-col items-center justify-center    h-36   cursor-pointer rounded-md md:w-[400px] w-52 mb-10 bg-offWhite px-4'>
                                {
                                    !file.transcript && <div className='flex flex-col items-center gap-1 py-3 px-2'>
                                        <h1 className='text-xl py-1 text-text-black font-medium font-roboto text-center'>Upload Text File</h1>
                                        <FiFileText color='#1475cf' size={30} />
                                    </div>
                                }

                                {
                                    cloudUrl.transcript && <section className='mx-2  flex flex-col justify-between items-center px-4 py-5 rounded-md gap-2'>

                                        <span className='flex items-center '>
                                            {file.transcript && file.transcript}


                                        </span>


                                        <img className='w-6 h-6 my-3' src="/checked.png" alt="img" />
                                    </section>
                                }

                                {
                                    isUploadTranscript && <div className='flex  items-center flex-col'>

                                        <p className='py-1'>{file && file.transcript}</p>
                                        <p className='py-1'>{`${progress.transcript}%`}</p>
                                        <div className="progress-bar bg-white">
                                            <div className="progress-fill" style={{ width: `${progress.transcript}%` }}></div>
                                        </div>
                                    </div>

                                }
                                <div className='py-2'>
                                    <input
                                        accept=' .pdf ,.txt,'
                                        onChange={(event) => handleFileChange(event, 'transcript')}
                                        className='input-field-2'
                                        type="file"
                                        hidden
                                    />
                                </div>

                            </form>

                            {/* 1st Form */}
                            <form onClick={handleInputClick} className='flex flex-col items-center justify-center    h-36   cursor-pointer rounded-md md:w-[400px] w-52 mb-10 bg-offWhite px-4 py-4'>
                                {
                                    !file.audio && <div className='flex flex-col items-center gap-1 py-3 px-2'>
                                        <h1 className='text-xl py-1 text-text-black font-medium font-roboto text-center'>Upload Audio file</h1>
                                        <LuFileAudio color='#1475cf' size={30} />
                                    </div>
                                }

                                {
                                    cloudUrl.audio && <section className='  flex flex-col justify-between items-center px-4 py-5 rounded-md gap-1'>

                                        <span className='flex items-center justify-center gap-2'>

                                            <p className='text-center'>{file.audio && file.audio}</p>


                                        </span>

                                        <img className='w-6 h-6 my-3' src="/checked.png" alt="img" />
                                    </section>
                                }
                                {
                                    isUploadAudio && <div className='flex  items-center flex-col gap-2 '>

                                        <p className='py-1 text-center'>{file.audio}</p>
                                        <p className='py-1'>{`${progress.audio}%`}</p>
                                        <div className="progress-bar bg-white">
                                            <div className="progress-fill" style={{ width: `${progress.audio}%` }}></div>
                                        </div>
                                    </div>

                                }

                                {
                                    chunksLoading && <span> <p>Uploading...</p>


                                    </span>
                                }
                                <div className='py-2'>
                                    <input
                                        accept='.m4a, .mp3 , .mp4, .mov, .wav, .ogg, .wmv, .mpeg, .wma,'
                                        onChange={(event) => handleFileChange(event, 'audio')}
                                        className='input-field'
                                        type="file"
                                        hidden
                                    />
                                </div>

                            </form>


                        </div>
                        <button disabled={!cloudUrl.audio && !cloudUrl.transcript} onClick={hanldeSync}
                            className='text-center px-5 py-4 w-2/4 h-16 rounded-full bg-bg-blue text-white text-xl font-medium font-roboto hover:bg-blue-500 '>

                            <span className='flex items-center text-center justify-center gap-2'>
                                <GrSync size={25} />
                                <p>Resync </p>

                            </span>
                        </button>
                    </div>


                </div>
            )}

            {showPaymentModal && (
                <PaymentOptions
                    fileName={file.audio}
                    duration={fileDuration}
                    cost={cost}
                    setShowPaymentModal={setShowPaymentModal}
                    handlePaymentOptions={handlePaymentOptions}
                    currentBalance={userBalance}
                    handleTranscriptions={hanldeSync}



                />
            )}
        </>
    )
}

export default SyncAiPage