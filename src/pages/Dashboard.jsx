import React, { useEffect, useRef, useState } from "react";
import TranslatedText from "../components/TranslatedText";
import VoiceRecorder from "../components/VoiceRecorder";
import axios from "axios";
// import LiveTranscription from "../components/LiveTranscription";
import { useDispatch, useSelector } from "react-redux";
import { AddAudio, addTypesTranscriptionsFiles, stopRecordingRed } from "../GlobalState/features/audioSlice";
import { useNavigate } from "react-router-dom";
import { uploadAudioToCloudinary } from "../components/audioUtils";
import Sidebar from "../layout/Sidebar";
import { AiOutlineHome } from "react-icons/ai";
import { BiConversation } from "react-icons/bi";
import { SiTheconversation } from "react-icons/si";
import { CgMoreVertical } from "react-icons/cg";
import NavbarOther from "../components/NavbarOther";

const Dashboard = () => {
 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRecordings = useSelector((state) => state.audio.isRecording);

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudios, setRecordedAudios] = useState([]);
  const [transcription, setTranscriptionResult] = useState("");
  const [showProcessingText, setShowProcessingText] = useState(false);
  const [isPaused, setIsPaused] = useState(false);


  const mediaRecorder = useRef(null);
  const audioRef = useRef(new Audio());
  const chunks = useRef([]);
  const timerRef = useRef(null);
  const videoRef = useRef(null);

  const baseUrl = "https://api.assemblyai.com/v2";

  const headers = {
    authorization: "ce2c1d53c1af4f02a15b539ffd7bc68c",
  };







  const startRecording = async () => {

    try {

      setShowProcessingText(true);
      const microphoneStream = await navigator.mediaDevices.getUserMedia({  audio: {
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
          const utterances = myAudios.transcriptText.utterances;


          const speakerAUtterances = utterances.filter((utterance) => utterance.speaker === 'A');
          const speakerBUtterances = utterances.filter((utterance) => utterance.speaker === 'B');
          

          console.log('Speaker A Utterances:', speakerAUtterances.text);
          console.log('Speaker B Utterances:', speakerBUtterances.text);
          dispatch(addTypesTranscriptionsFiles({ speakerAUtterances, speakerBUtterances }));
          // ... other dispatch or state updates ...
        } catch (error) {
          console.error("Error handling transcript text from cloudinary:", error);
        }
        const audioUrl = URL.createObjectURL(audioBlob);

        setRecordedAudios((prevAudios) => [
          ...prevAudios,
          { url: audioUrl, isSubmitted: false },

        ]);


        audioRef.current.src = audioUrl;


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



  useEffect(() => {


    if (isRecordings) {

      startRecording();


    } else {

      console.log("stop recording")
    }


  }, [isRecordings])

  const stopRecording = () => {


    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {


      mediaRecorder.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      dispatch(stopRecordingRed());
      setRecordingTime(0);

    }
  };



  const handleNavigate = () => {

    navigate("/")



  }




  const pauseRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.pause();
      setIsPaused(true);
      clearInterval(timerRef.current); // Stop the recording timer
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "paused") {
      mediaRecorder.current.resume();
      setIsPaused(false);
      // Continue the recording timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const requestData = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.requestData();
      setIsPaused(false); // Resume after requesting data to continue recording
    }
  };


  const deleteAudio = (index) => {
    setRecordedAudios((prevAudios) => {
      const updatedAudios = [...prevAudios];
      updatedAudios.splice(index, 1);
      return updatedAudios;
    });
  };

  const submitAudio = (index) => {
    setRecordedAudios((prevAudios) => {
      const updatedAudios = [...prevAudios];
      updatedAudios[index].isSubmitted = true;

      return updatedAudios;
    });
  };

  useEffect(() => {

    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    return () => {

      audioRef.current.removeEventListener("ended", () => {
        setIsPlaying(false);


      });
    };

  }, []);

  return (
    <div className="w-full flex  bg-white  h-screen">

      <div className="flex bg-white w-full">

        <Sidebar />



        <div className="w-full flex flex-col  ">

          <NavbarOther />

          <div className="w-full" >
            <div className="w-full" >
            <div className="w-2/6">
  <video ref={videoRef} autoPlay muted className="w-full h-auto" />
</div>
            </div>
            <VoiceRecorder

              startRecording={startRecording}
              stopRecording={stopRecording}

              isRecording={isRecording}
              isPlaying={isPlaying}
              recordingTime={recordingTime}
              recordedAudios={recordedAudios}
              deleteAudio={deleteAudio}
              submitAudio={submitAudio}
              handleNavigate={handleNavigate}
              showProcessingText={showProcessingText}
              isPaused={isPaused}
              pauseRecording={pauseRecording}
              resumeRecording={resumeRecording}
              requestData={requestData}
            />
            <TranslatedText
              transcription={transcription}



            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
