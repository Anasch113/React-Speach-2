// audioUtils.js

import axios from "axios";

const cloudinaryBaseUrl = "https://api.cloudinary.com/v1_1/dgpwe8xy6";
const assemblyAiBaseUrl = "https://api.assemblyai.com/v2";

const cloudinaryHeaders = {
  "Content-Type": "application/json",
};

const assemblyAiHeaders = {
  authorization: "ce2c1d53c1af4f02a15b539ffd7bc68c",
  "Content-Type": "application/json",
};

export const uploadAudioToCloudinary = async (audioBlob) => {
  try {
    // Step 1: Upload the audio file to Cloudinary
    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("upload_preset", "xguxdutu");
    formData.append("cloud_name", "dgpwe8xy6");
    formData.append("folder", "Audio");
    formData.append("quality", "auto:good"); // Set the desired quality level

    const cloudinaryResponse = await axios.post(
      `${cloudinaryBaseUrl}/upload`,
      formData
    );

    const cloudinaryFileUrl = cloudinaryResponse.data.secure_url;

    // Step 2: Send the Cloudinary file URL to AssemblyAI for transcription
    const assemblyAiResponse = await axios.post(
      `${assemblyAiBaseUrl}/transcript`,
      {
        audio_url: cloudinaryFileUrl,
        speaker_labels: true,
        summarization: true,
        summary_model: "informative",
        summary_type: "bullets"
      },
      { headers: assemblyAiHeaders }
    );

    const transcriptId = assemblyAiResponse.data.id;
    const pollingEndpoint = `${assemblyAiBaseUrl}/transcript/${transcriptId}`;

    // Step 3: Poll the AssemblyAI API to check the status of the transcription
    while (true) {
      const pollingResponse = await axios.get(pollingEndpoint, {
        headers: assemblyAiHeaders,
        
      });
      const transcriptionResult = pollingResponse.data;

      if (transcriptionResult.status === "completed") {


        const speakerTranscripts = {};
        for (const utterance of transcriptionResult.utterances) {
          const speaker = utterance.speaker;
          const text = utterance.text;
          if (!speakerTranscripts[speaker]) {
            speakerTranscripts[speaker] = [];
          }
          speakerTranscripts[speaker].push(text);
          
        }
        return {
          transcriptText: transcriptionResult,
          cloudinaryFileUrl,
          summary: transcriptionResult.summary
        };
      } else if (transcriptionResult.status === "error") {
        throw new Error(`Transcription failed: ${transcriptionResult.error}`);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  } catch (error) {
    console.error("Error uploading audio to Cloudinary:", error);
    throw error;
  }
};
