import React from 'react'

import Sidebar from '../../layout/Sidebar'
import { MdCloudUpload, MdDelete } from "react-icons/md"
import { AiFillFileImage } from "react-icons/ai"
import { useState, useRef, useEffect } from 'react'
import { MdPayment } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useUserAuth } from '@/context/UserAuthContext'
import axios from "axios";
import toast from 'react-hot-toast'
import OcrFiles from '@/components/SmallFeatures/OcrFiles'
import { useNavigate } from 'react-router-dom'
import { Client } from "@gradio/client";
import LlamaAI from "llamaai";
import { Button } from '@/components/ui/button'
import { database } from "../../firebase"
import { ref, set } from "firebase/database";
import { useAuthHook } from "../../GlobalState/customHooks/useAuthHook"

const OCR = () => {
  const [showFormModal, setShowFormModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState("");
  const [progress, setProgress] = useState([]);
  const [extractedText, setExtractedText] = useState("");
  const [imageCloudUrl, setImageCloudUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [reloadLoading, setReloadLoading] = useState(false);
  const [runUseEffect, setRunUseEffect] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isTemplateDownloaded, setIsTemplateDownloaded] = useState(false);
  const [dbData, setDbData] = useState("")
  const [successText, setSuccessText] = useState("")
  const { user } = useUserAuth();
  const navigate = useNavigate()



  const { fetchTemplateStatus } = useAuthHook()


  const handleFormClick = () => {
    document.querySelector(".input-field").click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setIsUploading(true);
    if (file) {
      setSelectedFile(file);
      setProgress(0); // Reset progress
      // const formData = new FormData();
      // formData.append("file", file);
      // formData.append("upload_preset", UPLOAD_PRESET);
      // formData.append("cloud_name", CLOUD_NAME);
      // formData.append("folder", "Audio");

      // const cloudinaryResponse = await axios.post(
      //   `${cloudinaryBaseUrl}/upload`,
      //   formData,
      //   {
      //     onUploadProgress: (event) => {
      //       const percentage = Math.round((event.loaded * 100) / event.total);
      //       setProgress(percentage);
      //     },
      //   }
      // );

      // const imageUrl = cloudinaryResponse.data.secure_url;
      // console.log("Image URL inside:", imageUrl);
      // setImageCloudUrl(imageUrl)
      setIsUploading(false)
    }
  };





  const handleExtractText = async () => {
    if (!selectedFile) {
      toast("Please upload your image first!");
      return;
    }

    setIsUploading(true)

    try {



      const text = await handleGradioModel()
      console.log("text", text);

      // Send URL to backend for text extraction
      const textStoring = await axios.post(
        `${import.meta.env.VITE_HOST_URL}/small-features/ocr/store-text`,
        {
          extractedText: text,
          fileName: selectedFile.name,
          userId: user.uid

        }
      );

      console.log("data stored", textStoring.data.message)
      toast.success("Processing completed")
    } catch (error) {
      console.error("Error during upload or text extraction:", error.response?.data || error);
      toast.error("Error while extracting the text from image");
    } finally {
      setIsUploading(false);
      setShowFormModal(false)
      setRunUseEffect(true);
    }
  };
  console.log("extracted text", extractedText)


  const resetUploadStates = () => {
    setSelectedFile(false)
    setExtractedText("")

  };


  useEffect(() => {

    const fetchFiles = async () => {

      try {
        setReloadLoading(true)
        const fetch = await axios.post(`${import.meta.env.VITE_HOST_URL}/small-features/ocr/fetch`, {
          userId: user.uid
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        }).then((res) => {

          setDbData(res.data)
          setReloadLoading(false)
        }).catch((error) => {
          console.log("error in response from database")
        })

      } catch (error) {
        console.log("error while fetching the transcriptions in transcript component")
      }
      finally {
        setReloadLoading(false); // Set loading to false after API call is completed
      }
    }

    fetchFiles()

  }, [user, runUseEffect])

  const handleNavigate = (id) => {

    console.log("file id", id)
    navigate(`/ocr-view/${id}`);


  }

  console.log("dbdata:", dbData)


  const handleGradioModel = async () => {

    const client = await Client.connect("Hammedalmodel/handwritten_to_text");
    const result = await client.predict("/predict", {
      image: selectedFile,
    });
    const textData = result.data;
    const text = textData[0]

    return text

  }

  const downloadPdf = async () => {
    const userUid = user?.uid;
    if (!userUid) throw new Error("User not authenticated");
  
    // Reference to the user's data in the database
    const userRef = ref(database, `users/${userUid}/ocrTemplate`);
  
    // Update the templateStatus field in the database
    await set(userRef, { templateStatus: "downloaded" });
  
    // Trigger download of the PDF from assets
    const link = document.createElement("a");
    link.href = "/template.pdf"; // Path to your PDF file in the assets folder
    link.download = "template.pdf"; // Suggested filename for the downloaded file
    link.click();
  
    setIsTemplateDownloaded(true);
    setTemplateStatus("downloaded");
  };



  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);

      // Display a success toast notification
      toast.success("Template Uploaded");

      // Update success text
      setSuccessText(
        "AI has checked your handwriting and your handwriting images were extracted with 100% accuracy. You can now upload your images"
      );


      try {


        const userUid = user?.uid;
        if (!userUid) throw new Error("User not authenticated");

        // Reference to the user's data in the database
        const userRef = ref(database, `users/${userUid}/ocrTemplate`);

        // Update the templateStatus field
        await set(userRef, { templateStatus: "Uploaded" });
        setTemplateStatus("Uploaded")

        console.log("Template status updated in Firebase");
      } catch (error) {
        console.error("Error updating Firebase:", error);
        toast.error("Failed to update template status");
      }
    }
  };


  const [templateStatus, setTemplateStatus] = useState("default");

  useEffect(() => {
    const fetchStatus = async () => {
      if (user) {
        const status = await fetchTemplateStatus(user.uid);
        setTemplateStatus(status.templateStatus || "default"); // Update state with fetched status
      }
    };

    fetchStatus();
  }, [user]);
  console.log("template status", templateStatus)

  return (
    <div className='w-full flex min-h-screen '>




      <div className='flex flex-row w-full py-3 px-1 md:py-0 md:px-0 bg-bg-color min-h-screen overflow-x-hidden   '>

        <span className=' md:flex hidden '>
          <Sidebar />
        </span>

        <div className='rounded-md flex md:items-center flex-col  min-h-screen py-5 gap-5 w-full '>

          {
            dbData.length === 0 ? <div className='rounded-sm  w-full shadow-md p-5 flex flex-col  gap-8 min-h-[350px] bg-blackGray items-center '>
              <span className='flex flex-row items-center gap-2 py-5'>
                <RxDashboard className='text-3xl' />
                <h1 className='text-3xl font-bold font-poppins '> Recent Files</h1>
              </span>


              <div className='flex items-center justify-center flex-col gap-2'>


                {
                  !isNext && templateStatus === "default" ?
                    <span className='flex flex-col items-center gap-4 '>
                      <h1 className='text-2xl text-center font-roboto text-white w-2/3'>Using our image to text let you get your documents extracted easier. So kindly take a few step by showing your writing skills</h1>

                      <button onClick={() => setIsNext(true)} className='text-center px-5 py-2  
        rounded-xl bg-bg-purple-2 text-white text-xl font-medium font-roboto hover:bg-purple-500 '>Next</button>
                    </span>


                    :

                    <div>
                      {
                        templateStatus === "default" && <span className='flex flex-col items-center gap-4 '>
                          <h1 className='text-2xl text-center font-roboto text-white w-2/3'> Please download the Template and fill the space for every single letter </h1>
                          <button onClick={downloadPdf} className='text-center px-5 py-4
        rounded-xl bg-bg-purple-2 text-white text-xl font-medium font-roboto hover:bg-purple-500 '>Download</button>
                        </span>

                      }


                    </div>



                }


                {
                  templateStatus === "downloaded" && (
                    <div className='flex flex-col gap-5 items-center'>
                      <p className='text-xl font-poppins'>Upload your template after filling the spaces for all single letters in your handwriting</p>
                      <Button
                        className="p-4 rounded-xl"
                        variant={"customBlue"}
                        onClick={() => document.getElementById('pdf-upload').click()}
                      >
                        Upload Template
                      </Button>
                      <input
                        id="pdf-upload"
                        accept=".pdf"
                        className="input-field"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(event) => handleFileUpload(event)}
                      />
                    </div>
                  )
                }



                {
                  <p className='w-2/3 text-center'>{successText}</p>
                }

                {
                  templateStatus === "Uploaded" && <button onClick={() => setShowFormModal(!showFormModal)} className='text-center px-5 py-4  h-16
  rounded-xl mt-4 bg-bg-purple text-white text-xl font-medium font-roboto hover:bg-purple-500 '><span className='flex items-center text-center justify-center gap-2'>
                      <FaCloudUploadAlt size={25} /> <p>Upload Image</p>
                    </span></button>
                }




              </div>
            </div>

              :

              <div className='flex flex-col p-2 w-full '>
                <span className='flex flex-row justify-between items-center gap-2 py-5'>

                  <span className='flex flex-row items-center gap-2'>
                    <RxDashboard className='md:text-3xl text-lg' />
                    <h1 className='md:text-3xl font-bold font-poppins text-white lack'> Recent Files</h1>
                  </span>


                  <button onClick={() => setShowFormModal(!showFormModal)} className='text-center px-5 py-4 md:w-60  
rounded-xl bg-bg-purple text-white text-xl font-medium font-roboto hover:bg-purple-500 '><span className='flex items-center text-center justify-center gap-2 '>
                      <FaCloudUploadAlt size={25} /> <p>Upload Image</p>
                    </span></button>

                </span>

                <table className="  flex flex-col  ">

                  <thead className='my-2'>
                    <tr className="font-poppins text-sm flex md:gap-10 sm:items-center md:justify-between  md:px-5">

                      <th className=" text-text-brown-new md:px-10 md:py-2">Name</th>

                      <span>
                        <th className=" text-text-brown-new md:px-10 md:py-2  w-72">Uploaded</th>


                      </span>

                    </tr>

                  </thead>
                  <div className=' my-5  border '></div>
                  <tbody className='flex flex-col-reverse max-h-[400px] overflow-y-scroll  py-4'>
                    {
                      dbData && dbData.map((data, index) => (

                        <tr onClick={() => handleNavigate(data._id)} key={index} className="font-poppins text-sm  cursor-pointer hover:bg-[#EDEDED] flex justify-between items-center md:gap-10 md:px-5 border-b hover:text-text-black px-1">

                          <td className="max-[500px]:w-32 font-medium md:text-lg md:px-5 md:py-5 hover:text-text-black">{data.fileName}</td>
                          <span>
                            <td className="  md:w-72  font-medium md:text-lg  md:py-5">{new Date(data.createdAt).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true
                            })}</td>
                          </span>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>


          }
        </div>


      </div>


      {showFormModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-30">

          <div className="bg-bg-navy-blue md:min-h-[550px] p-5 rounded-xl overflow-y-auto">
            <div className="w-full flex flex-row items-center justify-end gap-10 px-5 py-5">
              <span className="flex flex-row items-center gap-2">
                <MdOutlineCloudUpload className="md:text-2xl" />
                <h1 className="md:text-2xl font-bold font-poppins text-white">
                  Image To Text
                </h1>
              </span>
              <MdClose
                onClick={() => setShowFormModal(false)}
                className="text-end w-10 h-10 cursor-pointer hover:bg-gray-800 p-2 rounded-full"
                size={25}
              />
            </div>

            <form
              onClick={handleFormClick}
              className="flex flex-col items-center justify-center border-2 border-blue-500 h-64 overflow-y-auto cursor-pointer rounded-md md:w-[400px] w-72"
            >
              {isUploading && selectedFile ? (
                <div className="flex items-center flex-col gap-2">

                  <span className='spinner'></span>
                  <p>Extracting Text...</p>


                </div>
              ) : (
                <div className="py-2">
                  <input
                    accept=".png, .jpg"
                    className="input-field"
                    type="file"
                    onChange={handleFileChange}
                    hidden
                  />
                  <span className='flex items-center flex-col gap-2'>

                    {selectedFile && (
                      <p className="text-white text-center">{selectedFile.name}</p>
                    )}
                    {
                      selectedFile && <MdDelete className='z-50 ' cursor="pointer"
                        onClick={(event) => {
                          event.stopPropagation()
                          resetUploadStates()
                        }}
                      />
                    }
                  </span>

                </div>
              )}
              {
                !selectedFile &&
                <span>
                  <MdCloudUpload color="#1475cf" size={70} />
                  <p>.png, .jpg</p>
                </span>
              }

            </form>

            <button
              disabled={isUploading && !selectedFile}
              onClick={handleExtractText}
              className="text-center p-4 w-full h-16  bg-bg-purple text-white text-xl font-medium font-poppins hover:bg-purple-500 my-5 rounded-lg"

            >
              <span className="flex items-center text-center justify-center gap-2">
                <p>{isUploading ? "Processing..." : "Extract Text"}</p>
              </span>
            </button>


          </div>
        </div>
      )}




    </div>
  )
}

export default OCR
