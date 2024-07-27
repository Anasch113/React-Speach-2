import { Button } from '@/components/ui/button'
import React from 'react'
import { CiFlag1 } from "react-icons/ci";
const GeneralNotes = () => {
    return (


        <div className='border w-full min-h-[300px] bg-bg-navy-blue rounded-md flex flex-col items-center p-5 gap-5'>
            <span className='flex items-center w-full justify-end '>

                <h1 className='md:text-3xl text-xl font-semibold flex-1  text-center'>General Notes</h1>
                <span className='border  p-4 rounded-full  hover:bg-blackGray hover:cursor-pointer'>

                    <CiFlag1 className='text-xl' />
                </span>
            </span>


            <div className='border rounded-md w-full p-2 min-h-[150px] text-sm md:text-base '>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eum debitis quas, quos quibusdam eius fugiat qui dolorum voluptatem nihil suscipit laboriosam quae magnam minus. Inventore aut eum et exercitationem.
            </div>


            <div className='flex items-center gap-5 md:flex-row flex-col'>
                
                <Button className="bg-[#1a1f2c]" variant={"outline"}>Regenerate from Transcript</Button>
                <Button  variant={"outline"}>Copy Text</Button>
            </div>


        </div>
    )
}

export default GeneralNotes
