import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
// import LiveTranscription from "../components/LiveTranscription";
import { useDispatch, useSelector } from "react-redux";
import {  addTypesTranscriptionsFiles, AddAudio, setVideoStream, addSummary  } from "../GlobalState/features/audioSlice";
import { useNavigate } from "react-router-dom";
import { uploadAudioToCloudinary } from "../components/audioUtils";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaStop } from "react-icons/fa";
import MainContent from "../layout/MainContent";






const MeetingRecord = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudios, setRecordedAudios] = useState([]);
  const [transcription, setTranscriptionResult] = useState("");
  const [showProcessingText, setShowProcessingText] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState("");
  const [inMeeting, setInMeeting] = useState("");
  const [videoStream, setVideoStream] = useState(null);
  const [isWidgetExpanded, setIsWidgetExpanded] = useState(false);


  const mediaRecorder = useRef(null);
  const audioRef = useRef(new Audio());
  const chunks = useRef([]);
  const timerRef = useRef(null);
  const videoRef = useRef(null);

  const baseUrl = "https://api.assemblyai.com/v2";

  const headers = {
    authorization: "ce2c1d53c1af4f02a15b539ffd7bc68c",
  };



  const handleAddBotClick = () => {
    setInMeeting("started");
    const parameters = {
      meetingUrl: meetingUrl,
      language: "en-US",
      apiKey:
        "3236176ddc860778dd758be8966bd000af3ef512c9e7c3c3d5b0e1435c62d8b486516f90088f3cc396480b75ddccc424f31915417164f75b57e78944eddcce46",
    };

    axios.get("https://api.transkriptor.com/7/Add-Bot-to-Meeting", {
        params: parameters,
      })
      .then((response) => {
        console.log("response from transkriptor api",response.data);
        // Handle success, e.g., show a success message to the user
        setInMeeting("inmeeting");
      })
      .catch((error) => {
        console.log(error);
        // Handle error, e.g., show an error message to the user
        setInMeeting("Error");
      });
  };



  const startRecording = async () => {

    try {

      setShowProcessingText(true);


      
      const microphoneStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,

      }, });
      
       
      // Get camera video stream (including audio)
      const cameraStream = await navigator.mediaDevices.getDisplayMedia({

        video: {
          mediaSource: "screen",
          cursor: "always",
        },

        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,

        },

      });
      // Combine microphone and speaker streams
      const combinedStream = new MediaStream();

      combinedStream.addTrack(microphoneStream.getAudioTracks()[0]);
      combinedStream.addTrack(cameraStream.getVideoTracks()[0]);
      // Create MediaRecorder with the combined stream

    

    mediaRecorder.current = new MediaRecorder(combinedStream);

      // Previous part

      mediaRecorder.current.ondataavailable = (event) => {

        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {

        const audioBlob = new Blob(chunks.current, { type: "video/webm" });
        try {

          const myAudios = await uploadAudioToCloudinary(audioBlob);
          console.log("myAudios:", myAudios);
          console.log("uterances", myAudios.transcriptText.utterances);
          console.log("Your Audios cloudinary url", myAudios.cloudinaryFileUrl);
          setTranscriptionResult(myAudios.transcriptText.text);
          console.log("Transcriptions", myAudios.transcriptText.text);
          const claudiourl = dispatch(AddAudio({ text: myAudios }));
          console.log("data sending to redux", claudiourl);
          console.log("Summary: ", myAudios.summary);
          const summary =  myAudios.summary;
          
          dispatch(addSummary({summary}));

          const utterances = myAudios.transcriptText.utterances;

          const speakerAUtterances = utterances.filter((utterance) => utterance.speaker === 'A');
          const speakerBUtterances = utterances.filter((utterance) => utterance.speaker === 'B' |  'UNK' );
          

          console.log('Speaker A Utterances:', speakerAUtterances.text);
          console.log('Speaker B Utterances:', speakerBUtterances.text);
       const utterancesTranscription =   dispatch(addTypesTranscriptionsFiles({ speakerAUtterances, speakerBUtterances }));
          console.log("transcriptions in meeting record",utterancesTranscription);
          
          // ... other dispatch or state updates ...
        } catch (error) {
          console.error("Error handling transcript text from cloudinary:", error);
        }
        
      };

      mediaRecorder.current.start();
      setIsRecording(true);
     
    videoRef.current.srcObject = cameraStream;
    
    
    
      // Start recording timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
      
      
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };



  // const expandWidget = () => {
  //   setIsWidgetExpanded(!isWidgetExpanded);
  // };

  
  const stopRecording = () => {


    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {

      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      mediaRecorder.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    
      setRecordingTime(0);

    }
  };



  return (
    <div className="flex items-center gap-2">
    
      {/* Record Button */}
      {inMeeting === "Error" && isRecording ? (
        <div className="flex items-center gap-1">
         
          {isRecording && (
            <button
              onClick={stopRecording}
              className="bg-red-200 flex items-center space-x-2 hover:bg-red-300 text-gray-800 py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
            >
              <FaStop />
              <p>Stop</p>
            </button>
          )}
        </div>
      ) : (
        <>
          <input
            value={meetingUrl}
            onChange={(e) => setMeetingUrl(e.target.value)}
            type="text"
            placeholder="Enter Meeting URL"
            className="px-3 py-2 border border-border-dark-color rounded-md focus:outline-none focus:border-blue-500 w-[150px]"
          />
          <button
            onClick={() => {
              handleAddBotClick();
              startRecording();
            
              
            }}
            className="bg-bg-blue text-white px-4 py-2 flex rounded-md focus:outline-none hover:bg-blue-400 "
          >
            {inMeeting === "started" ? (
              <div className="mr-1 mt-1 animate-spin">
                <AiOutlineLoading3Quarters />
              </div>
            ) : (
              <div className="mr-1 mt-1">
                <MdOutlineKeyboardVoice />
              </div>
            )}

            <div>Record</div>
          </button>
         
         
        </>
      )}
    </div>
  );
};

export default MeetingRecord;
