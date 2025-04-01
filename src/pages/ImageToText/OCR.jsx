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
import { useNavigate, useLocation } from 'react-router-dom'
import { Client } from "@gradio/client";
import LlamaAI from "llamaai";
import { Button } from '@/components/ui/button'
import { database } from "../../firebase"
import { ref, set, update, get, remove } from "firebase/database";

import { useAuthHook } from "../../GlobalState/customHooks/useAuthHook"
import PaymentBox from '@/components/SummriazationDepostion/PaymentBox'
import { useCookies } from "react-cookie";

const OCR = () => {
  const [showFormModal, setShowFormModal] = useState(false)
  // State variables
  const [selectedFiles, setSelectedFiles] = useState([]); // Store multiple files
  const [selectedFile, setSelectedFile] = useState(''); // Store multiple files
  const [progress, setProgress] = useState([]);
  const [extractedTexts, setExtractedTexts] = useState([]); // Store extracted texts


  const [imageCloudUrl, setImageCloudUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [reloadLoading, setReloadLoading] = useState(false);
  const [runUseEffect, setRunUseEffect] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isTemplateDownloaded, setIsTemplateDownloaded] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [dbData, setDbData] = useState("")
  const [successText, setSuccessText] = useState("")
  const { user, userBalance } = useUserAuth();
  const navigate = useNavigate()
  const location = useLocation();


  const { fetchTemplateStatus } = useAuthHook()
  const [cookies, setCookie, removeCookie] = useCookies(["selectedFile"]);

  let price = 1
  const cost = 1
  const handleFormClick = () => {
    document.querySelector(".input-field").click();
  };





  // Handle multiple file selection
  const handleFileChange = async (event) => {
    console.log("event.target.files", event.target.files)
    const files = Array.from(event.target.files); // Convert FileList to Array
    const file = event.target.files[0]
    setSelectedFile(file)
    if (files.length > 0) {
      setSelectedFiles(files); // Store multiple files
      setProgress(new Array(files.length).fill(0)); // Initialize progress for each file
    }
    setShowPaymentModal(true)
    setIsPaymentInProgress(true)
    localStorage.removeItem("selectedFile");
  };


  console.log("selected single file", selectedFile)

  console.log("selectedFiles", selectedFiles)
  // Function to extract text from multiple images
  const handleExtractText = async () => {
    if (selectedFiles.length === 0) {
      toast("Please upload your images first!");
      return;
    }


    if (cost * selectedFiles.length > userBalance) {
      toast.error("Insufficient credit, Please buy more credit");
      return;
    }
    setShowPaymentModal(false)

    setIsUploading(true);
    let newExtractedTexts = [];

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];


        const text = await handleGradioModel(file);
        console.log(`Extracted text for ${file.name}:`, text);

        // Store text in database
        await axios.post(
          `${import.meta.env.VITE_HOST_URL}/small-features/ocr/store-text`,
          {
            extractedText: text,
            fileName: file.name,
            userId: user.uid,
          }
        );

        newExtractedTexts.push({ fileName: file.name, text });

        // Update progress (optional)
        setProgress((prev) => {
          const newProgress = [...prev];
          newProgress[i] = 100;
          return newProgress;
        });
      }

      setExtractedTexts(newExtractedTexts);

      // Deduct cost from user balance
      const newBalance = userBalance - cost * selectedFiles.length;
      await update(ref(database, `users/${user.uid}/credit-payment`), {
        balance: newBalance,
      });

      toast.success("Processing completed for all files");

    } catch (error) {
      console.error("Error during upload or text extraction:", error);
      toast.error("Error while extracting text from images");
    } finally {
      setIsUploading(false);
      setShowFormModal(false);
      setRunUseEffect(true);

    }
  };



  const resetUploadStates = () => {
    setSelectedFiles(false)
    setExtractedTexts("")

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



  // Function to send images to Gradio model
  const handleGradioModel = async (file) => {
    const client = await Client.connect("Hammedalmodel/handwritten_to_text");
    const result = await client.predict("/predict", {
      image: file, // Send each file one by one
    });

    const textData = result.data;
    console.log("textdataaa")
    return textData[0];
  };


  const downloadPdf = async () => {
    const userUid = user?.uid;
    if (!userUid) throw new Error("User not authenticated");

    // Reference to the user's data in the database
    const userRef = ref(database, `users/${userUid}/ocrTemplate`);

    // Update the templateStatus field in the database
    await set(userRef, { templateStatus: "downloaded" });

    // Trigger download of the PDF from assets
    const link = document.createElement("a");
    link.href = "/Update your Handwriting With AI For Accurate Output.docx"; // Path to your PDF file in the assets folder
    link.download = "Update your Handwriting With AI For Accurate Output.docx"; // Suggested filename for the downloaded file
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




  // >>>>>>>>>> Payment Intgeration start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



  // Handle returning users after Stripe payment
  useEffect(() => {
    const status = location.state?.status;

    if (status === "paid") {
      const userId = user.uid;

      // Retrieve Base64 files from Firebase Realtime Database

      const filesRef = ref(database, `users/${userId}/payment-files-data`);

      get(filesRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const filesBase64 = snapshot.val();
            const restoredFiles = filesBase64.map((fileData) => {
              const mimeType = fileData.base64.match(/data:(.*?);base64,/)[1];
              const byteCharacters = atob(fileData.base64.split(",")[1]);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);

              // Create File object with the original filename
              return new File([byteArray], fileData.name, { type: mimeType });
            });

            console.log("Restored files:", restoredFiles);
            setSelectedFiles(restoredFiles);
            setShowFormModal(true);
            toast.success("Continue your work");
          } else {
            alert("Session expired. Please re-upload the files.");
          }
        })
        .catch((error) => {
          console.error("Error retrieving files from Firebase:", error);
        });

      // Clear stored files in Firebase Realtime Database
      set(ref(database, `users/${userId}/payment-files-data`), null);

      setIsPaymentInProgress(false);
      setIsPaymentDone(true);

      navigate(location.pathname, { replace: true });
    }
  }, [location.state?.status]);








  const filesToBase64 = (files) => {
    console.log("files ins base64 function", files)
    return Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () =>
            resolve({ base64: reader.result, name: file.name });
          reader.onerror = (error) => reject(error);
        });
      })
    );
  };





  // Function to create Stripe session
  const createStripeSession = async () => {
    const userId = user.uid;
    const userEmail = user.email;
    const price = cost * selectedFiles.length
    // Convert files to Base64
    const filesBase64 = await filesToBase64(selectedFiles);

    // Store Base64 in Firebase Realtime Database

    const filesRef = ref(database, `users/${userId}/payment-files-data`);
    await set(filesRef, filesBase64);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST_URL}/payment-system/create-stripe-session-new`,
        {
          userId: userId,
          cost: price,
          promoCode: promoCode,
          currency: currency,
          userEmail: userEmail,
          feature: "ocr",
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error creating Stripe session", error);
      return null;
    }
  };


  const handleCardPayment = async () => {

    try {

      if (!selectedFile) {
        toast("Please select a file before proceeding.");
        return;
      }
      toast.success("In progress, please wait...")

      // For direct method
      const stripeSession = await createStripeSession();



      if (stripeSession && stripeSession.url) {
        // Redirect the user to Stripe Checkout
        window.location.href = stripeSession.url;
      } else {
        alert("Failed to create Stripe session. Please try again.");
      }

    } catch (error) {
      console.log("error", error)
    }
  }




  // >>>>>>>>> Additional payment Info code >>>>>>>>>>>>>>>>>>


  const [promoCode, setPromoCode] = useState("");

  const [currency, setCurrency] = useState('USD'); // Default to USD


  const handlePromodeCodeChange = (e) => {
    const value = e.target.value;
    setPromoCode(value)
  };


  const handleCurrencyChange = (newCurrency) => {

    setCurrency(newCurrency); // Update the selected currency
  };
  console.log("selected currency:", currency)


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  // >>>>>>>>>> Payment Intgeration End >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>







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
                        accept=".docx"
                        id="pdf-upload"
                        onChange={handleFileUpload}
                        type="file"
                        // Allows selecting multiple files

                        hidden
                      />
                    </div>
                  )
                }



                {
                  <p className='w-2/3 text-center'>{successText}</p>
                }

                {
                  templateStatus === "Uploaded" && <span className='flex flex-col gap-4'>

                    <button onClick={() => setShowFormModal(!showFormModal)} className='text-center px-5 py-4  h-16
                  rounded-xl mt-4 bg-bg-purple text-white text-xl font-medium font-roboto hover:bg-purple-500 '><span className='flex items-center text-center justify-center gap-2'>
                        <FaCloudUploadAlt size={25} /> <p>Upload Image</p>

                      </span></button>

                    <span className=''>
                      <a onClick={() => {
                        setTemplateStatus("downloaded")
                      }} className='text-gray-400 text-sm hover:underline hover:cursor-pointer'>Want to upload the template ?</a>

                    </span>
                    <p className='text-gray-400 text-center'>or</p>
                    <span>
                      <a onClick={() => {
                        setTemplateStatus('default')
                      }} className='text-gray-400 text-sm hover:underline hover:cursor-pointer'>Want to redownload the template ?</a>

                    </span>

                  </span>
                }




              </div>
            </div>

              :

              <div className='flex flex-col p-2 w-full '>
                <div className='flex flex-row justify-between items-center gap-2 py-5'>

                  <span className='flex flex-row items-center gap-2'>
                    <RxDashboard className='md:text-3xl text-lg' />
                    <h1 className='md:text-3xl font-bold font-poppins text-white lack'> Recent Files</h1>
                  </span>
                  {
                    templateStatus === "downloaded" && (
                      <div className='flex flex-col gap-5 items-center'>
                        {/* <p className='text-xl font-poppins'>Upload your template after filling the spaces for all single letters in your handwriting</p> */}
                        <Button
                          className="p-4 rounded-xl"
                          variant={"customBlue"}
                          onClick={() => document.getElementById('pdf-upload').click()}
                        >
                          Upload Template
                        </Button>
                        <input
                          accept=".docx"
                          id="pdf-upload"
                          onChange={handleFileUpload}
                          type="file"
                          // Allows selecting multiple files

                          hidden
                        />
                      </div>
                    )
                  }
                  <div className='flex flex-col gap-2 items-center '>

                    <button onClick={() => setShowFormModal(!showFormModal)} className='text-center px-5  py-4 md:w-60  
                       rounded-xl bg-bg-purple text-white text-xl font-medium font-roboto hover:bg-purple-500 '><span className='flex items-center text-center justify-center gap-2 '>
                        <FaCloudUploadAlt size={25} /> <p>Upload Image</p>
                      </span></button>


                    <span className=''>
                      <a onClick={() => {
                        setTemplateStatus("downloaded")
                      }} className='text-gray-400 text-sm hover:underline hover:cursor-pointer'>Want to upload the template ?</a>

                    </span>
                  </div>

                </div>

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
              {isUploading ? (
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
                    multiple
                    onChange={handleFileChange}
                    hidden
                  />
                  <span className='flex items-center flex-col gap-2'>
                    {selectedFiles.length > 0 ? (
                      selectedFiles.map((file, index) => (
                        <div key={index} className="flex flex-col overflow-y-auto items-center gap-2">
                          <p className="text-white text-center">{file.name}</p>
                          <MdDelete
                            className="cursor-pointer"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedFiles((prevFiles) =>
                                prevFiles.filter((f) => f !== file)
                              );
                            }}
                          />
                        </div>
                      ))
                    ) : (
                      <span>
                        <MdCloudUpload color="#1475cf" size={70} />
                        <p>.png, .jpg</p>
                      </span>
                    )}
                  </span>

                </div>
              )}


            </form>

            <button
              disabled={isUploading || !selectedFiles.length > 0 || isPaymentInProgress}
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


      {
        showPaymentModal && <PaymentBox
          handleCardPayment={handleCardPayment}

          fileName={selectedFiles.map((file) => file.name)}
          setShowPaymentModal={setShowPaymentModal}
          handleFunctionRun={handleExtractText}
          promoCode={promoCode}
          handlePromodeCodeChange={handlePromodeCodeChange}
          handleCurrencyChange={handleCurrencyChange}
          featureName='Ocr Filename'
          price={price}
          filesCount={selectedFiles.length}
        />
      }

    </div>
  )
}

export default OCR
