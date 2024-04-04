import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../layout/Sidebar';
import { useState } from 'react';
import ViewTranscriptions from './ViewTranscriptions';
const Transcripted = ({
    transcriptions,
    filename,
    processing,
    subtitle,
    handleTranscriptions

}) => {
    console.log(transcriptions)
    const navigate = useNavigate();
    const [isView, setIsView] = useState(false);

    const handleNavigate = () => {
        // navigate("/pre-audio-transcriptions/view", {
        setIsView(true)
        //     state: { transcriptions: transcriptions, filename:filename }
        // });
    }
    return (
        <>

            {
                !isView ? (<div className='border md:w-full shadow-md p-5 flex flex-col  gap-8 min-h-[300px] '>

                    <span className='flex flex-row justify-between items-center gap-2 py-5'>

                        <span className='flex flex-row items-center gap-2'>
                            <RxDashboard className='text-3xl' />
                            <h1 className='text-3xl font-bold font-poppins text-text-black'> Recent Files</h1>
                        </span>
                        <div>
                            <button onClick={handleTranscriptions} className='text-center px-5 py-3 w-full h-16
rounded-md bg-bg-blue text-white text-xl font-medium font-roboto hover:bg-blue-500 '><span className='flex items-center text-center justify-center gap-2'>
                                    <FaCloudUploadAlt size={25} /> <p>Transcribe Files </p>
                                </span></button>

                        </div>



                    </span>



                    <div >
                        <table className="  flex flex-col  ">

                            <thead className='my-2'>
                                <tr className="font-poppins text-sm">

                                    <th className=" text-text-brown-new px-20 py-2">Name</th>
                                    <th className=" text-text-brown-new px-20 py-2">Uploaded</th>
                                    <th className=" text-text-brown-new px-20 py-2">Duration</th>
                                    <th className=" text-text-brown-new px-20 py-2">Status</th>



                                </tr>

                            </thead>
                            <div className=' my-5  border '></div>
                            <tbody onClick={handleNavigate} className='hover:bg-[#EDEDED] hover:rounded-3xl py-4'>

                                <tr className="font-poppins text-sm  cursor-pointer">
                                    <td className=" text-text-black font-medium text-lg px-20 py-2">{filename}</td>
                                    <td className=" text-text-black font-medium text-lg px-20 py-2">April 1, 2024</td>
                                    <td className=" text-text-black font-medium text-lg px-20 py-2">{`${transcriptions.audio_duration}s`}</td>
                                    <td className=" text-text-black font-medium text-lg px-20 py-2">{processing ? (<div className='spinner'></div>) : (<p>completed</p>)}</td>







                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>) :

                    (

                        <ViewTranscriptions transcriptions={transcriptions} filename={filename} subtitle={subtitle} />

                    )
            }




        </>
    )
}

export default Transcripted
