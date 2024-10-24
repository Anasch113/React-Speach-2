import React, { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import TranscriptSummary from './TranscriptSummary'
import ParametersBox from './ParametersBox'
import GeneralNotes from '../FileNotes/GeneralNotes'
import toast from 'react-hot-toast'
import RecordRTC from 'recordrtc';
import { AssemblyAI } from 'assemblyai'
import axios from 'axios'
import "../styles/style.css"
// import { uploadAudioToCloudinary } from "../../StartingFeatures/audioUtils";
import { FaPlay, FaPause, FaStop, FaTrash, FaCheck } from "react-icons/fa";
import SpeakerDiarization from './SpeakerDiarization'
import CustomAudioPlayer from '@/components/PreAudio/CustomAudioPlayer'
import Tasks from '../OutlookTasks/Tasks'
import GeneralSummary from './GeneralSummary'
import { useUserAuth } from '@/context/UserAuthContext'
import PaymentModal from './PaymentModal'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdOutlineTimer } from "react-icons/md";
import { ref, update } from "firebase/database"
import { database } from '../../../firebase'
import { useSelector, useDispatch } from 'react-redux';
import { useLiveTranscript } from "../../../GlobalState/customHooks/useLiveTranscript"

import VirtualTranscriptBox from '../VirtualTranscript/VirtualTranscriptBox'
import ZoomAuthorization from '@/components/RealTimeTranscript/virtualTranscript/ZoomAuthorization'
import CaseNoteVirtualMeetingLink from '../VirtualTranscript/CaseNoteVirtualMeetingLink'
import ProcessIndication from '../Enhance Usability/ProcessIndication'
import InPersonStreamControl from '../Enhance Usability/InPersonStreamControl'
import VirtualStreamControl from '../Enhance Usability/VirtualStreamControl'
import { setIsVtRecording, setIsProcessing } from "../../../GlobalState/features/liveTranscriptUISlice"
import DownloadCaseNote from '../Enhance Usability/DownloadCaseNote'


const MainLayout = () => {

    // states declaration
    const [showNotes, setShowNotes] = useState(false);
    const [showSpeakerLabels, setShowSpeakerLabels] = useState(false);
    const [showTasks, setShowTasks] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [transcript, setTranscript] = useState('')
    const [transcriptions, setTranscriptions] = useState([])
    const [sentimentAnalysis, setSentimentAnalysis] = useState([])
    const [isPaused, setIsPaused] = useState(false);
    const [isRecording, setIsRecording] = useState(false)
    const [progress, setProgress] = useState("")
    const [speakerLabelsText, setSpeakerLabelsText] = useState([])
    const [wordsIndex, setWordsIndex] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [isTranscriptionsReady, setIsTranscriptionsReady] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formattedTranscript, setFormattedTranscript] = useState("")
    const [notes, setNotes] = useState([])
    const [isNotes, setIsNotes] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [cost, setCost] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isMeetingStart, setIsMeetingStart] = useState(false)
    const [language, setLanguage] = useState("en_us")
    const [wholeProcessing, setIsWholeProcessing] = useState(false)


    // Refs
    const socket = useRef(null)
    const recorder = useRef(null)
    const texts = useRef({});


    const location = useLocation();
    const navigate = useNavigate();

    const client = new AssemblyAI({
        apiKey: import.meta.env.VITE_ASSEMBLYAI_KEY
    })

    const cloudinaryBaseUrl = "https://api.cloudinary.com/v1_1/db9lgwk1d";

    const CLOUD_NAME = 'db9lgwk1d';
    const UPLOAD_PRESET = 'iy2lwq5b';

    const { user, userBalance } = useUserAuth();

    const dispatch = useDispatch();
    const { zoomAccessToken, liveTranscript, finalTranscript, transcriptType, meetingStatus, meetingError, url, botId, isVtRecording, isProcessing } = useSelector((state) => state.liveTranscript.virtualTranscript)

    const { stopVirtualTranscriptions } = useLiveTranscript();

    const assemblyAiHeaders = {
        authorization: "ce2c1d53c1af4f02a15b539ffd7bc68c",
        "Content-Type": "application/json",
    };
    console.log("botid in mainlayot", botId)

    const handleSwitchChange = (identifier) => {

        if (sentimentAnalysis.length > 0) {


            if (identifier === 'notes') {
                setShowNotes(prevState => !prevState);

            } else if (identifier === 'speakerLabels') {

                setShowSpeakerLabels(prevState => !prevState);
            }
            else if (identifier === 'edit') {
                setIsEdit(prevState => !prevState);
                if (isEdit === false) {
                    toast.success("Click on the transcript to edit!")
                }
            }
            else if (identifier === 'tasks') {

                setShowTasks(prevState => !prevState);
            }
            else if (identifier === "summary") {
                setShowSummary(prevState => !prevState)
            }
        }

        else {
            toast("There is no transcriptions yet")
        }

    };

    useEffect(() => {

        if (isTranscriptionsReady) {
            setShowSpeakerLabels(true)
            setShowSummary(true)
            setShowTasks(true)
            setShowNotes(true)
        }


    }, [isTranscriptionsReady])


    // >>>>>>>>>>>>>>>> UI Logics >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    useEffect(() => {
        let timeout;
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsVisible(false);
                timeout = setTimeout(() => setIsVisible(true), 500); // Hide for 500ms
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeout);
        };
    }, []);

    //>>>>>>>>>>>>>>>>>>>>>>>> Live Transcriptions code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    const generateTranscript = async (method) => {


        if (method === "notecase-credit" && total > 0 && total > userBalance) {
            toast.error("Insufficient credit, Please buy more credit ")

            return
        }

        if (method === "notecase-credit" && total > 0) {

            // Update user balance in Firebase
            const newBalance = userBalance - total; // Assuming `cost` is the transcription cost in state
            await update(ref(database, `users/${user.uid}/credit-payment`), {
                balance: newBalance
            });
            setIsPurchase("completed")

        }


        const response = await fetch(`${import.meta.env.VITE_HOST_URL}/token`);
        const data = await response.json();

        toast.success(" Transcription Started")
        setIsRecording(true)

        if (data.error) {
            alert(data.error)
        }

        const { token } = data;

        socket.current = await new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`);



        socket.current.onmessage = (voicePrompt) => {


            if (isPaused) return;



            let msg = '';
            const res = JSON.parse(voicePrompt.data);
            texts.current[res.audio_start] = res.text;
            const keys = Object.keys(texts.current);
            keys.sort((a, b) => a - b);
            for (const key of keys) {
                if (texts.current[key]) {
                    msg += ` ${texts.current[key]}`;

                }
            }

            setTranscript(msg)
        };

        socket.current.onerror = (event) => {
            console.error(event);
            socket.current.close();
        }

        socket.current.onclose = event => {
            console.log("event close", event);
            socket.current = null;
        }

        socket.current.onopen = () => {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    recorder.current = new RecordRTC(stream, {
                        type: 'audio',
                        mimeType: 'audio/webm;codecs=pcm',
                        recorderType: RecordRTC.StereoAudioRecorder,
                        timeSlice: 250,
                        desiredSampRate: 16000,
                        numberOfAudioChannels: 1,
                        bufferSize: 4096,
                        audioBitsPerSecond: 128000,
                        ondataavailable: (blob) => {
                            if (isPaused) return;
                            const reader = new FileReader();
                            reader.onload = () => {
                                const base64data = reader.result;
                                if (socket.current) {
                                    socket.current.send(JSON.stringify({ audio_data: base64data.split('base64,')[1] }));
                                }
                            };
                            reader.readAsDataURL(blob);
                        },
                    });
                    recorder.current.startRecording();
                })
                .catch((err) => console.error(err));
        };


    }



    // Function to upload the audio blob to Cloudinary

    const uploadAudioToCloudinary = async (audioBlob) => {
        try {
            const formData = new FormData();
            formData.append('file', audioBlob); // Ensure correct filename and extension
            formData.append("upload_preset", UPLOAD_PRESET);
            formData.append("cloud_name", CLOUD_NAME);
            formData.append("folder", "Audio");
            // Ensure correct resource type for audio

            const cloudinaryResponseData = await axios.post(`${cloudinaryBaseUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure correct Content-Type
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setProgress(progress);
                    console.log(`Upload Progress: ${progress}%`);
                }
            });

            console.log("cloudinaryResponseData", cloudinaryResponseData.data)

            const cloudinarySecureURL = cloudinaryResponseData.data.secure_url;
            console.log("Cloud URL of audio file of live transcriptionnnnnnnnnnnnnnnnnnn:", cloudinarySecureURL);

            await getSpeakerLabels(cloudinarySecureURL);

        } catch (uploadError) {
            console.error("Error uploading audio:", uploadError);
            console.error("Error details:", uploadError.response ? uploadError.response.data : uploadError.message);
        }
    };



    // Function to end transcription and upload audio
    const endTranscription = async () => {

        toast.success(" Recording stopped, Note case Transcriptions are getting ready!");
        dispatch(setIsProcessing(true))

        if (socket.current) {
            socket.current.send(JSON.stringify({ terminate_session: true }));
            socket.current.close();
            console.log("Socket closed");
        }

        if (recorder.current) {
            console.log("Stopping recorder...");
            recorder.current.stopRecording(async () => {
                const audioBlob = recorder.current.getBlob();
                console.log("Audio blob created:", audioBlob);
                const myAudios = await uploadAudioToCloudinary(audioBlob)
                // setSpeakerLabelsText(myAudios.transcriptText.utterances)

                recorder.current = null; // Reset the recorder
            });
            setRemainingTime()
        } else {
            console.log("Recorder is null");
        }

        setIsRecording(false);
    };


    const getSpeakerLabels = async (audioUrl) => {


        const params = {
            audio: audioUrl,
            speaker_labels: true,
            sentiment_analysis: true,
            summarization: true,
            summary_model: "informative",
            summary_type: "bullets",
            language_code: language
        };

        try {

            const transcript = await client.transcripts.transcribe(params);


            if (transcript.text === "") {
                setIsTranscriptionsReady(false)
                dispatch(setIsProcessing(false))
                toast.error("Your Transcript is very short or irrelevant")
                return
            }
            else {


                setTranscriptions(transcript)
                console.log("transcripttttttt", transcript)
                setSpeakerLabelsText(transcript.utterances)
                setSentimentAnalysis(transcript.sentiment_analysis_results)
                const formatText = extractFormatTranscriptionText(transcript);
                setFormattedTranscript(formatText);

                await hanldeTasks(transcript)

                const notesArray = await handleGenerateNotes(formatText);

                // Make sure notesArray is generated and call sendSummaryAndNotesToEmail
                if (notesArray) {
                    await sendSummaryAndNotesToEmail(transcript.summary, notesArray);

                    toast.success("Note case Transcriptions ready!");
                }
                setIsTranscriptionsReady(true)
                dispatch(setIsProcessing(false))
            }




        } catch (error) {
            console.error('Error during speaker diarization:', error);
        }
    };


    console.log("istranscriptions-ready:", isTranscriptionsReady)


    // Function to extract the formatted text from transcriptions
    const extractFormatTranscriptionText = (transcriptions) => {
        if (!transcriptions || !transcriptions.sentiment_analysis_results || !transcriptions.utterances) return '';

        let text = '';

        transcriptions.sentiment_analysis_results.forEach((sentiment, i) => {
            const utterance = transcriptions.utterances.find(u =>
                u.start <= sentiment.start && u.end >= sentiment.end
            );

            if (utterance) {
                text += `Speaker ${utterance.speaker}: `;
            }

            text += `${sentiment.text} `;
        });

        return text.trim(); // Trim any extra spaces at the end
    };


    // Pause function
    const pauseTranscriptions = () => {
        toast.success(" Transcription Paused")
        setIsPaused(true);
        if (recorder.current) {
            recorder.current.pauseRecording();
            clearTimeout(timerRef.current);
        }




    }

    // Resume function
    const resumeTranscriptions = () => {
        toast.success(" Transcription Resumed")
        setIsPaused(false);
        if (recorder.current) {
            recorder.current.resumeRecording();
        }
    }

    // // Stop function
    // const stopVirtualTranscriptionsCaseNote = async () => {
    //     try {
    //         toast.success(" Transcription stopped")


    //         const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/virtual-transcript/stop-virtual-transcription`, {
    //             botId: botId,
    //         });
    //         console.log("stop response:", response.data)
    //         dispatch(setIsVtRecording(false))
    //     } catch (error) {
    //         console.log("error while stopping virtual transcriptions", error)
    //     }
    // }



    // >>>>>>>>>>>>>>>>>>>>>>>>> Audio play back code >>>>>>>>>>>>>>>>>>>>>>>>





    const calculateHighlightedIndex = (currentTime) => {
        currentTime *= 1000;
        console.log("currentTime", currentTime)
        // Get the segment analysis results from the transcriptions state
        // const segments = transcriptions.sentiment_analysis_results;



        const segments = transcriptions.sentiment_analysis_results

        // Iterate through each segment to find the one that matches the current time
        for (let i = 0; i < segments.length; i++) {
            // Extract start and end times of the current segment
            const { start, end } = segments[i];

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

    //>>>>>>>>>>>>>>>>>>>>>>> Tasks code >>>>>>>>>>>>>>>>>>>>>>>>>>



    const [tasksData, setTasksData] = useState([])



    const hanldeTasks = async (transcript) => {
        try {

            const body = {

                transcript: transcript
            }

            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/tasks/create-tasks`, body, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success("Tasks Generated Successfully")
            const data = response.data;
            setTasksData(data.tasks)

        } catch (error) {
            console.log("error:", error)
        }

    }


    // >>>>>>>>>>>>>>>>>>>>>>>>>>> Sending Summary to User Email >>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const sendSummaryAndNotesToEmail = async (summary, notesArray) => {


        try {
            const body = {
                summary: summary,
                notes: notesArray,
                email: user.email
            }
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/generate-notes/send-summary`, body, {
                headers: {
                    "Content-Type": "application/json"
                }
            })


        } catch (error) {
            console.log("error", error)
        }


    }


    // Notes Generation Code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const handleGenerateNotes = async (formattedText) => {
        toast.success("In progress, please wait for shortly");

        const body = {
            transcript: formattedText
        };

        setIsNotes(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/generate-notes/generate`, body, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = response.data.notesArray;

            if (data) {
                setNotes(data);  // Update the state
                toast.success("Notes generation completed");
                return data;  // Return notesArray to be used in function 1
            } else {
                throw new Error("No notes generated");
            }

        } catch (error) {
            console.error('Error generating notes:', error);
            throw error;
        }
    };
    console.log("formatted transcript", formattedTranscript)



    // Payment Integration for notecase >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const [minutes, setMinutes] = useState(0)
    const [isPurchase, setIsPurchase] = useState("")
    const [remainingTime, setRemainingTime] = useState()
    const [isPaymentDone, setIsPaymentDone] = useState(false)
    const [total, setTotal] = useState(0);
    const timerRef = useRef(null);




    const isPurchaseFromLocation = location.state?.isPurchase;
    const minutesFromLocation = location.state?.minutes;
    const languageFromLocation = location.state?.language;

    console.log("language from locationnnnn", languageFromLocation)


    useEffect(() => {
        if (isPurchaseFromLocation === "completed" && minutesFromLocation) {
            setIsPurchase(isPurchaseFromLocation)
            setMinutes(minutesFromLocation)
            setLanguage(languageFromLocation)


        }
        // Clear the state from the URL
        navigate(location.pathname, { replace: true });
    }, [isPurchaseFromLocation, minutesFromLocation])



    useEffect(() => {
        if (isPurchase === "completed") {
            setRemainingTime(minutes * 60)

            setIsPaymentDone(true);

            if (total === 0) {
                generateTranscript()
            }


            // Cleanup function to clear the timer if the component unmounts or the effect runs again
            return () => {
                clearTimeout(timerRef.current);

            };
        }
    }, [isPurchase]);


    useEffect(() => {
        if (!isPaused && remainingTime > 0) {
            timerRef.current = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerRef.current);
        } else if (remainingTime == 0) {
            endTranscription();
            toast.success("Your time for note case live meeting has been ended");
        }
    }, [isPaused, remainingTime]);


    console.log("remaining time", remainingTime)




    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    console.log("total", total)



    const handleZoomAuthorization = () => {
        window.location.href = `${import.meta.env.VITE_HOST_URL}/virtual-transcript/zoom-login`;
    }


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        // Set isOpen to true if token is present
        if (token) {
            setIsOpen(true); // Open the modal if token is present
        }

        console.log("token", token);

    }, [location]);








    useEffect(() => {

        if (transcriptType === "final-transcript") {
            try {
                console.log("url is sent to cloudinary");
                toast.success("url is sent to cloudinary")
                uploadAudioToCloudinary(url)
            } catch (error) {
                console.log("error", error)
            }


        }
    }, [url, finalTranscript])

    console.log("selected language of case note:", language)

    return (
        <div className='min-h-screen w-full flex  '>

            <div className='min-h-screen w-full flex items-center flex-col'>

                <div className='w-full h-full flex md:flex-row flex-col'>
                    {/* 50% width recording and transcript parts */}



                    <div className='md:w-2/4 w-full h-full  flex flex-col items-center p-5 gap-5 '>

                        <span className='flex-row flex'>
                            {
                                isRecording ? <Button onClick={endTranscription} className="mx-2" variant={"destructive"}><FaStop className='mx-2' /> In-person Meeting</Button>

                                    :

                                    <PaymentModal
                                        total={total}
                                        setTotal={setTotal}
                                        generateTranscript={generateTranscript}
                                        initialMinutes={minutes}
                                        setInitialMinutes={setMinutes}
                                        setLanguage = {setLanguage}
                                        language = {language}
                                    />


                            }

                            {
                                zoomAccessToken === "" ? <ZoomAuthorization
                                    buttonName={zoomAccessToken === "" ? "Virtual Meeting" : ""}
                                    handleZoomAuthorization={handleZoomAuthorization}
                                    navigateUrl="case-note"
                                />
                                    :

                                    transcriptType === "" ?

                                        <Button onClick={() => {
                                            setIsOpen(true);
                                        }} className="mx-2" variant={"lightPurpleMeetingBtn"}>Paste Meeting Link </Button>
                                        :
                                        transcriptType === "final-transcript" ?

                                            isTranscriptionsReady === false ?

                                                <Button className="mx-2" variant={"customBlue"}> Meeting Finished, Case Note in progress </Button> :

                                                <Button className="mx-2" variant={"customGreen"}
                                                > Case Note Transcriptions are Ready </Button>



                                            : transcriptType === "realtime" && <Button className="mx-2" variant={"lightPurpleMeetingBtn"}>Meeting In Progress </Button>




                            }
                            {
                                isVtRecording && <Button onClick={stopVirtualTranscriptions} className="mx-2" variant={"destructive"}><FaStop className='mx-2' /> Virtual Transcript</Button>
                            }

                            <CaseNoteVirtualMeetingLink
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                setIsMeetingStart={setIsMeetingStart}

                            />


                            <InPersonStreamControl
                                isPaused={isPaused}
                                resumeTranscriptions={resumeTranscriptions}
                                isRecording={isRecording}
                                pauseTranscriptions={pauseTranscriptions}
                                remainingTime={remainingTime}
                                formatTime={formatTime}
                            />
                            <VirtualStreamControl

                            />

                            {/* 
                        <Button className="mx-2" variant={"customPurple"}>Generate Notes</Button> */}
                        </span>

                        <div className='w-full'>
                            {
                                isMeetingStart === false && transcriptType === null ?

                                    <TranscriptSummary


                                        transcriptions={transcriptions}
                                        transcript={transcript}
                                        speakerLabelsText={speakerLabelsText}
                                        showSpeakerLabels={showSpeakerLabels}
                                        wordsIndex={wordsIndex}
                                        setTranscriptions={setTranscriptions}
                                        isEdit={isEdit}
                                        sentimentAnalysis={sentimentAnalysis}
                                        isTranscriptionsReady={isTranscriptionsReady}

                                    /> :

                                    <VirtualTranscriptBox
                                        transcriptions={transcriptions}
                                        transcript={transcript}
                                        speakerLabelsText={speakerLabelsText}
                                        showSpeakerLabels={showSpeakerLabels}
                                        wordsIndex={wordsIndex}
                                        setTranscriptions={setTranscriptions}
                                        isEdit={isEdit}
                                        sentimentAnalysis={sentimentAnalysis}
                                        isTranscriptionsReady={isTranscriptionsReady}
                                    />
                            }
                        </div>

                        <div className='w-full'>

                            <ParametersBox

                                showSpeakerLabels={showSpeakerLabels}
                                showNotes={showNotes}
                                handleSwitchChange={handleSwitchChange}
                                isEdit={isEdit}
                                showTasks={showTasks}
                                showSummary={showSummary}

                            />
                        </div>


                    </div>



                    {/* 50% width notes parts */}
                    <div className='md:w-2/4 w-full h-full  flex flex-col items-center p-5 gap-5 '>

                        <span className='flex-row flex my-5 md:my-0'>
                            <Button className="mx-2" variant={"customPurple"}>Copy All Text</Button>
                            <Button className="mx-2" variant={"customPurple"}>New Client</Button>
                        </span>


                        {/* Section for updating user about process proress */}
                        <div className='w-full'>

                            {
                                isProcessing && <ProcessIndication

                                />
                            }

                        </div>

                        <div>
                            {
                                isTranscriptionsReady && <DownloadCaseNote
                                    transcriptions={transcriptions}
                                    audioUrl={transcriptions.audio_url}
                                    tasks={tasksData}
                                    notes={notes}



                                />
                            }
                        </div>

                        {/* Section for showing the general summary */}
                        <div className='w-full'>

                            {
                                showSummary ? <GeneralSummary

                                    transcript={transcript}
                                    transcriptions={transcriptions}

                                /> : <div></div>
                            }

                        </div>

                        {/* Section for displaying the general notes */}
                        <div className='w-full'>
                            {
                                showNotes ? <GeneralNotes

                                    transcript={transcript}
                                    transcriptions={transcriptions}
                                    formattedTranscript={formattedTranscript}
                                    setNotes={setIsNotes}
                                    isNotes={isNotes}
                                    notes={notes}
                                    setIsNotes={setIsNotes}

                                /> : <div></div>
                            }
                        </div>

                        {/* Section for displaying the tasks */}

                        <div className='w-full'>

                            {
                                showTasks ? <Tasks

                                    transcript={transcript}
                                    transcriptions={transcriptions}
                                    tasksData={tasksData}

                                /> : <div></div>
                            }

                        </div>
                    </div>
                </div>

                {/* Section for audio playback */}
                <div className={`fixed-bottom ${!isVisible ? 'hidden-audio-box' : 'px-5 py-5 border flex items-center justify-center bg-bg-navy-blue'}`}>
                    <CustomAudioPlayer
                        calculateHighlightedIndex={calculateHighlightedIndex}
                        audioUrl={transcriptions.audio_url}
                        transcriptions={transcriptions}
                    />
                </div>



            </div>
        </div>
    )
}

export default MainLayout
