import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import DeleteModal from '../PreAudio/DeleteModal';
import html2pdf from "html2pdf.js";
import jsPDF from 'jspdf';
import "jspdf-autotable";
const ViewSummaryDeposition = () => {

  const [transcriptions, setTranscriptions] = useState(false)

  const [showDeleteModel, setShowDeleteModel] = useState(false)
  const navigate = useNavigate();


  const contentRef = useRef(null)
  const { id } = useParams();

  console.log("id in view summary depositon page", id)




  useEffect(() => {

    const fetchSingleTranscription = async () => {

      const fetch = await axios.post(`${import.meta.env.VITE_HOST_URL}/sd/fetch-single`, { id: id }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).catch((err) => {
        console.log("Error while fetching the transcription in view transcriptions", err)
      })
      const transcription = fetch.data;
      setTranscriptions(transcription)

    }

    fetchSingleTranscription()

  }, [id])

  console.log("transcriptions:", transcriptions)


  const deleteTranscription = async () => {

    try {
      await axios.delete(`${import.meta.env.VITE_HOST_URL}/sd/deleteTranscription`, {
        data: {
          id: id
        }
      }

      )
      toast.success("File deleted")
      navigate("/summarization-deposition")
    } catch (error) {
      console.log("Error while deleting the transcription", error)
    }


  }

  const downloadPdf = async () => {
    const doc = new jsPDF();
  
    const tableColumn = ["Timestamp", "Title", "Summary"];
    const tableRows = [];
  
    transcriptions.segments.forEach((segment, index) => {
      const row = [
        transcriptions.timestamps[index],
        segment,
        transcriptions.summaries[index]
      ];
      tableRows.push(row);
    });
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // Starting Y position on the page
      theme: "striped", // Optional: use a striped table theme
    });
  
    doc.save(`${transcriptions.summaryName}.pdf`);
  };
  

  
 

  const narrativeDownloadPdf = () => {
    const doc = new jsPDF();
  
    // Set font size
    const fontSize = 12;
    doc.setFontSize(fontSize);
  
    // Define the maximum width for the text
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxWidth = pageWidth - 20; // 10 units padding on each side
  
    // Split text into lines that fit within the page width
    const textLines = doc.splitTextToSize(transcriptions.narrativeSummary, maxWidth);
  
    // Add the text to the PDF
    doc.text(textLines, 10, 10);
  
    // Save the PDF with a custom filename
    doc.save(`${transcriptions.summaryName}_narrative_summary.pdf`);
  };
  

  return (
    <div className='w-full min-h-screen flex items-center justify-center p-5'>


      {


        transcriptions.depositionType === "pageLine" ? (
          <div className='flex flex-col items-center  w-full'>

            <span className='flex w-full justify-between p-5 items-center md:flex-row flex-col'>
              <h1 className='text-2xl font-bold font-poppins my-5'>Page Line Summary</h1>
              <span className=''>
                <Button onClick={downloadPdf} className="mx-5 rounded-lg font-poppins" variant={"customPurple"}>Download</Button>
                <Button onClick={() => {
                  setShowDeleteModel(true)
                }} className=" rounded-lg font-poppins" variant={"destructive"}>Delete</Button>
              </span>
            </span>

            <table className='w-2/3  p-10 min-h-screen border'>
              <thead>
                <tr className='flex w-full border items-center justify-between p-5'>
                  <th className='w-1/3 text-left text-lg'>Timestamp</th>
                  <th className='w-1/3 text-left text-lg'>Title</th>
                  <th className='w-1/3 text-left text-lg'>Summary</th>
                </tr>
              </thead>
              <tbody>

                {transcriptions.segments && transcriptions.segments.map((segment, index) => (
                  <tr ref={contentRef} key={index} className='flex w-full items-center justify-between gap-10 border p-5'>

                    <td className='w-1/3 my-5'>{transcriptions.timestamps[index]}</td>
                    <td className='w-1/3 my-5 '>{segment}</td>
                    <td className='w-1/3 my-5'>{transcriptions.summaries[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className=' md:p-5  p-2 '>
            <span className='flex    justify-between p-5 items-center md:flex-row flex-col'>
              <h1 className='text-2xl font-bold font-poppins my-5'>Narrative Summary</h1>
              <span className=''>
                <Button onClick={narrativeDownloadPdf} className="mx-5 rounded-lg font-poppins" variant={"customPurple"}>Download</Button>
                <Button onClick={() => {
                  setShowDeleteModel(true)
                }} className=" rounded-lg font-poppins" variant={"destructive"}>Delete</Button>
              </span>
            </span>
            <div >
              {transcriptions.narrativeSummary}
            </div>
          </div>
        )
      }

      {
        showDeleteModel && <DeleteModal
          deleteTranscript={deleteTranscription}
          setShowDeleteModal={setShowDeleteModel}
          filename={transcriptions.summaryName}
        />
      }
    </div>




  )
}

export default ViewSummaryDeposition
