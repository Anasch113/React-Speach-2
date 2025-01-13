import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import DeleteModal from '../PreAudio/DeleteModal';
import toast from 'react-hot-toast';
import axios from 'axios';
import Sidebar from '@/layout/Sidebar';
const ViewOcrFiles = () => {


  const { id } = useParams();
  const [dbData, setDbData] = useState("")
  const [showDeleteModel, setShowDeleteModel] = useState(false)
  const navigate = useNavigate()



  useEffect(() => {

    const fetchSingleFile = async () => {

      const fetch = await axios.post(`${import.meta.env.VITE_HOST_URL}/small-features/ocr/fetch-single`, { id: id }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).catch((err) => {
        console.log("Error while fetching the transcription in view transcriptions", err)
      })
      const data = fetch.data;
      setDbData(data)


    }

    fetchSingleFile()

  }, [id])

  const deleteTranscription = async () => {

    try {
      await axios.delete(`${import.meta.env.VITE_HOST_URL}/small-features/ocr/delete`, {
        data: {
          id: id
        }
      }

      )
      toast.success("File deleted")
      navigate("/ocr")
    } catch (error) {
      console.log("Error while deleting the transcription", error)
    }


  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center p-5 '>
      {/* <Sidebar /> */}
      <div className='flex flex-col items-center  md:p-5  p-2  border'>
        <span className='flex  w-full   justify-between p-5 items-center md:flex-row flex-col'>
          <h1 className='text-2xl font-bold font-poppins my-5'>{dbData.fileName}</h1>
          <span className='space-x-5'>

            <Button className=" rounded-lg font-poppins" variant={"customPurple"}>Download</Button>

            <Button onClick={() => {
              setShowDeleteModel(true)
            }} className=" rounded-lg font-poppins" variant={"destructive"}>Delete</Button>
          </span>
        </span>

        <div className='my-4'>
          {dbData.extractedText}
        </div>
        <Button onClick={() => {
          navigate("/ocr")
        }} variant={"customPurple"}>Back</Button>
      </div>

      {
        showDeleteModel && <DeleteModal
          deleteTranscript={deleteTranscription}
          setShowDeleteModal={setShowDeleteModel}
          filename={dbData.fileName}
          type="ocr"
        />
      }

    </div>
  )
}

export default ViewOcrFiles
