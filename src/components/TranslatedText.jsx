import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { RxDownload } from "react-icons/rx";

const TranslatedText = ({ transcription  }) => {
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
    <div className="flex flex-col space-y-10 max-w-md mx-auto p-4 bg-gray-50 shadow-md rounded-md min-h-[50vh]">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl">Translated Text</h1>
        <button
          onClick={downloadAsPdf}
          className="bg-gray-200 text-black  flex space-x-2 items-center font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
        >
          <RxDownload className="text-xl text-blue-400 hover:text-blue-600" />
        </button>
      </div>
      <div ref={pdfContainer}>
     { transcription}
      </div>
    </div>
  );
};

export default TranslatedText;
