import React, { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import TranscriptSummary from './TranscriptSummary'
import ParametersBox from './ParametersBox'
import GeneralNotes from '../FileNotes/GeneralNotes'
import toast from 'react-hot-toast'
import RecordRTC from 'recordrtc';
import { AssemblyAI } from 'assemblyai'
import axios from 'axios'
import { FaPlay, FaPause, FaStop, FaTrash, FaCheck } from "react-icons/fa";


const MainLayout = () => {

    // states declaration
    const [showNotes, setShowNotes] = useState(false);
    const [transcript, setTranscript] = useState('')
    const [isPaused, setIsPaused] = useState(false);
    const [isRecording, setIsRecording] = useState(false)
    const [progress, setProgress] = useState("")


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


    const handleSwitchChange = () => {
        setShowNotes(prevState => !prevState);
    };


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

    console.log("recorder.current:", recorder.current)

    // Function to upload the audio blob to Cloudinary
    const uploadAudioToCloudinary = async (audioBlob) => {
        try {
            const formData = new FormData();
            formData.append('file', audioBlob); // Ensure correct filename and extension
            formData.append("upload_preset", UPLOAD_PRESET);
            formData.append("cloud_name", CLOUD_NAME);
            formData.append("folder", "Audio");
            formData.append("resource_type", "auto"); // Ensure correct resource type for audio
    
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
            getSpeakerLabels(cloudinarySecureURL);
    
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
                await uploadAudioToCloudinary(audioBlob);
                recorder.current = null; // Reset the recorder
            });
        } else {
            console.log("Recorder is null");
        }

        setIsRecording(false);
    };


    const getSpeakerLabels = async (audioUrl) => {

        console.log("audio url in the getspakerlabels function", audioUrl)
        const params = {
            audio_url: audioUrl,
            speaker_labels: true,
        };

        try {
            const transcript = await client.transcripts.transcribe(params);
            console.log("transcript from the speaker diarazation model", transcript)
            toast.success("Speaker diarization completed ")

        } catch (error) {
            console.error('Error during speaker diarization:', error);
        }
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



    return (
        <div className='min-h-screen w-full flex md:flex-row flex-col'>
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




                    <Button className="mx-2" variant={"customPurple"}>Generate Notes</Button>
                </span>

                <div className='w-full'>
                    <TranscriptSummary
                        transcript={transcript}

                    />
                </div>

                <div className='w-full'>
                    <ParametersBox showNotes={showNotes} handleSwitchChange={handleSwitchChange} />
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
                        showNotes ? <GeneralNotes /> : <div></div>
                    }
                </div>

            </div>




        </div>
    )
}

export default MainLayout
