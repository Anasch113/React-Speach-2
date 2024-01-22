import React, { useEffect, useRef, useState } from "react";
import TranslatedText from "../components/TranslatedText";
import VoiceRecorder from "../components/VoiceRecorder";
import axios from "axios";
import LiveTranscription from "../components/LiveTranscription";
import { useDispatch, useSelector } from "react-redux";
import { AddAudio, stopRecordingRed } from "../GlobalState/features/audioSlice";
import { useNavigate } from "react-router-dom";
import { uploadAudioToCloudinary } from "../components/audioUtils";

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRecordings = useSelector((state) => state.audio.isRecording);

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudios, setRecordedAudios] = useState([]);
  const [transcription, setTranscriptionResult] = useState("");
  console.log(transcription);
  const mediaRecorder = useRef(null);
  const audioRef = useRef(new Audio());
  const chunks = useRef([]);
  const timerRef = useRef(null);

  const baseUrl = "https://api.assemblyai.com/v2";

  const headers = {
    authorization: "ce2c1d53c1af4f02a15b539ffd7bc68c",
  };







const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const speakerStream = await navigator.mediaDevices.getDisplayMedia({ audio: true });

 // Combine microphone and speaker streams
 const combinedStream = new MediaStream();
 combinedStream.addTrack(stream.getAudioTracks()[0]);
 combinedStream.addTrack(speakerStream.getAudioTracks()[0]);

  // Create MediaRecorder with the combined stream
  mediaRecorder.current = new MediaRecorder(combinedStream);
    

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.current.push(event.data);
      }
    };

    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
      try {

        const myAudios = await uploadAudioToCloudinary(audioBlob);
        console.log("Your Audios cloudinary url",myAudios)
     const claudiourl =    dispatch(AddAudio({ text: myAudios }));
     console.log("url sending to redux",claudiourl)
       
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

      // Step 3: Upload the local file to the AssemblyAI API
      const uploadResponse = await axios.post(
        `${baseUrl}/upload`,
        audioBlob,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data", // Set the content type for FormData
          },
        }
      );

      const uploadUrl = uploadResponse.data.upload_url;

      // Step 4: Create a JSON payload with the audio_url parameter
      const data = {
        audio_url: uploadUrl, // Use the upload_url returned by the AssemblyAI API
      };

      // Step 5: Make a POST request to the AssemblyAI API endpoint with the payload and headers
      const transcriptUrl = `${baseUrl}/transcript`;
      const response = await axios.post(transcriptUrl, data, { headers });

      // Step 6: Poll the API to check the status of the transcription
      const transcriptId = response.data.id;
      const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`;

      while (true) {
        const pollingResponse = await axios.get(pollingEndpoint, {
          headers: headers,
        });
        const transcriptionResult = pollingResponse.data;

        if (transcriptionResult.status === "completed") {
          console.log(transcriptionResult.text);
          setTranscriptionResult(transcriptionResult.text);
          break;
        } else if (transcriptionResult.status === "error") {
          throw new Error(
            `Transcription failed: ${transcriptionResult.error}`
          );
        } else {
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    };

    mediaRecorder.current.start();
    setIsRecording(true);

    // Start recording timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  } catch (error) {
    console.error("Error starting recording:", error);
  }
};



useEffect(()=>{


  if(isRecordings){

  startRecording();

  
  } else{
  
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



  const handleNavigate = ()=>{
    
    navigate("/")

    
    
  }

  

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
    <div className="flex flex-col space-y-10 bg-white shadow-lg h-screen">
      <div>
        <h1 className="text-4xl">Speech Recognition</h1>
      </div>
      <div className="flex bg-white justify-center">
        <div className="flex-1">
          <VoiceRecorder
         
            startRecording={startRecording}
            stopRecording={stopRecording}
            togglePlayback={togglePlayback}
            isRecording={isRecording}
            isPlaying={isPlaying}
            recordingTime={recordingTime}
            recordedAudios={recordedAudios}
            deleteAudio={deleteAudio}
            submitAudio={submitAudio}
            handleNavigate = {handleNavigate}
          />
        
        </div>
        
        <div className="flex-1">
          <TranslatedText transcription={transcription} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
