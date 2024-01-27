import React, { useState, useEffect } from "react";
import ReactWebSocket from "react-websocket";

const LiveTranscription = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const ws = new WebSocket("ws://localhost:8080");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          const audioData = event.data;
          const encodedData = btoa(
            String.fromCharCode.apply(null, new Uint8Array(audioData))
          );
          ws.send(JSON.stringify({ audio: encodedData }));
        };
      })
      .catch((error) => {
        console.error(error);
      });

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.text) {
        setTranscript(data.text);
      } else if (data.error) {
        console.error(data.error);
      }
    };
  }, []);

  const handleStartRecording = () => {
    setIsRecording(true);
    mediaRecorder.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    mediaRecorder.stop();
  };

  return (
    <div>
      <button
        className="bg-green-500 p-2"
        onClick={handleStartRecording}
        disabled={isRecording}
      >
        Start Recording
      </button>
      <button
        className="bg-red-500 p-2"
        onClick={handleStopRecording}
        disabled={!isRecording}
      >
        Stop Recording 
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default LiveTranscription;
