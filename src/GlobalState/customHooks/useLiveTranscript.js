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
  setUrl
} from "../features/liveTranscriptUISlice";

export const useLiveTranscript = () => {
  const dispatch = useDispatch();

  //  Access the relevant parts of the Redux state
  const smallFontSettings = useSelector((state) => state.liveTranscript.smallWindow);
  const largeFontSettings = useSelector((state) => state.liveTranscript.largeWindow);


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

      if (meetingData.type === "realtime") {
        dispatch(setLiveTranscript(meetingData.liveData));
        dispatch(setTranscriptType(meetingData.type));
        dispatch(setMeetingStatus("realtime"));
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
  };
};
