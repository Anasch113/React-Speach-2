import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { CiFlag1 } from "react-icons/ci";
import Letter from './Letter';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useUserAuth } from '@/context/UserAuthContext';
import toast from 'react-hot-toast';
const GeneralNotes = ({
    transcript,
    transcriptions,
    formattedTranscript,
    setNotes,
    isNotes,
    notes,
    setIsNotes

}) => {




    const { user } = useUserAuth()

    // const letterTextChange = (e) => {
    //     setLetterText(e.target.value)
    //     console.log(letterText)
    // }
    console.log("notessss", notes)


    return (


        <div className='border w-full min-h-[300px] bg-bg-navy-blue rounded-md flex flex-col items-center p-5 gap-5'>





            <span span className='flex items-center w-full justify-end ' >

                <h1 className='md:text-3xl text-xl font-semibold flex-1  text-center'>General Notes</h1>
                <span className='border  p-4 rounded-full  hover:bg-blackGray hover:cursor-pointer'>

                    <CiFlag1 className='text-xl' />
                </span>
            </span >

            {
                isNotes && notes.length > 0 && <div className='border rounded-md w-full p-2 max-h-[550px] text-sm md:text-base overflow-y-auto '>

                    {
                        notes.map((note, i) => (
                            <span className='space-y-2 p-2 my-2 flex flex-col' key={i}>
                                {note}
                            </span>

                        ))
                    }

                </div>
            }






            {
                isNotes &&
                <div className='flex  items-center justify-center gap-5 md:flex-row flex-col'>



                    <Button variant={"outline"}>Copy Text</Button>
                </div>
            }


        </div >
    )
}

export default GeneralNotes
