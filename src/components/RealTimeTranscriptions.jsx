import React, { useState, useRef, useEffect } from "react";


const RealTimeTranscriptions = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const assemblyaiRef = useRef(null);
  const recorderRef = useRef(null);

  const toggleRecording = async () => {
    

    if (isRecording) {
      if (assemblyaiRef.current) {
        await assemblyaiRef.current.close(false);
      }

      if (recorderRef.current) {
        recorderRef.current.pauseRecording();
      }
    } else {
      try {
        const response = await fetch("/token");
        const data = await response.json();
        console.log("data", data)

        if (data.error) {
          alert(data.error);
          return;
        }

        assemblyaiRef.current = new AssemblyAI.RealtimeService({ token: data.token });

        assemblyaiRef.current.on("transcript", (message) => {
          setTranscription((prevTranscription) => prevTranscription + message.text);
        });

        assemblyaiRef.current.on("error", async (error) => {
          console.error(error);
          await assemblyaiRef.current.close();
        });

        assemblyaiRef.current.on("close", () => {
          assemblyaiRef.current = null;
        });

        await assemblyaiRef.current.connect();

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          recorderRef.current = new RecordRTC(stream, {
            type: "audio",
            mimeType: "audio/webm;codecs=pcm",
            recorderType: RecordRTC.StereoAudioRecorder,
            timeSlice: 250,
            desiredSampRate: 16000,
            numberOfAudioChannels: 1,
            bufferSize: 16384,
            audioBitsPerSecond: 128000,
            ondataavailable: async (blob) => {
              if (assemblyaiRef.current) {
                assemblyaiRef.current.sendAudio(await blob.arrayBuffer());
              }
            },
          });

          recorderRef.current.startRecording();
         
        });
      } catch (err) {
        console.error(err);
      }
    }

    setIsRecording((prevIsRecording) => !prevIsRecording);
  };

  useEffect(() => {
    document.getElementById("real-time-title").innerText = isRecording
      ? "Click stop to end recording!"
      : "Click start to begin recording!";
  }, [isRecording]);

  return (
    <div className="App">
      <header>
        <h1 className="header__title">Real-Time Transcription</h1>
        <p className="header__sub-title">Try AssemblyAI's new real-time transcription endpoint!</p>
      </header>
      <div className="real-time-interface">
        <p id="real-time-title" className="real-time-interface__title">
          Click start to begin recording!
        </p>
        <button onClick={toggleRecording} className="real-time-interface__button">
          {isRecording ? "Stop" : "Start"}
        </button>
        <p id="message" className="real-time-interface__message">
          {transcription}
          text
        </p>
      </div>
    </div>
  );
};

export default RealTimeTranscriptions;
