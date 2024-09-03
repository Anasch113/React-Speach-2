import React, { useState } from 'react'
import { Button } from '../ui/button'
import { MdCloudUpload, MdDelete } from "react-icons/md"
import { useUserAuth } from '@/context/UserAuthContext'
import { AiFillFileImage } from "react-icons/ai"
import Types from './Types'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PaymentBox from './PaymentBox'
import toast from 'react-hot-toast'




const UploadSection = ({
  handleSummaryDeposition,
  setDepositionType,

  setSummaryName,
  handleSelectChange,
  selectedValue,
  isPaymentDone,
  handleCardPayment,
  summaryName,
  hanldeStepOne,
  isStepOneDone,
  setIsStepOneDone 


}) => {


  const handleFormClick = () => {
    if (summaryName === "" || selectedValue === "") {
      toast("Please provide above details first")
      return
    }
    document.querySelector(".input-field").click();

  };

  const { user, file, setFile, progress, setProgress, isUpload, setIsUpload, cloudUrls, setCloudUrls, uploadingfileNames, fileNames, setFileNames, chunksLoading, handleFileChange, handleTextFileChange, fileContent, setUploadingfileNames, showPaymentModal, isPaymentInProgress, setShowPaymentModal } = useUserAuth();


  console.log("filenames", fileNames)
  console.log("upladingfile names", uploadingfileNames)
  console.log("progress", progress)
 

  const resetUploadStates = () => {
    setCloudUrls([]);     // Reset cloudUrls array
    setFileNames([]);     // Reset fileNames array
    setProgress([]);      // Reset progress array
    setFile("");          // Reset selected file state
    // Reset file duration state
    // Reset cost state if applicable
    setIsUpload(false);   // Reset upload status
    setUploadingfileNames([])

  };


  console.log("payment in progress", isPaymentInProgress)


  return (
    <div className='flex flex-col w-full items-center justify-center'>


      {/* types */}

      {
        !isStepOneDone ? (<Types

          hanldeStepOne={hanldeStepOne}

        />
        ) : (

          <div className='flex flex-col gap-5 w-full items-center justify-center'>

            <div className=" flex flex-col md:w-2/3 w-full items-center gap-2">
              <Label className="w-full" htmlFor="email">Summary Name <span className='text-red-400'>*</span></Label>
              <Input value = {summaryName} onChange={(e) => setSummaryName(e.target.value)} className="w-full border " type="text" id="summary" />
            </div>

            <Select value={selectedValue} onValueChange={handleSelectChange} className="">
              <Label className="md:w-2/3 w-full" htmlFor="email">Deponent </Label>
              <SelectTrigger className="md:w-2/3  w-full border rounded-md h-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Plaintiff">Plaintiff</SelectItem>
                <SelectItem value="Defandant">Defandant</SelectItem>
                <SelectItem value="Witness">Witness</SelectItem>
              </SelectContent>
            </Select>



            <form onClick={handleFormClick} className='md:w-2/3 w-full min-h-[200px] border-dotted border-2 border-blue-600 rounded-xl flex items-center justify-center flex-col gap-4 cursor-pointer max-[500px]:text-sm'>
              {
                fileNames.length > 0 && <section className='mx-2  flex flex-col justify-between items-center px-4 py-5 rounded-md gap-2'>

                  <span className='flex items-center gap-2'>
                    <AiFillFileImage color='#1475cf' />
                    <div className="flex flex-col">
                      {fileNames.map((file, i) => (
                        <span key={i} className='text-gray-400 '> {file} </span>
                      ))}
                    </div>

                    <MdDelete className='z-50' cursor="pointer"
                      onClick={(event) => {
                        event.stopPropagation()
                        resetUploadStates()
                      }}
                    />
                  </span>

                  <img className='w-6 h-6 my-3' src="/checked.png" alt="img" />
                </section>
              }




              {
                isUpload && <div className='flex  items-center flex-col'>

                  {/* <p className='py-1'>{filename}</p> */}
                  {Array.isArray(progress) && progress.map((prog, i) => (
                    <div key={i}>
                      <p className='py-1'>{`File ${i + 1}: ${prog}%`}</p>
                      <div className="progress-bar" style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden', width: '100%' }}>
                        <div className="progress-fill" style={{ width: `${prog}%`, backgroundColor: '#4caf50', height: '15px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>

              }
              <input

                accept=' .txt , .pdf'
                onChange={handleTextFileChange}
                className='input-field'
                type="file"
                hidden
              />
              {
                !fileNames.length > 0 && <span className='flex items-center justify-center flex-col gap-4 '><MdCloudUpload color='#126fd6' size={70} />
                  <p className='font-poppins font-semibold md:text-lg text-sm'>Click to upload the file</p>
                  <p>.txt files only</p></span>
              }



            </form>
            {
              isPaymentInProgress ? (

                <Button onClick={() => {
                  setShowPaymentModal(true)
                }} variant={"customLightPurple"} className="w-56">Pay Now</Button>

              ) : (

                <Button disabled={!isPaymentDone} onClick={handleSummaryDeposition} variant={"customLightPurple"} className="w-56">Generate Summary</Button>

              )
            }


          </div>
        )
      }

      {
        showPaymentModal && <PaymentBox
          handleCardPayment={handleCardPayment}
          summaryName={summaryName}
          setShowPaymentModal={setShowPaymentModal}
          handleSummaryDeposition = {handleSummaryDeposition}
        />
      }






    </div>
  )
}

export default UploadSection
