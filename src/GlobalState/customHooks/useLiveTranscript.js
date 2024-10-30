import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setSmallFontSize,
  setSmallFontFamily,
  setSmallTextColor,
  setSmallBgColor,
  setLargeFontSize,
  setLargeFontFamily,
  setLargeTextColor,
  setLargeBgColor,
  setLiveTranscript,
  setFinalTranscript,
  setTranscriptType,
  setMeetingStatus,
  setMeetingError,
  setUrl,
  setIsVtPaused,
  setIsVtRecording,
  setVtRemainingTime,
  setBotId,
  setIsProcessing,
  setInPersonMeetingTranscript,
  setIsMeetingEnd

} from "../features/liveTranscriptUISlice";
import axios from "axios";
import toast from "react-hot-toast";



export const useLiveTranscript = () => {
  const dispatch = useDispatch();
  let tempBuffer = '';
  //  Access the relevant parts of the Redux state
  const smallFontSettings = useSelector((state) => state.liveTranscript.smallWindow);
  const largeFontSettings = useSelector((state) => state.liveTranscript.largeWindow);

  const { botId } = useSelector((state) => state.liveTranscript.virtualTranscript)
 



  // Small window settings
  const handleSmallFontSizeChange = (e) => {
    dispatch(setSmallFontSize(Number(e.target.value)));
  };

  const handleSmallFontFamilyChange = (e) => {
    dispatch(setSmallFontFamily(e.target.value));
  };

  const handleSmallTextColorChange = (e) => {
    dispatch(setSmallTextColor(e.target.value));
  };

  const handleSmallBgColorChange = (e) => {
    dispatch(setSmallBgColor(e.target.value));
  };

  // Large window settings
  const handleLargeFontSizeChange = (e) => {
    dispatch(setLargeFontSize(Number(e.target.value)));
  };

  const handleLargeFontFamilyChange = (e) => {
    dispatch(setLargeFontFamily(e.target.value));
  };

  const handleLargeTextColorChange = (e) => {
    dispatch(setLargeTextColor(e.target.value));
  };

  const handleLargeBgColorChange = (e) => {
    dispatch(setLargeBgColor(e.target.value));

  };





  // const updateLiveTranscript = (newWords) => (dispatch, getState) => {

  //   const currentTranscript =
  //     getState().liveTranscript?.virtualTranscript?.liveTranscript || { words: [] };

  //   const updatedTranscript = {
  //     ...currentTranscript,
  //     words: [...(currentTranscript.words || []), ...newWords],
  //   };

  //   dispatch(setLiveTranscript(updatedTranscript));
  // };



  const updateLiveTranscript = (newWords, isFinal) => (dispatch, getState) => {
    const liveTranscriptState = getState().liveTranscript?.virtualTranscript?.liveTranscript || { words: [], fullTranscript: [] };

    const currentTranscript = {
      words: liveTranscriptState.words || [],
      fullTranscript: liveTranscriptState.fullTranscript || [],  // Ensure fullTranscript is initialized
    };

    if (!isFinal) {
      // Real-time updates; just append words to display on the UI
      const updatedTranscript = {
        ...currentTranscript,
        words: newWords,  // Keep updating words in real-time
      };
      dispatch(setLiveTranscript(updatedTranscript));
    } else {
      // When is_final becomes true, save the current words to fullTranscript


      const updatedTranscript = {
        ...currentTranscript,
        fullTranscript: [...currentTranscript.fullTranscript, ...currentTranscript.words],  // Save finalized sentence
        words: [], // Clear words for the next sentence
      };

      // Log to check if fullTranscript is updated properly
      console.log('Updated fullTranscript:', updatedTranscript.fullTranscript);

      // Dispatch the update
      dispatch(setLiveTranscript(updatedTranscript));
    }
  };




  // listen for transcript being sent from the server

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_HOST_URL}/virtual-transcript/events`
    );

    eventSource.onmessage = (event) => {
      const meetingData = JSON.parse(event.data);
      console.log("meeting data", meetingData);

      if (meetingData.type === "final-transcript") {
        dispatch(setFinalTranscript(meetingData.transcript));
        dispatch(setTranscriptType(meetingData.type));
        dispatch(setMeetingStatus("completed"));
        dispatch(setUrl(meetingData.url))
      }
      if (meetingData.type === "meeting-start") {
        dispatch(setBotId(meetingData.botId))

        dispatch(setIsVtRecording(true))
      }

      if (meetingData.type === 'realtime') {
        const { words, is_final } = meetingData.liveData;

        // Dispatch update to Redux store
        dispatch(updateLiveTranscript(words, is_final));

        dispatch(setTranscriptType(meetingData.type));
        dispatch(setMeetingStatus('realtime'));
      }



      if (meetingData.error) {
        dispatch(setMeetingError(meetingData.error));
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      dispatch(setMeetingError("Error receiving SSE"));
    };

    return () => {
      eventSource.close();
    };
  }, [dispatch]);

  // Virtual Transcript Stream Control 




  // Pause function
  const pauseVirtualTranscriptions = async () => {
    try {
      toast.success(" Transcription Paused")
      dispatch(setIsVtPaused(true));

      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/virtual-transcript/pause-virtual-transcription`, {
        botId: botId,
      });
      console.log("pause response:", response.data)
    } catch (error) {
      console.log("error while pausing virtual transcriptions", error)
    }
  }

  // Resume function
  const resumeVirtualTranscriptions = async () => {
    try {
      toast.success(" Transcription resumed")
      dispatch(setIsVtPaused(false));

      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/virtual-transcript/resume-virtual-transcription`, {
        botId: botId,
      });
      console.log("resume response:", response.data)
    } catch (error) {
      console.log("error while resuming virtual transcriptions", error)
    }
  }



  // Stop function
  const stopVirtualTranscriptions = async () => {
    try {



      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/virtual-transcript/stop-virtual-transcription`, {
        botId: botId,
      });
      console.log("stop response:", response.data)
      toast.success(" Transcription stopped")
      dispatch(setIsVtRecording(false))
      dispatch(setIsProcessing(true))

    } catch (error) {
      console.log("error while stopping virtual transcriptions", error)
    }
  }



  const handlePersonMeetingSetup = (transcript, state) => {

    // console.log("transcript, state", transcript, state)
    // toast.success("hit")

    // dispatch(setInPersonMeetingTranscript(transcript))
    // dispatch(setIsMeetingEnd(state))

  }


  return {
    // Expose small window state and handlers
    smallFontSettings,
    handleSmallFontSizeChange,
    handleSmallFontFamilyChange,
    handleSmallTextColorChange,
    handleSmallBgColorChange,

    // Expose large window state and handlers
    largeFontSettings,
    handleLargeFontSizeChange,
    handleLargeFontFamilyChange,
    handleLargeTextColorChange,
    handleLargeBgColorChange,
    pauseVirtualTranscriptions,
    resumeVirtualTranscriptions,
    stopVirtualTranscriptions,

    
    handlePersonMeetingSetup
  };
};
