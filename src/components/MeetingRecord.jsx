import React, { useState, useRef, useEffect } from "react";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaStop } from "react-icons/fa";
import axios from "axios";
import { FaUserCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddAudio,
  AddtranscriptFile,
    // Import startRecording action
    // Import stopRecording action
} from "../GlobalState/features/audioSlice";
import { startRecordingRed, stopRecordingRed } from "../GlobalState/features/audioSlice";



const MeetingRecord = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const audioFiles = useSelector((state) => state.audio.audioFiles);
  const isRecordings = useSelector((state)=> state.audio.isRecording);
  const [fileUrl, setFileUrl] = useState();
  const [meetingUrl, setMeetingUrl] = useState("");
  const [inMeeting, setInMeeting] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscriptionResult] = useState("");
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const timerRef = useRef(null);
  let fileContent = "";

  const handleAddBotClick = () => {
    setInMeeting("started");
    const parameters = {
      meetingUrl: meetingUrl,
      language: "en-US",
      apiKey:
        "1af56edd7650b135862a411d2f05661f1e5bc979449dfead7a2bb4d7ec19dee08ab4d1a9272571d379705c6edd11013dc249fbe96cf2e8cfb9f2a2f5ae5ed818",
    };

    axios.get("https://api.transkriptor.com/7/Add-Bot-to-Meeting", {
        params: parameters,
      })
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., show a success message to the user
        setInMeeting("InMeeting");
      })
      .catch((error) => {
        console.log(error);
        // Handle error, e.g., show an error message to the user
        setInMeeting("Error");
      });
  };

  // recording code
  const baseUrl = "https://api.assemblyai.com/v2";

  const headers = {
    authorization: "ce2c1d53c1af4f02a15b539ffd7bc68c",
  };



  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // dispatch(AddAudio({ url: audioUrl }));
        // setRecordedAudios((prevAudios) => [
        //   ...prevAudios,
        //   { url: audioUrl, isSubmitted: false },
        // ]);

        // audioRef.current.src = audioUrl;

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
          speaker_labels: true,
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
            
            const utterances = transcriptionResult.utterances;
            // Iterate through each utterance and print the speaker and the text they spoke
            for (const utterance of utterances) {
              const speaker = utterance.speaker;
              const text = utterance.text;
              dispatch(
                AddAudio({
                  speaker: speaker,
                  text: text,
                })
              );
              fileContent += `${utterance.speaker}: ${utterance.text}\n`;
              console.log("working");
            }
            console.log(transcriptionResult.text);
            setTranscriptionResult(transcriptionResult.text);



            dispatch(AddAudio({ text: transcriptionResult.text }));
            console.log(audioFiles);
            if (audioFiles.length > 0)
              audioFiles.forEach((item) => {
                // Add speaker and text with a new line
                fileContent += `${item.speaker}: ${item.text}\n`;
                console.log("working");
              });
            if (audioFiles.length > 0)
              for (let i = 0; i <= audioFiles.length; i++) {
                const content = `${audioFiles[i].speaker}: ${audioFiles[i].text}`;
                console.log(content);
                fileContent.push(content);
              }




            console.log(fileContent);
            let file;
            file = new Blob([fileContent], { type: "text/plain" });
            // const url = URL.createObjectURL(file);
            // console.log(url);
            console.log("starteds");
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "xguxdutu");
            data.append("cloud_name", "dgpwe8xy6");
            data.append("folder", "Transcription");
            data.append("quality", "auto:good"); // Set the desired quality level
            console.log("starteds");
            try {
              console.log("uploading");
              let response;
              response = await fetch(
                "https://api.cloudinary.com/v1_1/dgpwe8xy6/upload",
                {
                  method: "post",
                  body: data,
                }
              );
              const fileData = await response.json();
              setFileUrl(fileData.secure_url);

          const myFilesRed =  dispatch(AddtranscriptFile({ fileUrl: fileData.secure_url }));
              console.log("files sending to reducers", myFilesRed);
            } catch (err) {
              console.log(err);
            }
            console.log(fileUrl);
            break;
          } else if (transcriptionResult.status === "error") {
            throw new Error(
              `Transcription failed: ${transcriptionResult.error}`
            );
          } 
          else {
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        }
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      dispatch(startRecordingRed());

      // Start recording timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  useEffect(()=>{


    if(!isRecordings){
      stopRecording();
    }
    else{
      console.log("normal")
    }
   

  }, [!isRecordings])

  const UploadFile = async () => {
    console.log("starteds");
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setIsRecording(false);
      dispatch(stopRecordingRed());  // Dispatch stopRecording action
      clearInterval(timerRef.current);
      setRecordingTime(0);
    }
  };
 

  return (
    <div className="flex items-center gap-2">
      {/* Record Button */}
      {inMeeting === "Error" && isRecording ? (
        <div className="flex items-center gap-1">
          <button className="bg-green-500 text-white px-4 py-2 flex rounded-md focus:outline-none hover:bg-green-600">
            <div className="mr-1 mt-1">
              <FaUserCheck />
            </div>
            <div>Recording {recordingTime}s</div>
          </button>
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
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-[150px]"
          />
          <button
            onClick={() => {
              handleAddBotClick();
              startRecording();
              UploadFile();
              navigate("/transcription")
              
            }}
            className="bg-blue-500 text-white px-4 py-2 flex rounded-md focus:outline-none hover:bg-blue-600"
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
