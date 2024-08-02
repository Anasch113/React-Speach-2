import React from 'react'
import Sidebar from '../../layout/Sidebar'
import { MdCloudUpload, MdDelete } from "react-icons/md"
import { AiFillFileImage } from "react-icons/ai"
import { useState, useRef, useEffect } from 'react'
import { MdPayment } from "react-icons/md";
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
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import PaymentOptions from '../../components/PreAudio/PaymentOptions'
import { ref, onValue, update } from "firebase/database"
import { database } from '../../firebase'







const PreAudioTranscriptions = () => {

    const [file, setFile] = useState(null)
    const [filename, setFileName] = useState("No File Selected")
    const [cloudUrl, setCloudUrl] = useState("")
    const [progress, setProgress] = useState(0)
    const [isUpload, setIsUpload] = useState(false)
    const [runUseEffect, setRunUseEffect] = useState(false)
    const [reloadLoading, setReloadLoading] = useState(false)

    const [fileNames, setFileNames] = useState([]);
    const [uploadingfileNames, setUploadingFileNames] = useState([]);
    const [fileDurations, setFileDurations] = useState([]);

    const [cloudUrls, setCloudUrls] = useState([]);

    const [processing, setProcessing] = useState(false);
    const [transcribeText, setTranscribeText] = useState("");
    const [transcriptions, setTranscriptions] = useState("");


    const [showFormModal, setShowFormModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const [isTranscriptions, setIsTranscriptions] = useState(false);
    const [dbData, setDbData] = useState("")
    const [subtitle, setSubtitle] = useState([]); // New state variable

    const [chunksLoading, setChunksLOading] = useState(false)
    const [isPaymentInProgress, setIsPaymentInProgress] = useState(false)


    const [fileDuration, setFileDuration] = useState(0);
    const [cost, setCost] = useState(0);
    const [isPaymentDone, setIsPaymentDone] = useState(false)

    const { user, userBalance } = useUserAuth();




    const client = new AssemblyAI({
        apiKey: import.meta.env.VITE_ASSEMBLYAI_KEY
    })

    const cloudinaryBaseUrl = "https://api.cloudinary.com/v1_1/dqtscpu75";
    const CLOUD_NAME = 'dqtscpu75';
    const UPLOAD_PRESET = 'brd5uhci';




    const { cloudUrlRedux } = useSelector((state) => state.payment)
    console.log("cloudurl from redux after user paid", cloudUrlRedux)

    const location = useLocation();
    const navigate = useNavigate();

    const paidCloudUrl = location.state?.paidCloudUrl;
    const paidFilename = location.state?.paidFilename;
    const paidFileDuration = location.state?.paidFileDuration;

    console.log("cloudurl and filename from location ", paidCloudUrl, paidFilename)

    console.log("users balance in pre audio", userBalance)


    useEffect(() => {

        if (paidCloudUrl) {
            setShowFormModal(true)
            toast.success("Continue your transcriptions")
            setCloudUrls(paidCloudUrl)
            setFileNames(paidFilename)
            setFileDurations(paidFileDuration)
            setIsPaymentInProgress(false)
            setFile("full")
            setIsPaymentDone(true)

        }
        // Clear the state from the URL
        navigate(location.pathname, { replace: true });
    }, [paidCloudUrl])




    // Function to create Stripe session
    const createStripeSession = async (total, method) => {
        const userId = user.uid
        try {

            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/payment-system/create-stripe-session-preAudio`, {
                cost, // Total cost for all files
                cloudUrls,   // Array of Cloudinary URLs
                userId,
                fileNames,   // Array of file names
                fileDurations // Array of file durations
            });


            return response.data;
        }

        catch (error) {
            console.error("Error creating Stripe session", error);
            return null;
        }
    };

    const handlePaymentOptions = async (total, method) => {

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



    // New upload function which include chunks method


    // const handleFileChange = async (event, stateKey) => {
    //     setIsUpload(true);
    //     setCloudUrl("");
    //     setFile("")
    //     setFileDuration("")
    //     setCost("")

    //     setProgress(0);


    //     const selectedFile = event.target.files[0];
    //     setFile(selectedFile);
    //     setFileName(selectedFile.name);
    //     console.log('Selected File:', selectedFile);

    //     try {
    //         const chunkSize = 5 * 1024 * 1024; // 5MB
    //         const isLargeFile = selectedFile.size > 20 * 1024 * 1024; // 20MB
    //         if (isLargeFile) {
    //             // Use chunked upload for large files
    //             await uploadFile(selectedFile);
    //         } else {


    //             const formData = new FormData();
    //             formData.append("file", selectedFile);
    //             formData.append("upload_preset", "brd5uhci");
    //             formData.append("cloud_name", "dqtscpu75");
    //             formData.append("folder", "Audio");
    //             formData.append("quality", "auto:good"); // Set the desired quality level


    //             const cloudinaryResponse = await axios.post(
    //                 `${cloudinaryBaseUrl}/upload`,
    //                 formData,
    //                 {
    //                     onUploadProgress: (progressEvent) => {
    //                         // Calculate and update upload progress
    //                         const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
    //                         setProgress(progress);
    //                         console.log(`Upload Progress: ${progress}%`);


    //                     }
    //                 }
    //             );
    //             const cloudinaryFileUrl = cloudinaryResponse.data.secure_url;
    //             setCloudUrl(cloudinaryFileUrl);

    //             const duration = cloudinaryResponse.data.duration;
    //             const roundedDuration = (duration / 60).toFixed(1)
    //             setFileDuration(roundedDuration)
    //             // Get the duration of the uploaded file
    //             console.log("cloudinaryResponseeeeee:", cloudinaryResponse)
    //             console.log("cloudinaryyyy URRLLLLLLLL: ", cloudinaryFileUrl)
    //             toast.success("File Uploaded")

    //             // Calculate the cost
    //             const cost = (roundedDuration * 0.5).toFixed(2);
    //             console.log("cost", cost)
    //             setCost(cost)
    //             setShowFormModal(false)
    //             setShowPaymentModal(true)
    //             setIsPaymentInProgress(true)


    //         }
    //     } catch (error) {
    //         alert(error);
    //         console.error("Error in uploading file", error.message);
    //     }

    //     setIsUpload(false);
    // };




    // Bulk file experiment start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const handleFileChange = async (event) => {
        setIsUpload(true);
        setCloudUrls("");
        setFile("");
        setFileDurations("");
        setCost(0)
        setProgress(0);

        const selectedFiles = event.target.files;
        console.log('Selected Files:', selectedFiles);

        const fileUploadPromises = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];

            fileUploadPromises.push(uploadAndTranscribeFile(file, i));
        }

        try {
            // Wait for all file uploads to complete
            await Promise.all(fileUploadPromises);
            toast.success("All files uploaded ");

            setShowFormModal(false)
            setShowPaymentModal(true)

        } catch (error) {
            alert(error);
            console.error("Error in uploading files", error.message);
        }

        setIsUpload(false);



    };



    console.log("progress", progress)
    const uploadAndTranscribeFile = async (file, index) => {
        setFile(file);

        setUploadingFileNames((prevNames) => [...prevNames, file.name]);
        try {
            const isLargeFile = file.size > 20 * 1024 * 1024; // 20MB
            if (isLargeFile) {
                // Handle large file upload with chunking (return a promise that resolves when complete)
                return uploadFile(file, index);
            } else {


                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "brd5uhci");
                formData.append("cloud_name", "dqtscpu75");
                formData.append("folder", "Audio");
                formData.append("quality", "auto:good"); // Set the desired quality level

                const cloudinaryResponse = await axios.post(
                    `${cloudinaryBaseUrl}/upload`,
                    formData,

                    {
                        onUploadProgress: (progressEvent) => {
                            const progressPercentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                            setProgress((prevProgress) => {
                                // If prevProgress is not an array, default to an empty array
                                const newProgress = Array.isArray(prevProgress) ? [...prevProgress] : [];
                                newProgress[index] = progressPercentage;
                                return newProgress;
                            });
                            console.log(`Upload Progress for ${file.name}: ${progressPercentage}%`);
                        }
                    }

                );

                const cloudinaryFileUrl = cloudinaryResponse.data.secure_url;
                setFileNames((prevNames) => [...prevNames, file.name]);
                setCloudUrls((prevUrls) => [...prevUrls, cloudinaryFileUrl])

                const duration = cloudinaryResponse.data.duration;
                const roundedDuration = (duration / 60).toFixed(1);
                setFileDurations((prevDurations) => [...prevDurations, roundedDuration]);
                // console.log("cloudinaryResponse:", cloudinaryResponse);
                // console.log("cloudinary URL:", cloudinaryFileUrl);
                toast.success(`File ${file.name} uploaded`);



                //   Calculate the cost

                const cost = (roundedDuration * 0.5).toFixed(2);
                console.log("cost", cost)
                setCost((prevCost) => parseFloat(prevCost) + parseFloat(cost));


                setIsPaymentInProgress(true)



                // Call your transcription function here
                // await transcribeFile(cloudinaryFileUrl);
            }
        } catch (error) {
            console.error(`Error in uploading file ${file.name}`, error.message);
        }
    };



    const resetUploadStates = () => {
        setCloudUrls([]);     // Reset cloudUrls array
        setFileNames([]);     // Reset fileNames array
        setProgress([]);      // Reset progress array
        setFile("");          // Reset selected file state
        setFileDuration("");  // Reset file duration state
        // Reset cost state if applicable
        setIsUpload(false);   // Reset upload status

    };

    // Bulk file experiment end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const uploadFile = (file) => {
        return new Promise(async (resolve, reject) => {
            if (!file) {
                console.error('Please select a file.');
                reject('No file selected.');
                return;
            }

            setChunksLOading(true);
            const uniqueUploadId = generateUniqueUploadId();
            const chunkSize = 5 * 1024 * 1024;
            const totalChunks = Math.ceil(file.size / chunkSize);
            let currentChunk = 0;

            console.log("total chunks", totalChunks);

            const uploadChunk = async (start, end) => {
                const formData = new FormData();
                formData.append('file', file.slice(start, end));
                formData.append('cloud_name', CLOUD_NAME);
                formData.append('upload_preset', UPLOAD_PRESET);
                const contentRange = `bytes ${start}-${end - 1}/${file.size}`;

                console.log(`Uploading chunk for uniqueUploadId: ${uniqueUploadId}; start: ${start}, end: ${end - 1}`);

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
                        const nextStart = currentChunk * chunkSize;
                        const nextEnd = Math.min(nextStart + chunkSize, file.size);

                        // Update the progress percentage
                        const progress = Math.round((currentChunk / totalChunks) * 100);
                        console.log("Progress during chunk file upload:", progress);
                        toast(`In progress, ${file.name && file.name} ${progress}% uploaded `, { icon: '👏' });

                        await uploadChunk(nextStart, nextEnd); // Ensure the next chunk is awaited
                    } else {
                        const fetchResponse = await response.json();
                        const cloudinaryFileUrl = fetchResponse.secure_url;
                        setFileNames((prevNames) => [...prevNames, file.name]);
                        setCloudUrls((prevUrls) => [...prevUrls, cloudinaryFileUrl]);
                        toast.success("Audio file uploaded");

                        const duration = fetchResponse.duration;
                        const roundedDuration = (duration / 60).toFixed(1);
                        setFileDurations((prevDurations) => [...prevDurations, roundedDuration]);

                        const cost = (roundedDuration * 0.5).toFixed(2);
                        console.log("Cost:", cost);
                        setCost((prevCost) => parseFloat(prevCost) + parseFloat(cost));

                        setChunksLOading(false);
                        resolve(); // Resolve the promise when done
                    }
                } catch (error) {
                    console.error('Error uploading chunk:', error);
                    reject(error); // Reject the promise on error
                }
            };

            const start = 0;
            const end = Math.min(chunkSize, file.size);
            uploadChunk(start, end);
        });
    };





    const generateUniqueUploadId = () => {
        return `uqid-${Date.now()}`;
    };


    console.log("duration of uploaded file", fileDuration)


    const handleFormClick = () => {
        document.querySelector(".input-field").click();
    };


    const handleTranscriptions = async (event) => {


        event.preventDefault();
        toast.success("Transcriptions started")

        setShowPaymentModal(false)
        setProcessing(true);
        setRunUseEffect(false);
        setIsTranscriptions(true);
        setShowFormModal(false);
        setIsPaymentInProgress(false)



        try {


            if (cost > 0 && cost > userBalance) {
                toast.error("Insufficient credit, Please buy more credit ")

                setProcessing(false)
                return
            }

            console.log("urllllllllllllllllllllllllllll", cloudUrl)


            for (const url of cloudUrls) {
                const params = {
                    audio: url,
                    speaker_labels: true,
                    sentiment_analysis: true,
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
                const currentIndex = cloudUrls.indexOf(url);
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
                        filename: fileNames[currentIndex],
                    };
                    await axios.post(`${import.meta.env.VITE_HOST_URL}/api/save/savePreAudio`, body, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                }

            }
            toast.success("Audio Transcriptions Completed")
            console.log("Transcription data sent successfully in chunks");


            // Update user balance in Firebase
            const newBalance = userBalance - cost; // Assuming `cost` is the transcription cost in state
            await update(ref(database, `users/${user.uid}/credit-payment`), {
                balance: newBalance
            });


            console.log("User balance updated successfully");

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

                <div className='flex flex-col w-full py-3 px-1 md:py-5 md:px-10 bg-bg-color min-h-screen overflow-x-hidden '>

                    {
                        reloadLoading ? <Spinner /> :



                            dbData.length === 0 && isTranscriptions == false ?
                                <div className='   rounded-md flex items-center flex-col  min-h-screen py-5 gap-5'>


                                    <div className='rounded-sm min-h-80 md:w-full shadow-md p-5 flex flex-col  gap-8 h-[300px] bg-blackGray'>
                                        <span className='flex flex-row items-center gap-2 py-5'>
                                            <RxDashboard className='text-3xl' />
                                            <h1 className='text-3xl font-bold font-poppins '> Recent Files</h1>
                                        </span>

                                        <h1 className='text-2xl text-center font-roboto text-white'>Welcome to Captify!</h1>

                                        <div className='flex items-center justify-center'>
                                            {
                                                isPaymentInProgress && <button onClick={() => setShowPaymentModal(!showPaymentModal)} className='text-center p-2 w-20 h-16 
                            rounded-3xl bg-purple-500 text-white text-xl font-medium font-roboto hover:bg-purple-400 '><span className='flex items-center text-center justify-center '>
                                                        <MdPayment size={25} />
                                                    </span></button>
                                            }
                                            <button onClick={() => setShowFormModal(!showFormModal)} className='text-center px-5 py-4 md:w-2/5 h-20
rounded-md bg-bg-purple text-white text-xl font-medium font-roboto hover:bg-purple-500 '><span className='flex items-center text-center justify-center gap-2'>
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
                                    fileDuration={fileDuration}
                                    isPaymentInProgress={isPaymentInProgress}
                                    setShowPaymentModal={setShowPaymentModal}
                                    showPaymentModal={showPaymentModal}
                                    fileNames={fileNames}
                                    cloudUrls={cloudUrls}
                                    fileDurations={fileDurations}

                                />

                    }

                </div>

            </div>
            {showFormModal && (
                <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 ">
                    <div className="bg-bg-navy-blue md:h-[550px] p-5 rounded-lg overflow-y-scroll ">

                        <div className='w-full  flex flex-row items-center justify-end  gap-10 px-5 py-5'>

                            <span className='flex  flex-row items-center gap-2'>
                                <MdOutlineCloudUpload className='md:text-2xl' />
                                <h1 className='md:text-2xl font-bold font-poppins text-white'> Transcribe Files</h1>
                            </span>

                            <MdClose onClick={() => setShowFormModal(!showFormModal)} className='text-end w-10 h-10 cursor-pointer hover:bg-gray-800 p-2 rounded-full ' size={25} />

                        </div>



                        <form onClick={handleFormClick} className='flex flex-col items-center justify-center border-2  border-blue-500 h-64 overflow-y-auto cursor-pointer rounded-md md:w-[400px] w-72'>
                            {
                                !file && <h1 className='text-2xl py-2  font-medium font-roboto'>Upload Audio File</h1>

                            }

                            {
                                cloudUrls.length > 0 && <section className='mx-2  flex flex-col justify-between items-center px-4 py-5 rounded-md gap-2'>

                                    <span className='flex items-center gap-2'>
                                        <AiFillFileImage color='#1475cf' />
                                        <div className="flex flex-col">
                                            {fileNames.map((file, i) => (
                                                <span key={i} className='text-gray-400 '> {file} </span>
                                            ))}
                                        </div>

                                        <MdDelete className='z-50' cursor="pointer"
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                resetUploadStates()
                                            }}
                                        />
                                    </span>

                                    <img className='w-6 h-6 my-3' src="/checked.png" alt="img" />
                                </section>
                            }
                            {
                                isUpload && <div className='flex  items-center flex-col'>

                                    {/* <p className='py-1'>{filename}</p> */}
                                    {Array.isArray(progress) && progress.map((prog, i) => (
                                        <div key={i}>
                                            <p className='py-1'>{`File ${i + 1}: ${prog}%`}</p>
                                            <div className="progress-bar" style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden', width: '100%' }}>
                                                <div className="progress-fill" style={{ width: `${prog}%`, backgroundColor: '#4caf50', height: '15px' }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            }

                            {

                                chunksLoading && <span>

                                    {
                                        uploadingfileNames.map((file, i) => (
                                            <p key={i}>Uploading... {file}</p>
                                        ))
                                    }
                                  



                                </span>
                            }


                            <div className='py-2'>
                                <input
                                    multiple
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
                            <label className="text-sm "> Audio Language</label>
                            <select className=" bg-bg-gray-new  py-3 px-4 text-sm rounded-md outline-none" name="language" id="language">
                                <option disabled>Select Language</option>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="arabic">Arabic</option>
                            </select>

                        </span>
                        <button disabled={!isPaymentDone} onClick={handleTranscriptions} className='text-center px-5 py-4 w-full h-16
rounded-md bg-bg-purple text-white text-xl font-medium font-roboto hover:bg-purple-500 '><span className='flex items-center text-center justify-center gap-2'>
                                <FaCloudUploadAlt size={25} /> <p>Transcribe </p>
                            </span></button>
                    </div>
                </div>
            )}
            {showPaymentModal && (
                <PaymentOptions
                    fileNames={fileNames}
                    fileDurations={fileDurations}
                    cost={cost}
                    setShowPaymentModal={setShowPaymentModal}
                    handlePaymentOptions={handlePaymentOptions}
                    currentBalance={userBalance}
                    handleTranscriptions={handleTranscriptions}
                    setIsPaymentDone={setIsPaymentDone}




                />
            )}


        </div>
    )
}

export default PreAudioTranscriptions
