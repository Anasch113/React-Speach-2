import Sidebar from "@/layout/Sidebar";
import axios from "axios";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuSubtitles } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const ViewTranscription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transcription, setTranscription] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTranscriptions = async () => {
      await axios
        .get(`${import.meta.env.VITE_HOST_URL}/transcription/${id}`)
        .then((res) => {
          const data = res.data;
          setTranscription(data);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    };
    if (id) fetchTranscriptions();
  }, [id]);

  // 📄 Download transcription as PDF
  const handleDownloadPDF = (text, title) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Title: ${title}`, 10, 10);
    doc.setFontSize(12);
    doc.text("Transcription:", 10, 20);

    // Wrap text properly
    const splitText = doc.splitTextToSize(text, 180);
    doc.text(splitText, 10, 30);

    doc.save(`${title}.pdf`);
  };

  // delete transcription
  const handleDeleteTranscription = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_HOST_URL}/transcription/delete/${id}`
      );
      toast.success("Transcription deleted successfully");
      navigate("/home")
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete transcription"
      );
    }
  };

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="flex w-full">
          <Sidebar />

          <div className=" md:w-full w-full md:px-5 flex flex-col   gap-5  ">
            <div className="w-full flex p-5  gap-8 md:flex-row flex-col items-center justify-center">
              <span className="flex w-full  p-5 md:w-2/3   shadow-md flex-col h-[430px] overflow-y-scroll  gap-5 py-5 rounded-md bg-bg-navy-blue ">
                <span className="flex flex-col   gap-2">
                  <span className="md:text-2xl text-lg flex-col gap-3 font-bold font-poppins   ">
                    Transcription
                  </span>
                  <span className="flex gap-3">
                    Title:
                    <span>{transcription?.title}</span>
                  </span>
                  <span className="flex gap-3">
                    Text:
                    <span>{transcription?.text}</span>
                  </span>
                </span>
              </span>

              <div className="w-60 bg-bg-navy-blue h-[430px] py-5  flex items-center justify-center shadow-md   rounded-md ">
                <div className="flex px-3  items-start h-full  w-full flex-col ">
                  <h2 className="text-lg font-semibold  my-4 mt-5">Export</h2>
                  <div className="flex flex-col items-start justify-center gap-2">
                    <button
                      onClick={() =>
                        handleDownloadPDF(
                          transcription.text,
                          transcription.title
                        )
                      }
                      className=" w-full hover:bg-bg-hover-color hover:text-black rounded-md p-4"
                    >
                      <span className="flex items-center   gap-2 ">
                        <LuSubtitles size={25} />
                        Download
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      <span className="hover:bg-bg-hover-color hover:text-black rounded-md w-full p-4 flex items-center gap-3 cursor-pointer mb-2">
                        <RiDeleteBin6Line size={25} /> Delete File
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-[90%] md:w-[40%] p-5 relative">
            <h3 className="text-center text-[22px] font-semibold text-gray-800 py-4">
              Are you sure you want to delete this transcription?
            </h3>
            <div className="flex items-center justify-center gap-4">
              <button
                className="  bg-purple-700 text-white px-6 py-2 rounded-lg"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-lg"
                onClick={() => setOpen(false) || handleDeleteTranscription(id)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewTranscription;
