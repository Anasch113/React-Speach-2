import { Button } from '@/components/ui/button'
import React from 'react'
import { CiFlag1 } from "react-icons/ci";
import { useState, useEffect, useRef } from 'react';
import { MdContentCopy } from "react-icons/md";
const SpeakerDiarization = ({
    speakerLabelsText

}) => {
    const [showCopied, setShowCopied] = useState(false);
    const pRefLarge = useRef(null);


    const copyText = () => {
        const contentToCopy = pRefLarge.current.innerText;

        navigator.clipboard.writeText(contentToCopy);
        setShowCopied(true);

    };

    console.log("speakerLabelsText in sd component", speakerLabelsText)
    return (


        <div className='border w-full min-h-[300px] bg-bg-navy-blue rounded-md flex flex-col items-center p-5 gap-5'>
            <span className='flex items-center w-full justify-end '>

                <h1 className='md:text-3xl text-xl font-semibold flex-1  text-center'>Speaker Diarization</h1>
                <span className='border  p-4 rounded-full  hover:bg-blackGray hover:cursor-pointer'>

                    <CiFlag1 className='text-xl' />
                </span>
            </span>


            <div ref={pRefLarge} className='border rounded-md w-full p-2 min-h-[350px] max-h-[650px] text-sm md:text-base overflow-y-scroll'>

                {
                    speakerLabelsText.length > 0 && speakerLabelsText.map((data, i) => (
                        <span className='w-full flex gap-2 my-2 ' key={i}>

                            <p className='  w-2/12'> Speaker {data.speaker} : </p>
                            <p className=' w-2/3'>   {data.text.split('\n')} </p>

                        </span>

                    ))
                }

            </div>


            <div className='flex items-center gap-5 md:flex-row flex-col'>

                <Button className="bg-[#1a1f2c]" variant={"outline"}>Regenerate from Transcript</Button>
                <Button onClick={copyText} variant={"outline"}> {!showCopied ? "Copy Text  " : "Copied"} <MdContentCopy className='mx-2' /> </Button>
            </div>


        </div>
    )
}

export default SpeakerDiarization
