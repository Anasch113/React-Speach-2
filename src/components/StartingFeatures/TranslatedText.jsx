import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { RxDownload } from "react-icons/rx"
import { useSelector } from "react-redux";
import { FaPlay, FaPause, FaStop, FaTrash, FaCheck } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { PiNewspaperClippingBold } from "react-icons/pi";
import { useState, useEffect } from "react";


const TranslatedText = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update the current date and time every second (1000 milliseconds)
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount



  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleString('en-US', options);
  };

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  };



  const transcriptionFiles = useSelector((state) => state.audio.typesTranscriptionFiles);
  console.log("utterances in translatedText", transcriptionFiles)

  const pdfContainer = useRef(null);

  const downloadAsPdf = () => {
    const pdfOptions = {
      margin: 10,
      filename: "translated_text.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf(pdfContainer.current, pdfOptions);
  };




  return (
    <div className="flex flex-col w-full mx-auto bg-bg-color-light border border-border-dark-color min-h-[50vh]">

      <div className="flex items-center p-5 justify-between border-b border-border-dark-color w-full">
        <div className="flex flex-col p-3 gap-5 max-[500px]:gap-3">


          <h1 className="text-2xl text-text-color-blue  font-semibold">Notes</h1>
          <div className="flex items-center justify-center gap-4 text-text-color-blue max-[500px]:gap-1 max-[500px]:flex-col max-[500px]:items-start">
      <span className="flex gap-2 items-center">
        <CiCalendar />
        <p>{formatDate(currentDateTime)}</p>
      </span>
      <span className="flex gap-2 items-center">
        <CiTimer />
        <p>{formatTime(currentDateTime)}</p>
      </span>
      <span className="flex gap-2 items-center">
        <PiNewspaperClippingBold />
        <p>Owner: User</p>
      </span>
    </div>
        </div>
        <button
          onClick={downloadAsPdf}
          className="bg-gray-200 text-black  flex space-x-2 items-center font-bold py-2 px-4 mt-4 rounded  "
        >
          <RxDownload className="text-xl text-blue-400 hover:text-blue-600" />
        </button>
      </div>




      {transcriptionFiles.map((files, i) => (

        <div key={i} ref={pdfContainer} className="flex p-5 flex-col text-text-color-blue">
          <p>Speaker A: {files.speakerAUtterances.map((utterance) => utterance.text).join(" ")}{" "}</p>
          <p>Speaker B: {files.speakerBUtterances.map((utterance) => utterance.text).join(" ")}{" "}</p>

        </div>
      ))}

    </div>
  );
};

export default TranslatedText;
