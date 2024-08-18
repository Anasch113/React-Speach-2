import { Button } from '@/components/ui/button'
import React, { useState, useRef } from 'react'
import { CiFlag1 } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import axios from 'axios'

const GeneralSummary = ({
    transcript,
    transcriptions

}) => {
    const [isNotes, setIsNotes] = useState(false)
    const [showCopied, setShowCopied] = useState(false);
    const containerRef = useRef(null)


    console.log("summary:", transcriptions.summary)


    const copyText = () => {
        const contentToCopy = containerRef.current.innerText;

        navigator.clipboard.writeText(contentToCopy);
        setShowCopied(true);

    };


    return (


        <div className='border w-full min-h-[300px] bg-bg-navy-blue rounded-md flex flex-col items-center p-5 gap-5'>





            <span span className='flex items-center w-full justify-end ' >

                <h1 className='md:text-3xl text-xl font-semibold flex-1  text-center'>General Summary</h1>
                <span className='border  p-4 rounded-full  hover:bg-blackGray hover:cursor-pointer'>

                    <CiFlag1 className='text-xl' />
                </span>
            </span >


            <div ref={containerRef} className='border rounded-md w-full p-2 min-h-[150px] text-sm md:text-base '>
                <p>{transcriptions.summary}</p>
            </div>




            <div className='flex  items-center justify-center gap-5 md:flex-row flex-col'>



                <Button onClick={copyText} variant={"outline"}> {!showCopied ? "Copy Text  " : "Copied"} <MdContentCopy className='mx-2' /> </Button>
            </div>



        </div >
    )
}

export default GeneralSummary
