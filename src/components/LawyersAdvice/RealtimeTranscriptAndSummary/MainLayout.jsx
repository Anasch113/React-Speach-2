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
    const [isEdit, setIsEdit] = useState(false);
    const [formattedTranscript, setFormattedTranscript] = useState("")


    // Refs
    const socket = useRef(null)
    const recorder = useRef(null)
    const texts = useRef({});

    const client = new AssemblyAI({
        apiKey: import.meta.env.VITE_ASSEMBLYAI_KEY
    })

    const cloudinaryBaseUrl = "https://api.cloudinary.com/v1_1/dqtscpu75";
    const CLOUD_NAME = 'dqtscpu75';
    const UPLOAD_PRESET = 'brd5uhci';



    const assemblyAiHeaders = {
        authorization: "ce2c1d53c1af4f02a15b539ffd7bc68c",
        "Content-Type": "application/json",
    };


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

    console.log("transcriptions:", transcriptions)
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


    const generateTranscript = async () => {

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
            console.log("Cloud URL of audio file of live transcription:", cloudinarySecureURL);

            await getSpeakerLabels(cloudinarySecureURL);

        } catch (uploadError) {
            console.error("Error uploading audio:", uploadError);
            console.error("Error details:", uploadError.response ? uploadError.response.data : uploadError.message);
        }
    };



    // Function to end transcription and upload audio
    const endTranscription = async (event) => {
        event.preventDefault();
        toast.success(" Transcription Stopped");

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
            summary_type: "bullets"
        };

        try {

            const transcript = await client.transcripts.transcribe(params);
            setTranscriptions(transcript)
            setSpeakerLabelsText(transcript.utterances)
            setSentimentAnalysis(transcript.sentiment_analysis_results)
            const formatText = extractFormatTranscriptionText(transcript);
            setFormattedTranscript(formatText);
            toast.success("speaker diarazation completed")

        } catch (error) {
            console.error('Error during speaker diarization:', error);
        }
    };





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


    return (
        <div className='min-h-screen w-full flex items-center flex-col'>

            <div className='w-full h-full flex md:flex-row flex-col'>
                {/* 50% width recording and transcript parts */}



                <div className='md:w-2/4 w-full h-full  flex flex-col items-center p-5 gap-5 '>

                    <span className='flex-row flex'>
                        {
                            isRecording ? <Button onClick={endTranscription} className="mx-2" variant={"destructive"}><FaStop className='mx-2' /> Stop Recording</Button>

                                :

                                <Button onClick={generateTranscript} className="mx-2" variant={"customPurple"}>Start Recording <FaPlay className='mx-2' /></Button>
                        }

                        {
                            isPaused && isRecording && <Button onClick={resumeTranscriptions} className="mx-2" variant={"customGreen"}>Resume Recording <FaPlay className='mx-2' /></Button>
                        }

                        {
                            !isPaused && isRecording && <Button onClick={pauseTranscriptions} className="mx-2" variant={"customBlue"}>Pause Recording  <FaPause className='mx-2' /></Button>
                        }



{/* 
                        <Button className="mx-2" variant={"customPurple"}>Generate Notes</Button> */}
                    </span>

                    <div className='w-full'>
                        <TranscriptSummary


                            transcriptions={transcriptions}
                            transcript={transcript}
                            speakerLabelsText={speakerLabelsText}
                            showSpeakerLabels={showSpeakerLabels}
                            wordsIndex={wordsIndex}
                            setTranscriptions={setTranscriptions}
                            isEdit={isEdit}
                            sentimentAnalysis = {sentimentAnalysis}

                        />
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


                    <div className='w-full'>
                        {
                            showNotes ? <GeneralNotes

                                transcript={transcript}
                                transcriptions={transcriptions}
                                formattedTranscript={formattedTranscript}

                            /> : <div></div>
                        }
                    </div>

                    <div className='w-full'>

                        {
                            showTasks ? <Tasks

                                transcript={transcript}
                                transcriptions={transcriptions}

                            /> : <div></div>
                        }

                    </div>

                    <div className='w-full'>

                        {
                            showSummary ? <GeneralSummary

                                transcript={transcript}
                                transcriptions={transcriptions}

                            /> : <div></div>
                        }

                    </div>



                </div>
            </div>


            <div className={`fixed-bottom ${!isVisible ? 'hidden-audio-box' : 'px-5 py-5 border flex items-center justify-center bg-bg-navy-blue'}`}>
                <CustomAudioPlayer
                    calculateHighlightedIndex={calculateHighlightedIndex}
                    audioUrl={transcriptions.audio_url}
                    transcriptions={transcriptions}
                />
            </div>

        </div>
    )
}

export default MainLayout
